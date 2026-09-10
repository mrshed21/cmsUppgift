import { getJobs, getDatasourceMap } from "@/lib/storyblok";
import JobCard from "@/components/JobCard";
import { storyblokEditable } from "@storyblok/react/rsc";

export default async function JobList({ blok, department, searchTerm }) {
  const [jobs, departmentMap] = await Promise.all([
    getJobs({ department, searchTerm }),
    getDatasourceMap("job-departments"),
  ]);

  const activeDepartmentName = department
    ? departmentMap.get(department) || department
    : null;

  return (
    <div {...storyblokEditable(blok)}>
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <p className="text-sm uppercase tracking-widest text-dim mb-3">
          Karriär
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold text-gradient mb-4">
          Lediga tjänster
        </h2>
        <p className="text-muted max-w-2xl">
          {activeDepartmentName ? (
            <>
              Visar {jobs.length} {jobs.length === 1 ? "tjänst" : "tjänster"} inom{" "}
              <span className="text-white font-medium">{activeDepartmentName}</span>.
            </>
          ) : (
            <>
              {jobs.length} {jobs.length === 1 ? "tjänst" : "tjänster"} matchar just nu. Klicka på en annons för att läsa mer.
            </>
          )}
        </p>
      </div>

      {/* Empty state */}
      {jobs.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-muted mb-2">
            Inga lediga tjänster {activeDepartmentName && `inom ${activeDepartmentName}`} just nu.
          </p>
          {activeDepartmentName && (
            <a
              href="/jobs"
              className="text-indigo-300 hover:text-indigo-200 text-sm transition-colors"
            >
              Visa alla tjänster →
            </a>
          )}
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
