import { ChevronDown } from "lucide-react";

import type { FaqBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Section, SectionHeading } from "@/components/ui/Container";
import { compact } from "@/lib/wp/utils";

export function Faq({ block }: { block: FaqBlockFragment }) {
  const questions = compact(block.questions).filter((q) => q.question);
  if (!questions.length) return null;

  return (
    <Section>
      <SectionHeading heading={block.heading} />
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border border-y border-border">
        {questions.map((q, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-medium [&::-webkit-details-marker]:hidden">
              <h3>{q.question}</h3>
              <ChevronDown aria-hidden className="size-5 shrink-0 text-subtle transition-transform group-open:rotate-180" />
            </summary>
            {q.answer && <p className="mt-3 text-pretty text-muted">{q.answer}</p>}
          </details>
        ))}
      </div>
    </Section>
  );
}
