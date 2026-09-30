import "server-only";
import stationsJson from "@/data/stations.json";
import { StationsSchema } from "@/lib/schemas/content.schema";
import { getAllProjects } from "./projects";

export const stations = StationsSchema.parse(stationsJson).sort((a, b) => a.order - b.order);

export const getStation = (slug: string) => stations.find((s) => s.slug === slug);

/** Stations with at least one project, in line order, with counts. */
export function getActiveStations() {
  const counts = new Map<string, number>();
  for (const p of getAllProjects()) counts.set(p.station, (counts.get(p.station) ?? 0) + 1);
  return stations.filter((s) => counts.has(s.slug)).map((s) => ({ ...s, count: counts.get(s.slug) ?? 0 }));
}

/** Every station on the line (for the route map), marking which ones have projects */
export function getLineStations() {
  const active = new Map(getActiveStations().map((s) => [s.slug, s.count]));
  return stations.map((s) => ({ slug: s.slug, name: s.name, count: active.get(s.slug) ?? 0 }));
}

export type ActiveStation = ReturnType<typeof getActiveStations>[number];
