"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ blok, variant = "desktop" }) {
  const pathname = usePathname();
  const href = blok.url || "/";

  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={
          "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors " +
          (isActive
            ? "bg-white/10 text-white"
            : "text-[var(--color-fg-muted)] hover:bg-white/5 hover:text-white")
        }
      >
        <span>{blok.label}</span>
        {isActive && (
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
          />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group"
    >
      <span
        className={
          isActive
            ? "text-white"
            : "text-[var(--color-fg-muted)] group-hover:text-white transition-colors"
        }
      >
        {blok.label}
      </span>
      {/* Underline indicator */}
      <span
        aria-hidden="true"
        className={
          "absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 " +
          (isActive
            ? "opacity-100 scale-x-100"
            : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-75")
        }
      />
    </Link>
  );
}
