import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { process } from "@/data/company";

/** "How we work" — used on both the home page and the about page. */
export function ProcessSection({
  tone = "white",
  eyebrow = "How we work",
  title = "Four stages, in this order, every time",
  description = "Most delays in this industry come from doing these steps out of sequence. We do not start one until the previous one is finished.",
}: {
  tone?: "white" | "cream" | "sand";
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((stage, index) => (
            <Reveal key={stage.step} delay={index * 90} as="li" className="h-full">
              <div className="relative flex h-full flex-col rounded-4xl border border-line bg-cream p-7">
                {/* Connector between stages on wide screens */}
                {index < process.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 -right-3 hidden h-px w-6 bg-linear-to-r from-gold-300 to-transparent lg:block"
                  />
                ) : null}

                <span className="font-display text-sm font-medium tracking-[0.2em] text-gold-600">
                  {stage.step}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-10 bg-gold-400"
                />

                <h3 className="mt-5 font-display text-xl leading-snug text-ink">
                  {stage.title}
                </h3>

                <p className="mt-3 text-sm text-ink-muted">
                  {stage.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export default ProcessSection;
