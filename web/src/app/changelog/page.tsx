import type { Metadata } from "next";

import { PageIntro } from "@/components/content/PageIntro";
import { Container } from "@/components/ui/Container";
import { Tag, type TagColor } from "@/components/ui/Tag";
import { RichText } from "@/components/ui/RichText";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { getChangelog } from "@/lib/wp/changelog";
import { isPreview } from "@/lib/wp/preview";

const intro = "New features, improvements and fixes, shipped every week.";

// Keys are the changelog type term slugs.
const typeColors: Record<string, TagColor> = {
  new: "mint",
  improved: "sky",
  fixed: "blush",
};

export function generateMetadata(): Metadata {
  return buildMetadata({ uri: "/changelog/", title: "Changelog", description: intro });
}

export default async function ChangelogPage() {
  const entries = await getChangelog(await isPreview());

  return (
    <>
      <PageIntro eyebrow="Changelog" title="What's new in Tagline" intro={intro} />
      <Container className="pb-28">
        <ol className="border-t-[1.5px] border-fg">
          {entries.map((entry) => {
            const date = formatDate(entry.date);
            return (
              <li key={entry.id} className="border-b border-border py-10">
                <article className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 lg:col-span-3 lg:flex-col lg:self-start lg:sticky lg:top-24">
                    {entry.version && <span className="font-display text-5xl">v{entry.version}</span>}
                    {date && (
                      <time dateTime={entry.date ?? undefined} className="text-sm text-muted">
                        {date}
                      </time>
                    )}
                  </div>
                  <div className="lg:col-span-7">
                    <ul className="flex flex-wrap gap-2">
                      {entry.types.map((t) => (
                        <Tag as="li" key={t.slug} color={typeColors[t.slug] ?? "manila"}>
                          {t.name}
                        </Tag>
                      ))}
                      {entry.draft && (
                        <Tag as="li" color="ink">
                          Draft
                        </Tag>
                      )}
                    </ul>
                    <h2 className="font-display mt-4 text-display-sm">{entry.title}</h2>
                    <RichText html={entry.body} className="mt-4" />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
