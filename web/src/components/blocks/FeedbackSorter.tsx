import type { CSSProperties } from "react";

import { tagColors, type TagColor } from "@/components/ui/Tag";

/*
 * The home hero illustration: last week's feedback lands in a heap, then each tag flies
 * into its theme column. CSS only (see .sorter-tag in globals.css): no client JS, the final
 * layout is reserved from the first paint, and reduced motion shows the sorted state.
 *
 * The content is a fixed illustration, like a product screenshot, so it lives here, not in WordPress.
 */

type Theme = { name: string; count: number; color: TagColor; items: [text: string, channel: string][] };

const themes: Theme[] = [
  {
    name: "CSV export",
    count: 142,
    color: "manila",
    items: [
      ["Can we export tagged feedback to a spreadsheet?", "Intercom"],
      ["Finance wants a CSV of requests every Friday.", "Email"],
      ["Export by date range, please.", "Widget"],
    ],
  },
  {
    name: "Slack alerts",
    count: 96,
    color: "mint",
    items: [
      ["Ping #product when a big account asks for something.", "Slack"],
      ["A daily digest in Slack would save me an hour.", "Zendesk"],
      ["Alert me when a theme spikes.", "Slack"],
    ],
  },
  {
    name: "Dark mode",
    count: 71,
    color: "blush",
    items: [
      ["Night shift here. The white UI is brutal.", "Widget"],
      ["Is dark mode on the roadmap?", "Intercom"],
    ],
  },
  {
    name: "SSO",
    count: 38,
    color: "sky",
    items: [
      ["We can't roll out to 400 seats without Okta.", "Sales call"],
      ["SAML is a blocker for procurement.", "Email"],
    ],
  },
];

// Deterministic "random" numbers, so server and every visit render the same heap.
function jitter(seed: number, range: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return ((x - Math.floor(x)) * 2 - 1) * range;
}

const round = (n: number) => Math.round(n * 100) / 100;

const TAG_STEP_REM = 5.25; // tag height + gap: how far a tag sits below the top of its column
const total = themes.reduce((n, t) => n + t.items.length, 0);

// Landing order: a fixed shuffle of all tags, so columns fill in interleaved.
const landing = Array.from({ length: total }, (_, i) => i).sort((a, b) => jitter(a + 99, 1) - jitter(b + 99, 1));

export function FeedbackSorter() {
  let order = 0;
  const label = `Illustration: ${total} pieces of feedback sorted into themes: ${themes
    .map((t) => `${t.name}, ${t.count} requests`)
    .join("; ")}.`;

  return (
    <div role="img" aria-label={label} className="relative rounded-card border border-border bg-surface p-3 shadow-card sm:p-4">
      <div aria-hidden className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {themes.map((theme, c) => (
          <div key={theme.name} className={c >= 2 ? "hidden md:block" : ""}>
            <div className="flex items-baseline justify-between gap-2 border-b border-border px-1 pb-3">
              <span className="font-label truncate text-sm">{theme.name}</span>
              <span
                className="sorter-count font-display text-3xl tabular-nums"
                style={{ "--delay": `${1500 + c * 120}ms` } as CSSProperties}
              >
                {theme.count}
              </span>
            </div>
            <ul className="mt-3 space-y-3">
              {theme.items.map(([text, channel], k) => {
                const seed = c * 10 + k + 1;
                // Offsets from this tag's sorted slot to the heap in the middle of the table,
                // in columns (--dc-*) and rows. Two columns show on phones, four from md up.
                const style = {
                  "--dc-sm": 0.5 - c,
                  "--dc-md": 1.5 - c,
                  "--from-y": `${round(-k * TAG_STEP_REM + 2 + jitter(seed, 1.5))}rem`,
                  "--from-r": `${round(jitter(seed + 7, 24))}deg`,
                  "--to-r": `${round(jitter(seed + 3, 1.2))}deg`,
                  "--delay": `${250 + landing.indexOf(order++) * 85}ms`,
                } as CSSProperties;
                return (
                  // The shadow sits on the wrapper: clip-path on the tag would cut it off.
                  <li key={k} style={style} className="sorter-tag drop-shadow-[0_3px_4px_rgb(17_26_59/0.16)]">
                    <div
                      className={`tag flex! h-[4.5rem] w-full flex-col items-start justify-center gap-0.5 pr-3 ${tagColors[theme.color]}`}
                    >
                      <span className="line-clamp-2 text-[0.8125rem] leading-snug">{text}</span>
                      <span className="text-xs text-muted">via {channel}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
