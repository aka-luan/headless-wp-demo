import Link from "next/link";

import { site } from "@/config/site";
import type { Layout } from "@/lib/wp/layout";
import { Container } from "@/components/ui/Container";
import { TagMark } from "./Logo";

const networkLabels: Record<string, string> = {
  x: "X",
  linkedin: "LinkedIn",
  github: "GitHub",
  youtube: "YouTube",
};

export function Footer({ nav, settings }: { nav: Layout["footerNav"]; settings: Layout["settings"] }) {
  return (
    <footer className="bg-inverse text-inverse-fg">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <TagMark className="size-9 -rotate-12 text-tag-manila" />
              <span className="font-display text-5xl">{site.name}</span>
            </Link>
            {settings.footerText && <p className="mt-5 max-w-sm text-inverse-muted">{settings.footerText}</p>}
          </div>
          <nav aria-label="Footer" className="lg:col-span-6">
            <ul className="font-label grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="underline-offset-4 hover:text-tag-manila hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-inverse-border pt-6 text-sm text-inverse-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. A demo site.
          </p>
          {settings.socialLinks.length > 0 && (
            <ul className="flex gap-5">
              {settings.socialLinks.map((link) => (
                <li key={link.url}>
                  <a href={link.url} className="hover:text-inverse-fg" rel="noopener noreferrer" target="_blank">
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
