import { notFound } from "next/navigation";
import { StoryblokServerComponent, StoryblokLiveEditing } from "@storyblok/react/rsc";
import { getPage, getPageSlugs } from "@/lib/storyblok";

// Using Webhook for On-Demand Revalidation instead of time-based ISR
// We no longer need: export const revalidate = 60;
export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Sidan kunde inte hittas" };
  return { title: page.name };
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) notFound();

  const body = page.content?.body || [];

  return (
    <main className="flex-1">
      {/* Loads Storyblok Bridge for live editing - only works inside the Visual Editor */}
      <StoryblokLiveEditing story={page} />

      {body.map((blok) => (
        <StoryblokServerComponent blok={blok} key={blok._uid} />
      ))}
    </main>
  );
}
