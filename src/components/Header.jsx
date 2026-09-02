"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Hem" },
  { href: "/jobs", label: "Lediga tjänster" },
  { href: "/about-oss", label: "Om oss" },
];

export default function Header() {
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

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-2xl bg-[#0a0e27]/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 md:h-18 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Jobbannonser — startsida"
          >
            <span
              aria-hidden="true"
              className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/40 transition-transform group-hover:scale-105"
            >
              <span className="text-base">J</span>
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            </span>
            <span className="hidden xs:block sm:block text-white font-semibold text-base tracking-tight group-hover:text-indigo-200 transition-colors">
              Jobbannonser
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Huvudmeny"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group"
                >
                  <span
                    className={
                      active
                        ? "text-white"
                        : "text-[var(--color-fg-muted)] group-hover:text-white transition-colors"
                    }
                  >
                    {item.label}
                  </span>
                  {/* Underline indicator */}
                  <span
                    aria-hidden="true"
                    className={
                      "absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 " +
                      (active
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-75")
                    }
                  />
                </Link>
              );
            })}
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
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors " +
                    (active
                      ? "bg-white/10 text-white"
                      : "text-[var(--color-fg-muted)] hover:bg-white/5 hover:text-white")
                  }
                >
                  <span>{item.label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                    />
                  )}
                </Link>
              );
            })}
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
