import type { NextConfig } from "next";

const cms = new URL(process.env.WP_GRAPHQL_URL ?? "http://cms.tagline.localhost/graphql");
const site = new URL(process.env.SITE_URL ?? "http://tagline.localhost");

const nextConfig: NextConfig = {
  output: "standalone",
  // WordPress URIs end in a slash; matching them keeps URLs identical on both hosts.
  trailingSlash: true,
  allowedDevOrigins: [site.hostname],
  images: {
    // Only media from our own CMS is optimised.
    remotePatterns: [
      {
        protocol: cms.protocol.replace(":", "") as "http" | "https",
        hostname: cms.hostname,
        pathname: "/wp-content/uploads/**",
      },
    ],
    // In Docker the CMS resolves to a private IP; safe because remotePatterns allows only that host.
    dangerouslyAllowLocalIP: process.env.IMAGES_ALLOW_LOCAL_IP === "true",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
