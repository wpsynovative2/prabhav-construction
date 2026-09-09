import type { Metadata } from "next";

import PageHero from "@/components/common/PageHero";
import CareerSection from "@/components/career/CareerSection";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { benefits, careerHero, departments, lifeAtPrabhav, whyJoinUs } from "@/data/careers";
import { site } from "@/data/site";

const totalRoles = departments.reduce(
  (count, department) => count + department.roles.length,
  0
);

export const metadata: Metadata = {
  title: "Careers — Build What the City Lives In",
  description: `Join Prabhav Construction. ${totalRoles} roles across engineering, sales, operations and corporate functions in Mumbai and Thane. Apply online with your CV.`,
  alternates: { canonical: "/career" },
  openGraph: {
    title: "Careers at Prabhav Construction — Build What the City Lives In",
    description:
      "We hire across projects & engineering, sales & marketing, property & operations, and corporate & compliance. See open roles and apply online.",
    url: `${site.url}/career`,
  },
};

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow={careerHero.eyebrow}
        title={
          <>
            Build what the city{" "}
            <em className="text-gradient-gold not-italic">lives in</em>
          </>
        }
        description={careerHero.subheading}
        crumbs={[{ label: "Career" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="#openings" size="lg" withArrow>
            See {totalRoles} open roles
          </ButtonLink>
          <ButtonLink
            href="#apply"
            variant="outlineInvert"
            size="lg"
          >
            Send a general application
          </ButtonLink>
        </div>
      </PageHero>

      {/* Why join us */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Why join us"
            title="Four reasons people stay here longer than the industry average"
            description="We are not the biggest developer you could work for. These are the things we can offer that the biggest ones usually cannot."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {whyJoinUs.map((reason, index) => (
              <Reveal key={reason.title} delay={(index % 2) * 90} className="h-full">
                <div className="flex h-full gap-5 rounded-4xl border border-line bg-white p-7 shadow-soft transition hover:border-gold-300 hover:shadow-lift">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                    <Icon name={reason.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-snug text-ink">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-base text-ink-muted">
                      {reason.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Life at Prabhav */}
      <Section tone="ink">
        <Container>
          <SectionHeading
            eyebrow="Life at Prabhav"
            title="What working here actually looks like"
            description="Site boots more often than slide decks, decisions made close to the work, and colleagues who have been here long enough to teach you something."
            invert
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lifeAtPrabhav.map((item, index) => (
              <Reveal key={item.title} delay={index * 80} className="h-full">
                <div className="flex h-full flex-col rounded-4xl border border-cream/10 bg-white/[0.04] p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm text-cream/72">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Benefits */}
          <Reveal delay={100}>
            <div className="mt-12 rounded-4xl border border-cream/10 bg-white/[0.04] p-8 sm:p-10">
              <h3 className="font-display text-2xl text-cream">
                What we offer
              </h3>
              <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-base text-cream/80"
                  >
                    <span className="mt-0.5 shrink-0 text-gold-400">
                      <Icon name="check" size={16} />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CareerSection />
    </>
  );
}
