import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

/** Required by `output: "export"` so sitemap.xml is emitted as a static file. */
export const dynamic = "force-static";

/** Emitted as a static sitemap.xml during `next build`. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/career", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact-us", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      // trailingSlash is on in next.config.ts, so match the canonical URLs.
      url: `${site.url}${route.path}/`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      // Upcoming and ongoing projects are the ones we want indexed hardest.
      priority: project.status === "completed" ? 0.6 : 0.85,
    })),
  ];
}
