import type { Metadata } from "next";
import { Building2, FileCheck, HardHat, Home, LandPlot, PencilRuler, ShieldCheck, Truck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CollaborateForms } from "@/components/collaborate/CollaborateForms";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Collaborate with us",
  description: "Partner with Prabhav Construction as a land owner, contractor, vendor or consultant, or bring your housing society for redevelopment.",
  path: "/collaborate",
});

const PARTNERS = [
  { icon: LandPlot, title: "Land owners", text: "Joint development and outright purchase" },
  { icon: HardHat, title: "Contractors", text: "Civil, MEP and finishing work" },
  { icon: Truck, title: "Vendors & suppliers", text: "Materials, fittings and services" },
  { icon: PencilRuler, title: "Architects & consultants", text: "Design, structure and approvals" },
];

const SOCIETY = [
  { icon: Home, title: "Larger, modern homes", text: "Better layouts and amenities" },
  { icon: FileCheck, title: "Transparent process", text: "Documented at every step" },
  { icon: ShieldCheck, title: "MahaRERA registered", text: "Compliance from day one" },
  { icon: Building2, title: "Built in-house", text: "25 years of delivery" },
];

const FAQS = [
  { q: "How does society redevelopment work?", a: "The society appoints a developer through a general body resolution. The developer handles approvals, temporary accommodation arrangements and construction, and hands over new homes to existing members." },
  { q: "What details do you need to assess our society?", a: "Society name and location, number of flats, plot area and building age are enough to start. We follow up for documents after a first meeting." },
  { q: "Do you work with land owners on joint development?", a: "Yes. Share your land's location and size through the collaboration form and our team will get in touch." },
];

export default function CollaboratePage() {
  return (
    <>
      <PageHero
        title="Collaborate with us"
        subtitle="Build with us as a partner, or bring your society to us for redevelopment."
        crumbs={[{ name: "Collaborate with us", href: "/collaborate" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Collaborate with us" title="Who we partner with" className="md:mb-8" />
            <RevealGroup className="grid grid-cols-2 gap-4">
              {PARTNERS.map(({ icon: I, title, text }) => (
                <RevealItem key={title}>
                  <div className="group h-full rounded-2xl border border-line bg-surface-raised p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-soft">
                    <I className="size-7 text-accent-text transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="mt-4 font-display text-lg leading-tight text-fg">{title}</h3>
                    <p className="mt-1 text-xs text-muted">{text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div>
            <SectionHeading eyebrow="Opportunities with us" title="Why societies choose us" className="md:mb-8" />
            <RevealGroup className="grid grid-cols-2 gap-4">
              {SOCIETY.map(({ icon: I, title, text }) => (
                <RevealItem key={title}>
                  <div className="group h-full rounded-2xl border border-line bg-surface-raised p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-soft">
                    <I className="size-7 text-accent-text transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="mt-4 font-display text-lg leading-tight text-fg">{title}</h3>
                    <p className="mt-1 text-xs text-muted">{text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-4xl">
          <CollaborateForms />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Questions" title="Good to know" align="center" />
        <div className="mx-auto max-w-3xl">
          <Accordion items={FAQS} />
        </div>
      </Section>
      <JsonLd data={faqLd(FAQS)} />
    </>
  );
}
