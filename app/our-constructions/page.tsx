import type { Metadata } from "next";
import { Building2, FlaskConical, HardHat, Layers, ShieldCheck, Sparkles, Waves, ClipboardCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { LiveSiteCard } from "@/components/constructions/LiveSiteCard";
import { DeliveredCard } from "@/components/constructions/DeliveredCard";
import { Process } from "@/components/home/Process";
import { CtaBand } from "@/components/home/CtaBand";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProjects } from "@/lib/data/projects";
import { getStation } from "@/lib/data/stations";
import { constructions, home, seo, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { itemListLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildMetadata({ ...seo.pages.constructions, path: "/our-constructions" });

const CHECKS = [
  { icon: FlaskConical, title: "Soil & cube tests", text: "Every pour, lab-tested" },
  { icon: Layers, title: "Slab-by-slab sign-off", text: "Engineer-approved" },
  { icon: Waves, title: "Waterproofing trials", text: "Flood-tested terraces" },
  { icon: ShieldCheck, title: "Structural audits", text: "Third-party reviewed" },
  { icon: ClipboardCheck, title: "Snag-free handover", text: "100-point checklist" },
  { icon: Sparkles, title: "Branded fittings", text: "Only approved makes" },
];

export default function OurConstructionsPage() {
  const live = getAllProjects().filter((p) => p.status === "ongoing" && p.constructionUpdates.length);
  const sqft = constructions.reduce((a, c) => a + c.builtUpSqft, 0);
  const units = constructions.reduce((a, c) => a + c.units, 0);

  const stats = [
    { value: constructions.length, suffix: "", label: "Landmark buildings", icon: Building2 },
    { value: Math.round(sqft / 1000), suffix: "K", label: "Sq ft constructed", icon: Layers },
    { value: units, suffix: "+", label: "Homes & units handed over", icon: ShieldCheck },
    { value: live.length, suffix: "", label: "Sites under construction", icon: HardHat },
  ];

  return (
    <>
      <PageHero
        title="Our constructions"
        subtitle="Every building engineered and built by our own teams, since 2000."
        crumbs={[{ name: "Our constructions", href: "/our-constructions" }]}
      />

      {/* Portfolio numbers */}
      <Container className="pt-12 md:pt-16">
        <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {stats.map(({ value, suffix, label, icon: I }) => (
            <RevealItem key={label}>
              <div className="flex h-full items-center gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-4 md:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-surface-raised text-accent-text shadow-soft ring-1 ring-line md:size-14">
                  <I className="size-6" />
                </span>
                <div>
                  <p className="font-display text-3xl leading-none text-fg md:text-4xl">
                    <CountUp value={value} suffix={suffix} />
                  </p>
                  <p className="mt-1.5 text-xs text-muted md:text-sm">{label}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      {live.length ? (
        <Section>
          <SectionHeading eyebrow="Live from site" title="Under construction now" subtitle="Real progress, updated from our sites." />
          <div className="grid gap-8">
            {live.map((p) => (
              <Reveal key={p.slug}>
                <LiveSiteCard project={p} stationName={getStation(p.station)?.name ?? p.station} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="surface">
        <SectionHeading eyebrow="Delivered" title="Built and handed over" subtitle="A quarter-century of buildings, newest first." />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {constructions.map((c) => (
            <RevealItem key={c.slug}>
              <DeliveredCard item={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading eyebrow={home.sections.process.eyebrow} title={home.sections.process.title} align="center" />
        <Process steps={home.sections.process.steps} />
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Quality" title="Checked at every stage" align="center" />
        <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-3" stagger={0.06}>
          {CHECKS.map(({ icon: I, title, text }) => (
            <RevealItem key={title}>
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface-raised p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-soft">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition group-hover:bg-primary group-hover:text-primary-fg">
                  <I className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg leading-tight text-fg">{title}</h3>
                  <p className="text-xs text-muted">{text}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand source="constructions:cta-band" phone={site.phone} phoneDisplay={site.phoneDisplay} />
      <JsonLd data={itemListLd(live)} />
    </>
  );
}
