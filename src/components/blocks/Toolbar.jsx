import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Toolbar({ blok, department, searchTerm }) {
  return (
    <div {...storyblokEditable(blok)} className="mb-8 p-4 glass-card rounded-lg">
      {blok.heading && (
        <h2 className="text-lg font-semibold text-white mb-4">{blok.heading}</h2>
      )}

      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        {blok.blocks?.map((nestedBlok) => (
          <StoryblokServerComponent
            key={nestedBlok._uid}
            blok={nestedBlok}
            department={department}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </div>
  );
}
