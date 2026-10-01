import type { Metadata, Viewport } from "next";
import { Manrope, Marcellus } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { SideNav } from "@/components/layout/SideNav";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { IntroSplash } from "@/components/brand/IntroSplash";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProjects, getCategoryCounts } from "@/lib/data/projects";
import { getActiveStations } from "@/lib/data/stations";
import { navigation, seo, site } from "@/lib/data/content";
import { organizationLd, websiteLd } from "@/lib/seo/jsonld";
import { CATEGORY_LABEL, siteUrl } from "@/lib/utils";

// Headings: Marcellus (flared classical letterforms that echo the PRABHAV wordmark). Body: Manrope.
const headingFont = Marcellus({ variable: "--font-heading", subsets: ["latin"], weight: "400", display: "swap" });
const bodyFont = Manrope({ variable: "--font-body", subsets: ["latin"], display: "swap" });

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
  themeColor: "#fffdfa",
};

const GTM = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const projects = getAllProjects();
  const stations = getActiveStations().map(({ slug, name, count }) => ({ slug, name, count }));
  const counts = getCategoryCounts();
  const categories = (Object.keys(counts) as (keyof typeof counts)[])
    .filter((c) => counts[c] > 0)
    .map((c) => ({ slug: c, label: CATEGORY_LABEL[c], count: counts[c] }));
  const statusCounts = { upcoming: 0, ongoing: 0, completed: 0 };
  for (const p of projects) statusCounts[p.status]++;
  const projectOptions = projects.map((p) => ({ name: p.name, units: p.units.map((u) => u.label) }));

  return (
    <html lang="en-IN" suppressHydrationWarning className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">
        {GTM ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
          </Script>
        ) : null}
        <IntroSplash />
        <Providers projects={projectOptions}>
          <SideNav
            nav={navigation.main}
            statusCounts={statusCounts}
            projects={projects.slice(0, 3).map((p) => ({ slug: p.slug, name: p.name, locality: p.location.locality, scene: p.art.scene, seed: p.art.seed, cover: p.images.cover?.src }))}
            phone={site.phone}
            phoneDisplay={site.phoneDisplay}
            email={site.email}
            social={site.social}
          />
          {/* Content sits to the right of the fixed left rail on desktop */}
          <div className="lg:pl-[88px]">
            <main id="main">{children}</main>
            <Footer site={site} groups={navigation.footer} stations={stations} categories={categories} />
          </div>
          <MobileActionBar phone={site.phone} whatsapp={site.whatsapp} />
        </Providers>
        <JsonLd data={organizationLd(site, seo.sameAs)} />
        <JsonLd data={websiteLd(site)} />
      </body>
    </html>
  );
}
