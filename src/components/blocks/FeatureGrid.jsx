import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function FeatureGrid({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="py-12 md:py-16 px-6"
    >
      <div className="mx-auto max-w-6xl">
        {(blok.heading || blok.subheading) && (
          <div className="text-center mb-10">
            {blok.heading && (
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
                {blok.heading}
              </h2>
            )}
            {blok.subheading && (
              <p className="text-muted max-w-2xl mx-auto">{blok.subheading}</p>
            )}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blok.items?.map((item) => (
            <StoryblokServerComponent blok={item} key={item._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
