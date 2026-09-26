// Brand name lives here and in WP Settings > General. Change both together.
export const site = {
  name: "Tagline",
  description: "Tagline collects customer feedback from every channel, tags it automatically and shows product teams what to build next.",
  url: (process.env.SITE_URL ?? "http://tagline.localhost").replace(/\/$/, ""),
  locale: "en_US",
} as const;
