export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** ₹ in lakh / crore, e.g. 5500000 → "₹55 L", 16500000 → "₹1.65 Cr" */
export function formatPrice(value: number) {
  if (value >= 1e7) return `₹${trim(value / 1e7)} Cr`;
  if (value >= 1e5) return `₹${trim(value / 1e5)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}
const trim = (n: number) => (Math.round(n * 100) / 100).toString();

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2028-12" → "Dec 2028" */
export function formatMonth(ym: string) {
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1] ?? ""} ${y}`.trim();
}

export const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.prabhavconstruction.in";

export const CATEGORY_LABEL = { residential: "Residential", commercial: "Commercial", industrial: "Industrial" } as const;
export const STATUS_LABEL = { upcoming: "Upcoming", ongoing: "Ongoing", completed: "Completed" } as const;

/** Small deterministic PRNG so illustrations render identically on server and client */
export function seeded(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
