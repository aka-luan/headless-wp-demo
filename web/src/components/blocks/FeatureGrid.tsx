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
      <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = icons[firstValue(feature.icon) ?? ""] ?? Sparkles;
          return (
            <li key={i} className="border-t-[1.5px] border-fg pt-5">
              <div className="flex items-center gap-3">
                <Icon aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-accent" />
                <h3 className="font-label text-lg">{feature.title}</h3>
              </div>
              {feature.text && <p className="mt-3 text-pretty text-muted">{feature.text}</p>}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
