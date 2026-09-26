"use client";

import { useState, type ReactNode } from "react";

type Billing = "monthly" | "yearly";

/** Monthly/yearly switch. The price cards stay server-rendered; this only flips a data attribute. */
export function BillingToggle({ children, savingsPercent }: { children: ReactNode; savingsPercent: number }) {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="group" data-billing={billing}>
      <div className="mt-10">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="inline-flex rounded-control p-1 ring-[1.5px] ring-fg ring-inset"
        >
          {(["monthly", "yearly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={billing === option}
              onClick={() => setBilling(option)}
              className={`font-label rounded-[0.15rem] px-4 py-1.5 text-sm transition-colors ${
                billing === option ? "bg-fg text-bg" : "hover:bg-surface"
              }`}
            >
              {option === "monthly" ? "Monthly" : savingsPercent > 0 ? `Yearly, save up to ${savingsPercent}%` : "Yearly"}
            </button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
