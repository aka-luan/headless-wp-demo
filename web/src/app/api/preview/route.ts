import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { matchesSecret } from "@/lib/secrets";
import { PreviewNodeDocument } from "@/lib/wp/__generated__/graphql";
import { wpFetch } from "@/lib/wp/client";
import { isPreviewType } from "@/lib/wp/preview";

/**
 * Target of the WordPress "Preview" button (cms/mu-plugins/preview-link.php):
 * /api/preview?secret=…&id=123&type=page
 *
 * Checks the secret, confirms the post exists (reading drafts with the Application Password),
 * enables Draft Mode and redirects. The redirect target always comes from WordPress, never from
 * the query string, so this can't be used as an open redirect.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  if (!matchesSecret(params.get("secret"), "PREVIEW_SECRET")) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const id = Number(params.get("id"));
  const type = params.get("type");
  if (!Number.isInteger(id) || id <= 0) {
    return new Response("Missing or invalid id", { status: 400 });
  }
  if (!isPreviewType(type)) {
    return new Response(
      type === "plan" ? "Plans have no page of their own. Preview a page that shows the pricing table." : "This content type can't be previewed",
      { status: 400 },
    );
  }

  const { contentNode: node } = await wpFetch(PreviewNodeDocument, { id: String(id) }, { preview: {} });
  if (!node || node.contentTypeName !== type) {
    return new Response("Content not found", { status: 404 });
  }

  (await draftMode()).enable();

  if (type === "changelog_entry") redirect("/changelog/");
  // Published content keeps its URL. Drafts have no URL yet (WordPress gives "/?p=123"),
  // so they render on the by-ID preview route.
  if (node.status === "publish" && node.uri?.startsWith("/") && !node.uri.startsWith("/?")) {
    redirect(node.uri);
  }
  redirect(`/preview/${type}/${id}/`);
}
