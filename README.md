# Jobbportal

A job listing portal built with Next.js (App Router) and Storyblok as headless CMS.
Job ads, page content and the global header/footer are managed in Storyblok and
rendered as Storyblok blocks — no editorial content is hardcoded in React.

Examination assignment (Examinationsuppgift), Nackademin.

## Live Demo

https://cms-uppgift-sigma.vercel.app/

- `/` — start page
- `/jobs` — job list with department filter and search
- `/jobs/[slug]` — job detail page

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16.3.2 (App Router, React Server Components) |
| UI | React 19.2.8 |
| CMS | Storyblok — `@storyblok/react` 7.3.0 (`/rsc` entry point) |
| Styling | Tailwind CSS v4 |
| Package manager | npm |

## Getting Started

```bash
git clone https://github.com/mrshed21/cmsUppgift.git
cd cmsUppgift
npm install
```

Create a `.env.local` file in the project root and fill in the variables listed
under [Environment Variables](#environment-variables). The app needs a valid
Storyblok token to start — without it every page fails to fetch content.

```bash
npm run dev
```

Open http://localhost:3000

## Environment Variables

`.env.local` is git-ignored. Never commit tokens or secrets.

| Variable | Description |
|---|---|
| `STORYBLOK_DELIVERY_API_TOKEN` | Storyblok Content Delivery API token. Used by `storyblokInit()` in `src/lib/storyblok.js`. |
| `STORYBLOK_VERSION` | Which content version to fetch: `draft` or `published`. Defaults to `published` if unset. |
| `STORYBLOK_WEBHOOK_SECRET` | Shared secret that protects the on-demand revalidation route `POST /api/revalidate?secret=…`. |

```bash
STORYBLOK_DELIVERY_API_TOKEN=
STORYBLOK_VERSION=draft
STORYBLOK_WEBHOOK_SECRET=
```

**`STORYBLOK_VERSION`**

- `draft` — local development and the Storyblok Visual Editor, so unpublished
  changes are visible. Draft requests also bypass the Next.js cache.
- `published` — production. Only published stories are returned.

The space is configured for the EU region (`apiOptions: { region: "eu" }`).

## Storyblok

### Content types

**`job-post`**

| Field | Type |
|---|---|
| `title` | Text |
| `summary` | Textarea |
| `department` | Single-Option (source: datasource `job-departments`) |
| `location` | Text |
| `content` | Richtext |
| `publishedAt` | Date/Time |

**`page`** — a single `body` field of type Blocks. Used for `home`, `jobs/index`
and `config`.

### Datasource

`Job Departments` — slug `job-departments`

| Name | Value |
|---|---|
| Utveckling | `utveckling` |
| Design | `design` |
| Marknadsföring | `marknadsföring` |

The datasource drives the department dropdown and is also used to translate a
stored value back into its display name on job cards and detail pages.

### Stories

| Story | Content type | Rendered by |
|---|---|---|
| `home` | `page` | `src/app/page.js` at `/` |
| `jobs/` (folder, `index` set as root) | `page` | `src/app/jobs/page.js` at `/jobs` |
| `jobs/<slug>` | `job-post` | `src/app/jobs/[slug]/page.js` |
| `config` | `page` | `src/app/layout.js` — global header and footer |

`home` is excluded from `generateStaticParams()` in the `[slug]` segment so the
start page is only served at `/`.

### Block structure

```
config
├── header
│   └── nav_item
└── footer
    └── footer_link

home
└── hero

jobs/index
├── toolbar
│   ├── department-filter
│   └── search-bar
└── job_list
```

All blocks are registered in `src/lib/storyblok.js`. Additional blocks available
in the space but not currently used by any story: `feature_grid`, `feature_item`,
`text_section`.

## Architecture

```
src/
├── app/
│   ├── layout.js              # fetches the `config` story → header + footer
│   ├── page.js                # `/`      → fetches `home`
│   ├── [slug]/page.js         # `/:slug` → any other `page` story
│   ├── jobs/page.js           # `/jobs`  → fetches the `jobs/` index story
│   ├── jobs/[slug]/page.js    # job detail
│   └── api/revalidate/        # Storyblok webhook → on-demand revalidation
├── components/
│   ├── blocks/                # one file per Storyblok block
│   ├── HeaderShell.jsx        # helper (see below)
│   └── JobCard.jsx            # helper (see below)
└── lib/storyblok.js           # storyblokInit, block registry, all API calls
```

Route files do three things only: read route params and `searchParams`, fetch the
story, and render `story.content.body` through `StoryblokServerComponent`. They
contain no editorial text, no form markup and no list markup. Everything visible
and editable is a Storyblok block that receives its data through `blok`.

### Helper components that are not Storyblok blocks

Three files live outside the block registry on purpose:

- **`HeaderShell.jsx`** — the `header` block is a React Server Component, but the
  mobile menu needs client-side state. `HeaderShell` is a client component that
  owns only that state (open/closed, body scroll lock, hamburger button). The
  header's content — logo text and navigation items — is rendered on the server
  by the `header` block and passed in as props. It holds no content, so there is
  nothing for an editor to edit.
- **`NavItem.jsx`** — registered as the `nav_item` block, but marked
  `"use client"` because it reads the current route with `usePathname()` to mark
  the active link. Its label and URL still come from `blok`.
- **`JobCard.jsx`** — renders a `job-post` **story** in the job list, not a
  Storyblok **blok**. Blocks are entries inside a Blocks field; job ads are
  stories. Registering `JobCard` as a block would let an editor insert a job card
  that is not backed by any job ad, so it stays a presentational component driven
  by the story data that `job_list` fetches.

## Search & Filtering

The `toolbar` block is a container. It renders its nested blocks through
`StoryblokServerComponent` and forwards the current query values down to them.

| Block | Query parameter |
|---|---|
| `search-bar` | `?q=` |
| `department-filter` | `?department=` |

Each block renders its own `<form method="get" action="/jobs">`, so both work
without JavaScript. To keep them usable together, each form carries a hidden
input holding the other parameter's current value — searching does not clear the
active department, and changing the department does not clear the search term.

`/jobs` reads `searchParams` and passes them as props; `job_list` turns them into
a single Storyblok query:

```js
starts_with:  "jobs/"
content_type: "job-post"
filter_query: { department: { in: department } }
search_term:  searchTerm
```

Example: `/jobs?department=design&q=figma`

## Rich Text

Job descriptions (`job-post.content`) are rendered with `renderRichText` from
`@storyblok/react/rsc`, which returns an HTML string.

The `text_section` block uses `StoryblokServerRichText` instead. It renders React
elements rather than a string and resolves Storyblok blocks embedded inside a
Rich Text field — `renderRichText` skips those unless a custom renderer is
supplied. Job descriptions contain no embedded blocks, so the simpler renderer is
enough there.

## Validation

```bash
npm run lint
npm run build
```

## Deployment

Deployed on Vercel from the GitHub repository.

Production environment variables:

| Variable | Value |
|---|---|
| `STORYBLOK_DELIVERY_API_TOKEN` | Storyblok delivery token |
| `STORYBLOK_VERSION` | `published` |
| `STORYBLOK_WEBHOOK_SECRET` | Shared secret for the revalidation webhook |

A Storyblok webhook posts to `/api/revalidate?secret=…` when a story is
published, which revalidates the affected path and the job list — content updates
appear without a redeploy.

`next.config.mjs` sets a `Content-Security-Policy: frame-ancestors` header
allowing `app.storyblok.com`, so the site can be previewed inside the Storyblok
Visual Editor.

## Architecture & Storyblok Block Structure

This project was reworked in response to the feedback
*"Varje komponent bör vara ett storyblok block."*

What changed:

- The job list was moved out of `jobs/page.jsx` into a `job_list` block. The
  route now fetches the index story and renders its body through
  `StoryblokServerComponent`.
- `toolbar` became a nestable container with a Blocks field, and the filter and
  the search field were split into two separate blocks,
  `department-filter` and `search-bar`, nested inside it.
- Labels, placeholders, button texts and headings were moved out of React and
  into block fields, so an editor can change them without touching the code.
- The header was converted from a hardcoded component into a `header` block with
  nested `nav_item` blocks, and a `footer` block with `footer_link` blocks was
  added. Both are read from the `config` story in the root layout.
- The start page was converted from static JSX into a `hero` block on the `home`
  story.

Remaining exceptions are the three helper components described under
[Architecture](#architecture), each for a technical reason rather than
convenience.
