import { ImageResponse } from "next/og";

import { tagMarkPath } from "@/components/layout/tag-mark";
import { site } from "@/config/site";

// Default share image for routes without one from WordPress. Rendered once at build time.
export const dynamic = "force-static";

const TAG_W = 380;
const TAG_H = 100;
const tags = [
  { text: "CSV export", bg: "#ecd99f", x: 760, y: 150, r: -8 },
  { text: "Slack alerts", bg: "#b8e8d3", x: 790, y: 290, r: 5 },
  { text: "Dark mode", bg: "#ffcad6", x: 740, y: 430, r: -3 },
];

/** Archivo Black, the closest static cut to the site's condensed display type. Falls back to the default font. */
async function displayFont(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch("https://raw.githubusercontent.com/google/fonts/main/ofl/archivoblack/ArchivoBlack-Regular.ttf");
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const font = await displayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#eef0f3",
          color: "#111a3b",
          fontFamily: font ? "Archivo Black" : "sans-serif",
          position: "relative",
        }}
      >
        {tags.map((t) => (
          <div
            key={t.text}
            style={{
              position: "absolute",
              left: t.x,
              top: t.y,
              width: TAG_W,
              height: TAG_H,
              display: "flex",
              alignItems: "center",
              paddingLeft: 80,
              fontSize: 36,
              background: t.bg,
              transform: `rotate(${t.r}deg)`,
              clipPath: `polygon(42px 0, ${TAG_W}px 0, ${TAG_W}px ${TAG_H}px, 42px ${TAG_H}px, 0 ${TAG_H / 2}px)`,
            }}
          >
            <div
              style={{ position: "absolute", left: 38, top: TAG_H / 2 - 10, width: 20, height: 20, borderRadius: 10, background: "#eef0f3" }}
            />
            {t.text}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 44 }}>
          <svg viewBox="0 0 24 24" width="56" height="56" fill="#2b3bf0" style={{ transform: "rotate(-12deg)" }}>
            <path fillRule="evenodd" d={tagMarkPath} />
          </svg>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 92, letterSpacing: -4, lineHeight: 1, maxWidth: 620 }}>
          Know what to build next.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: font ? [{ name: "Archivo Black", data: font, weight: 400, style: "normal" }] : undefined,
    },
  );
}
