import { ImageResponse } from "next/og";

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
          background: "#4f46e5",
          borderRadius: 96,
        }}
      >
        <svg viewBox="0 0 20 20" width="300" height="300" fill="#ffffff">
          <path d="M3 5a2 2 0 0 1 2-2h5.6a2 2 0 0 1 1.4.6l5 5a2 2 0 0 1 0 2.8l-5.6 5.6a2 2 0 0 1-2.8 0l-5-5A2 2 0 0 1 3 10.6V5Zm4 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        </svg>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
