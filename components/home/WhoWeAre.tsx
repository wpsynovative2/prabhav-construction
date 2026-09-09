import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { philosophy } from "@/data/company";

export function WhoWeAre() {
  return (
    <Section tone="cream">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Imagery */}
          <Reveal className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-lift sm:aspect-3/2 lg:aspect-4/5">
              <Media
                src="/images/BG-img1.jpg"
                alt="A Prabhav Construction interior"
                fallbackLabel="Prabhav"
                className="absolute inset-0"
                imageClassName="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>

            {/* Since-2000 marker */}
            <div className="absolute -right-3 -bottom-6 rounded-3xl bg-ink px-6 py-5 text-cream shadow-lift sm:-right-6 sm:px-8 sm:py-6">
              <span className="block font-display text-4xl text-gold-300 sm:text-5xl">
                2000
              </span>
              <span className="mt-1 block text-xs tracking-[0.16em] text-cream/72 uppercase">
                The year we started
              </span>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>

              <h2 className="mt-5 font-display text-display-md text-balance text-ink">
                A developer of deliberately modest volume
              </h2>

              <div className="mt-6 space-y-4 text-base text-pretty text-ink-muted">
                <p>
                  Prabhav Construction began in 2000 with a single low-rise building
                  in Mulund and one working rule: never sell a home we do not yet have
                  the approvals to build. Twenty-five years later that rule still
                  decides which land parcels we buy — and which ones we walk away
                  from.
                </p>
                <p>
                  We build about one project at a time in each market we enter. That
                  pace is a choice. It lets the same core team stay with a building
                  from the first soil test to the day the society takes over the keys.
                </p>
              </div>
            </Reveal>

            <div className="mt-9 space-y-4">
              {philosophy.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 90}
                  className="flex gap-4 rounded-3xl border border-line bg-white p-5 shadow-soft transition hover:border-gold-300"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span>
                    <span className="block font-display text-lg text-ink">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink-muted">
                      {item.body}
                    </span>
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <ButtonLink href="/about-us" variant="outline" withArrow className="mt-8">
                More about Prabhav
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default WhoWeAre;
