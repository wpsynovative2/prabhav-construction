import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/projects/LandingPage";
import { getAllProjects } from "@/lib/data/projects";
import { getActiveStations, getStation, stations } from "@/lib/data/stations";
import { site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getActiveStations().map((s) => ({ station: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/station/[station]">): Promise<Metadata> {
  const { station } = await params;
  const s = getStation(station);
  if (!s) return {};
  const count = getAllProjects().filter((p) => p.station === station).length;
  return buildMetadata({
    title: s.seo?.title ?? `Flats, Shops & Industrial Units near ${s.name} Station`,
    description: s.seo?.description ?? `${count} Prabhav Construction projects near ${s.name} station.`,
    path: `/projects/station/${s.slug}`,
  });
}

export default async function StationPage({ params }: PageProps<"/projects/station/[station]">) {
  const { station } = await params;
  const s = getStation(station);
  const projects = getAllProjects().filter((p) => p.station === station);
  if (!s || !projects.length) notFound();
  const stationNames = Object.fromEntries(stations.map((st) => [st.slug, st.name]));
  return (
    <LandingPage
      title={`Projects near ${s.name}`}
      intro={s.intro ?? `Developments by Prabhav near ${s.name} station.`}
      crumbs={[
        { name: "Projects", href: "/projects" },
        { name: s.name, href: `/projects/station/${s.slug}` },
      ]}
      projects={projects}
      stationNames={stationNames}
      faqs={[
        { q: `How far are Prabhav projects from ${s.name} station?`, a: projects.map((p) => `${p.name}: ${p.location.distanceFromStation ?? "nearby"}`).join(". ") + "." },
        { q: "Can I visit the site?", a: "Yes. Schedule a site tour and our project engineers will walk you through it." },
      ]}
      source={`station:${s.slug}`}
      phone={site.phone}
      phoneDisplay={site.phoneDisplay}
    />
  );
}
