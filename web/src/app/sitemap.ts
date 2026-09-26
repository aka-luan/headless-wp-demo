import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { SitemapEntriesDocument } from "@/lib/wp/__generated__/graphql";
import { wpFetch } from "@/lib/wp/client";
import { wpTags } from "@/lib/wp/tags";
import { compact } from "@/lib/wp/utils";

type Entry = { uri?: string | null; modified?: string | null };

/** Every published Page, Post, case study and category, plus the listing routes. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await wpFetch(
    SitemapEntriesDocument,
    {},
    { tags: ["page", "post", "case_study", "category"].map(wpTags.type) },
  );

  const toEntry = (node: Entry): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(node.uri!),
    ...(node.modified ? { lastModified: new Date(`${node.modified}Z`) } : {}),
  });
  const withUri = (nodes: ReadonlyArray<Entry | null> | undefined) => compact(nodes).filter((n) => n.uri);

  return [
    ...withUri(data.pages?.nodes).map(toEntry),
    ...["/blog/", "/customers/", "/changelog/"].map((uri) => toEntry({ uri })),
    ...withUri(data.posts?.nodes).map(toEntry),
    ...withUri(data.caseStudies?.nodes).map(toEntry),
    ...withUri(data.categories?.nodes).map(toEntry),
  ];
}
