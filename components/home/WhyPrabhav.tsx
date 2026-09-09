import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { differentiators } from "@/data/company";

/** "Why Prabhav" — the six things that actually differ from the market norm. */
export function WhyPrabhav() {
  return (
    <Section tone="sand">
      <Container>
        <SectionHeading
          eyebrow="Why Prabhav"
          title="Six things we do differently — and can prove"
          description="None of these are unusual promises. What is unusual is being able to show you the paperwork behind each one."
          align="center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 3) * 90}
              className="group h-full"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span
                  aria-hidden="true"
                  className="absolute -top-8 -right-6 font-display text-7xl leading-none text-gold-100 transition-colors group-hover:text-gold-200/70"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                  <Icon name={item.icon} size={22} />
                </span>

                <h3 className="relative mt-5 font-display text-xl text-ink">
                  {item.title}
                </h3>

                <p className="relative mt-2.5 text-sm text-ink-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default WhyPrabhav;
