import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="glass-card max-w-xl w-full p-10 text-center">
        <p className="text-sm uppercase tracking-widest text-dim mb-4">
          Under utveckling
        </p>
        <h1 className="text-4xl font-semibold mb-4 text-gradient">
          Jobbannonser
        </h1>
        <p className="text-muted mb-8">
          Hitta ditt nästa jobb bland våra lediga tjänster.
        </p>
        <Link href="/jobs" className="glass-button">
          Se lediga tjänster →
        </Link>
      </div>
    </main>
  );
}
