import {
  ChartColumn,
  Inbox,
  Link2,
  MessageSquare,
  Shield,
  Sparkles,
  Tag,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { FeatureGridBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Section, SectionHeading } from "@/components/ui/Container";
import { compact, firstValue } from "@/lib/wp/utils";

// Keys match the "icon" select choices in the Feature grid field group.
const icons: Record<string, LucideIcon> = {
  inbox: Inbox,
  tag: Tag,
  chart: ChartColumn,
  users: Users,
  zap: Zap,
  message: MessageSquare,
  sparkles: Sparkles,
  shield: Shield,
  link: Link2,
  target: Target,
};

export function FeatureGrid({ block }: { block: FeatureGridBlockFragment }) {
  const features = compact(block.features);

  return (
    <Section>
      <SectionHeading heading={block.heading} intro={block.intro} />
      <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = icons[firstValue(feature.icon) ?? ""] ?? Sparkles;
          return (
            <li key={i}>
              <div className="flex size-10 items-center justify-center rounded-control bg-surface-accent text-accent">
                <Icon aria-hidden className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              {feature.text && <p className="mt-2 text-muted">{feature.text}</p>}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
