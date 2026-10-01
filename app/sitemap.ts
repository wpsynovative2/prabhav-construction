import type { MetadataRoute } from "next";
import { getActiveCategories, getAllProjects } from "@/lib/data/projects";
import { getActiveStations } from "@/lib/data/stations";
import { getOpenJobs, insights } from "@/lib/data/content";
import { siteUrl } from "@/lib/utils";

const LEGAL = ["/privacy-policy", "/terms-and-conditions", "/disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const staticPages = ["", "/about-us", "/projects", "/our-constructions", "/collaborate", "/career", "/insights", "/contact-us", "/privacy-policy", "/terms-and-conditions", "/disclaimer"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : LEGAL.includes(p) ? 0.3 : 0.8,
  }));
  const projects = getAllProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: [p.images.cover?.src, ...p.images.gallery.slice(0, 5).map((g) => g.src)].filter(Boolean).map((s) => `${base}${s}`),
  }));
  const stations = getActiveStations().map((s) => ({ url: `${base}/projects/station/${s.slug}`, priority: 0.8 }));
  const types = getActiveCategories().map((c) => ({ url: `${base}/projects/type/${c}`, priority: 0.7 }));
  const jobs = getOpenJobs().map((j) => ({ url: `${base}/career/${j.slug}`, lastModified: new Date(j.postedAt), priority: 0.5 }));
  const articles = insights.map((i) => ({ url: `${base}/insights/${i.slug}`, lastModified: new Date(i.date), priority: 0.6 }));
  return [...staticPages, ...projects, ...stations, ...types, ...jobs, ...articles];
}
