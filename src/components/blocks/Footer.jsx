import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Footer({ blok }) {
  const links = blok.links || [];

  return (
    <footer
      {...storyblokEditable(blok)}
      className="mt-auto border-t border-white/[0.06] backdrop-blur-2xl bg-[#0a0e27]/70"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {blok.copyright && (
          <p className="text-sm text-dim text-center sm:text-left">
            {blok.copyright}
          </p>
        )}

        {links.length > 0 && (
          <nav
            aria-label="Sidfotsmeny"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {links.map((nestedBlok) => (
              <StoryblokServerComponent key={nestedBlok._uid} blok={nestedBlok} />
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
