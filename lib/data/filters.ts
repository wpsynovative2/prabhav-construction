import type { Category, Project, Status } from "@/lib/schemas/project.schema";

export const BUDGETS = [
  { id: "under-50l", label: "Under ₹50 L", test: (min?: number) => min !== undefined && min < 5e6 },
  { id: "50l-1cr", label: "₹50 L – 1 Cr", test: (min?: number) => min !== undefined && min >= 5e6 && min < 1e7 },
  { id: "1cr-2cr", label: "₹1 – 2 Cr", test: (min?: number) => min !== undefined && min >= 1e7 && min < 2e7 },
  { id: "above-2cr", label: "Above ₹2 Cr", test: (min?: number) => min !== undefined && min >= 2e7 },
  { id: "on-request", label: "Price on request", test: (min?: number) => min === undefined },
] as const;
export type BudgetBand = (typeof BUDGETS)[number]["id"];

export const POSSESSIONS = [
  { id: "ready", label: "Ready to move" },
  { id: "2027", label: "2027" },
  { id: "2028", label: "2028" },
  { id: "2029-plus", label: "2029+" },
] as const;

export const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "possession", label: "Possession: soonest" },
] as const;
export type SortKey = (typeof SORTS)[number]["id"];

export type FilterState = {
  category?: Category[];
  status?: Status[];
  station?: string[];
  config?: string[];
  budget?: BudgetBand;
  possession?: string;
  rera?: boolean;
  q?: string;
  sort?: SortKey;
};

const matchesPossession = (p: Project, v: string) => {
  if (v === "ready") return p.status === "completed";
  const year = Number(p.possession?.slice(0, 4));
  if (v === "2029-plus") return year >= 2029 && p.status !== "completed";
  return String(year) === v && p.status !== "completed";
};

type Key = Exclude<keyof FilterState, "sort">;

function matches(p: Project, f: FilterState, skip?: Key) {
  if (skip !== "category" && f.category?.length && !f.category.includes(p.category)) return false;
  if (skip !== "status" && f.status?.length && !f.status.includes(p.status)) return false;
  if (skip !== "station" && f.station?.length && !f.station.includes(p.station)) return false;
  if (skip !== "config" && f.config?.length && !p.units.some((u) => f.config!.includes(u.label))) return false;
  if (skip !== "budget" && f.budget) {
    const band = BUDGETS.find((b) => b.id === f.budget);
    if (band && !band.test(p.price.onRequest ? undefined : p.price.min)) return false;
  }
  if (skip !== "possession" && f.possession && !matchesPossession(p, f.possession)) return false;
  if (skip !== "rera" && f.rera && p.rera.length === 0) return false;
  if (skip !== "q" && f.q) {
    const q = f.q.toLowerCase();
    if (!`${p.name} ${p.location.locality} ${p.station}`.toLowerCase().includes(q)) return false;
  }
  return true;
}

export function applyFilters(projects: Project[], f: FilterState): Project[] {
  const out = projects.filter((p) => matches(p, f));
  const price = (p: Project) => (p.price.onRequest ? undefined : p.price.min);
  switch (f.sort) {
    case "newest":
      return out.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    case "price-asc":
      return out.sort((a, b) => (price(a) ?? Infinity) - (price(b) ?? Infinity));
    case "price-desc":
      return out.sort((a, b) => (price(b) ?? -1) - (price(a) ?? -1));
    case "possession":
      return out.sort((a, b) => (a.possession ?? "9999").localeCompare(b.possession ?? "9999"));
    default:
      return out;
  }
}

/** Count of results each option would give, holding the other active filters fixed */
export function getFacetCounts(projects: Project[], f: FilterState) {
  const count = (key: Key, test: (p: Project) => boolean) =>
    projects.filter((p) => matches(p, f, key) && test(p)).length;
  const configs = Array.from(new Set(projects.flatMap((p) => p.units.map((u) => u.label))));
  return {
    category: Object.fromEntries(
      (["residential", "commercial", "industrial"] as const).map((c) => [c, count("category", (p) => p.category === c)]),
    ),
    status: Object.fromEntries(
      (["upcoming", "ongoing", "completed"] as const).map((s) => [s, count("status", (p) => p.status === s)]),
    ),
    station: Object.fromEntries(
      Array.from(new Set(projects.map((p) => p.station))).map((s) => [s, count("station", (p) => p.station === s)]),
    ),
    config: Object.fromEntries(configs.map((c) => [c, count("config", (p) => p.units.some((u) => u.label === c))])),
    budget: Object.fromEntries(
      BUDGETS.map((b) => [b.id, count("budget", (p) => b.test(p.price.onRequest ? undefined : p.price.min))]),
    ),
    possession: Object.fromEntries(POSSESSIONS.map((o) => [o.id, count("possession", (p) => matchesPossession(p, o.id))])),
  } as Record<string, Record<string, number>>;
}

/** Configurations shown for the selected categories (BHKs hide when only Industrial is chosen) */
export function getConfigOptions(projects: Project[], categories?: Category[]) {
  const pool = categories?.length ? projects.filter((p) => categories.includes(p.category)) : projects;
  return Array.from(new Set(pool.flatMap((p) => p.units.map((u) => u.label))));
}

export function parseFilters(sp: URLSearchParams): FilterState {
  const list = (k: string) => sp.get(k)?.split(",").filter(Boolean);
  return {
    category: list("category") as Category[] | undefined,
    status: list("status") as Status[] | undefined,
    station: list("station"),
    config: list("config"),
    budget: (sp.get("budget") as BudgetBand) || undefined,
    possession: sp.get("possession") || undefined,
    rera: sp.get("rera") === "1" || undefined,
    q: sp.get("q") || undefined,
    sort: (sp.get("sort") as SortKey) || undefined,
  };
}

export function serializeFilters(f: FilterState) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(f)) {
    if (v === undefined || v === "" || v === false) continue;
    if (Array.isArray(v)) {
      if (v.length) sp.set(k, v.join(","));
    } else if (v === true) sp.set(k, "1");
    else sp.set(k, String(v));
  }
  return sp.toString();
}

export const activeFilterCount = (f: FilterState) =>
  (f.category?.length ?? 0) +
  (f.status?.length ?? 0) +
  (f.station?.length ?? 0) +
  (f.config?.length ?? 0) +
  (f.budget ? 1 : 0) +
  (f.possession ? 1 : 0) +
  (f.rera ? 1 : 0) +
  (f.q ? 1 : 0);
