import Link from "next/link";

import type { PostCardFragment } from "@/lib/wp/__generated__/graphql";
import { Tag } from "@/components/ui/Tag";
import { WpImage } from "@/components/ui/WpImage";
import { formatDate, stripHtml } from "@/lib/format";
import { compact } from "@/lib/wp/utils";

export function PostCard({ post, headingLevel = "h2" }: { post: PostCardFragment; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const category = compact(post.categories?.nodes)[0];
  const date = formatDate(post.date);

  return (
    <article className="group relative flex w-full flex-col">
      <div className="aspect-[16/10] overflow-hidden rounded-card border border-border bg-surface">
        <WpImage
          media={post.featuredImage?.node}
          sizes="(min-width: 1280px) 384px, (min-width: 640px) 50vw, 100vw"
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        {category?.name && <Tag>{category.name}</Tag>}
        {date && (
          <time dateTime={post.date ?? undefined} className="text-subtle">
            {date}
          </time>
        )}
      </div>
      <Heading className="font-display mt-4 text-[2rem] group-hover:text-accent">
        {/* The whole card is clickable; the link text stays the title for screen readers. */}
        <Link href={post.uri ?? "#"} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-3 line-clamp-3 text-muted">{stripHtml(post.excerpt)}</p>
    </article>
  );
}

export function PostGrid({ posts }: { posts: PostCardFragment[] }) {
  if (!posts.length) return <p className="text-muted">No posts yet.</p>;
  return (
    <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.id} className="flex">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}

export function CategoryNav({
  categories,
  current,
}: {
  categories: { name?: string | null; uri?: string | null }[];
  current: string;
}) {
  const items = [{ name: "All posts", uri: "/blog/" }, ...categories.filter((c) => c.uri && !c.uri.includes("/uncategorized/"))];
  return (
    <nav aria-label="Blog categories" className="mt-12 border-t border-border pt-6">
      <ul className="font-label flex flex-wrap gap-2 text-sm">
        {items.map((c) => {
          const active = c.uri === current;
          return (
            <li key={c.uri}>
              <Link
                href={c.uri!}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-9 items-center rounded-control px-3.5 transition-colors ${
                  active ? "bg-fg text-bg" : "ring-1 ring-border ring-inset hover:ring-fg"
                }`}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
