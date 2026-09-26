import type { LogoCloudBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Container } from "@/components/ui/Container";
import { WpImage } from "@/components/ui/WpImage";
import { compact } from "@/lib/wp/utils";

export function LogoCloud({ block }: { block: LogoCloudBlockFragment }) {
  const logos = compact(block.logos?.nodes);
  if (!logos.length) return null;

  return (
    <section className="border-b border-border py-12 sm:py-16">
      <Container>
        {block.heading && <h2 className="text-center text-sm font-medium text-subtle">{block.heading}</h2>}
        <ul className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo, i) => (
            <li key={logo.sourceUrl ?? i} className="flex justify-center">
              <WpImage
                media={logo}
                sizes="(min-width: 1024px) 160px, (min-width: 640px) 30vw, 45vw"
                className="h-10 w-auto opacity-70 grayscale"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
