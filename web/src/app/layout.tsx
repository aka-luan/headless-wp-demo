import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/config/site";
import { getLayout } from "@/lib/wp/layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const layout = await getLayout();

  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-control focus:bg-bg focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
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
