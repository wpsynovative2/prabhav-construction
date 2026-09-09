/**
 * ---------------------------------------------------------------------------
 * SITE-WIDE CONTENT
 * ---------------------------------------------------------------------------
 * Everything that appears in the header, footer, contact page and SEO tags
 * lives here. Edit this file to change company details across the whole site.
 *
 * ⚠️  The phone numbers, e-mail addresses, office address and map embed below
 *     are PLACEHOLDERS. Replace them with the real Prabhav Construction details
 *     before going live.
 * ---------------------------------------------------------------------------
 */

export const site = {
  name: "Prabhav Construction",
  legalName: "Prabhav Construction Pvt. Ltd.",
  shortName: "Prabhav",
  tagline: "Building landmarks since 2000",
  established: 2000,

  /** Used for canonical URLs, sitemap and Open Graph tags. */
  url: "https://prabhavconstruction.com",

  description:
    "Prabhav Construction is a Mumbai-based real estate developer building thoughtfully planned residential and commercial landmarks since 2000. RERA-registered projects, on-time possession and honest documentation.",

  logo: {
    // Trimmed to the artwork itself — the supplied files were mostly empty
    // canvas, which made the mark render tiny inside its box.
    light: "/images/prabhav-logo.png", // gold logo, for light backgrounds
    dark: "/images/prabhav-logo-white.png", // white logo, for dark backgrounds
  },

  ogImage: "/images/BG-img1.jpg",
} as const;

export const contact = {
  phones: ["+91 98200 00000", "+91 22 4000 0000"],
  /** Primary number used by tel: links and the floating call button. */
  primaryPhone: "+919820000000",
  whatsapp: "919820000000",
  emails: ["sales@prabhavconstruction.com", "careers@prabhavconstruction.com"],
  primaryEmail: "sales@prabhavconstruction.com",
  careersEmail: "careers@prabhavconstruction.com",

  office: {
    label: "Corporate Office",
    lines: [
      "Prabhav House, 3rd Floor",
      "Plot 14, Link Road, Andheri West",
      "Mumbai, Maharashtra 400053",
    ],
    /** Opens Google Maps directions in a new tab. */
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Andheri+West+Mumbai",
    /**
     * Google Maps embed. To replace: open Google Maps → Share → Embed a map →
     * copy the `src` value out of the generated <iframe> and paste it here.
     */
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2!2d72.8296!3d19.1364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA4JzExLjAiTiA3MsKwNDknNDYuNiJF!5e0!3m2!1sen!2sin!4v1700000000000",
  },

  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 7:00 PM" },
    { days: "Sunday", time: "By appointment only" },
  ],

  /** Shown on the contact page and in every project's RERA strip. */
  reraDisclaimer:
    "MahaRERA registration numbers for each project are displayed on the respective project page and at the site office. Details are available at https://maharera.maharashtra.gov.in",
} as const;

export const socials = [
  { name: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { name: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { name: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
  { name: "YouTube", href: "https://youtube.com/", icon: "youtube" },
] as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

/** Small credibility strip that sits under the hero. */
export const trustPoints = [
  {
    icon: "calendar",
    title: "25+ Years",
    description: "In Mumbai, since 2000",
  },
  {
    icon: "building",
    title: "20+ Projects",
    description: "Delivered across MMR",
  },
  {
    icon: "shield",
    title: "RERA Registered",
    description: "Every project, fully compliant",
  },
  {
    icon: "handshake",
    title: "1,800+ Families",
    description: "Handed over on schedule",
  },
] as const;

export const milestones = [
  { value: "25", suffix: "+", label: "Years of building" },
  { value: "20", suffix: "+", label: "Projects delivered" },
  { value: "2.4", suffix: "M sq.ft.", label: "Area developed" },
  { value: "1,800", suffix: "+", label: "Happy families" },
] as const;
