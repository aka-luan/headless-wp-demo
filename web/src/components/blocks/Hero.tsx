import type { HeroBlockFragment } from "@/lib/wp/__generated__/graphql";
import { toLink } from "@/lib/wp/links";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { WpImage } from "@/components/ui/WpImage";
import { FeedbackSorter } from "./FeedbackSorter";

export function Hero({ block, isFirst }: { block: HeroBlockFragment; isFirst: boolean }) {
  const primary = toLink(block.primaryCta);
  const secondary = toLink(block.secondaryCta);
  const image = block.image?.node;
  const visual = block.visual === "sorter" ? "sorter" : image ? "image" : null;
  // Only the first block on a page is the page title and the LCP candidate.
  const Heading = isFirst ? "h1" : "h2";
  // Short headlines get the full display size with the intro beside them; longer ones step
  // down and put the intro below, so they stay within three lines.
  const short = (block.heading?.length ?? 0) <= 28;

  return (
    <section className={`overflow-hidden pt-14 sm:pt-20 ${visual ? "pb-20 sm:pb-28" : "pb-4 sm:pb-6"}`}>
      <Container>
        {block.eyebrow && <Tag as="p">{block.eyebrow}</Tag>}
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Heading
            className={`font-display ${short ? "text-display-xl lg:col-span-8" : "max-w-[16ch] text-display-lg lg:col-span-12"}`}
          >
            {block.heading}
          </Heading>
          {(block.subheading || primary || secondary) && (
            <div className={short ? "lg:col-span-4 lg:pb-3" : "lg:col-span-6 lg:col-start-7"}>
              {block.subheading && <p className="text-xl text-pretty text-muted">{block.subheading}</p>}
              {(primary || secondary) && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {primary && <ButtonLink link={primary} size="lg" />}
                  {secondary && <ButtonLink link={secondary} size="lg" variant="secondary" />}
                </div>
              )}
            </div>
          )}
        </div>
        {visual === "sorter" && (
          <div className="mt-16 sm:mt-20">
            <FeedbackSorter />
          </div>
        )}
        {visual === "image" && (
          <div className="mt-16 overflow-hidden rounded-card border border-border shadow-card sm:mt-20">
            <WpImage
              media={image}
              sizes="(min-width: 1280px) 1184px, calc(100vw - 48px)"
              preload={isFirst}
              className="h-auto w-full"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
