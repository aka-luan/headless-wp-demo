import Link from "next/link";

import { Blocks } from "@/components/blocks/Blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { WpImage } from "@/components/ui/WpImage";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { WpCaseStudy } from "@/lib/wp/case-studies";
import { compact } from "@/lib/wp/utils";

export function caseStudyMetadata(cs: WpCaseStudy) {
  return buildMetadata({
    uri: cs.uri ?? "/customers/",
    seo: cs.seo,
    title: cs.title ?? "",
    description: cs.caseStudyDetails?.summary,
    image: cs.featuredImage?.node,
    type: "article",
  });
}

export function CaseStudyView({ caseStudy: cs }: { caseStudy: WpCaseStudy }) {
  const d = cs.caseStudyDetails;
  const metrics = compact(d?.metrics).filter((m) => m.value);
  const uri = cs.uri ?? "/customers/";

  return (
    <article>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Customers", path: "/customers/" },
          { name: d?.clientName ?? cs.title ?? "", path: uri },
        ])}
      />
      <header className="bg-gradient-to-b from-surface-accent to-bg pt-12 pb-16 sm:pt-16">
        <Container className="max-w-4xl">
          <Link href="/customers/" className="text-sm text-subtle hover:text-fg">
            ← All customer stories
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WpImage media={d?.logo?.node} sizes="160px" alt={d?.clientName ?? ""} className="h-9 w-auto" />
            {d?.industry && (
              <span className="rounded-full bg-bg px-3 py-1 text-xs font-medium text-muted ring-1 ring-border ring-inset">
                {d.industry}
              </span>
            )}
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{cs.title}</h1>
          {d?.summary && (
            <figure className="mt-10 border-l-4 border-accent pl-6">
              <blockquote className="text-xl text-pretty text-fg sm:text-2xl">
                <p>&ldquo;{d.summary}&rdquo;</p>
              </blockquote>
              {d.quoteAuthor && <figcaption className="mt-4 text-sm text-muted">{d.quoteAuthor}</figcaption>}
            </figure>
          )}
          {metrics.length > 0 && (
            <dl className="mt-12 grid gap-6 sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={`${m.value}-${m.label}`} className="flex flex-col gap-1 rounded-card border border-border bg-bg p-6 shadow-card">
                  <dt className="text-sm text-muted">{m.label}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-accent">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
      </header>
      <Blocks blocks={cs.pageBuilder?.blocks} titled />
    </article>
  );
}
