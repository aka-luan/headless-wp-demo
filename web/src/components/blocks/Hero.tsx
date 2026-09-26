import type { HeroBlockFragment } from "@/lib/wp/__generated__/graphql";
import { toLink } from "@/lib/wp/links";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WpImage } from "@/components/ui/WpImage";

export function Hero({ block, isFirst }: { block: HeroBlockFragment; isFirst: boolean }) {
  const primary = toLink(block.primaryCta);
  const secondary = toLink(block.secondaryCta);
  const image = block.image?.node;
  // Only the first block on a page is the page title and the LCP candidate.
  const Heading = isFirst ? "h1" : "h2";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-accent to-bg pt-16 sm:pt-24">
      <Container className="text-center">
        {block.eyebrow && (
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">{block.eyebrow}</p>
        )}
        <Heading className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {block.heading}
        </Heading>
        {block.subheading && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted sm:text-xl">{block.subheading}</p>
        )}
        {(primary || secondary) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {primary && <ButtonLink link={primary} size="lg" />}
            {secondary && <ButtonLink link={secondary} size="lg" variant="secondary" />}
          </div>
        )}
      </Container>
      {image ? (
        <Container className="mt-16">
          <div className="overflow-hidden rounded-t-card border border-b-0 border-border bg-bg shadow-card">
            <WpImage
              media={image}
              sizes="(min-width: 1152px) 1088px, calc(100vw - 32px)"
              preload={isFirst}
              className="h-auto w-full"
            />
          </div>
        </Container>
      ) : (
        <div className="pb-16 sm:pb-20" />
      )}
    </section>
  );
}
