import { getDatasourceEntries } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react/rsc";

export default async function DepartmentFilter({
  blok,
  department,
  searchTerm,
}) {
  const departments = await getDatasourceEntries(blok.datasource);

  return (
    <div {...storyblokEditable(blok)} className="w-full sm:w-auto">
      <form
        method="get"
        action="/jobs"
        className="flex flex-col sm:flex-row gap-3 sm:items-end"
      >
        {/* Keeps the active search term when only the department is submitted */}
        {searchTerm && <input type="hidden" name="q" value={searchTerm} />}

        <div className="w-full sm:w-auto">
          {blok.label && (
            <label htmlFor="department" className="sr-only">
              {blok.label}
            </label>
          )}
          <select
            id="department"
            name="department"
            defaultValue={department || ""}
            className="w-full bg-[#1A1C23] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="">{blok.all_label}</option>
            {departments.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
        >
          {blok.button_text}
        </button>
      </form>
    </div>
  );
}
