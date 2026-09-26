import Link from "next/link";

import type { Layout } from "@/lib/wp/layout";
import { toLink } from "@/lib/wp/links";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header({ nav, cta }: { nav: Layout["primaryNav"]; cta: Layout["settings"]["defaultCta"] }) {
  const ctaLink = toLink(cta);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="font-label flex items-center gap-1 text-sm">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="rounded-control px-3 py-2 decoration-2 underline-offset-[6px] hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {ctaLink && (
            <div className="hidden sm:block">
              <ButtonLink link={ctaLink} />
            </div>
          )}
          <MobileNav items={nav} cta={ctaLink} />
        </div>
      </Container>
    </header>
  );
}
