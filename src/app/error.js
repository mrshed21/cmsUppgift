"use client";

import Link from "next/link";
import { useEffect } from "react";



export default function GlobalError({ error, reset }) {
  useEffect(() => {

    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="glass-card max-w-md w-full p-10 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Något gick fel
        </h1>
        <p className="text-muted mb-2">
          Ett oväntat fel uppstod. Försök igen om en stund.
        </p>
        {error?.digest && (
          <p className="text-xs text-dim mb-8 font-mono">
            Fel-ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button
            type="button"
            onClick={reset}
            className="glass-button hover:bg-white/10 cursor-pointer"
          >
            Försök igen
          </button>
          <Link href="/" className="glass-button">
            Till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
}
