import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function CtaSection({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="py-16 md:py-24 px-6"
    >
      <div className="mx-auto max-w-3xl">
        <div className="glass-card p-10 md:p-14 text-center">
          {blok.heading && (
            <h2 className="text-3xl md:text-4xl font-semibold text-gradient mb-4">
              {blok.heading}
            </h2>
          )}
          {blok.subtitle && (
            <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
              {blok.subtitle}
            </p>
          )}
          {blok.button_text && blok.button_link && (
            <Link href={blok.button_link} className="glass-button hover:bg-white/10 inline-block">
              {blok.button_text} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
