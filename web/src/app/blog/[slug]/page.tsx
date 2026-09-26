import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostView, postMetadata } from "@/components/content/PostView";
import { getPost, getPostUris } from "@/lib/wp/posts";
import { isPreview } from "@/lib/wp/preview";

export const dynamicParams = true;

const uriFor = (slug: string) => `/blog/${decodeURIComponent(slug)}/`;

export async function generateStaticParams() {
  const { posts } = await getPostUris();
  return posts.map((uri) => ({ slug: uri.split("/").filter(Boolean).at(-1)! }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(uriFor(slug), await isPreview());
  return post ? postMetadata(post) : {};
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(uriFor(slug), await isPreview());
  if (!post) notFound();

  return <PostView post={post} />;
}
