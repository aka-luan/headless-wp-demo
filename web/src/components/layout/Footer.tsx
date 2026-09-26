import Link from "next/link";

import { site } from "@/config/site";
import type { Layout } from "@/lib/wp/layout";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const networkLabels: Record<string, string> = {
  x: "X",
  linkedin: "LinkedIn",
  github: "GitHub",
  youtube: "YouTube",
};

export function Footer({ nav, settings }: { nav: Layout["footerNav"]; settings: Layout["settings"] }) {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            {settings.footerText && <p className="mt-4 text-sm text-muted">{settings.footerText}</p>}
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="text-muted hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. A demo site.
          </p>
          {settings.socialLinks.length > 0 && (
            <ul className="flex gap-5">
              {settings.socialLinks.map((link) => (
                <li key={link.url}>
                  <a href={link.url} className="hover:text-fg" rel="noopener noreferrer" target="_blank">
                    {networkLabels[link.network] ?? link.network}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
