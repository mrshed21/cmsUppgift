import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function FooterLink({ blok }) {
  return (
    <Link
      {...storyblokEditable(blok)}
      href={blok.url || "/"}
      className="text-sm text-muted hover:text-white transition-colors"
    >
      {blok.label}
    </Link>
  );
}
