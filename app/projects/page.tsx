import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProjects } from "@/lib/data/projects";
import { getActiveStations, stations } from "@/lib/data/stations";
import { seo, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { itemListLd } from "@/lib/seo/jsonld";

export function generateMetadata(): Metadata {
  const active = getActiveStations().map((s) => s.name);
  return buildMetadata({
    title: `Portfolio: projects in ${active.join(", ")}`,
    description: `${getAllProjects().length} ${seo.pages.projects.description}`,
    path: "/projects",
  });
}

export default function ProjectsPage() {
  const projects = getAllProjects();
  const active = getActiveStations().map(({ slug, name }) => ({ slug, name }));
  const stationNames = Object.fromEntries(stations.map((s) => [s.slug, s.name]));

  return (
    <>
      <PageHero
        title="Our portfolio"
        subtitle="Homes, high streets and industrial parks, each one built by Prabhav."
        crumbs={[{ name: "Portfolio", href: "/projects" }]}
      />
      <section className="bg-bg py-12 md:py-16">
        <Container>
          <Suspense fallback={<ProjectGrid projects={projects} stationNames={stationNames} />}>
            <ProjectFilters projects={projects} stations={active} />
          </Suspense>
        </Container>
      </section>
      <CtaBand source="projects:cta-band" phone={site.phone} phoneDisplay={site.phoneDisplay} />
      <JsonLd data={itemListLd(projects)} />
    </>
  );
}
