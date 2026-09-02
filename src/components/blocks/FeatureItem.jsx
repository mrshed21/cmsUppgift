import { storyblokEditable } from "@storyblok/react/rsc";

const ICONS = {
  rocket: (
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  ),
  shield: <path d="M20 13c0 5-3.5 7.5-8 8.5-4.5-1-8-3.5-8-8.5V6l8-3 8 3z" />,
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  sparkles: (
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

export default function FeatureItem({ blok }) {
  const IconPath = ICONS[blok.icon] || ICONS.sparkles;
  return (
    <div {...storyblokEditable(blok)} className="glass-card p-6 text-center">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 mb-4 shadow-lg shadow-indigo-500/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="white" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          {IconPath}
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{blok.title}</h3>
      {blok.text && (
        <p className="text-sm text-muted leading-relaxed">{blok.text}</p>
      )}
    </div>
  );
}
