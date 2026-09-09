import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { getHeroProject } from "@/data/projects";

export function FeaturedProject() {
  const project = getHeroProject();

  return (
    <Section tone="ink" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full bg-gold-700/20 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow invert>Featured project</Eyebrow>

              <h2 className="mt-5 font-display text-display-md text-balance text-cream">
                {project.name}
              </h2>

              <p className="mt-4 text-lg text-pretty text-cream/80">
                {project.tagline}.
              </p>

              <p className="mt-3 text-sm text-gold-200/90">
                {project.configuration} · {project.priceLabel} · Possession{" "}
                {project.possession}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-cream/10 pt-8 sm:grid-cols-3">
                {project.facts.slice(0, 6).map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs tracking-wide text-cream/60 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 font-display text-lg text-gold-200">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap gap-3">
                <CtaButton
                  label="Download Brochure"
                  subtitle={`Leave your details and we will e-mail the ${project.name} brochure, floor plans and price list straight away.`}
                  project={project.name}
                  source="Home featured project"
                  size="lg"
                />
                <ButtonLink
                  href={`/projects/${project.slug}`}
                  variant="outlineInvert"
                  size="lg"
                  withArrow
                >
                  Full project details
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-[2.5rem] shadow-lift">
              <Media
                src={project.gallery[0]?.src ?? project.heroImage}
                alt={`${project.name} — ${project.gallery[0]?.caption ?? "exterior"}`}
                fallbackLabel={project.name}
                className="absolute inset-0"
                imageClassName="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>

            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {project.highlights.slice(0, 3).map((highlight) => (
                <li
                  key={highlight.title}
                  className="rounded-3xl border border-cream/10 bg-white/[0.04] p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
                    <Icon name={highlight.icon} size={19} />
                  </span>
                  <span className="mt-3 block font-medium text-cream">
                    {highlight.title}
                  </span>
                  <span className="mt-1 block text-xs text-cream/70">
                    {highlight.description}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default FeaturedProject;
