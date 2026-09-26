import "server-only";

import type { TypedDocumentString } from "./__generated__/graphql";
import { wpTags } from "./tags";

type WpFetchOptions = {
  /** Cache tags for on-demand revalidation (see ./tags.ts). */
  tags?: string[];
  /**
   * Draft Mode read: authenticated with the Application Password and never cached, so drafts are
   * visible. With `overlayId`, WPGraphQL overlays that post's latest autosave (unsaved editor changes).
   */
  preview?: { overlayId?: number };
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

function endpoint(): string {
  const url = process.env.WP_GRAPHQL_URL;
  if (!url) throw new Error("WP_GRAPHQL_URL is not set");
  return url;
}

/** Basic auth with the WordPress Application Password. Server side only. */
export function wpAuthHeader(): string {
  const user = process.env.WP_APP_USER;
  const password = process.env.WP_APP_PASSWORD;
  if (!user || !password) throw new Error("WP_APP_USER and WP_APP_PASSWORD must be set");
  return `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
}

function cacheOptions(tags: string[], preview: WpFetchOptions["preview"]): RequestInit {
  // Development and previews always read fresh content; production caches until the webhook
  // revalidates a tag.
  if (preview || process.env.NODE_ENV === "development") return { cache: "no-store" };
  return { cache: "force-cache", next: { tags: [wpTags.all, ...tags] } };
}

/**
 * The single entry point to WordPress. Server side only.
 * Responses are cached until a tag is revalidated by the WordPress webhook.
 */
export async function wpFetch<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
  { tags = [], preview }: WpFetchOptions = {},
): Promise<TResult> {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (preview) {
    headers.authorization = wpAuthHeader();
    if (preview.overlayId) headers["x-graphql-preview"] = `database_id=${preview.overlayId}`;
  }

  const res = await fetch(endpoint(), {
    method: "POST",
    headers,
    body: JSON.stringify({ query: query.toString(), variables }),
    ...cacheOptions(tags, preview),
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<TResult>;
  if (json.errors?.length) {
    throw new Error(`WPGraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  if (!json.data) {
    throw new Error("WPGraphQL returned no data");
  }
  return json.data;
}
