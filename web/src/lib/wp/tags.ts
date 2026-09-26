// Cache tags shared by wpFetch and the /api/revalidate route.
export function normalizeUri(uri: string): string {
  const path = uri.split(/[?#]/)[0] || "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export const wpTags = {
  all: "wp",
  type: (postType: string) => `wp:type:${postType}`,
  uri: (uri: string) => `wp:uri:${normalizeUri(uri)}`,
  menus: "wp:menus",
  options: "wp:options",
} as const;
