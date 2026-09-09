import type { Metadata } from "next";

import PageHero from "@/components/common/PageHero";
import AboutCompany from "@/components/about/AboutCompany";
import Founder from "@/components/about/Founder";
import Team from "@/components/about/Team";
import Timeline from "@/components/about/Timeline";
import ProcessSection from "@/components/common/ProcessSection";
import CtaSection from "@/components/common/CtaSection";
import Awards from "@/components/common/Awards";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { philosophy } from "@/data/company";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us — 25 Years of Building in Mumbai",
  description:
    "Prabhav Construction has been developing residential and commercial property in the Mumbai Metropolitan Region since 2000. Meet our founder and team, and see how we plan, build and hand over.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Prabhav Construction — 25 Years of Building in Mumbai",
    description:
      "Founded in 2000. 20+ delivered projects, 2.4 million sq.ft. and 1,800+ families across the MMR. Meet the team behind the buildings.",
    url: `${site.url}/about-us`,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We build about one thing at a time — and finish it"
        description="Prabhav Construction has developed residential and commercial property across the Mumbai Metropolitan Region since 2000, at a pace that lets the same team stay with a building from the first soil test to the day the keys change hands."
        crumbs={[{ label: "About Us" }]}
      />

      <AboutCompany />

      {/* Vision, mission and values */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="What we stand for"
            title="Three statements we are willing to be measured against"
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {philosophy.map((item, index) => (
              <Reveal key={item.title} delay={index * 90} className="h-full">
                <div className="flex h-full flex-col rounded-4xl border border-line bg-cream p-8 transition hover:border-gold-300 hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                    <Icon name={item.icon} size={23} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Founder />
      <Team />
      <ProcessSection tone="cream" />
      <Timeline />
      <Awards />

      <CtaSection
        eyebrow="Work with us"
        title="Twenty-five years in, we still answer the phone ourselves"
        description="Whether you are buying your first home, moving your office, or exploring a joint development — start with a conversation."
        ctaLabel="Talk to Our Team"
        ctaSubtitle="Leave your details and a senior member of our team will call you back within one working day."
      />
    </>
  );
}
