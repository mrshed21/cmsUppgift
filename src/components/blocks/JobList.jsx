import { getJobs, getDatasourceMap } from "@/lib/storyblok";
import JobCard from "@/components/JobCard";
import { storyblokEditable } from "@storyblok/react/rsc";

export default async function JobList({ blok, department, searchTerm }) {
  const [jobs, departmentMap] = await Promise.all([
    getJobs({ department, searchTerm }),
    getDatasourceMap("job-departments"),
  ]);

  return (
    <div {...storyblokEditable(blok)}>
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        {blok.eyebrow && (
          <p className="text-sm uppercase tracking-widest text-dim mb-3">
            {blok.eyebrow}
          </p>
        )}
        {blok.heading && (
          <h2 className="text-4xl md:text-5xl font-semibold text-gradient mb-4">
            {blok.heading}
          </h2>
        )}
        {blok.intro && <p className="text-muted max-w-2xl">{blok.intro}</p>}
      </div>

      {/* Empty state */}
      {jobs.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-muted">{blok.empty_text}</p>
        </div>
      )}

      {/* Grid */}
      {jobs.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((story) => (
            <JobCard
              key={story.uuid}
              story={story}
              departmentLabel={departmentMap.get(story.content.department)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
