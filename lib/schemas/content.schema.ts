import { z } from "zod";

export const StationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  line: z.string(),
  order: z.number(),
  intro: z.string().optional(),
  seo: z.object({ title: z.string(), description: z.string() }).optional(),
});
export const StationsSchema = z.array(StationSchema);
export type Station = z.infer<typeof StationSchema>;

export const SiteSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  legalName: z.string(),
  tagline: z.string(),
  foundingYear: z.string(),
  logos: z.object({ light: z.string(), dark: z.string() }),
  phone: z.string(),
  phoneDisplay: z.string(),
  whatsapp: z.string(),
  email: z.string().email(),
  careersEmail: z.string().email(),
  hours: z.string(),
  hoursSpec: z.array(z.object({ days: z.array(z.string()), opens: z.string(), closes: z.string() })),
  offices: z
    .array(
      z.object({
        name: z.string(),
        address: z.object({
          streetAddress: z.string(),
          addressLocality: z.string(),
          addressRegion: z.string(),
          postalCode: z.string(),
        }),
        city: z.string(),
        lat: z.number(),
        lng: z.number(),
        phone: z.string(),
        mapsUrl: z.string().url(),
        mapEmbedUrl: z.string().url(),
      }),
    )
    .min(1),
  social: z.record(z.string(), z.string().url()),
  region: z.string(),
  defaultOgImage: z.string(),
});
export type Site = z.infer<typeof SiteSchema>;

export const JobSchema = z.object({
  slug: z.string(),
  title: z.string(),
  department: z.string(),
  location: z.string(),
  type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACTOR", "INTERN"]),
  experience: z.string(),
  description: z.string(),
  responsibilities: z.array(z.string()),
  requirements: z.array(z.string()),
  postedAt: z.string(),
  validThrough: z.string(),
  open: z.boolean(),
});
export const JobsSchema = z.array(JobSchema);
export type Job = z.infer<typeof JobSchema>;

export const AmenitiesSchema = z.array(z.object({ id: z.string(), label: z.string(), icon: z.string() }));
export type Amenity = z.infer<typeof AmenitiesSchema>[number];

export const TestimonialsSchema = z.array(
  z.object({
    name: z.string(),
    project: z.string(),
    quote: z.string().max(160),
    rating: z.number().min(1).max(5).optional(),
    image: z.string().optional(),
  }),
);
export type Testimonial = z.infer<typeof TestimonialsSchema>[number];

export const INSIGHT_CATEGORIES = ["Market", "Buyer guide", "Policy", "Infrastructure"] as const;
export const InsightsSchema = z.array(
  z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().max(90),
    category: z.enum(INSIGHT_CATEGORIES),
    icon: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    readMins: z.number().int().positive(),
    featured: z.boolean().default(false),
    summary: z.string().max(140, "Keep summaries to one line"),
    points: z.array(z.string().max(90)).min(2),
  }),
);
export type Insight = z.infer<typeof InsightsSchema>[number];

export const ConstructionsSchema = z.array(
  z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string(),
    locality: z.string(),
    category: z.enum(["residential", "commercial", "industrial"]),
    scene: z.enum(["towers", "highrise", "villas", "commercial", "industrial"]),
    seed: z.number().default(1),
    year: z.number().int().min(1990).max(2100),
    floors: z.string(),
    /** Scope of work, e.g. "Civil works", "RCC works", "Turnkey" */
    scope: z.string().max(24).optional(),
    units: z.number().int().positive().optional(),
    builtUpSqft: z.number().positive().optional(),
    highlight: z.string().max(60),
    /** Optional link to a project page when the building is also listed under Projects */
    project: z.string().optional(),
    image: z.object({ src: z.string().startsWith("/"), alt: z.string() }).optional(),
  }),
);
export type Construction = z.infer<typeof ConstructionsSchema>[number];

export const CsrSchema = z.array(
  z.object({
    slug: z.string(),
    name: z.string(),
    deity: z.string(),
    icon: z.enum(["jain", "sai", "ganpati"]),
    locality: z.string(),
    line: z.string().max(110),
    image: z.object({ src: z.string().startsWith("/"), alt: z.string() }).optional(),
  }),
);
export type CsrItem = z.infer<typeof CsrSchema>[number];
