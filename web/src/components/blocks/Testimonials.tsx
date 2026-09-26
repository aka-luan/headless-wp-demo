import Link from "next/link";

import type { MediaFragment, TestimonialsBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Section } from "@/components/ui/Container";
import { WpImage } from "@/components/ui/WpImage";
import { compact, hasKey } from "@/lib/wp/utils";

type Quote = {
  key: string;
  quote: string;
  name: string | null;
  role: string | null;
  image: MediaFragment | null | undefined;
  imageKind: "avatar" | "logo";
  href: string | null;
};

function quotesFor(block: TestimonialsBlockFragment): Quote[] {
  if (block.source === "manual") {
    return compact(block.testimonials)
      .filter((t) => t.quote)
      .map((t, i) => ({
        key: `manual-${i}`,
        quote: t.quote!,
        name: t.name,
        role: t.role,
        image: t.avatar?.node,
        imageKind: "avatar",
        href: null,
      }));
  }

  // Case studies: the summary is the quote; "Name, Role" is the attribution.
  return compact(block.caseStudies?.nodes)
    .filter(hasKey("caseStudyDetails"))
    .filter((c) => c.caseStudyDetails?.summary)
    .map((c) => {
      const d = c.caseStudyDetails!;
      const [name, ...role] = (d.quoteAuthor ?? d.clientName ?? "").split(",");
      return {
        key: c.id,
        quote: d.summary!,
        name: name.trim() || null,
        role: [role.join(",").trim(), d.clientName].filter(Boolean).join(", ") || null,
        image: d.logo?.node,
        imageKind: "logo",
        href: c.uri,
      };
    });
}

export function Testimonials({ block }: { block: TestimonialsBlockFragment }) {
  const quotes = quotesFor(block);
  if (!quotes.length) return null;

  return (
    <Section tone="surface">
      <h2 className="sr-only">What customers say</h2>
      <ul className={`grid gap-6 ${quotes.length > 1 ? "lg:grid-cols-2" : "mx-auto max-w-3xl"}`}>
        {quotes.map((q) => (
          <li key={q.key} className="flex">
            <figure className="flex w-full flex-col justify-between rounded-card border border-border bg-bg p-8 shadow-card">
              <blockquote className="text-lg text-pretty text-fg sm:text-xl">
                <p>&ldquo;{q.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {q.imageKind === "avatar" ? (
                  <WpImage media={q.image} sizes="48px" alt="" className="size-12 rounded-full object-cover" />
                ) : (
                  <WpImage media={q.image} sizes="120px" alt="" className="h-8 w-auto" />
                )}
                <div className="text-sm">
                  {q.name && <div className="font-semibold">{q.name}</div>}
                  {q.role && <div className="text-muted">{q.role}</div>}
                </div>
                {q.href && (
                  <Link href={q.href} className="ml-auto text-sm font-medium text-accent hover:underline">
                    Read story<span className="sr-only"> from {q.role}</span> →
                  </Link>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
