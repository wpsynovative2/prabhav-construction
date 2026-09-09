import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { founder } from "@/data/company";

export function Founder() {
  return (
    <Section tone="ink" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 h-[30rem] w-[30rem] rounded-full bg-gold-700/15 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-lift">
              <Media
                src={founder.image}
                alt={`${founder.name}, ${founder.role}`}
                fallbackLabel={founder.name}
                className="absolute inset-0"
                imageClassName="object-cover"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-ink/60 to-transparent"
              />
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-display text-2xl text-cream">{founder.name}</p>
                <p className="mt-1 text-xs tracking-wide text-gold-300">
                  {founder.role}
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow invert>The founder</Eyebrow>

              <blockquote className="mt-6">
                <Icon name="quote" size={34} className="text-gold-500/60" />
                <p className="mt-4 font-display text-display-sm leading-[1.35] text-balance text-cream">
                  {founder.quote}
                </p>
              </blockquote>
            </Reveal>

            <div className="mt-8 space-y-5 text-base text-pretty text-cream/80">
              {founder.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 70} as="p">
                  {paragraph}
                </Reveal>
              ))}
            </div>

            <Reveal delay={140}>
              <ul className="mt-9 grid gap-3 border-t border-cream/10 pt-8 sm:grid-cols-1">
                {founder.credentials.map((credential) => (
                  <li key={credential} className="flex items-start gap-3 text-base text-cream/85">
                    <span className="mt-0.5 shrink-0 text-gold-400">
                      <Icon name="check" size={16} />
                    </span>
                    {credential}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Founder;
