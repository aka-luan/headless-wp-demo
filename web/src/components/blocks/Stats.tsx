import type { StatsBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Container } from "@/components/ui/Container";
import { compact } from "@/lib/wp/utils";

export function Stats({ block }: { block: StatsBlockFragment }) {
  const stats = compact(block.stats);
  if (!stats.length) return null;

  return (
    <section className="bg-inverse py-16 text-inverse-fg sm:py-20">
      <Container>
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col-reverse gap-3 border-l border-inverse-border pr-4 pl-5">
              <dt className="text-inverse-muted">{stat.label}</dt>
              <dd className="font-display text-display-md tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
