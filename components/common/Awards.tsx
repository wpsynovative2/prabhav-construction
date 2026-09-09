import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { awards } from "@/data/company";

export function Awards() {
  return (
    <Section tone="cream">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Recognition"
            title="Awards and certifications"
            description="We do not build for awards. But when the industry notices the delivery record, it is worth recording."
          />

          <ul className="grid gap-4 sm:grid-cols-2">
            {awards.map((award, index) => (
              <Reveal key={award.title} delay={index * 80} as="li" className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition hover:border-gold-300">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <Icon name="sparkles" size={19} />
                    </span>
                    <span className="font-display text-sm tracking-[0.16em] text-gold-600">
                      {award.year}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg leading-snug text-ink">
                    {award.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-ink-muted">{award.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export default Awards;
