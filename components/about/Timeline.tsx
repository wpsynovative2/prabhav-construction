import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { timeline } from "@/data/company";

export function Timeline() {
  return (
    <Section tone="sand">
      <Container>
        <SectionHeading
          eyebrow="Our journey"
          title="Twenty-five years, in order"
          description="The decisions that shaped how Prabhav builds today — each one a deliberate choice rather than a milestone we drifted into."
        />

        <ol className="relative mt-14">
          {/* Spine */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[9px] w-px bg-linear-to-b from-gold-400 via-gold-300 to-transparent md:left-1/2 md:-translate-x-px"
          />

          {timeline.map((entry, index) => {
            const alignLeft = index % 2 === 0;
            return (
              <Reveal
                key={entry.year}
                as="li"
                delay={40}
                className="relative pb-10 pl-9 last:pb-0 md:pl-0"
              >
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 border-gold-500 bg-cream-deep md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-600" />
                </span>

                <div
                  className={`md:grid md:grid-cols-2 md:gap-12 ${
                    alignLeft ? "" : "md:[&>*:first-child]:col-start-2"
                  }`}
                >
                  <div
                    className={`rounded-4xl border border-line bg-white p-6 shadow-soft sm:p-7 ${
                      alignLeft ? "md:text-right" : ""
                    }`}
                  >
                    <span className="font-display text-2xl text-gold-700">
                      {entry.year}
                    </span>
                    <h3 className="mt-2 font-display text-xl leading-snug text-ink">
                      {entry.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-ink-muted">
                      {entry.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export default Timeline;
