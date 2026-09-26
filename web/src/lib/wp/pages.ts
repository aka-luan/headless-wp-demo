import "server-only";

import { cache } from "react";

import { PageByUriDocument, PageUrisDocument } from "./__generated__/graphql";
import { wpFetch } from "./client";
import { normalizeUri, wpTags } from "./tags";
import { compact } from "./utils";

/** A block-built Page by its URI ("/" for Home). Returns null when it doesn't exist. */
export const getPage = cache(async (uri: string) => {
  const normalized = normalizeUri(uri);
  const data = await wpFetch(
    PageByUriDocument,
    { uri: normalized },
    {
      // Blocks embed plans and case studies, so their changes refresh pages too.
      tags: [wpTags.uri(normalized), wpTags.type("page"), wpTags.type("plan"), wpTags.type("case_study")],
    },
  );
  return data.page ?? null;
});

export async function getPageUris(): Promise<string[]> {
  const data = await wpFetch(PageUrisDocument, {}, { tags: [wpTags.type("page")] });
  return compact(data.pages?.nodes.map((p) => p.uri));
}
