import "server-only";

import { cookies, draftMode } from "next/headers";

import { PreviewIdByUriDocument } from "./__generated__/graphql";
import { wpFetch } from "./client";

/** Post types the WordPress Preview button can open. Plans have no page of their own. */
export const previewTypes = ["page", "post", "case_study", "changelog_entry"] as const;
export type PreviewType = (typeof previewTypes)[number];

export function isPreviewType(type: string | null): type is PreviewType {
  return previewTypes.includes(type as PreviewType);
}

/** The post whose Preview button was clicked. Only it gets its unsaved changes (autosave) overlaid. */
export const PREVIEW_ID_COOKIE = "wp-preview-id";

/** True while an editor is in Draft Mode (set by /api/preview). */
export async function isPreview(): Promise<boolean> {
  return (await draftMode()).isEnabled;
}

/** Whether `id` is the post being previewed. Call only in Draft Mode (reading cookies is dynamic). */
export async function isPreviewTarget(id: number): Promise<boolean> {
  return (await cookies()).get(PREVIEW_ID_COOKIE)?.value === String(id);
}

/** Database ID of the published post at `uri`, read with the editor's credentials. */
export async function previewIdForUri(uri: string): Promise<number | null> {
  const data = await wpFetch(PreviewIdByUriDocument, { uri }, { preview: {} });
  const node = data.nodeByUri;
  return node && "databaseId" in node ? node.databaseId : null;
}

/**
 * Draft Mode read of the published post at `uri`: the preview target gets its autosave overlaid,
 * other pages the editor browses to show their saved state (drafts of other posts stay unseen).
 */
export async function previewByUri<T>(uri: string, byId: (id: number, overlay: boolean) => Promise<T>): Promise<T | null> {
  const id = await previewIdForUri(uri);
  return id ? byId(id, await isPreviewTarget(id)) : null;
}
