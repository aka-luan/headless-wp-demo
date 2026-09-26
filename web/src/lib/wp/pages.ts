import "server-only";

import { cache } from "react";

import { PageByDocument, PageUrisDocument } from "./__generated__/graphql";
import { wpFetch } from "./client";
import { previewIdForUri } from "./preview";
import { normalizeUri, wpTags } from "./tags";
import { compact } from "./utils";

/**
 * A block-built Page by its URI ("/" for Home). Returns null when it doesn't exist.
 * In Draft Mode it returns the page with its latest unsaved changes.
 */
export const getPage = cache(async (uri: string, preview = false) => {
  const normalized = normalizeUri(uri);
  if (preview) {
    const id = await previewIdForUri(normalized);
    return id ? getPageById(id) : null;
  }
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

/** Draft Mode only: any page, including unpublished drafts, with its latest autosave. */
export const getPageById = cache(async (id: number) => {
  const data = await wpFetch(PageByDocument, { id: String(id), idType: "DATABASE_ID" }, { preview: { id } });
  return data.page ?? null;
});

export type WpPage = NonNullable<Awaited<ReturnType<typeof getPageById>>>;

export async function getPageUris(): Promise<string[]> {
  const data = await wpFetch(PageUrisDocument, {}, { tags: [wpTags.type("page")] });
  return compact(data.pages?.nodes.map((p) => p.uri));
}
