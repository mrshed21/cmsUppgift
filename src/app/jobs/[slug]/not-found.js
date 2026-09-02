import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="glass-card max-w-md w-full p-10 text-center">
        <p className="text-6xl font-bold text-gradient mb-4">404</p>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Tjänsten kunde inte hittas
        </h1>
        <p className="text-muted mb-8">
          Annonsen du letar efter finns inte längre eller har tagits bort.
        </p>
        <Link href="/jobs" className="glass-button">
          Se alla tjänster →
        </Link>
      </div>
    </main>
  );
}
