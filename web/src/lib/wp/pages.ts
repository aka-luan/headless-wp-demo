import "server-only";

import { cache } from "react";

import { PageByDocument, PageUrisDocument } from "./__generated__/graphql";
import { wpFetch } from "./client";
import { previewByUri } from "./preview";
import { normalizeUri, wpTags } from "./tags";
import { compact } from "./utils";

/**
 * A block-built Page by its URI ("/" for Home). Returns null when it doesn't exist.
 * In Draft Mode it reads the latest version, with unsaved changes if it is the page being previewed.
 */
export const getPage = cache(async (uri: string, preview = false) => {
  const normalized = normalizeUri(uri);
  if (preview) return previewByUri(normalized, getPageById);
  const data = await wpFetch(
    PageByDocument,
    { id: normalized, idType: "URI" },
    {
      // Blocks embed plans and case studies, so their changes refresh pages too.
      tags: [wpTags.uri(normalized), wpTags.type("page"), wpTags.type("plan"), wpTags.type("case_study")],
    },
  );
  return data.page ?? null;
});

/**
 * Draft Mode only: any page, including unpublished drafts. With `overlay`, its unsaved
 * changes (latest autosave) are applied.
 */
export const getPageById = cache(async (id: number, overlay = true) => {
  const data = await wpFetch(
    PageByDocument,
    { id: String(id), idType: "DATABASE_ID" },
    { preview: { overlayId: overlay ? id : undefined } },
  );
  return data.page ?? null;
});

export type WpPage = NonNullable<Awaited<ReturnType<typeof getPageById>>>;

export async function getPageUris(): Promise<string[]> {
  const data = await wpFetch(PageUrisDocument, {}, { tags: [wpTags.type("page")] });
  return compact(data.pages?.nodes.map((p) => p.uri));
}
