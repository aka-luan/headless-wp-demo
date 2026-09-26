"use client";

import { useState, type ReactNode } from "react";

type Billing = "monthly" | "yearly";

/** Monthly/yearly switch. The price cards stay server-rendered; this only flips a data attribute. */
export function BillingToggle({ children, savingsPercent }: { children: ReactNode; savingsPercent: number }) {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="group" data-billing={billing}>
      <div className="mt-8 flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full bg-surface p-1 ring-1 ring-border">
          {(["monthly", "yearly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={billing === option}
              onClick={() => setBilling(option)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                billing === option ? "bg-bg text-fg shadow-sm" : "text-muted hover:text-fg"
              }`}
            >
              {option === "monthly" ? "Monthly" : savingsPercent > 0 ? `Yearly (save up to ${savingsPercent}%)` : "Yearly"}
            </button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
