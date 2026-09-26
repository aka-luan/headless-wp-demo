"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import type { NavItem } from "@/lib/wp/layout";
import type { SiteLink } from "@/lib/wp/links";

export function MobileNav({ items, cta }: { items: NavItem[]; cta: SiteLink | null }) {
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const pathname = usePathname();
  const panelId = useId();

  // Close after navigating: the menu only counts as open on the page where it was opened.
  const isOpen = open && openedAt === pathname;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          setOpen(!isOpen);
          setOpenedAt(pathname);
        }}
        className="inline-flex size-10 items-center justify-center rounded-control text-fg hover:bg-surface"
      >
        {isOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      </button>
      <div id={panelId} hidden={!isOpen} className="absolute inset-x-0 top-16 border-b border-border bg-bg shadow-card">
        <nav aria-label="Mobile" className="px-4 py-4">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="block rounded-control px-3 py-2.5 font-medium hover:bg-surface">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {cta && (
            <Link
              href={cta.href}
              className="mt-4 block rounded-control bg-accent px-4 py-3 text-center font-medium text-accent-fg"
            >
              {cta.label}
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
