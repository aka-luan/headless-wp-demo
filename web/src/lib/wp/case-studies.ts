import "server-only";

import { cache } from "react";

import { CaseStudyByDocument, CaseStudyListDocument } from "./__generated__/graphql";
import { wpFetch } from "./client";
import { previewByUri } from "./preview";
import { normalizeUri, wpTags } from "./tags";
import { compact } from "./utils";

/** A case study by URI (/customers/{slug}/). In Draft Mode, the latest version (see previewByUri). */
export const getCaseStudy = cache(async (uri: string, preview = false) => {
  const normalized = normalizeUri(uri);
  if (preview) return previewByUri(normalized, getCaseStudyById);
  const data = await wpFetch(
    CaseStudyByDocument,
    { id: normalized, idType: "URI" },
    // Its blocks can embed plans and other case studies.
    { tags: [wpTags.uri(normalized), wpTags.type("case_study"), wpTags.type("plan")] },
  );
  return data.caseStudy ?? null;
});

/**
 * Draft Mode only: any case study, including unpublished drafts. With `overlay`, its unsaved
 * changes (latest autosave) are applied.
 */
export const getCaseStudyById = cache(async (id: number, overlay = true) => {
  const data = await wpFetch(
    CaseStudyByDocument,
    { id: String(id), idType: "DATABASE_ID" },
    { preview: { overlayId: overlay ? id : undefined } },
  );
  return data.caseStudy ?? null;
});

export type WpCaseStudy = NonNullable<Awaited<ReturnType<typeof getCaseStudyById>>>;

export const getCaseStudies = cache(async () => {
  const data = await wpFetch(CaseStudyListDocument, {}, { tags: [wpTags.type("case_study")] });
  return compact(data.caseStudies?.nodes);
});
