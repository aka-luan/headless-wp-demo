import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView, caseStudyMetadata } from "@/components/content/CaseStudyView";
import { getCaseStudies, getCaseStudy } from "@/lib/wp/case-studies";
import { isPreview } from "@/lib/wp/preview";
import { compact } from "@/lib/wp/utils";

export const dynamicParams = true;

const uriFor = (slug: string) => `/customers/${decodeURIComponent(slug)}/`;

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return compact(caseStudies.map((cs) => cs.uri?.split("/").filter(Boolean).at(-1))).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/customers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(uriFor(slug), await isPreview());
  return cs ? caseStudyMetadata(cs) : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/customers/[slug]">) {
  const { slug } = await params;
  const cs = await getCaseStudy(uriFor(slug), await isPreview());
  if (!cs) notFound();

  return <CaseStudyView caseStudy={cs} />;
}
