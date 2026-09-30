import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { ProjectSchema, type Category, type Project } from "@/lib/schemas/project.schema";

const DIR = path.join(process.cwd(), "data/projects");

export const getAllProjects = cache((): Project[] => {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      const parsed = ProjectSchema.safeParse(raw);
      if (!parsed.success) throw new Error(`Invalid project file data/projects/${f}:\n${parsed.error.message}`);
      if (parsed.data.slug !== f.replace(/\.json$/, "")) throw new Error(`Slug must match file name in ${f}`);
      return parsed.data;
    })
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.updatedAt.localeCompare(a.updatedAt));
});

export const getProjectBySlug = (slug: string) => getAllProjects().find((p) => p.slug === slug);

export const getFeaturedProjects = () => getAllProjects().filter((p) => p.featured);

export function getRelatedProjects(p: Project, limit = 3) {
  const score = (x: Project) => (x.station === p.station ? 2 : 0) + (x.category === p.category ? 1 : 0);
  return getAllProjects()
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

export function getCategoryCounts(): Record<Category, number> {
  const counts: Record<Category, number> = { residential: 0, commercial: 0, industrial: 0 };
  for (const p of getAllProjects()) counts[p.category]++;
  return counts;
}

export const getActiveCategories = () =>
  (Object.entries(getCategoryCounts()) as [Category, number][]).filter(([, n]) => n > 0).map(([c]) => c);
