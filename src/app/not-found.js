import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="glass-card max-w-md w-full p-10 text-center">
        <p className="text-7xl font-bold text-gradient mb-4">404</p>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Sidan kunde inte hittas
        </h1>
        <p className="text-muted mb-8">
          Sidan du letar efter finns inte, eller så har den flyttats.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="glass-button">
            Till startsidan
          </Link>
          <Link
            href="/jobs"
            className="glass-button hover:bg-white/10"
          >
            Se lediga tjänster
          </Link>
        </div>
      </div>
    </main>
  );
}
