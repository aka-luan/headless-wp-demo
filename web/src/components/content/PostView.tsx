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

      <header className="pt-12 pb-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="font-label text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-muted">
              <li>
                <Link href="/blog/" className="underline-offset-4 hover:text-fg hover:underline">
                  Blog
                </Link>
              </li>
              {category?.uri && (
                <>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href={category.uri} className="underline-offset-4 hover:text-fg hover:underline">
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="font-display mt-6 max-w-[18ch] text-display-lg">{post.title}</h1>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-4 text-sm text-muted">
            {author?.name && <span className="font-label text-fg">{author.name}</span>}
            {date && <time dateTime={post.date ?? undefined}>{date}</time>}
          </p>
        </Container>
      </header>

      {image && (
        <Container>
          <WpImage
            media={image}
            sizes="(min-width: 1280px) 1184px, calc(100vw - 48px)"
            preload
            alt=""
            className="h-auto w-full rounded-card border border-border"
          />
        </Container>
      )}

      <Container className="mt-14">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-4">
            <RichText html={post.content} className="prose-lg" />
            {author?.description && (
              <aside className="mt-16 border-t-[1.5px] border-fg pt-6 text-sm">
                <p className="font-label">About {author.name}</p>
                <p className="mt-2 text-muted">{author.description}</p>
              </aside>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
