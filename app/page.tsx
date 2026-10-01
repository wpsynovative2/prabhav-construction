import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { StatsRow } from "@/components/home/StatsRow";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { StationPresence } from "@/components/home/StationPresence";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";
import { InsightsSection } from "@/components/home/InsightsSection";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { CsrSection } from "@/components/home/CsrSection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getLineStations, stations } from "@/lib/data/stations";
import { csr, faqs, home, insights, seo, site, testimonials } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqLd, localBusinessLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildMetadata({
  title: seo.pages.home.title,
  description: seo.pages.home.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const s = home.sections;
  const featured = getFeaturedProjects()[0];
  const stationNames = Object.fromEntries(stations.map((st) => [st.slug, st.name]));

  return (
    <>
      <Hero hero={home.hero} />
      <StatsRow stats={home.stats} />

      <Section>
        <SectionHeading
          eyebrow={s.featured.eyebrow}
          title={s.featured.title}
          subtitle={s.featured.subtitle}
          action={
            <ButtonLink href="/projects" variant="outline">
              View portfolio
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </ButtonLink>
          }
        />
        {featured ? <FeaturedProject project={featured} stationName={stationNames[featured.station] ?? featured.station} /> : null}
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow={s.csr.eyebrow} title={s.csr.title} subtitle={s.csr.subtitle} align="center" />
        <CsrSection items={csr} />
      </Section>

      <Section>
        <InsightsSection items={insights} />
      </Section>

      <Marquee items={home.marquee} />

      <Section tone="surface">
        <AboutTeaser eyebrow={s.about.eyebrow} title={s.about.title} points={s.about.points} />
      </Section>

      <Section>
        <SectionHeading eyebrow={s.stations.eyebrow} title={s.stations.title} align="center" />
        <StationPresence stations={getLineStations()} />
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow={s.process.eyebrow} title={s.process.title} align="center" />
        <Process steps={s.process.steps} />
      </Section>

      <Section>
        <SectionHeading eyebrow={s.testimonials.eyebrow} title={s.testimonials.title} />
        <Testimonials items={testimonials} />
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Questions" title="Good to know" className="md:flex-col md:items-start" />
          <Accordion items={faqs.home} />
        </div>
      </Section>

      <CtaBand
        title={s.cta.title}
        subtitle={s.cta.subtitle}
        button={s.cta.button}
        source="home:cta-band"
        phone={site.phone}
        phoneDisplay={site.phoneDisplay}
      />

      {localBusinessLd(site).map((ld, i) => (
        <JsonLd key={i} data={ld} />
      ))}
      <JsonLd data={faqLd(faqs.home)} />
    </>
  );
}
