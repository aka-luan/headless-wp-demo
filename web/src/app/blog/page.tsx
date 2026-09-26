import type { Metadata } from "next";

import { PageIntro } from "@/components/content/PageIntro";
import { CategoryNav, PostGrid } from "@/components/content/PostCard";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { getPostList } from "@/lib/wp/posts";

const intro = "Product news, guides and notes on turning customer feedback into decisions.";

export function generateMetadata(): Metadata {
  return buildMetadata({ uri: "/blog/", title: "Blog", description: intro });
}

export default async function BlogPage() {
  const { posts, categories } = await getPostList();

  return (
    <>
      <PageIntro eyebrow="Blog" title="Ideas for teams who listen" intro={intro}>
        <CategoryNav categories={categories} current="/blog/" />
      </PageIntro>
      <Container className="pb-24">
        <PostGrid posts={posts} />
      </Container>
    </>
  );
}
