import type { LogoCloudBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Container } from "@/components/ui/Container";
import { WpImage } from "@/components/ui/WpImage";
import { compact } from "@/lib/wp/utils";

export function LogoCloud({ block }: { block: LogoCloudBlockFragment }) {
  const logos = compact(block.logos?.nodes);
  if (!logos.length) return null;

  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <div className="grid gap-6 border-t border-border pt-8 lg:grid-cols-12 lg:items-center">
          {block.heading && <h2 className="font-label text-sm text-muted lg:col-span-3">{block.heading}</h2>}
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-border sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
            {logos.map((logo, i) => (
              <li key={logo.sourceUrl ?? i} className="flex h-20 items-center justify-center bg-bg px-4">
                <WpImage
                  media={logo}
                  sizes="(min-width: 1024px) 140px, (min-width: 640px) 30vw, 45vw"
                  className="h-8 w-auto"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
