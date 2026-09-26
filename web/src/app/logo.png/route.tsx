import { ImageResponse } from "next/og";

import { tagMarkPath } from "@/components/layout/tag-mark";

// Square logo for the Organization JSON-LD. Same mark as components/layout/Logo.tsx.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2b3bf0",
          borderRadius: 96,
        }}
      >
        <svg viewBox="0 0 24 24" width="320" height="320" fill="#eef0f3" style={{ transform: "rotate(-12deg)" }}>
          <path fillRule="evenodd" d={tagMarkPath} />
        </svg>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
