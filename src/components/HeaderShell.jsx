"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Interactive chrome for the Storyblok `header` block.
 * All content (logo text, nav items) is passed in from the server component,
 * this file only owns the mobile menu state.
 */
export default function HeaderShell({ logoText, desktopNav, mobileNav }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-2xl bg-[#0a0e27]/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 md:h-18 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group" aria-label={logoText}>
            <span
              aria-hidden="true"
              className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/40 transition-transform group-hover:scale-105"
            >
              <span className="text-base">{logoText?.trim()?.charAt(0)}</span>
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            </span>
            <span className="hidden xs:block sm:block text-white font-semibold text-base tracking-tight group-hover:text-indigo-200 transition-colors">
              {logoText}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Huvudmeny" className="hidden md:flex items-center gap-1">
            {desktopNav}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Stäng meny" : "Öppna meny"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden relative h-10 w-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="sr-only">Meny</span>
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={
                  "block h-0.5 w-full bg-white rounded transition-all duration-300 origin-center " +
                  (mobileOpen ? "translate-y-[7px] rotate-45" : "")
                }
              />
              <span
                className={
                  "block h-0.5 w-full bg-white rounded transition-opacity duration-200 " +
                  (mobileOpen ? "opacity-0" : "opacity-100")
                }
              />
              <span
                className={
                  "block h-0.5 w-full bg-white rounded transition-all duration-300 origin-center " +
                  (mobileOpen ? "-translate-y-[7px] -rotate-45" : "")
                }
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={
          "md:hidden fixed inset-x-0 top-16 z-30 transition-all duration-300 " +
          (mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none")
        }
      >
        <div className="mx-4 mt-2 rounded-2xl border border-white/10 bg-[#0a0e27]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden">
          <nav aria-label="Mobilmeny" className="flex flex-col p-2">
            {mobileNav}
          </nav>
        </div>
      </div>

      {/* Backdrop to close menu when clicking outside */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
          className="md:hidden fixed inset-0 top-16 z-20 bg-black/40 backdrop-blur-sm"
        />
      )}
    </>
  );
}
