import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryblokServerRichText, StoryblokLiveEditing } from "@storyblok/react/rsc";
import { getJob, getJobs, getDatasourceMap } from "@/lib/storyblok";

// Using Webhook for On-Demand Revalidation instead of time-based ISR
// We no longer need: export const revalidate = 60;



export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((story) => ({
    slug: story.slug,
  }));
}



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: "Tjänsten kunde inte hittas",
    };
  }

  return {
    title: job.content.title,
    description: job.content.summary,
  };
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;

  const [job, departmentMap] = await Promise.all([
    getJob(slug),
    getDatasourceMap("job-departments"),
  ]);

  if (!job) {
    notFound();
  }

  const { title, summary, location, department, content, publishedAt } =
    job.content;
  const departmentLabel = departmentMap.get(department) || department;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="flex-1 px-6 py-12 md:py-20">
      <StoryblokLiveEditing story={job} />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Tillbaka till alla tjänster
        </Link>

        <div className="glass-card p-8 md:p-10 mb-8">
          {department && (
            <span className="glass-pill mb-5">{departmentLabel}</span>
          )}

          <h1 className="text-3xl md:text-4xl font-semibold text-gradient mb-4">
            {title}
          </h1>

          {summary && (
            <p className="text-lg text-muted leading-relaxed mb-6">
              {summary}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-dim">
            {location && (
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {location}
              </span>
            )}
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                Publicerad {formattedDate}
              </span>
            )}
          </div>
        </div>

        {content && (
          <article className="glass-card p-8 md:p-10 prose-glass">
            <StoryblokServerRichText document={content} />
          </article>
        )}
      </div>
    </main>
  );
}
