import Link from "next/link";

import { site } from "@/config/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 font-semibold tracking-tight ${className}`}>
      <span aria-hidden className="flex size-7 items-center justify-center rounded-control bg-accent text-accent-fg">
        <svg viewBox="0 0 20 20" className="size-4" fill="currentColor">
          <path d="M3 5a2 2 0 0 1 2-2h5.6a2 2 0 0 1 1.4.6l5 5a2 2 0 0 1 0 2.8l-5.6 5.6a2 2 0 0 1-2.8 0l-5-5A2 2 0 0 1 3 10.6V5Zm4 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        </svg>
      </span>
      <span className="text-lg">{site.name}</span>
    </Link>
  );
}
