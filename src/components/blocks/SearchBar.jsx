import { storyblokEditable } from "@storyblok/react/rsc";

export default function SearchBar({ blok, department, searchTerm }) {
  return (
    <div {...storyblokEditable(blok)} className="flex-1 w-full">
      <form
        method="get"
        action="/jobs"
        className="flex flex-col sm:flex-row gap-3 sm:items-end"
      >
        {/* Keeps the active department filter when only the search is submitted */}
        {department && (
          <input type="hidden" name="department" value={department} />
        )}

        <div className="flex-1 w-full">
          {blok.label && (
            <label htmlFor="q" className="sr-only">
              {blok.label}
            </label>
          )}
          <input
            type="search"
            id="q"
            name="q"
            placeholder={blok.placeholder}
            defaultValue={searchTerm || ""}
            className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
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
