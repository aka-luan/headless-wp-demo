import "server-only";

import { draftMode } from "next/headers";

import { PreviewIdByUriDocument } from "./__generated__/graphql";
import { wpFetch } from "./client";

/** Post types the WordPress Preview button can open. Plans have no page of their own. */
export const previewTypes = ["page", "post", "case_study", "changelog_entry"] as const;
export type PreviewType = (typeof previewTypes)[number];

export function isPreviewType(type: string | null): type is PreviewType {
  return previewTypes.includes(type as PreviewType);
}

/** True while an editor is in Draft Mode (set by /api/preview). */
export async function isPreview(): Promise<boolean> {
  return (await draftMode()).isEnabled;
}

/** Database ID of the published post at `uri`, read with the editor's credentials. */
export async function previewIdForUri(uri: string): Promise<number | null> {
  const data = await wpFetch(PreviewIdByUriDocument, { uri }, { preview: {} });
  const node = data.nodeByUri;
  return node && "databaseId" in node ? node.databaseId : null;
}
