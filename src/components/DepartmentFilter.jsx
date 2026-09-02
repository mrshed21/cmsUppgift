import Link from "next/link";

export default function DepartmentFilter({ departments, active, searchTerm }) {
  return (
    <div className="mb-8 p-4 glass-card rounded-lg">
      <form method="get" action="/jobs" className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="flex-1 w-full">
          <label htmlFor="q" className="sr-only">Sök tjänst</label>
          <input
            type="search"
            id="q"
            name="q"
            placeholder="Sök efter nyckelord..."
            defaultValue={searchTerm || ""}
            className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Department Dropdown */}
        <div className="w-full sm:w-auto">
          <label htmlFor="department" className="sr-only">Avdelning</label>
          <select
            id="department"
            name="department"
            defaultValue={active || ""}
            className="w-full bg-[#1A1C23] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="">Alla avdelningar</option>
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
        >
          Filtrera
        </button>
      </form>
    </div>
  );
}
