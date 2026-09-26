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
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-5 ${imageLeft ? "lg:order-2" : ""}`}>
          <h2 className="font-display text-display-md">{block.heading}</h2>
          <RichText html={block.text} className="mt-6 text-lg" />
          {cta && <ButtonLink link={cta} variant="secondary" className="mt-8" />}
        </div>
        <div className={`lg:col-span-7 ${imageLeft ? "lg:order-1" : ""}`}>
          <div className="overflow-hidden rounded-card border border-border shadow-card">
            <WpImage
              media={block.image?.node}
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, calc(100vw - 48px)"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
