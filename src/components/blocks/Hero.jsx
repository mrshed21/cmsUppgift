import { storyblokEditable } from "@storyblok/react/rsc";

export default function Hero({ blok }) {
  const isGradient = blok.variant === "gradient";
  return (
    <section
      {...storyblokEditable(blok)}
      className="text-center py-16 md:py-24 px-6"
    >
      <h1
        className={
          "text-4xl md:text-6xl font-semibold mb-6 leading-tight " +
          (isGradient ? "text-gradient" : "text-white")
        }
      >
        {blok.title}
      </h1>
      {blok.subtitle && (
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          {blok.subtitle}
        </p>
      )}
    </section>
  );
}
