import { Blocks } from "@/components/blocks/Blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata, crumbsFromSeo } from "@/lib/seo";
import type { WpPage } from "@/lib/wp/pages";

export function pageMetadata(page: WpPage) {
  return buildMetadata({ uri: page.uri ?? "/", seo: page.seo, title: page.title ?? "" });
}

export function PageView({ page }: { page: WpPage }) {
  const crumbs = crumbsFromSeo(page.seo);
  return (
    <>
      {/* Breadcrumbs only mean something below the home page. */}
      {!page.isFrontPage && crumbs.length > 1 && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <Blocks blocks={page.pageBuilder?.blocks} />
    </>
  );
}
