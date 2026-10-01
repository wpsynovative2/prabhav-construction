import { z } from "zod";

const normalizeMobile = (v: string) => v.replace(/\D/g, "").replace(/^(?:91|0)(?=[6-9]\d{9}$)/, "");

export const mobileSchema = z
  .string()
  .transform(normalizeMobile)
  .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number")
  .refine((v) => !/^(\d)\1{9}$/.test(v), "Enter a valid 10-digit Indian mobile number");

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter your full name")
  .max(60, "Name is too long")
  .regex(/^[A-Za-z][A-Za-z .']*[A-Za-z]$/, "Use letters and spaces only");

const optionalEmail = z.union([z.literal(""), z.string().trim().email("Enter a valid email")]).optional();

export const INTENTS = ["enquiry", "site-visit", "brochure", "cost-sheet", "floor-plan"] as const;
export type Intent = (typeof INTENTS)[number];

/** Fields the visitor fills in. Shared by the client form and the API route. */
export const LeadFieldsSchema = z.object({
  fullName: nameSchema,
  mobile: mobileSchema,
  email: optionalEmail,
  project: z.string().max(100).optional(),
  unit: z.string().max(50).optional(),
  message: z.string().max(500, "Keep it under 500 characters").optional(),
  consent: z.boolean().refine((v) => v === true, "Consent is required to submit this form"),
});

export const RESUME_MAX_BYTES = 3 * 1024 * 1024;
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const CareerFieldsSchema = LeadFieldsSchema.extend({
  email: z.string().trim().email("Enter a valid email"),
  position: z.string().min(2, "Choose a position").max(100),
  experience: z.string().min(1, "Enter your experience").max(40),
  currentLocation: z.string().trim().min(2, "Enter your current location").max(80),
});

export const COLLAB_TYPES = [
  "Land owner / Joint development",
  "Contractor",
  "Vendor / Supplier",
  "Architect / Consultant",
  "Other",
] as const;

/** Partners who want to work with Prabhav */
export const CollaborateFieldsSchema = z.object({
  fullName: nameSchema,
  organisation: z.string().trim().max(100).optional(),
  mobile: mobileSchema,
  email: z.string().trim().email("Enter a valid email"),
  collaborationType: z.enum(COLLAB_TYPES, { error: "Choose how you'd like to collaborate" }),
  city: z.string().trim().min(2, "Enter your city").max(60),
  message: z.string().max(500, "Keep it under 500 characters").optional(),
  consent: z.boolean().refine((v) => v === true, "Consent is required to submit this form"),
});

export const DESIGNATIONS = ["Chairman", "Secretary", "Treasurer", "Committee member", "Society member"] as const;

/** Housing societies looking for a redevelopment partner */
export const RedevelopmentFieldsSchema = z.object({
  societyName: z.string().trim().min(3, "Enter the society name").max(120),
  fullName: nameSchema,
  designation: z.enum(DESIGNATIONS, { error: "Choose your role in the society" }),
  mobile: mobileSchema,
  email: optionalEmail,
  location: z.string().trim().min(3, "Enter the society's area / address").max(160),
  flats: z.string().max(10).optional(),
  plotArea: z.string().max(40).optional(),
  buildingAge: z.string().max(10).optional(),
  message: z.string().max(500, "Keep it under 500 characters").optional(),
  consent: z.boolean().refine((v) => v === true, "Consent is required to submit this form"),
});

const MetaSchema = z.object({
  intent: z.enum(INTENTS).optional(),
  source: z.string().max(200),
  tracking: z.record(z.string(), z.string().max(300)).optional(),
  website: z.string().max(500).optional(), // honeypot: any value = silently dropped by the API
  renderedAt: z.number(),
  recaptchaToken: z.string().min(10),
});

export const LeadSchema = LeadFieldsSchema.extend(MetaSchema.shape).extend({ formType: z.literal("lead") });

export const CareerSchema = CareerFieldsSchema.extend(MetaSchema.shape).extend({
  formType: z.literal("career"),
  resumeBase64: z
    .string()
    .max(Math.ceil((RESUME_MAX_BYTES * 4) / 3) + 8, "Resume must be under 3 MB")
    .optional(),
  resumeName: z.string().max(120).optional(),
  resumeMime: z.enum(RESUME_TYPES).optional(),
});

export const CollaborateSchema = CollaborateFieldsSchema.extend(MetaSchema.shape).extend({ formType: z.literal("collaborate") });
export const RedevelopmentSchema = RedevelopmentFieldsSchema.extend(MetaSchema.shape).extend({ formType: z.literal("redevelopment") });

export const SubmissionSchema = z.discriminatedUnion("formType", [LeadSchema, CareerSchema, CollaborateSchema, RedevelopmentSchema]);
export type FormType = Submission["formType"];

export type LeadFieldsInput = z.input<typeof LeadFieldsSchema>;
export type LeadFields = z.output<typeof LeadFieldsSchema>;
export type CareerFieldsInput = z.input<typeof CareerFieldsSchema>;
export type CareerFields = z.output<typeof CareerFieldsSchema>;
export type Submission = z.output<typeof SubmissionSchema>;
export type CollaborateFieldsInput = z.input<typeof CollaborateFieldsSchema>;
export type CollaborateFields = z.output<typeof CollaborateFieldsSchema>;
export type RedevelopmentFieldsInput = z.input<typeof RedevelopmentFieldsSchema>;
export type RedevelopmentFields = z.output<typeof RedevelopmentFieldsSchema>;
