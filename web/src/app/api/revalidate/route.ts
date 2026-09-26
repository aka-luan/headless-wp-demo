import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { matchesSecret } from "@/lib/secrets";
import { wpTags } from "@/lib/wp/tags";

type WebhookEvent = { type?: unknown; id?: unknown; uri?: unknown };

/** Maps a WordPress webhook event (cms/mu-plugins/revalidate-webhook.php) to cache tags. */
function tagsFor(event: WebhookEvent): string[] {
  const type = typeof event.type === "string" ? event.type : "";
  const uri = typeof event.uri === "string" && event.uri.startsWith("/") ? event.uri : null;

  if (type === "menu") return [wpTags.menus];
  if (type === "options") return [wpTags.options];
  if (!/^[a-z_]{1,40}$/.test(type)) return [];
  return uri ? [wpTags.type(type), wpTags.uri(uri)] : [wpTags.type(type)];
}

/**
 * Called by WordPress on publish, update, unpublish, menu save, options save and category edit.
 * Tags are expired immediately (not stale-while-revalidate), so the next visit renders the
 * published change instead of serving the old page once more.
 */
export async function POST(request: NextRequest) {
  if (!matchesSecret(request.headers.get("x-revalidate-secret"), "REVALIDATE_SECRET")) {
    return Response.json({ revalidated: false, error: "Invalid secret" }, { status: 401 });
  }

  const event = (await request.json().catch(() => null)) as WebhookEvent | null;
  const tags = event ? tagsFor(event) : [];
  if (!tags.length) {
    return Response.json({ revalidated: false, error: "Unknown event" }, { status: 400 });
  }

  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  console.log(`[revalidate] ${JSON.stringify(event)} -> ${tags.join(", ")}`);
  return Response.json({ revalidated: true, tags, now: Date.now() });
}
