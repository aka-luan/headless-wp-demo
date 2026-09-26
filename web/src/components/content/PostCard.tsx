import Link from "next/link";

import type { PostCardFragment } from "@/lib/wp/__generated__/graphql";
import { WpImage } from "@/components/ui/WpImage";
import { formatDate, stripHtml } from "@/lib/format";
import { compact } from "@/lib/wp/utils";

export function PostCard({ post, headingLevel = "h2" }: { post: PostCardFragment; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const category = compact(post.categories?.nodes)[0];
  const date = formatDate(post.date);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-bg shadow-card">
      <div className="aspect-[16/9] overflow-hidden bg-surface">
        <WpImage
          media={post.featuredImage?.node}
          sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-sm text-subtle">
          {date && <time dateTime={post.date ?? undefined}>{date}</time>}
          {category?.name && (
            <>
              <span aria-hidden>·</span>
              <span className="font-medium text-accent">{category.name}</span>
            </>
          )}
        </div>
        <Heading className="mt-3 text-xl font-semibold tracking-tight text-balance">
          {/* The whole card is clickable; the link text stays the title for screen readers. */}
          <Link href={post.uri ?? "#"} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-muted">{stripHtml(post.excerpt)}</p>
      </div>
    </article>
  );
}

export function PostGrid({ posts }: { posts: PostCardFragment[] }) {
  if (!posts.length) return <p className="text-muted">No posts yet.</p>;
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
    <nav aria-label="Blog categories" className="mt-8">
      <ul className="flex flex-wrap justify-center gap-2">
        {items.map((c) => {
          const active = c.uri === current;
          return (
            <li key={c.uri}>
              <Link
                href={c.uri!}
                aria-current={active ? "page" : undefined}
                className={`inline-flex rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${
                  active ? "bg-accent text-accent-fg ring-accent" : "bg-bg text-muted ring-border hover:text-fg"
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
