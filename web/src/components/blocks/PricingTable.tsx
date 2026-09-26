import { Check } from "lucide-react";

import type { PricingTableBlockFragment } from "@/lib/wp/__generated__/graphql";
import { toLink } from "@/lib/wp/links";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { compact, hasKey } from "@/lib/wp/utils";
import { BillingToggle } from "./BillingToggle";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Price({ amount, period }: { amount: number | null | undefined; period: "monthly" | "yearly" }) {
  // Both prices are rendered; BillingToggle switches visibility with a data attribute.
  const visibility =
    period === "monthly" ? "group-data-[billing=yearly]:hidden" : "hidden group-data-[billing=yearly]:flex";
  return (
    <p className={`mt-8 flex items-end gap-2 ${visibility}`}>
      <span className="font-display text-7xl tabular-nums">{usd.format(amount ?? 0)}</span>
      <span className="pb-1.5 text-sm opacity-75">{period === "monthly" ? "per month" : "per month, billed yearly"}</span>
    </p>
  );
}

export function PricingTable({ block }: { block: PricingTableBlockFragment }) {
  const plans = compact(block.plans?.nodes).filter(hasKey("planDetails"));
  if (!plans.length) return null;

  // Largest yearly discount across paid plans, e.g. "save up to 17%".
  const savings = Math.max(
    0,
    ...plans.map(({ planDetails: d }) =>
      d?.monthlyPrice && d.yearlyPrice != null ? Math.round((1 - d.yearlyPrice / d.monthlyPrice) * 100) : 0,
    ),
  );

  const grid = (
    <ul className={`mt-10 grid gap-4 ${plans.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
      {plans.map((plan) => {
        const d = plan.planDetails;
        const cta = toLink(d?.cta);
        const highlighted = Boolean(d?.highlighted);
        return (
          <li
            key={plan.id}
            className={`relative flex flex-col rounded-card p-8 ${
              highlighted ? "bg-inverse text-inverse-fg shadow-card" : "border border-border bg-surface"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-4xl">{plan.title}</h3>
              {highlighted && <Tag as="p">Most popular</Tag>}
            </div>
            {d?.description && (
              <p className={`mt-3 text-sm ${highlighted ? "text-inverse-muted" : "text-muted"}`}>{d.description}</p>
            )}
            <Price amount={d?.monthlyPrice} period="monthly" />
            {block.billingToggle && <Price amount={d?.yearlyPrice} period="yearly" />}
            <ul
              className={`mt-8 flex-1 space-y-3 border-t pt-6 text-sm ${highlighted ? "border-inverse-border" : "border-border"}`}
            >
              {compact(d?.features).map((f, i) => (
                <li key={i} className="flex gap-3">
                  <Check aria-hidden className={`size-5 shrink-0 ${highlighted ? "text-tag-manila" : "text-accent"}`} />
                  {f.feature}
                </li>
              ))}
            </ul>
            {cta && (
              <ButtonLink
                link={cta}
                size="lg"
                variant={highlighted ? "primary" : "secondary"}
                className="mt-10 w-full"
              />
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <Section>
      <SectionHeading heading={block.heading} />
      {block.billingToggle ? <BillingToggle savingsPercent={savings}>{grid}</BillingToggle> : grid}
    </Section>
  );
}
