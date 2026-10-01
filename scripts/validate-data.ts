/* Validates every file in /data with the same Zod schemas the site uses. Fails the build on bad content. */
import fs from "node:fs";
import path from "node:path";
import { ProjectSchema } from "../lib/schemas/project.schema";
import { AmenitiesSchema, ConstructionsSchema, CsrSchema, InsightsSchema, JobsSchema, SiteSchema, StationsSchema, TestimonialsSchema } from "../lib/schemas/content.schema";

const root = path.join(process.cwd(), "data");
const read = (f: string) => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));
const errors: string[] = [];

function check(label: string, fn: () => void) {
  try {
    fn();
  } catch (e) {
    errors.push(`${label}: ${e instanceof Error ? e.message : String(e)}`);
  }
}

check("site.json", () => SiteSchema.parse(read("site.json")));
check("jobs.json", () => JobsSchema.parse(read("jobs.json")));
check("insights.json", () => InsightsSchema.parse(read("insights.json")));
check("constructions.json", () => ConstructionsSchema.parse(read("constructions.json")));
check("csr.json", () => CsrSchema.parse(read("csr.json")));
check("testimonials.json", () => TestimonialsSchema.parse(read("testimonials.json")));
const stations = StationsSchema.parse(read("stations.json"));
const amenities = AmenitiesSchema.parse(read("amenities.json"));
const stationSlugs = new Set(stations.map((s) => s.slug));
const amenityIds = new Set(amenities.map((a) => a.id));

for (const f of fs.readdirSync(path.join(root, "projects")).filter((x) => x.endsWith(".json"))) {
  check(`projects/${f}`, () => {
    const p = ProjectSchema.parse(read(`projects/${f}`));
    if (p.slug !== f.replace(/\.json$/, "")) throw new Error("slug must match the file name");
    if (!stationSlugs.has(p.station)) throw new Error(`unknown station "${p.station}" (add it to stations.json)`);
    const bad = p.amenities.filter((a) => !amenityIds.has(a));
    if (bad.length) throw new Error(`unknown amenities: ${bad.join(", ")}`);
    const images = [p.images.cover?.src, ...p.images.gallery.map((g) => g.src), ...p.images.floorPlans.map((g) => g.src)].filter(Boolean) as string[];
    const missing = images.filter((src) => !fs.existsSync(path.join(process.cwd(), "public", src)));
    if (missing.length) throw new Error(`missing images: ${missing.join(", ")}`);
  });
}

if (errors.length) {
  console.error(`\n✗ Data validation failed:\n\n${errors.map((e) => `  • ${e}`).join("\n")}\n`);
  process.exit(1);
}
console.log("✓ All /data files are valid");
