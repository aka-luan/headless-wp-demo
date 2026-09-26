import type { Metadata } from "next";

import { PageIntro } from "@/components/content/PageIntro";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { getChangelog } from "@/lib/wp/changelog";
import { isPreview } from "@/lib/wp/preview";

const intro = "New features, improvements and fixes, shipped every week.";

const typeStyles: Record<string, string> = {
  new: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  improved: "bg-sky-50 text-sky-800 ring-sky-600/20",
  fixed: "bg-amber-50 text-amber-900 ring-amber-600/20",
};

export function generateMetadata(): Metadata {
  return buildMetadata({ uri: "/changelog/", title: "Changelog", description: intro });
}

export default async function ChangelogPage() {
  const entries = await getChangelog(await isPreview());

  return (
    <>
      <PageIntro eyebrow="Changelog" title="What's new in Tagline" intro={intro} />
      <Container className="max-w-3xl pb-24">
        <ol className="relative border-l border-border">
          {entries.map((entry) => {
            const date = formatDate(entry.date);
            return (
              <li key={entry.id} className="relative pb-12 pl-8 last:pb-0">
                <span aria-hidden className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-accent ring-4 ring-bg" />
                <article>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                    {entry.version && <span className="font-mono font-semibold text-fg">v{entry.version}</span>}
                    {date && (
                      <time dateTime={entry.date ?? undefined} className="text-subtle">
                        {date}
                      </time>
                    )}
                    {entry.types.map((t) => (
                      <span
                        key={t.slug}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${typeStyles[t.slug] ?? "bg-surface text-muted ring-border"}`}
                      >
                        {t.name}
                      </span>
                    ))}
                    {entry.draft && (
                      <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-semibold text-amber-950">Draft</span>
                    )}
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{entry.title}</h2>
                  <RichText html={entry.body} className="mt-3" />
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
