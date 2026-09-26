import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/content/PageIntro";
import { Container } from "@/components/ui/Container";
import { WpImage } from "@/components/ui/WpImage";
import { buildMetadata } from "@/lib/seo";
import { getCaseStudies } from "@/lib/wp/case-studies";

const intro = "How product teams use Tagline to hear every customer and ship what matters.";

export function generateMetadata(): Metadata {
  return buildMetadata({ uri: "/customers/", title: "Customer stories", description: intro });
}

export default async function CustomersPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <PageIntro eyebrow="Customers" title="Teams that turned feedback into roadmaps" intro={intro} />
      <Container className="pb-24">
        <ul className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((cs) => {
            const d = cs.caseStudyDetails;
            return (
              <li key={cs.id} className="flex">
                <article className="relative flex w-full flex-col rounded-card border border-border bg-bg p-8 shadow-card transition-shadow hover:shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    <WpImage media={d?.logo?.node} sizes="140px" alt="" className="h-8 w-auto" />
                    {d?.industry && <span className="text-xs font-medium text-subtle">{d.industry}</span>}
                  </div>
                  <h2 className="mt-6 text-xl font-semibold tracking-tight text-balance">
                    <Link href={cs.uri ?? "#"} className="after:absolute after:inset-0">
                      {cs.title}
                    </Link>
                  </h2>
                  {d?.summary && <p className="mt-4 flex-1 text-muted">&ldquo;{d.summary}&rdquo;</p>}
                  <p aria-hidden className="mt-6 text-sm font-medium text-accent">
                    Read {d?.clientName ? `${d.clientName}'s` : "the"} story →
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
