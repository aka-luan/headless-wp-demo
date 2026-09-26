import "server-only";

import type { TypedDocumentString } from "./__generated__/graphql";
import { wpTags } from "./tags";

type WpFetchOptions = {
  /** Cache tags for on-demand revalidation (see ./tags.ts). */
  tags?: string[];
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

/**
 * The single entry point to WordPress. Server side only.
 * Responses are cached until a tag is revalidated by the WordPress webhook.
 */
export async function wpFetch<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
  { tags = [] }: WpFetchOptions = {},
): Promise<TResult> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: query.toString(), variables }),
    // Development always reads fresh content; production caches until the webhook revalidates a tag.
    ...(process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : { cache: "force-cache" as const, next: { tags: [wpTags.all, ...tags] } }),
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
