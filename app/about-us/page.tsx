import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/home/CtaBand";
import { StatsRow } from "@/components/home/StatsRow";
import { LogoMark } from "@/components/brand/LogoMark";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { about, home, seo, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({ ...seo.pages.about, path: "/about-us" });

export default function AboutPage() {
  return (
    <>
      <PageHero title={about.hero.title} subtitle={about.hero.subtitle} crumbs={[{ name: "About us", href: "/about-us" }]} />
      <StatsRow stats={home.stats} />

      {/* Story: three beats, not a paragraph */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
              <Image src="/images/BG-img1.jpg" alt="Interior of a finished Prabhav home" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-3 -bottom-6 flex items-center gap-3 rounded-2xl border border-line bg-surface-raised p-4 shadow-lift md:-right-8">
              <LogoMark className="h-10 w-auto" />
              <div>
                <p className="font-display text-2xl leading-none text-fg">Since {site.foundingYear}</p>
                <p className="text-xs text-muted">Family-run, founder-led</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our story" title={about.story.title} className="md:mb-8" />
            <RevealGroup className="grid gap-5">
              {about.story.lines.map((line, i) => (
                <RevealItem key={line}>
                  <div className="flex items-start gap-5">
                    <span className="gold-fill grid size-12 shrink-0 place-items-center rounded-full font-display text-lg text-[#2a1409]">{i + 1}</span>
                    <p className="pt-2.5 font-display text-xl leading-snug text-fg md:text-2xl">{line}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Vision / mission / values */}
      <Section tone="surface">
        <SectionHeading eyebrow="What drives us" title="Vision, mission, values" align="center" />
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {about.pillars.map((p) => (
            <RevealItem key={p.title}>
              <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift">
                <LogoMark className="absolute -right-8 -bottom-10 h-40 w-auto opacity-[0.07] transition-all duration-700 group-hover:scale-110 group-hover:opacity-20" />
                <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-fg">
                  <Icon name={p.icon} className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-3xl text-fg">{p.title}</h3>
                <p className="mt-2 text-muted">{p.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Milestones timeline */}
      <Section>
        <SectionHeading eyebrow="Milestones" title="Twenty-five years, one brick at a time" align="center" />
        <div className="relative">
          <div className="absolute top-[34px] right-0 left-0 hidden h-px hairline md:block" />
          <RevealGroup className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0" stagger={0.1}>
            {about.milestones.map((m) => (
              <RevealItem key={m.year} className="w-44 shrink-0 snap-start md:w-auto">
                <div className="group flex flex-col items-center text-center">
                  <span className="relative grid size-[68px] place-items-center rounded-full border border-line bg-surface-raised font-display text-lg text-accent-text shadow-soft transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-primary group-hover:text-primary-fg">
                    {m.year}
                  </span>
                  <p className="mt-4 text-sm text-fg">{m.title}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Leadership */}
      <Section tone="surface">
        <SectionHeading eyebrow="Leadership" title="The people behind Prabhav" align="center" />
        <RevealGroup className="grid gap-5 sm:grid-cols-3">
          {about.leadership.map((l, i) => (
            <RevealItem key={l.role}>
              <div className="group overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-[linear-gradient(150deg,#7a3c1b,#2a1409)]">
                  <LogoMark className="absolute h-[140%] w-auto opacity-10 transition-transform duration-1000 group-hover:rotate-6" />
                  <span className="relative grid size-28 place-items-center rounded-full border-2 border-[#d4af37] bg-white/10 font-display text-4xl text-white backdrop-blur" style={{ transitionDelay: `${i * 60}ms` }}>
                    {l.initials}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-fg">{l.name}</h3>
                  <p className="text-sm text-accent-text">{l.role}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Quality + CSR */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Quality & compliance" title="Built by the book" />
            <RevealGroup className="grid grid-cols-2 gap-4">
              {about.quality.map((q) => (
                <RevealItem key={q.title}>
                  <div className="flex h-full flex-col items-start gap-4 rounded-2xl bg-white p-5 text-[#2a1409] ring-1 ring-line">
                    <Icon name={q.icon} className="size-8 text-[#8a6f1c]" />
                    <p className="font-display text-lg leading-tight">{q.title}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div>
            <SectionHeading eyebrow="Giving back" title="Beyond buildings" />
            <RevealGroup className="grid gap-4">
              {about.csr.map((c) => (
                <RevealItem key={c.title}>
                  <div className="group flex items-center gap-5 rounded-2xl border border-line bg-surface-raised p-5 transition-all duration-500 hover:border-accent/60 hover:shadow-soft">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition group-hover:bg-primary group-hover:text-primary-fg">
                      <Icon name={c.icon} className="size-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-fg">{c.title}</h3>
                      <p className="text-sm text-muted">{c.text}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <CtaBand source="about:cta-band" phone={site.phone} phoneDisplay={site.phoneDisplay} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", url: `${siteUrl()}/about-us`, about: { "@id": `${siteUrl()}/#organization` } }} />
    </>
  );
}
