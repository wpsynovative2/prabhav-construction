import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { InsightCard, InsightFeature } from "@/components/insights/InsightCard";
import { CtaBand } from "@/components/home/CtaBand";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { insights, seo, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({ ...seo.pages.insights, path: "/insights" });

export default function InsightsPage() {
  const [lead, ...rest] = insights;
  return (
    <>
      <PageHero
        title="Real estate insights"
        subtitle="News, guides and trends for smarter property decisions."
        crumbs={[{ name: "Insights", href: "/insights" }]}
      />
      <Section>
        {lead ? (
          <Reveal className="mb-8">
            <InsightFeature insight={lead} />
          </Reveal>
        ) : null}
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((i) => (
            <RevealItem key={i.slug}>
              <InsightCard insight={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      <CtaBand source="insights:cta-band" phone={site.phone} phoneDisplay={site.phoneDisplay} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Prabhav Construction insights",
          url: `${siteUrl()}/insights`,
          blogPost: insights.map((i) => ({ "@type": "BlogPosting", headline: i.title, datePublished: i.date, url: `${siteUrl()}/insights/${i.slug}` })),
        }}
      />
    </>
  );
}
