import Link from "next/link";

export default function JobCard({ story, departmentLabel }) {
  const { title, summary, location, department } = story.content;

  return (
    <Link
      href={`/jobs/${story.slug}`}
      className="glass-card glass-card-hover group block p-6"
    >
      {department && (
        <span className="glass-pill mb-4">
          {departmentLabel || department}
        </span>
      )}

      <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-200 transition-colors">
        {title}
      </h2>

      {location && (
        <p className="text-sm text-dim mb-3 flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </p>
      )}

      {summary && (
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {summary}
        </p>
      )}

      <div className="mt-5 text-sm font-medium text-indigo-300 group-hover:text-indigo-200 transition-colors">
        Läs mer →
      </div>
    </Link>
  );
}
