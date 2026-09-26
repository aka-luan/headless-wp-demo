import type { Metadata } from "next";
import { Archivo } from "next/font/google";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo";
import { getLayout } from "@/lib/wp/layout";
import "./globals.css";

// Variable in weight and width: the design uses condensed display, normal text and expanded labels.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const layout = await getLayout();

  return (
    <html lang="en" className={archivo.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-control focus:bg-bg focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd(layout.settings.socialLinks.map((l) => l.url))} />
        <PreviewBanner />
        <AnnouncementBar announcement={layout.settings.announcement} />
        <Header nav={layout.primaryNav} cta={layout.settings.defaultCta} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer nav={layout.footerNav} settings={layout.settings} />
      </body>
    </html>
  );
}
