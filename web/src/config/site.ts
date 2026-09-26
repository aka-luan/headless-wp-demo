// Brand name lives here and in WP Settings > General. Change both together.
export const site = {
  name: "Tagline",
  url: (process.env.SITE_URL ?? "http://tagline.localhost").replace(/\/$/, ""),
} as const;
