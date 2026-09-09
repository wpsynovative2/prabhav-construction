import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { aboutCompany } from "@/data/company";

export function AboutCompany() {
  return (
    <Section tone="cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{aboutCompany.eyebrow}</Eyebrow>

              <h2 className="mt-5 font-display text-display-md text-balance text-ink">
                {aboutCompany.heading}
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-base text-pretty text-ink-muted">
              {aboutCompany.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 70} as="p">
                  {paragraph}
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
                {aboutCompany.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl text-gold-700">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-ink-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={80} className="relative">
            <div className="relative aspect-3/4 overflow-hidden rounded-[2.5rem] shadow-lift">
              <Media
                src={aboutCompany.image}
                alt="Prabhav Construction project"
                fallbackLabel="Prabhav"
                className="absolute inset-0"
                imageClassName="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default AboutCompany;
