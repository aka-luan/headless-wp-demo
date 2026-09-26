import "server-only";

export type SiteLink = { href: string; label: string; external: boolean; newTab: boolean };

type WpLink = { url?: string | null; title?: string | null; target?: string | null } | null | undefined;

function cmsOrigin(): string | null {
  try {
    return new URL(process.env.WP_GRAPHQL_URL ?? "").origin;
  } catch {
    return null;
  }
}

/**
 * Turns a WordPress URL into a site href. Links picked in the WP link dialog point at the
 * CMS host, so they are rewritten to site-relative paths.
 */
export function toHref(url: string): { href: string; external: boolean } {
  const origin = cmsOrigin();
  if (origin && url.startsWith(origin)) {
    return { href: url.slice(origin.length) || "/", external: false };
  }
  if (url.startsWith("/") || url.startsWith("#")) {
    return { href: url, external: false };
  }
  return { href: url, external: true };
}

/** Normalises an ACF link field; returns null when it has no URL or label. */
export function toLink(link: WpLink): SiteLink | null {
  if (!link?.url || !link.title) return null;
  const { href, external } = toHref(link.url);
  return { href, label: link.title, external, newTab: link.target === "_blank" };
}
