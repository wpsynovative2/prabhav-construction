import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/projects/detail/ProjectHero";
import { StickySubNav } from "@/components/projects/detail/StickySubNav";
import {
  AmenitiesGrid,
  Block,
  ConfigurationTable,
  ConstructionUpdates,
  Gallery,
  LocationConnectivity,
  Overview,
  ProjectFaq,
  ReraBlock,
} from "@/components/projects/detail/ProjectSections";
import { FloorPlans } from "@/components/projects/detail/FloorPlans";
import { StickyProjectCta } from "@/components/projects/detail/StickyProjectCta";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/data/projects";
import { getStation, stations } from "@/lib/data/stations";
import { getAmenity, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqLd, projectLd } from "@/lib/seo/jsonld";
import type { Amenity } from "@/lib/schemas/content.schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getProjectBySlug((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: p.seo.title,
    description: p.seo.description,
    keywords: p.seo.keywords,
    path: `/projects/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const p = getProjectBySlug((await params).slug);
  if (!p) notFound();

  const stationName = getStation(p.station)?.name ?? p.station;
  const amenities = p.amenities.map(getAmenity).filter(Boolean) as Amenity[];
  const plans = p.images.floorPlans.length
    ? p.images.floorPlans.map((f) => ({ label: f.label, src: f.src, alt: f.alt }))
    : p.units.map((u) => ({ label: u.label }));
  const related = getRelatedProjects(p);
  const stationNames = Object.fromEntries(stations.map((s) => [s.slug, s.name]));

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "configurations", label: "Configurations" },
    amenities.length && { id: "amenities", label: "Amenities" },
    p.images.gallery.length && { id: "gallery", label: "Gallery" },
    { id: "floor-plans", label: "Floor plans" },
    { id: "location", label: "Location" },
    p.status === "ongoing" && p.constructionUpdates.length && { id: "progress", label: "Progress" },
    { id: "rera", label: "RERA" },
    p.faqs.length && { id: "faq", label: "FAQ" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
      <ProjectHero project={p} stationName={stationName} />
      <StickySubNav items={nav} />

      <Container className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          <Overview project={p} />
          <ConfigurationTable project={p} />
          {amenities.length ? <AmenitiesGrid amenities={amenities} /> : null}
          <Gallery project={p} />
          <Block id="floor-plans" eyebrow="Floor plans" title="Layouts that work">
            <FloorPlans plans={plans} project={p.name} seed={p.art.seed} />
          </Block>
          <LocationConnectivity project={p} />
          <ConstructionUpdates project={p} />
          <ReraBlock project={p} />
          <ProjectFaq project={p} />
        </div>
        <aside className="hidden py-12 lg:block">
          <StickyProjectCta project={p.name} priceDisplay={p.price.display} phone={site.phone} phoneDisplay={site.phoneDisplay} />
        </aside>
      </Container>

      {related.length ? (
        <Section tone="surface">
          <SectionHeading eyebrow="You may also like" title="Related projects" />
          <ProjectGrid projects={related} stationNames={stationNames} />
        </Section>
      ) : null}

      <CtaBand title={`See ${p.name} in person`} source={`project-cta:${p.slug}`} project={p.name} phone={site.phone} phoneDisplay={site.phoneDisplay} />

      <JsonLd data={projectLd(p, amenities.map((a) => a.label))} />
      {p.faqs.length ? <JsonLd data={faqLd(p.faqs)} /> : null}
    </>
  );
}
