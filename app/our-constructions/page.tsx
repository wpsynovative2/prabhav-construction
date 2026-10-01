import type { Metadata } from "next";
import { Building2, ClipboardCheck, Clock, HardHat, Layers, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { LiveSiteCard } from "@/components/constructions/LiveSiteCard";
import { DeliveredCard } from "@/components/constructions/DeliveredCard";
import { Process } from "@/components/home/Process";
import { CtaBand } from "@/components/home/CtaBand";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProjects } from "@/lib/data/projects";
import { getStation } from "@/lib/data/stations";
import { constructions, home, seo, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { itemListLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildMetadata({ ...seo.pages.constructions, path: "/our-constructions" });

// Capabilities as stated on prabhavgroup.com (Constructor / About pages)
const CHECKS = [
  { icon: Sparkles, title: "Latest techniques", text: "For complex, high-rise projects" },
  { icon: Truck, title: "Own equipment fleet", text: "At strategic locations across India" },
  { icon: Clock, title: "Precise timekeeping", text: "Time-bound completion" },
  { icon: ClipboardCheck, title: "Highest accuracy", text: "Workmanship comes first" },
  { icon: ShieldCheck, title: "Earthquake-resistant", text: "Structures built to last" },
  { icon: Leaf, title: "LEED standards", text: "Implemented wherever required" },
];

export default function OurConstructionsPage() {
  const projects = getAllProjects();
  const live = projects.filter((p) => p.status === "ongoing" && p.constructionUpdates.length);
  const inDevelopment = projects.filter((p) => p.status !== "completed").length;

  const stats = [
    { value: constructions.length, suffix: "+", label: "Buildings constructed", icon: Building2 },
    { value: 2, suffix: "M+", label: "Sq ft developed", icon: Layers },
    { value: 35, suffix: "", label: "Floors, tallest tower", icon: ShieldCheck },
    { value: inDevelopment, suffix: "", label: "Projects in development", icon: HardHat },
  ];

  return (
    <>
      <PageHero
        title="Our constructions"
        subtitle="Towers up to 35 floors, built for Mumbai's leading developers and for our own projects."
        crumbs={[{ name: "Our constructions", href: "/our-constructions" }]}
      />

      {/* Portfolio numbers: one raised panel that overlaps into the next section */}
      <div className="relative z-10 -mb-20 pt-10 md:-mb-24 md:pt-14">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-surface-raised shadow-lift ring-1 ring-line">
              <span className="gold-fill absolute inset-x-0 top-0 h-1" aria-hidden />
              <dl className="grid grid-cols-2 md:grid-cols-4">
                {stats.map(({ value, suffix, label, icon: I }, i) => (
                  <div
                    key={label}
                    className={cn(
                      "group relative flex flex-col items-center px-4 py-8 text-center md:py-10",
                      i % 2 === 1 && "border-l border-line",
                      i >= 2 && "border-t border-line md:border-t-0",
                      i === 2 && "md:border-l",
                    )}
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition duration-500 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-fg" aria-hidden>
                      <I className="size-5" />
                    </span>
                    <dt className="order-last mt-3 max-w-[18ch] text-[0.7rem] leading-snug tracking-[0.16em] text-muted uppercase">{label}</dt>
                    <dd className="gold-text mt-4 font-display text-4xl leading-none md:text-5xl">
                      <CountUp value={value} suffix={suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Container>
      </div>

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

      <Section tone="surface" className="pt-36 md:pt-48">
        <SectionHeading eyebrow="Delivered" title="Built and handed over" subtitle="Civil and RCC works for leading developers, newest first." />
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
