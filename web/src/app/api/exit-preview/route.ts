import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

/**
 * Leaves Draft Mode. POST from the preview banner's form; GET works too, for a bookmarked link.
 * Returns to the page the editor was on when it's a same-site path (drafts go home instead).
 */
async function exitPreview(request: NextRequest) {
  (await draftMode()).disable();

  let target = "/";
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.host === request.headers.get("host") && !url.pathname.startsWith("/preview/")) {
        target = url.pathname;
      }
    } catch {
      // Malformed referer: go home.
    }
  }
  redirect(target);
}

export const GET = exitPreview;
export const POST = exitPreview;
