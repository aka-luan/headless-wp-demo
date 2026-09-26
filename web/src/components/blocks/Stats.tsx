import type { StatsBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Section } from "@/components/ui/Container";
import { compact } from "@/lib/wp/utils";

export function Stats({ block }: { block: StatsBlockFragment }) {
  const stats = compact(block.stats);
  if (!stats.length) return null;

  return (
    <Section tone="surface">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-10 text-center lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col-reverse gap-2">
            <dt className="text-muted">{stat.label}</dt>
            <dd className="text-4xl font-semibold tracking-tight text-fg">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
