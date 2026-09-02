import { getJobs, getDatasourceMap, getDatasourceEntries } from "@/lib/storyblok";

// Using Webhook for On-Demand Revalidation instead of time-based ISR
// We no longer need: export const revalidate = 60;
import JobCard from "@/components/JobCard";
import DepartmentFilter from "@/components/DepartmentFilter";

export const metadata = {
  title: "Lediga tjänster",
  description: "Utforska alla lediga jobb hos oss.",
};

export default async function JobsPage({ searchParams }) {
  const sp = await searchParams;
  const department = sp?.department;
  const searchTerm = sp?.q;

  const [jobs, departmentMap, departments] = await Promise.all([
    getJobs({ department, searchTerm }),
    getDatasourceMap("job-departments"),
    getDatasourceEntries("job-departments"),
  ]);

  const activeDepartmentName = department
    ? departmentMap.get(department) || department
    : null;

  return (
    <main className="flex-1 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <p className="text-sm uppercase tracking-widest text-dim mb-3">
            Karriär
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gradient mb-4">
            Lediga tjänster
          </h1>
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

        {/* Filter */}
        <DepartmentFilter departments={departments} active={department} searchTerm={searchTerm} />

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
    </main>
  );
}
