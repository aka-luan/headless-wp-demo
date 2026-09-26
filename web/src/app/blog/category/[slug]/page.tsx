import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/content/PageIntro";
import { CategoryNav, PostGrid } from "@/components/content/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getCategory, getPostUris } from "@/lib/wp/posts";

export const dynamicParams = true;

const uriFor = (slug: string) => `/blog/category/${decodeURIComponent(slug)}/`;

export async function generateStaticParams() {
  const { categories } = await getPostUris();
  return categories.map((uri) => ({ slug: uri.split("/").filter(Boolean).at(-1)! }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(uriFor(slug));
  if (!category) return {};
  return buildMetadata({
    uri: category.uri ?? uriFor(slug),
    seo: category.seo,
    title: `${category.name} articles`,
    description: category.description || `${category.name} articles from the ${site.name} blog.`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/blog/category/[slug]">) {
  const { slug } = await params;
  const category = await getCategory(uriFor(slug));
  if (!category) notFound();
  const uri = category.uri ?? uriFor(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: category.name ?? "", path: uri },
        ])}
      />
      <PageIntro eyebrow="Blog" title={category.name ?? "Category"} intro={category.description}>
        <CategoryNav categories={category.categories} current={uri} />
      </PageIntro>
      <Container className="pb-24">
        <PostGrid posts={category.posts} />
      </Container>
    </>
  );
}
