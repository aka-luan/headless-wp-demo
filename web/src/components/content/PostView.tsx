import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { WpImage } from "@/components/ui/WpImage";
import { formatDate, stripHtml } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, type Crumb } from "@/lib/seo";
import type { WpPost } from "@/lib/wp/posts";
import { compact } from "@/lib/wp/utils";

export function postMetadata(post: WpPost) {
  return buildMetadata({
    uri: post.uri ?? "/blog/",
    seo: post.seo,
    title: post.title ?? "",
    description: stripHtml(post.excerpt),
    image: post.featuredImage?.node,
    type: "article",
  });
}

export function PostView({ post }: { post: WpPost }) {
  const category = compact(post.categories?.nodes)[0];
  const author = post.author?.node;
  const date = formatDate(post.date);
  const image = post.featuredImage?.node;
  const uri = post.uri ?? "/blog/";

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    ...(category?.name && category.uri ? [{ name: category.name, path: category.uri }] : []),
    { name: post.title ?? "", path: uri },
  ];

  return (
    <article className="pb-16 sm:pb-24">
      <JsonLd
        data={articleJsonLd({
          uri,
          title: post.title ?? "",
          description: post.seo?.metaDesc || stripHtml(post.excerpt),
          image: image?.sourceUrl,
          datePublished: post.seo?.opengraphPublishedTime ?? post.date,
          dateModified: post.seo?.opengraphModifiedTime ?? post.modified,
          author: author?.name,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <header className="bg-gradient-to-b from-surface-accent to-bg pt-12 pb-10 sm:pt-16">
        <Container className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-subtle">
              <li>
                <Link href="/blog/" className="hover:text-fg">
                  Blog
                </Link>
              </li>
              {category?.uri && (
                <>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href={category.uri} className="font-medium text-accent hover:underline">
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-sm text-muted">
            {author?.name && <span className="font-medium text-fg">{author.name}</span>}
            {author?.name && date && <span aria-hidden> · </span>}
            {date && <time dateTime={post.date ?? undefined}>{date}</time>}
          </p>
        </Container>
      </header>

      {image && (
        <Container className="max-w-4xl">
          <WpImage
            media={image}
            sizes="(min-width: 896px) 832px, calc(100vw - 32px)"
            preload
            alt=""
            className="h-auto w-full rounded-card border border-border"
          />
        </Container>
      )}

      <Container className="mt-12 max-w-3xl">
        <RichText html={post.content} className="prose-lg" />
        {author?.description && (
          <aside className="mt-16 rounded-card border border-border bg-surface p-6 text-sm">
            <p className="font-semibold">About {author.name}</p>
            <p className="mt-2 text-muted">{author.description}</p>
          </aside>
        )}
      </Container>
    </article>
  );
}
