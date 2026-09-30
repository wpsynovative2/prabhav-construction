import "server-only";
import siteJson from "@/data/site.json";
import amenitiesJson from "@/data/amenities.json";
import testimonialsJson from "@/data/testimonials.json";
import jobsJson from "@/data/jobs.json";
import insightsJson from "@/data/insights.json";
import { AmenitiesSchema, InsightsSchema, JobsSchema, SiteSchema, TestimonialsSchema } from "@/lib/schemas/content.schema";

export { default as navigation } from "@/data/navigation.json";
export { default as home } from "@/data/pages/home.json";
export { default as about } from "@/data/pages/about.json";
export { default as careerPage } from "@/data/pages/career.json";
export { default as contactPage } from "@/data/pages/contact.json";
export { default as faqs } from "@/data/faqs.json";
export { default as seo } from "@/data/seo.json";

export const site = SiteSchema.parse(siteJson);
export const amenities = AmenitiesSchema.parse(amenitiesJson);
export const testimonials = TestimonialsSchema.parse(testimonialsJson);
const jobs = JobsSchema.parse(jobsJson);

export const getAmenity = (id: string) => amenities.find((a) => a.id === id);
export const getOpenJobs = () => jobs.filter((j) => j.open).sort((a, b) => b.postedAt.localeCompare(a.postedAt));
export const getJob = (slug: string) => getOpenJobs().find((j) => j.slug === slug);

/** Newest first; the featured article leads. */
export const insights = InsightsSchema.parse(insightsJson).sort(
  (a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date),
);
export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
