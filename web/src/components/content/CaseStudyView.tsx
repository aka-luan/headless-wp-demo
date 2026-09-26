import Link from "next/link";

import { Blocks } from "@/components/blocks/Blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
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
      <header className="pt-12 pb-20 sm:pt-16">
        <Container>
          <Link href="/customers/" className="font-label text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
            All customer stories
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WpImage media={d?.logo?.node} sizes="200px" alt={d?.clientName ?? ""} className="h-12 w-auto" />
            {d?.industry && <Tag color="sky">{d.industry}</Tag>}
          </div>
          <h1 className="font-display mt-8 max-w-[20ch] text-display-lg">{cs.title}</h1>
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            {d?.summary && (
              <figure className="lg:col-span-7">
                <blockquote className="text-2xl leading-snug text-pretty sm:text-[1.75rem]">
                  <p>
                    <span aria-hidden className="font-display -ml-1 block h-12 text-7xl text-accent">
                      &ldquo;
                    </span>
                    {d.summary}
                  </p>
                </blockquote>
                {d.quoteAuthor && <figcaption className="font-label mt-6 text-sm text-muted">{d.quoteAuthor}</figcaption>}
              </figure>
            )}
            {metrics.length > 0 && (
              <dl className="grid content-start gap-6 lg:col-span-4 lg:col-start-9">
                {metrics.map((m) => (
                  <div key={`${m.value}-${m.label}`} className="flex flex-col gap-1 border-t-[1.5px] border-fg pt-4">
                    <dt className="text-muted">{m.label}</dt>
                    <dd className="font-display order-first text-display-md text-accent">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </Container>
      </header>
      <Blocks blocks={cs.pageBuilder?.blocks} titled />
    </article>
  );
}
