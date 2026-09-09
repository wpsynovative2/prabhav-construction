import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { projects, statusOrder, statusMeta } from "@/data/projects";

/** Home-page portfolio preview — one project from each status, newest first. */
export function ProjectsPreview() {
  const preview = statusOrder
    .flatMap((status) =>
      projects
        .filter((project) => project.status === status)
        .sort((a, b) => a.order - b.order)
    )
    .slice(0, 3);

  return (
    <Section tone="cream">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our portfolio"
            title="Upcoming, ongoing and delivered"
            description="Every project we have built, are building, or are about to start — with its current status stated plainly."
          />

          <Reveal delay={80}>
            <ButtonLink href="/projects" variant="outline" withArrow>
              View all projects
            </ButtonLink>
          </Reveal>
        </div>

        {/* Status legend */}
        <Reveal delay={60} className="mt-8 flex flex-wrap gap-2.5">
          {statusOrder.map((status) => (
            <span
              key={status}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs text-ink-muted"
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  status === "upcoming"
                    ? "bg-gold-500"
                    : status === "ongoing"
                      ? "bg-ink"
                      : "bg-green-600"
                }`}
              />
              <span className="font-medium text-ink">{statusMeta[status].label}</span>
              <span className="hidden sm:inline">— {statusMeta[status].description}</span>
            </span>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((project, index) => (
            <Reveal key={project.slug} delay={index * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default ProjectsPreview;
