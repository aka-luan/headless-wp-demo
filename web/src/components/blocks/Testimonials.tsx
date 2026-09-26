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
      <ul className={`grid gap-16 ${quotes.length > 1 ? "lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-border" : "max-w-4xl"}`}>
        {quotes.map((q) => (
          <li key={q.key} className="flex lg:px-12 lg:first:pl-0 lg:last:pr-0">
            <figure className="flex w-full flex-col justify-between">
              <blockquote className="text-2xl leading-snug text-pretty sm:text-[1.75rem]">
                <p>
                  <span aria-hidden className="font-display -ml-1 block h-12 text-7xl text-accent">
                    &ldquo;
                  </span>
                  {q.quote}
                </p>
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-6">
                {q.imageKind === "avatar" ? (
                  <WpImage media={q.image} sizes="48px" alt="" className="size-12 rounded-full object-cover" />
                ) : (
                  <WpImage media={q.image} sizes="120px" alt="" className="h-7 w-auto" />
                )}
                <div className="text-sm">
                  {q.name && <div className="font-label">{q.name}</div>}
                  {q.role && <div className="text-muted">{q.role}</div>}
                </div>
                {q.href && (
                  <Link
                    href={q.href}
                    className="font-label ml-auto text-sm text-accent underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    Read the story<span className="sr-only"> from {q.role}</span>
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
