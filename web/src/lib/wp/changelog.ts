import "server-only";

import { cache } from "react";

import { ChangelogEntriesDocument } from "./__generated__/graphql";
import { wpFetch } from "./client";
import { wpTags } from "./tags";
import { compact } from "./utils";

/** Changelog entries, newest release first. In Draft Mode, drafts and scheduled entries too. */
export const getChangelog = cache(async (preview = false) => {
  const data = preview
    ? await wpFetch(ChangelogEntriesDocument, { stati: ["PUBLISH", "DRAFT", "PENDING", "FUTURE"] }, { preview: {} })
    : await wpFetch(ChangelogEntriesDocument, { stati: ["PUBLISH"] }, { tags: [wpTags.type("changelog_entry")] });

  return compact(data.changelogEntries?.nodes)
    .map((entry) => ({
      id: entry.databaseId,
      title: entry.title,
      draft: entry.status !== "publish",
      version: entry.changelogDetails?.version ?? null,
      date: entry.changelogDetails?.releaseDate ?? null,
      body: entry.changelogDetails?.body ?? null,
      types: compact(entry.changeTypes?.nodes).map((t) => ({ name: t.name ?? "", slug: t.slug ?? "" })),
    }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
});

export type ChangelogItem = Awaited<ReturnType<typeof getChangelog>>[number];
