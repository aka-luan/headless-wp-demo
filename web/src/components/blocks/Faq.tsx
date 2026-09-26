import { Plus } from "lucide-react";

import type { FaqBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Section } from "@/components/ui/Container";
import { compact } from "@/lib/wp/utils";

export function Faq({ block }: { block: FaqBlockFragment }) {
  const questions = compact(block.questions).filter((q) => q.question);
  if (!questions.length) return null;

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-12">
        {block.heading && (
          <h2 className="font-display text-display-md lg:sticky lg:top-28 lg:col-span-4 lg:self-start">{block.heading}</h2>
        )}
        <div className="border-t-[1.5px] border-fg lg:col-span-8">
          {questions.map((q, i) => (
            <details key={i} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left hover:text-accent [&::-webkit-details-marker]:hidden">
                <h3 className="font-label text-lg">{q.question}</h3>
                <Plus aria-hidden className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              {q.answer && <p className="max-w-2xl pb-6 text-pretty text-muted">{q.answer}</p>}
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
