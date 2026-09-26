import type { FeatureSplitBlockFragment } from "@/lib/wp/__generated__/graphql";
import { toLink } from "@/lib/wp/links";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { WpImage } from "@/components/ui/WpImage";

export function FeatureSplit({ block }: { block: FeatureSplitBlockFragment }) {
  const cta = toLink(block.cta);
  const imageLeft = block.imageSide === "left";

  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={imageLeft ? "lg:order-2" : ""}>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{block.heading}</h2>
          <RichText html={block.text} className="mt-6 text-lg" />
          {cta && <ButtonLink link={cta} variant="secondary" className="mt-8" />}
        </div>
        <div className={imageLeft ? "lg:order-1" : ""}>
          <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
            <WpImage
              media={block.image?.node}
              sizes="(min-width: 1152px) 540px, (min-width: 1024px) 45vw, calc(100vw - 32px)"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
