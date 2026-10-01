import "server-only";
import { getAllProjects } from "@/lib/data/projects";
import { getActiveStations, getStation } from "@/lib/data/stations";
import { getAmenity, site } from "@/lib/data/content";
import { STATUS_LABEL, formatMonth, formatPrice, siteUrl } from "@/lib/utils";

const line = (p: ReturnType<typeof getAllProjects>[number]) => {
  const price = p.price.onRequest || !p.price.min ? "price on request" : `from ${formatPrice(p.price.min)}`;
  const when = p.status === "completed" ? "ready to move" : p.possession ? `possession ${formatMonth(p.possession)}` : "";
  return `- [${p.name}, ${p.location.locality}](${siteUrl()}/projects/${p.slug}): ${p.units.map((u) => u.label).join(", ")}, ${STATUS_LABEL[p.status].toLowerCase()}, ${price}${when ? `, ${when}` : ""}`;
};

export function buildLlmsTxt() {
  const base = siteUrl();
  return [
    `# ${site.name}`,
    "",
    `> Real estate developer building residential, commercial and industrial projects in ${site.region} since ${site.foundingYear}. All launched projects are MahaRERA registered.`,
    "",
    "## Projects",
    ...getAllProjects().map(line),
    "",
    "## Projects by station",
    ...getActiveStations().map((s) => `- [${s.name}](${base}/projects/station/${s.slug}): ${s.count} ${s.count === 1 ? "project" : "projects"}`),
    "",
    "## Company",
    `- [About](${base}/about-us)`,
    `- [Careers](${base}/career)`,
    `- [Contact](${base}/contact-us): ${site.phoneDisplay}, ${site.email}, ${site.hours}`,
    "",
  ].join("\n");
}

export function buildLlmsFullTxt() {
  const blocks = getAllProjects().map((p) =>
    [
      `## ${p.name}`,
      `${p.tagline}. ${p.description}`,
      `- URL: ${siteUrl()}/projects/${p.slug}`,
      `- Status: ${STATUS_LABEL[p.status]}${p.possession ? `, possession ${formatMonth(p.possession)}` : ""}`,
      `- Location: ${p.location.address}, ${p.location.locality}, ${p.location.city} ${p.location.pincode}; near ${getStation(p.station)?.name ?? p.station}`,
      `- Price: ${p.price.display}`,
      `- Configurations: ${p.units.map((u) => `${u.label}${u.carpetAreaSqft ? ` (${u.carpetAreaSqft[0]}–${u.carpetAreaSqft[1]} sq ft carpet)` : ""}${u.priceFrom ? ` from ${formatPrice(u.priceFrom)}` : ""}`).join("; ")}`,
      `- Amenities: ${p.amenities.map((a) => getAmenity(a)?.label ?? a).join(", ")}`,
      `- Connectivity: ${p.connectivity.map((c) => [c.place, c.distance].filter(Boolean).join(" ")).join("; ")}`,
      `- RERA: ${p.rera.length ? p.rera.map((r) => r.number).join(", ") : "applied"}`,
      ...p.faqs.map((f) => `- Q: ${f.q} A: ${f.a}`),
      "",
    ].join("\n"),
  );
  return `${buildLlmsTxt()}\n# Project details\n\n${blocks.join("\n")}`;
}
