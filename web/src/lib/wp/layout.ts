import "server-only";

import { cache } from "react";

import { LayoutDocument, type MenuItemFragment } from "./__generated__/graphql";
import { wpFetch } from "./client";
import { toHref, type SiteLink } from "./links";
import { wpTags } from "./tags";
import { compact, firstValue } from "./utils";

export type NavItem = { id: string; href: string; label: string; external: boolean };

function toNav(items: ReadonlyArray<MenuItemFragment | null> | undefined): NavItem[] {
  return compact(items)
    .filter((item) => !item.parentId && item.label && (item.path ?? item.url))
    .map((item) => ({ id: item.id, label: item.label!, ...toHref(item.path ?? item.url!) }));
}

/** Header, footer and announcement bar data. Revalidated by menu and options saves. */
export const getLayout = cache(async () => {
  const data = await wpFetch(LayoutDocument, {}, { tags: [wpTags.menus, wpTags.options] });
  const s = data.globals?.siteSettings;

  return {
    primaryNav: toNav(data.primaryMenu?.nodes),
    footerNav: toNav(data.footerMenu?.nodes),
    settings: {
      announcement: s?.announcementEnabled && s.announcementText
        ? { text: s.announcementText, link: s.announcementLink }
        : null,
      footerText: s?.footerText ?? null,
      socialLinks: compact(s?.socialLinks)
        .filter((l) => l.url)
        .map((l) => ({ network: firstValue(l.network) ?? "link", url: l.url! })),
      defaultCta: s?.defaultCta ?? null,
    },
  };
});

export type Layout = Awaited<ReturnType<typeof getLayout>>;
export type { SiteLink };
