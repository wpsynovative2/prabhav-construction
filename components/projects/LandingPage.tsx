import { Building2, Factory, House } from "lucide-react";
import type { Project } from "@/lib/schemas/project.schema";
import { PageHero } from "@/components/layout/PageHero";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd, itemListLd } from "@/lib/seo/jsonld";
import { CATEGORY_LABEL, STATUS_LABEL } from "@/lib/utils";

type Props = {
  title: string;
  intro: string;
  crumbs: Crumb[];
  projects: Project[];
  stationNames: Record<string, string>;
  faqs: { q: string; a: string }[];
  source: string;
  phone: string;
  phoneDisplay: string;
};

const CAT_ICON = { residential: House, commercial: Building2, industrial: Factory } as const;

/** Shared template for /projects/station/[station] and /projects/type/[category]. */
export function LandingPage({ title, intro, crumbs, projects, stationNames, faqs, source, phone, phoneDisplay }: Props) {
  const byCat = projects.reduce<Record<string, number>>((a, p) => ({ ...a, [p.category]: (a[p.category] ?? 0) + 1 }), {});
  const byStatus = projects.reduce<Record<string, number>>((a, p) => ({ ...a, [p.status]: (a[p.status] ?? 0) + 1 }), {});
  return (
    <>
      <PageHero title={title} subtitle={intro} crumbs={crumbs}>
        <div className="page-enter mt-8 flex flex-wrap gap-2 [animation-delay:240ms]">
          {Object.entries(byCat).map(([c, n]) => {
            const I = CAT_ICON[c as keyof typeof CAT_ICON];
            return (
              <span key={c} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-4 py-2 text-sm text-fg">
                <I className="size-4 text-accent-text" />
                {n} {CATEGORY_LABEL[c as keyof typeof CATEGORY_LABEL]}
              </span>
            );
          })}
          {Object.entries(byStatus).map(([s, n]) => (
            <span key={s} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-4 py-2 text-sm text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              {n} {STATUS_LABEL[s as keyof typeof STATUS_LABEL]}
            </span>
          ))}
        </div>
      </PageHero>
      <Section>
        <ProjectGrid projects={projects} stationNames={stationNames} />
      </Section>
      {faqs.length ? (
        <Section tone="surface">
          <SectionHeading eyebrow="Questions" title="Good to know" align="center" />
          <div className="mx-auto max-w-3xl">
            <Accordion items={faqs} />
          </div>
        </Section>
      ) : null}
      <CtaBand source={source} phone={phone} phoneDisplay={phoneDisplay} />
      <JsonLd data={itemListLd(projects)} />
      {faqs.length ? <JsonLd data={faqLd(faqs)} /> : null}
    </>
  );
}
