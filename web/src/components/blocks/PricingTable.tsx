import { Check } from "lucide-react";

import type { PricingTableBlockFragment } from "@/lib/wp/__generated__/graphql";
import { toLink } from "@/lib/wp/links";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { compact, hasKey } from "@/lib/wp/utils";
import { BillingToggle } from "./BillingToggle";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Price({ amount, period }: { amount: number | null | undefined; period: "monthly" | "yearly" }) {
  // Both prices are rendered; BillingToggle switches visibility with a data attribute.
  const visibility =
    period === "monthly" ? "group-data-[billing=yearly]:hidden" : "hidden group-data-[billing=yearly]:flex";
  return (
    <p className={`mt-6 flex items-baseline gap-1 ${visibility}`}>
      <span className="text-4xl font-semibold tracking-tight">{usd.format(amount ?? 0)}</span>
      <span className="text-sm text-muted">{period === "monthly" ? "/ month" : "/ month, billed yearly"}</span>
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
    <ul className={`mt-12 grid gap-6 ${plans.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
      {plans.map((plan) => {
        const d = plan.planDetails;
        const cta = toLink(d?.cta);
        const highlighted = Boolean(d?.highlighted);
        return (
          <li
            key={plan.id}
            className={`relative flex flex-col rounded-card border p-8 ${
              highlighted ? "border-accent bg-bg shadow-card ring-1 ring-accent" : "border-border bg-bg"
            }`}
          >
            {highlighted && (
              <p className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg">
                Most popular
              </p>
            )}
            <h3 className="text-lg font-semibold">{plan.title}</h3>
            {d?.description && <p className="mt-2 text-sm text-muted">{d.description}</p>}
            <Price amount={d?.monthlyPrice} period="monthly" />
            {block.billingToggle && <Price amount={d?.yearlyPrice} period="yearly" />}
            <ul className="mt-8 flex-1 space-y-3 text-sm">
              {compact(d?.features).map((f, i) => (
                <li key={i} className="flex gap-3">
                  <Check aria-hidden className="size-5 shrink-0 text-accent" />
                  {f.feature}
                </li>
              ))}
            </ul>
            {cta && (
              <ButtonLink link={cta} variant={highlighted ? "primary" : "secondary"} className="mt-8 w-full" />
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
