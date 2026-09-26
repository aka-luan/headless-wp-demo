import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView, caseStudyMetadata } from "@/components/content/CaseStudyView";
import { PageView, pageMetadata } from "@/components/content/PageView";
import { PostView, postMetadata } from "@/components/content/PostView";
import { getCaseStudyById } from "@/lib/wp/case-studies";
import { getPageById } from "@/lib/wp/pages";
import { getPostById } from "@/lib/wp/posts";
import { isPreview } from "@/lib/wp/preview";

/**
 * Unpublished drafts have no URL yet, so /api/preview sends them here. Only works in Draft Mode;
 * everyone else gets a 404.
 */
export const dynamic = "force-dynamic";

async function load(type: string, rawId: string) {
  const id = Number(rawId);
  if (!(await isPreview()) || !Number.isInteger(id) || id <= 0) return null;

  switch (type) {
    case "page": {
      const page = await getPageById(id);
      return page && { view: <PageView page={page} />, metadata: pageMetadata(page) };
    }
    case "post": {
      const post = await getPostById(id);
      return post && { view: <PostView post={post} />, metadata: postMetadata(post) };
    }
    case "case_study": {
      const cs = await getCaseStudyById(id);
      return cs && { view: <CaseStudyView caseStudy={cs} />, metadata: caseStudyMetadata(cs) };
    }
    default:
      return null;
  }
}

export async function generateMetadata({ params }: PageProps<"/preview/[type]/[id]">): Promise<Metadata> {
  const { type, id } = await params;
  const found = await load(type, id);
  return { ...found?.metadata, robots: { index: false, follow: false } };
}

export default async function PreviewPage({ params }: PageProps<"/preview/[type]/[id]">) {
  const { type, id } = await params;
  const found = await load(type, id);
  if (!found) notFound();
  return found.view;
}
