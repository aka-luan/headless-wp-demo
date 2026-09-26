import "server-only";

import { cache } from "react";

import { CategoryByUriDocument, PostByDocument, PostListDocument, PostUrisDocument } from "./__generated__/graphql";
import { wpFetch } from "./client";
import { previewIdForUri } from "./preview";
import { normalizeUri, wpTags } from "./tags";
import { compact } from "./utils";

/** A blog post by URI (/blog/{slug}/). In Draft Mode, with its latest unsaved changes. */
export const getPost = cache(async (uri: string, preview = false) => {
  const normalized = normalizeUri(uri);
  if (preview) {
    const id = await previewIdForUri(normalized);
    return id ? getPostById(id) : null;
  }
  const data = await wpFetch(
    PostByDocument,
    { id: normalized, idType: "URI" },
    { tags: [wpTags.uri(normalized), wpTags.type("category")] },
  );
  return data.post ?? null;
});

/** Draft Mode only: any post, including unpublished drafts. */
export const getPostById = cache(async (id: number) => {
  const data = await wpFetch(PostByDocument, { id: String(id), idType: "DATABASE_ID" }, { preview: { id } });
  return data.post ?? null;
});

export type WpPost = NonNullable<Awaited<ReturnType<typeof getPostById>>>;

const listTags = [wpTags.type("post"), wpTags.type("category")];

export const getPostList = cache(async () => {
  const data = await wpFetch(PostListDocument, { first: 50 }, { tags: listTags });
  return { posts: compact(data.posts?.nodes), categories: compact(data.categories?.nodes) };
});

/** A category archive by URI (/blog/category/{slug}/). */
export const getCategory = cache(async (uri: string) => {
  const normalized = normalizeUri(uri);
  const data = await wpFetch(CategoryByUriDocument, { uri: normalized }, { tags: [...listTags, wpTags.uri(normalized)] });
  if (!data.category) return null;
  return { ...data.category, posts: compact(data.category.posts?.nodes), categories: compact(data.categories?.nodes) };
});

export async function getPostUris() {
  const data = await wpFetch(PostUrisDocument, {}, { tags: listTags });
  return {
    posts: compact(data.posts?.nodes.map((p) => p.uri)),
    categories: compact(data.categories?.nodes.map((c) => c.uri)),
  };
}
