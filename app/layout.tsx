import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Figtree } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { IntroSplash } from "@/components/brand/IntroSplash";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProjects, getCategoryCounts } from "@/lib/data/projects";
import { getActiveStations } from "@/lib/data/stations";
import { navigation, seo, site } from "@/lib/data/content";
import { organizationLd, websiteLd } from "@/lib/seo/jsonld";
import { CATEGORY_LABEL, siteUrl } from "@/lib/utils";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: seo.pages.home.title, template: seo.titleTemplate },
  description: seo.pages.home.description,
  applicationName: site.name,
  publisher: site.name,
  formatDetection: { telephone: false },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  other: { "geo.region": "IN-MH" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdfa" },
    { media: "(prefers-color-scheme: dark)", color: "#160a04" },
  ],
};

const GTM = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const projects = getAllProjects();
  const stations = getActiveStations().map(({ slug, name, count }) => ({ slug, name, count }));
  const counts = getCategoryCounts();
  const categories = (Object.keys(counts) as (keyof typeof counts)[])
    .filter((c) => counts[c] > 0)
    .map((c) => ({ slug: c, label: CATEGORY_LABEL[c], count: counts[c] }));
  const projectOptions = projects.map((p) => ({ name: p.name, units: p.units.map((u) => u.label) }));

  return (
    <html lang="en-IN" suppressHydrationWarning className={`${bodoni.variable} ${figtree.variable}`}>
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">
        {GTM ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
          </Script>
        ) : null}
        <IntroSplash />
        <Providers projects={projectOptions}>
          <Header
            nav={navigation.main}
            stations={stations}
            categories={categories}
            phone={site.phone}
            phoneDisplay={site.phoneDisplay}
          />
          <main id="main">{children}</main>
          <Footer site={site} groups={navigation.footer} stations={stations} categories={categories} />
          <MobileActionBar phone={site.phone} whatsapp={site.whatsapp} />
        </Providers>
        <JsonLd data={organizationLd(site, seo.sameAs)} />
        <JsonLd data={websiteLd(site)} />
      </body>
    </html>
  );
}
