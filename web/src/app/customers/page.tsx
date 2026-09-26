import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/content/PageIntro";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
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
      <Container className="pb-28">
        <ul className="border-t-[1.5px] border-fg">
          {caseStudies.map((cs) => {
            const d = cs.caseStudyDetails;
            return (
              <li key={cs.id} className="border-b border-border">
                <article className="group relative grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                  <div className="flex flex-wrap items-center gap-4 lg:col-span-3 lg:flex-col lg:items-start">
                    <WpImage media={d?.logo?.node} sizes="140px" alt="" className="h-8 w-auto" />
                    {d?.industry && <Tag color="sky">{d.industry}</Tag>}
                  </div>
                  <div className="lg:col-span-9">
                    <h2 className="font-display text-display-sm group-hover:text-accent">
                      <Link href={cs.uri ?? "#"} className="after:absolute after:inset-0">
                        {cs.title}
                      </Link>
                    </h2>
                    {d?.summary && <p className="mt-4 max-w-2xl text-lg text-pretty text-muted">&ldquo;{d.summary}&rdquo;</p>}
                    <p aria-hidden className="font-label mt-6 text-sm text-accent underline decoration-1 underline-offset-4 group-hover:decoration-2">
                      Read {d?.clientName ? `${d.clientName}'s` : "the"} story
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
