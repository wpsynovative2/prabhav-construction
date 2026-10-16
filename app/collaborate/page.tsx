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
  { icon: LandPlot, title: "Landowners", text: "Joint development & property acquisition" },
  { icon: HardHat, title: "Contractors", text: "Civil, MEP & finishing execution" },
  { icon: Truck, title: "Vendors & Suppliers", text: "Quality materials & project essentials" },
  { icon: PencilRuler, title: "Architects & Consultants", text: "Design, planning & approvals" },
];

const SOCIETY = [
  { icon: Home, title: "Larger, Modern Homes", text: "Thoughtful spaces for better living" },
  { icon: FileCheck, title: "Transparent Process", text: "Clarity at every stage" },
  { icon: ShieldCheck, title: "MahaRERA Registered", text: "Regulatory compliance assured" },
  { icon: Building2, title: "Built In-House", text: "25 years of proven delivery" },
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
            <SectionHeading eyebrow="Collaborate With Us" title="Who We Partner With" className="md:mb-8" />
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
            <SectionHeading eyebrow="Opportunities With Us" title="Why Societies Choose Us" className="md:mb-8" />
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

      <Section photo="/images/projects/vivaant-igatpuri/02-exterior.jpg" tone="surface">
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
