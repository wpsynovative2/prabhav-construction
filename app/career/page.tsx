import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JobList } from "@/components/career/JobList";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Accordion } from "@/components/ui/Accordion";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/LogoMark";
import { JsonLd } from "@/components/seo/JsonLd";
import { careerPage, faqs, getOpenJobs, seo } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildMetadata({ ...seo.pages.career, path: "/career", absoluteTitle: true });

export default function CareerPage() {
  const jobs = getOpenJobs();
  return (
    <>
      <PageHero title={careerPage.hero.title} subtitle={careerPage.hero.subtitle} crumbs={[{ name: "Career", href: "/career" }]}>
        <a href="#openings" className="page-enter mt-8 inline-flex items-center gap-3 rounded-full border border-accent/50 bg-surface-raised px-5 py-2.5 text-sm text-fg shadow-soft [animation-delay:240ms]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {jobs.length} open {jobs.length === 1 ? "role" : "roles"}
        </a>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Culture" title="Why build with us" align="center" />
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {careerPage.culture.map((c) => (
            <RevealItem key={c.title}>
              <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift">
                <LogoMark className="absolute -right-8 -bottom-10 h-36 w-auto opacity-[0.07] transition-all duration-700 group-hover:opacity-20" />
                <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-fg">
                  <Icon name={c.icon} className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-2xl text-fg">{c.title}</h3>
                <p className="mt-1 text-muted">{c.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Perks" title="Looked after, on and off site" align="center" />
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" stagger={0.05}>
          {careerPage.perks.map((p) => (
            <RevealItem key={p.title}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-line bg-surface-raised p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                <span className="grid size-14 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition group-hover:bg-primary group-hover:text-primary-fg">
                  <Icon name={p.icon} className="size-6" />
                </span>
                <span className="text-sm text-fg">{p.title}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="openings">
        <SectionHeading eyebrow="Open positions" title="Find your role" align="center" />
        <div className="mx-auto max-w-4xl">
          <JobList jobs={jobs} />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Questions" title="Applying, explained" align="center" />
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqs.career} />
        </div>
      </Section>
      <JsonLd data={faqLd(faqs.career)} />
    </>
  );
}
