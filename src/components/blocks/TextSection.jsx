import { StoryblokServerRichText, storyblokEditable } from "@storyblok/react/rsc";

export default function TextSection({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="py-12 md:py-16 px-6"
    >
      <div className="mx-auto max-w-3xl">
        <div className="glass-card p-8 md:p-10">
          {blok.heading && (
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {blok.heading}
            </h2>
          )}
          {blok.content && (
            <div className="prose-glass">
              <StoryblokServerRichText document={blok.content} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
