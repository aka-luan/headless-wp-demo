import type { ReactNode } from "react";

import type { PageBuilderFragment } from "@/lib/wp/__generated__/graphql";
import { ContactForm } from "./ContactForm";
import { Cta } from "./Cta";
import { Faq } from "./Faq";
import { FeatureGrid } from "./FeatureGrid";
import { FeatureSplit } from "./FeatureSplit";
import { Hero } from "./Hero";
import { LogoCloud } from "./LogoCloud";
import { PricingTable } from "./PricingTable";
import { RichTextBlock } from "./RichTextBlock";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";

type Block = NonNullable<NonNullable<PageBuilderFragment["blocks"]>[number]>;
type BlockOf<T extends Block["__typename"]> = Extract<Block, { __typename: T }>;
type Renderer<T extends Block["__typename"]> = (block: BlockOf<T>, isFirst: boolean) => ReactNode;

// Maps each WordPress layout (by GraphQL __typename) to its component.
const registry: { [T in Block["__typename"]]: Renderer<T> } = {
  PageBuilderBlocksHeroLayout: (b, isFirst) => <Hero block={b} isFirst={isFirst} />,
  PageBuilderBlocksLogoCloudLayout: (b) => <LogoCloud block={b} />,
  PageBuilderBlocksFeatureGridLayout: (b) => <FeatureGrid block={b} />,
  PageBuilderBlocksFeatureSplitLayout: (b) => <FeatureSplit block={b} />,
  PageBuilderBlocksStatsLayout: (b) => <Stats block={b} />,
  PageBuilderBlocksTestimonialsLayout: (b) => <Testimonials block={b} />,
  PageBuilderBlocksPricingTableLayout: (b) => <PricingTable block={b} />,
  PageBuilderBlocksFaqLayout: (b) => <Faq block={b} />,
  PageBuilderBlocksCtaLayout: (b) => <Cta block={b} />,
  PageBuilderBlocksRichTextLayout: (b) => <RichTextBlock block={b} />,
  PageBuilderBlocksContactFormLayout: (b) => <ContactForm block={b} />,
};

function UnknownBlock({ typename }: { typename: string }) {
  // A layout added in WordPress before the front end knows it: invisible in production.
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="mx-auto my-8 max-w-6xl rounded-card border-2 border-dashed border-amber-400 bg-amber-50 p-6 text-sm text-amber-900">
      Unknown block <code className="font-mono">{typename}</code>. Add a component and register it in{" "}
      <code className="font-mono">components/blocks/Blocks.tsx</code>.
    </div>
  );
}

type BlocksProps = {
  blocks: PageBuilderFragment["blocks"] | undefined;
  /** The page already renders its own h1 (e.g. a case study header), so no block is the page title. */
  titled?: boolean;
};

export function Blocks({ blocks, titled = false }: BlocksProps) {
  return (
    <>
      {(blocks ?? []).map((block, index) => {
        if (!block) return null;
        const render = registry[block.__typename] as Renderer<Block["__typename"]> | undefined;
        if (!render) return <UnknownBlock key={index} typename={block.__typename} />;
        return (
          <div key={index} data-block={block.__typename}>
            {render(block, !titled && index === 0)}
          </div>
        );
      })}
    </>
  );
}
