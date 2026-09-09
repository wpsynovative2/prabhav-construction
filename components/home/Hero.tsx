import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import CtaButton from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { getHeroProject } from "@/data/projects";
import { milestones } from "@/data/site";

export function Hero() {
  const project = getHeroProject();

  return (
    <section className="relative overflow-hidden bg-cream pt-12 pb-20 sm:pt-14 lg:pt-16 lg:pb-28">
      {/* Warm ambient wash behind the composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-gold-200/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-72 -left-56 h-[34rem] w-[34rem] rounded-full bg-sand/40 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-up">
            <Eyebrow>Since 2000 · Mumbai</Eyebrow>

            <h1 className="mt-6 font-display text-display-xl text-balance text-ink">
              Homes built the way{" "}
              <span className="text-gradient-gold whitespace-nowrap">we would want</span>{" "}
              them built
            </h1>

            <p className="measure-tight mt-6 text-lg text-pretty text-ink-muted">
              Twenty-five years, twenty-odd projects and 1,800 families across the
              Mumbai Metropolitan Region — every one of them approved before it was
              sold, and handed over on or ahead of the date we committed to.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CtaButton
                label="Schedule a Site Visit"
                subtitle="Tell us when suits you and our team will confirm a slot within one working day."
                source="Home hero"
                size="lg"
              />
              <ButtonLink href="/projects" variant="outline" size="lg" withArrow>
                Explore Projects
              </ButtonLink>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4 sm:gap-x-5">
              {milestones.map((milestone) => (
                <div key={milestone.label}>
                  <dt className="sr-only">{milestone.label}</dt>
                  <dd>
                    <span className="block font-display text-display-xs text-ink">
                      {milestone.value}
                      <span className="text-gold-600">{milestone.suffix}</span>
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-ink-muted">
                      {milestone.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Imagery */}
          <div className="animate-fade-up relative [animation-delay:120ms]">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-lift sm:aspect-3/4 lg:aspect-4/5">
              <Media
                src={project.heroImage}
                alt={`${project.name}, ${project.location.locality}`}
                fallbackLabel={project.name}
                className="absolute inset-0"
                imageClassName="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent"
              />

              {/* Featured project caption */}
              <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/95 p-5 shadow-soft backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-gold-600 px-3 py-1 text-2xs font-semibold tracking-[0.14em] text-white uppercase">
                    Now launching
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Icon name="map-pin" size={13} className="text-gold-500" />
                    {project.location.locality}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-xl text-ink">{project.name}</h2>
                <p className="mt-1 text-xs leading-snug text-ink-muted">
                  {project.configuration} · {project.priceLabel}
                </p>

                <ButtonLink
                  href={`/projects/${project.slug}`}
                  variant="outline"
                  size="sm"
                  withArrow
                  className="mt-4 w-full"
                >
                  View this project
                </ButtonLink>
              </div>
            </div>

            {/* Floating credibility chip */}
            <div className="absolute -top-3 -left-3 hidden items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-lift sm:flex lg:-left-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                <Icon name="shield" size={18} />
              </span>
              <span className="text-xs leading-tight">
                <span className="block font-semibold text-ink">MahaRERA</span>
                <span className="block text-ink-muted">registered</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
