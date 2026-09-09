import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Required by `output: "export"` so robots.txt is emitted as a static file. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
