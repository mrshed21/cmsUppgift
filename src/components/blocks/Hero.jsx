import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function Hero({ blok }) {
  const isGradient = blok.variant === "gradient";

  return (
    <section
      {...storyblokEditable(blok)}
      className="flex flex-1 items-center justify-center px-6 py-24"
    >
      <div className="glass-card max-w-xl w-full p-10 text-center">
        {blok.eyebrow && (
          <p className="text-sm uppercase tracking-widest text-dim mb-4">
            {blok.eyebrow}
          </p>
        )}

        <h1
          className={
            "text-4xl font-semibold mb-4 " +
            (isGradient ? "text-gradient" : "text-white")
          }
        >
          {blok.title}
        </h1>

        {blok.subtitle && <p className="text-muted mb-8">{blok.subtitle}</p>}

        {blok.button_text && blok.button_url && (
          <Link href={blok.button_url} className="glass-button">
            {blok.button_text}
          </Link>
        )}
      </div>
    </section>
  );
}
