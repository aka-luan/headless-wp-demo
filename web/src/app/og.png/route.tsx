import { ImageResponse } from "next/og";

import { site } from "@/config/site";

// Default share image for routes without one from WordPress. Rendered once at build time.
export const dynamic = "force-static";

export function GET() {
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
          background: "linear-gradient(135deg, #eef2ff 0%, #ffffff 60%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44, fontWeight: 700 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "#4f46e5", display: "flex" }} />
          {site.name}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.1, maxWidth: 900 }}>
          Know what to build next.
        </div>
        <div style={{ fontSize: 30, color: "#475569" }}>Customer feedback, sorted.</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
