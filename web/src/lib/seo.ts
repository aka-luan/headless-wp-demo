import "server-only";

import type { Metadata } from "next";

import { site } from "@/config/site";
import type { MediaFragment, SeoFragment, TaxonomySeoFragment } from "@/lib/wp/__generated__/graphql";
import { toHref } from "@/lib/wp/links";
import { normalizeUri } from "@/lib/wp/tags";
import { compact } from "@/lib/wp/utils";

/** Absolute URL on the public site. WordPress (and Yoast) only know the CMS host. */
export function absoluteUrl(path: string): string {
  return `${site.url}${normalizeUri(path)}`;
}

/** Default share image, drawn by app/og.png/route.tsx. */
const defaultImage = { url: "/og.png", width: 1200, height: 630, alt: site.name };

type MetadataInput = {
  uri: string;
  /** Yoast data for the node, when it has any. */
  seo?: SeoFragment | TaxonomySeoFragment | null;
  /** Used when Yoast has no title. The brand is appended. */
  title: string;
  description?: string | null;
  /** Share image when Yoast has none, e.g. the featured image. */
  image?: MediaFragment | null;
  type?: "website" | "article";
  noindex?: boolean;
};

/**
 * One metadata shape for every route. Next merges metadata shallowly, so each route
 * returns complete openGraph and twitter objects rather than relying on the layout's.
 */
export function buildMetadata({ uri, seo, title, description, image, type = "website", noindex }: MetadataInput): Metadata {
  const url = absoluteUrl(uri);
  // Yoast titles already include the brand, so they bypass the layout's title template.
  const fullTitle = seo?.title || `${title} · ${site.name}`;
  const desc = seo?.metaDesc || description || site.description;
  const ogImage = seo?.opengraphImage ?? image;
  const images = ogImage?.sourceUrl
    ? [
        {
          url: ogImage.sourceUrl,
          width: ogImage.mediaDetails?.width ?? undefined,
          height: ogImage.mediaDetails?.height ?? undefined,
          alt: ogImage.altText || title,
        },
      ]
    : [defaultImage];
  const post = seo && "opengraphPublishedTime" in seo ? seo : null;
  const twitterImage = post?.twitterImage?.sourceUrl;

  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: url },
    robots: {
      index: !noindex && seo?.metaRobotsNoindex !== "noindex",
      follow: seo?.metaRobotsNofollow !== "nofollow",
    },
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: site.locale,
      title: seo?.opengraphTitle || fullTitle,
      description: seo?.opengraphDescription || desc,
      images,
      ...(type === "article" && post
        ? {
            publishedTime: post.opengraphPublishedTime ?? undefined,
            modifiedTime: post.opengraphModifiedTime ?? undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post?.twitterTitle || seo?.opengraphTitle || fullTitle,
      description: post?.twitterDescription || seo?.opengraphDescription || desc,
      images: twitterImage ? [twitterImage] : images.map((i) => i.url),
    },
  };
}

// ---------------------------------------------------------------- JSON-LD

export type Crumb = { name: string; path: string };

/** Yoast's breadcrumb trail, with CMS URLs turned into site paths. */
export function crumbsFromSeo(seo: { breadcrumbs?: ReadonlyArray<{ text?: string | null; url?: string | null } | null> | null } | null | undefined): Crumb[] {
  return compact(seo?.breadcrumbs)
    .filter((c) => c.text && c.url)
    .map((c) => ({ name: c.text!, path: toHref(c.url!).href }));
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function organizationJsonLd(sameAs: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/logo.png`,
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

type ArticleInput = {
  uri: string;
  title: string;
  description?: string | null;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  author?: string | null;
};

export function articleJsonLd(a: ArticleInput) {
  const url = absoluteUrl(a.uri);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description ?? undefined,
    image: a.image ? [a.image] : undefined,
    datePublished: a.datePublished ?? undefined,
    dateModified: a.dateModified ?? a.datePublished ?? undefined,
    author: a.author ? { "@type": "Person", name: a.author } : undefined,
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: url,
    url,
  };
}
