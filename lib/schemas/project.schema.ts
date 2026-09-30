import { z } from "zod";

export const CATEGORIES = ["residential", "commercial", "industrial"] as const;
export const STATUSES = ["upcoming", "ongoing", "completed"] as const;

export const CategorySchema = z.enum(CATEGORIES);
export const StatusSchema = z.enum(STATUSES);

const ImageSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(3),
});

export const ProjectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(2),
    tagline: z.string(),
    description: z.string().max(220, "Keep descriptions to one or two short lines"),
    category: CategorySchema,
    subType: z.string(),
    status: StatusSchema,
    featured: z.boolean().default(false),
    station: z.string(),
    location: z.object({
      address: z.string(),
      locality: z.string(),
      city: z.string(),
      state: z.string(),
      pincode: z.string().regex(/^\d{6}$/),
      lat: z.number(),
      lng: z.number(),
      mapEmbedUrl: z.string().url().optional(),
      distanceFromStation: z.string().optional(),
    }),
    units: z
      .array(
        z.object({
          label: z.string(),
          carpetAreaSqft: z.tuple([z.number(), z.number()]).optional(),
          priceFrom: z.number().optional(),
        }),
      )
      .min(1),
    price: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      display: z.string(),
      onRequest: z.boolean(),
    }),
    possession: z
      .string()
      .regex(/^\d{4}-\d{2}$/)
      .optional(),
    landParcelAcres: z.number().optional(),
    towers: z.number().optional(),
    floors: z.string().optional(),
    frontageFt: z.number().optional(),
    ceilingHeightFt: z.number().optional(),
    powerLoadKva: z.number().optional(),
    floorLoadKgSqm: z.number().optional(),
    rera: z
      .array(z.object({ number: z.string(), phase: z.string().optional(), qr: z.string().optional() }))
      .default([]),
    highlights: z.array(z.string()).default([]),
    amenities: z.array(z.string()).default([]),
    connectivity: z
      .array(
        z.object({
          place: z.string(),
          distance: z.string(),
          type: z.enum(["transport", "education", "health", "shopping", "work"]),
        }),
      )
      .default([]),
    /** Illustration used until real renders are supplied */
    art: z.object({
      scene: z.enum(["towers", "villas", "commercial", "industrial"]),
      seed: z.number().default(1),
    }),
    images: z.object({
      cover: ImageSchema.optional(),
      gallery: z
        .array(ImageSchema.extend({ kind: z.enum(["exterior", "amenity", "interior", "site"]).optional() }))
        .default([]),
      floorPlans: z.array(ImageSchema.extend({ label: z.string() })).default([]),
    }),
    videoUrl: z.string().url().optional(),
    brochure: z.string().optional(),
    constructionUpdates: z
      .array(
        z.object({
          date: z.string().regex(/^\d{4}-\d{2}$/),
          title: z.string(),
          progress: z.number().min(0).max(100).optional(),
          image: z.string().optional(),
        }),
      )
      .default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    seo: z.object({
      title: z.string(),
      description: z.string().max(170),
      keywords: z.array(z.string()).default([]),
    }),
    publishedAt: z.string(),
    updatedAt: z.string(),
  })
  .refine((p) => p.status === "upcoming" || p.rera.length > 0, {
    message: "RERA number is required unless the project is upcoming",
    path: ["rera"],
  });

export type Project = z.infer<typeof ProjectSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Status = z.infer<typeof StatusSchema>;
