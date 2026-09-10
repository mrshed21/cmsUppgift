import { notFound } from "next/navigation";
import { StoryblokServerComponent, StoryblokLiveEditing } from "@storyblok/react/rsc";
import { getPage } from "@/lib/storyblok";

export default async function Home() {
  const page = await getPage("home");

  if (!page) notFound();

  const body = page.content?.body || [];

  return (
    <main className="flex flex-1 flex-col">
      {/* Loads Storyblok Bridge for live editing - only works inside the Visual Editor */}
      <StoryblokLiveEditing story={page} />

      {body.map((blok) => (
        <StoryblokServerComponent blok={blok} key={blok._uid} />
      ))}
    </main>
  );
}
