import { getPage } from "@/lib/storyblok";
import { StoryblokServerComponent, StoryblokLiveEditing } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Lediga tjänster",
  description: "Utforska alla lediga jobb hos oss.",
};

export default async function JobsPage({ searchParams }) {
  const sp = await searchParams;
  const department = sp?.department;
  const searchTerm = sp?.q;

  const page = await getPage("jobs");

  if (!page) {
    notFound();
  }

  const body = page.content?.body || [];

  return (
    <main className="flex-1 px-6 py-16 md:py-24">
      <StoryblokLiveEditing story={page} />
      <div className="mx-auto max-w-6xl">
        {body.map((blok) => (
          <StoryblokServerComponent 
            key={blok._uid} 
            blok={blok} 
            department={department} 
            searchTerm={searchTerm} 
          />
        ))}
      </div>
    </main>
  );
}
