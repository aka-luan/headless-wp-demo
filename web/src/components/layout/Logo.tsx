import Link from "next/link";

import { site } from "@/config/site";
import { tagMarkPath } from "./tag-mark";

export function TagMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path fillRule="evenodd" d={tagMarkPath} />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-1.5 ${className}`}>
      <TagMark className="size-7 -rotate-12 text-accent" />
      <span className="font-display text-[1.75rem] leading-none tracking-tight">{site.name}</span>
    </Link>
  );
}
