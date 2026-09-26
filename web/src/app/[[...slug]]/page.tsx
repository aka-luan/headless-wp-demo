import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageView, pageMetadata } from "@/components/content/PageView";
import { getPage, getPageUris } from "@/lib/wp/pages";
import { isPreview } from "@/lib/wp/preview";

// Pages created in WordPress after the build are rendered on first request, then cached.
export const dynamicParams = true;

function uriFrom(slug: string[] | undefined): string {
  return `/${(slug ?? []).map(decodeURIComponent).join("/")}`;
}

export async function generateStaticParams() {
  const uris = await getPageUris();
  return uris.map((uri) => ({ slug: uri.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(uriFrom(slug), await isPreview());
  return page ? pageMetadata(page) : {};
}

export default async function Page({ params }: PageProps<"/[[...slug]]">) {
  const { slug } = await params;
  const page = await getPage(uriFrom(slug), await isPreview());
  if (!page) notFound();

  return <PageView page={page} />;
}
