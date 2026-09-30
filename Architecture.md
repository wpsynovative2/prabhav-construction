# Prabhav Construction Website: Architecture

A marketing and lead-generation website for **Prabhav Construction**, a real estate developer building residential, commercial and industrial projects.

This document is the single source of truth for how the site is structured, how content is stored, how leads flow into Google Sheets, how the light/dark theme works, and how SEO is handled. Anyone joining the project should be able to build a feature from this file without asking where things go.

---

## 1. Goals

1. Generate qualified leads (site visits, brochure requests, cost sheets, job applications).
2. Let a visitor find a project by type, status and nearest station in two clicks or fewer.
3. Rank for location-intent searches such as "2 BHK flats near {station}", "commercial shops in {locality}".
4. Stay easy to update: every piece of content lives in JSON under `/data`, so adding a project means adding one file, never touching components.
5. Offer a light and a dark theme that both look deliberate, not one theme with inverted colours.
6. Load fast on mid-range Android phones on 4G (target: LCP < 2.5s, CLS < 0.1, INP < 200ms).

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router, latest stable) | Static generation for every page; one API route for forms |
| Language | TypeScript (strict) | `strict: true`, `noUncheckedIndexedAccess: true` |
| Styling | Tailwind CSS v4 | Semantic colour tokens as CSS variables, switched per theme (§10) |
| Theme | `next-themes` | Light/dark toggle, follows system on first visit, no flash on load |
| Validation | Zod | Same schema used on the client form and the API route |
| Forms | React Hook Form + `@hookform/resolvers/zod` | |
| Spam protection | Google reCAPTCHA v3 + honeypot + time trap + rate limit | Verified server-side |
| Lead storage | Google Apps Script web app → Google Sheet | Script URL never exposed to the browser |
| Images | `next/image` (AVIF/WebP) | |
| Fonts | `next/font/google` (self-hosted at build) | |
| Icons | `lucide-react` | |
| Carousel / gallery | `embla-carousel-react` + `yet-another-react-lightbox` | Both small, accessible |
| Analytics | Google Tag Manager (GA4, Meta Pixel via GTM) | Loaded with `next/script` `afterInteractive` |
| Hosting | Vercel (recommended) or any Node host | See §13 for static-export fallback |

---

## 3. Sitemap and routes

```
/                                   Home
/about-us                           About us
/projects                           All projects (filterable)
/projects/[slug]                    Project detail page
/projects/station/[station]         Station landing page (e.g. /projects/station/virar)
/projects/type/[category]           Category landing page (residential | commercial | industrial)
/career                             Careers (job list + application form)
/career/[jobSlug]                   Single job opening (JobPosting schema)
/contact-us                         Contact us
/thank-you                          Post-submission page (noindex, used for conversion tracking)
/privacy-policy                     Privacy policy (DPDP Act 2023)
/terms-and-conditions               Terms
/disclaimer                         RERA / advertising disclaimer

/api/lead                           POST: validates, verifies reCAPTCHA, forwards to Apps Script

/sitemap.xml                        Generated from /data
/robots.txt                         Generated
/manifest.webmanifest               Generated
/llms.txt                           Generated summary for LLM crawlers
/llms-full.txt                      Generated full content for LLM crawlers
/.well-known/security.txt           Static
/opengraph-image                    Dynamic OG images (site default + per project)
```

Station and category landing pages are real, indexable pages (not just filtered views). They carry their own title, intro copy and schema, which is what lets the site rank for "flats near {station}" queries. The `/projects?station=…` query-string view is for in-page filtering and canonicalises to `/projects`.

---

## 4. Folder structure

```
prabhav-construction/
├── app/
│   ├── layout.tsx                    Root layout: fonts, ThemeProvider, header, footer, LeadModal provider, global JSON-LD
│   ├── page.tsx                      Home
│   ├── globals.css                   Tailwind v4 + theme tokens (light + dark)
│   ├── not-found.tsx
│   ├── about-us/page.tsx
│   ├── projects/
│   │   ├── page.tsx                  Listing + filters (server shell, client filter island)
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│   │   │   └── opengraph-image.tsx   Per-project OG image
│   │   ├── station/[station]/page.tsx
│   │   └── type/[category]/page.tsx
│   ├── career/
│   │   ├── page.tsx
│   │   └── [jobSlug]/page.tsx
│   ├── contact-us/page.tsx
│   ├── thank-you/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms-and-conditions/page.tsx
│   ├── disclaimer/page.tsx
│   ├── api/lead/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   ├── llms.txt/route.ts
│   ├── llms-full.txt/route.ts
│   ├── opengraph-image.tsx           Site-wide default OG image
│   ├── icon.png                      512×512
│   ├── apple-icon.png                180×180
│   └── favicon.ico
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                Sticky header, logo (theme-aware), nav, theme toggle, "Enquire now" CTA
│   │   ├── NavProjectsDropdown.tsx   Stations (only those with projects) + category links
│   │   ├── MobileNav.tsx             Drawer with the same station list + theme toggle
│   │   ├── Footer.tsx
│   │   ├── MobileActionBar.tsx       Fixed bottom bar on mobile: Call | WhatsApp | Enquire
│   │   └── Breadcrumbs.tsx           Visual breadcrumb + BreadcrumbList JSON-LD
│   ├── theme/
│   │   ├── ThemeProvider.tsx         Wraps next-themes
│   │   ├── ThemeToggle.tsx           Sun/moon button
│   │   └── ThemedLogo.tsx            Swaps light/dark logo with CSS (no flash)
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── QuickFinder.tsx           Type + station + status selects → /projects?…
│   │   ├── FeaturedProjects.tsx
│   │   ├── CategoryTiles.tsx
│   │   ├── AboutTeaser.tsx
│   │   ├── StationPresence.tsx
│   │   ├── Testimonials.tsx
│   │   └── CtaBand.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx           Whole card links to /projects/[slug]
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectFilters.tsx        Client component, URL-synced
│   │   ├── FilterChips.tsx
│   │   ├── SortSelect.tsx
│   │   ├── EmptyResults.tsx
│   │   └── detail/
│   │       ├── ProjectHero.tsx
│   │       ├── ProjectOverview.tsx
│   │       ├── ConfigurationTable.tsx
│   │       ├── AmenitiesGrid.tsx
│   │       ├── Gallery.tsx
│   │       ├── FloorPlans.tsx        Blurred until the lead form is submitted
│   │       ├── LocationConnectivity.tsx
│   │       ├── ConstructionUpdates.tsx
│   │       ├── ReraBlock.tsx         RERA number + QR code (MahaRERA requirement)
│   │       ├── ProjectFaq.tsx
│   │       ├── RelatedProjects.tsx
│   │       └── StickyProjectCta.tsx
│   ├── career/
│   │   ├── JobList.tsx
│   │   ├── JobCard.tsx
│   │   └── ApplicationForm.tsx
│   ├── forms/
│   │   ├── LeadModal.tsx             Global popup form
│   │   ├── LeadModalProvider.tsx     React context: openLeadModal({ source, project })
│   │   ├── LeadForm.tsx              Shared form body (inline and modal)
│   │   ├── Honeypot.tsx
│   │   ├── PhoneInput.tsx            Fixed +91 prefix, numeric keyboard
│   │   └── useRecaptcha.ts           Lazy-loads reCAPTCHA v3 on first interaction
│   ├── seo/
│   │   └── JsonLd.tsx
│   └── ui/
│       ├── Button.tsx                Variants: primary, accent, outline, ghost
│       ├── CtaButton.tsx             Button that calls openLeadModal()
│       ├── Container.tsx
│       ├── Section.tsx
│       ├── Badge.tsx                 Upcoming / Ongoing / Completed
│       ├── Select.tsx
│       ├── Accordion.tsx
│       └── Dialog.tsx
│
├── data/                             ALL site content, JSON only (see §5)
│   ├── site.json
│   ├── navigation.json
│   ├── stations.json
│   ├── amenities.json
│   ├── projects/
│   │   └── <slug>.json               One file per project
│   ├── pages/
│   │   ├── home.json
│   │   ├── about.json
│   │   ├── career.json
│   │   └── contact.json
│   ├── jobs.json
│   ├── testimonials.json
│   ├── faqs.json
│   └── seo.json
│
├── lib/
│   ├── data/
│   │   ├── projects.ts               getAllProjects, getProjectBySlug, getRelatedProjects
│   │   ├── stations.ts               getActiveStations (only stations with ≥1 project)
│   │   ├── filters.ts                applyFilters, getFacetCounts
│   │   ├── jobs.ts
│   │   └── content.ts
│   ├── schemas/                      Zod schemas for every JSON file (validated at build)
│   │   ├── project.schema.ts
│   │   ├── station.schema.ts
│   │   ├── site.schema.ts
│   │   ├── job.schema.ts
│   │   └── lead.schema.ts            Shared by client + server
│   ├── seo/
│   │   ├── metadata.ts
│   │   └── jsonld.ts
│   ├── lead/
│   │   ├── verifyRecaptcha.ts
│   │   ├── rateLimit.ts
│   │   └── forwardToSheet.ts
│   ├── tracking/
│   │   ├── utm.ts
│   │   └── datalayer.ts
│   └── utils.ts                      cn(), formatPrice (₹ lakh/crore), slugify
│
├── types/index.ts                    Types inferred from Zod
│
├── public/
│   ├── images/
│   │   ├── hero/hero.jpg             Hero image (see §8.1)
│   │   ├── hero/hero-dark.jpg        Optional dark-theme variant (see §10.5)
│   │   ├── projects/<slug>/…
│   │   └── about/…
│   ├── brochures/<slug>.pdf
│   ├── logo-light.svg                Brown/gold logo for light theme
│   ├── logo-dark.svg                 Gold/white logo for dark theme
│   └── .well-known/security.txt
│
├── scripts/
│   ├── validate-data.ts              Zod over /data; fails the build on bad content
│   └── google-apps-script/Code.gs    Apps Script source, versioned in the repo
│
├── .env.example
├── next.config.ts
├── tsconfig.json
└── package.json
```

```json
{
  "scripts": {
    "dev": "next dev",
    "validate": "tsx scripts/validate-data.ts",
    "build": "npm run validate && next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## 5. Data layer (`/data`)

### 5.1 Principles

1. JSON only. No content is hard-coded in components.
2. One project = one file in `/data/projects/`. The file name is the slug.
3. Every file is validated with Zod at build time. A typo in `status` or a missing image fails the build instead of shipping a broken page.
4. Derived data (active stations, filter options, counts, related projects, sitemap, llms.txt) is computed from the JSON, never stored twice.
5. Images live in `/public/images/...`; JSON stores the path plus alt text.

### 5.2 `stations.json`

Master list of stations in line order. A station only appears on the site when at least one project references it. The entries below are examples; replace them with the stations where Prabhav Construction actually builds.

```json
[
  { "slug": "virar",       "name": "Virar",       "line": "Western", "order": 1 },
  { "slug": "nallasopara", "name": "Nallasopara", "line": "Western", "order": 2 },
  { "slug": "vasai-road",  "name": "Vasai Road",  "line": "Western", "order": 3 }
]
```

Each station can also carry optional `intro` copy and `seo` fields for its landing page.

### 5.3 Project file (`/data/projects/<slug>.json`)

```json
{
  "slug": "prabhav-residency-virar",
  "name": "Prabhav Residency",
  "tagline": "2 & 3 BHK residences near Virar station",
  "category": "residential",
  "subType": "apartments",
  "status": "ongoing",
  "featured": true,
  "station": "virar",
  "location": {
    "address": "Plot No. 00, Example Road",
    "locality": "Virar West",
    "city": "Palghar",
    "state": "Maharashtra",
    "pincode": "401303",
    "lat": 19.4559,
    "lng": 72.8114,
    "mapEmbedUrl": "https://www.google.com/maps/embed?pb=…",
    "distanceFromStation": "1.2 km"
  },
  "units": [
    { "label": "2 BHK", "carpetAreaSqft": [650, 720], "priceFrom": 5500000 },
    { "label": "3 BHK", "carpetAreaSqft": [920, 980], "priceFrom": 8200000 }
  ],
  "price": { "min": 5500000, "max": 9800000, "display": "₹55 L – ₹98 L", "onRequest": false },
  "possession": "2028-12",
  "landParcelAcres": 3.5,
  "towers": 5,
  "floors": "G+23",
  "rera": [
    { "number": "P99000000000", "phase": "Phase 1", "qr": "/images/projects/prabhav-residency-virar/rera-qr-1.png" }
  ],
  "highlights": ["Infinity pool", "Clubhouse", "Landscaped podium"],
  "amenities": ["swimming-pool", "clubhouse", "gym", "kids-play-area", "jogging-track"],
  "connectivity": [
    { "place": "Virar station", "distance": "1.2 km", "type": "transport" }
  ],
  "images": {
    "cover": { "src": "/images/projects/prabhav-residency-virar/cover.jpg", "alt": "Prabhav Residency towers beside the podium pool" },
    "gallery": [
      { "src": "/images/projects/prabhav-residency-virar/g1.jpg", "alt": "Clubhouse lobby", "kind": "amenity" }
    ],
    "floorPlans": [
      { "src": "/images/projects/prabhav-residency-virar/fp-2bhk.jpg", "alt": "2 BHK floor plan, 690 sq ft carpet", "label": "2 BHK" }
    ]
  },
  "videoUrl": "https://www.youtube.com/watch?v=…",
  "brochure": "/brochures/prabhav-residency-virar.pdf",
  "constructionUpdates": [
    { "date": "2026-08", "title": "Tower A: 14th slab complete", "image": "/images/projects/prabhav-residency-virar/cu-2026-08.jpg" }
  ],
  "faqs": [
    { "q": "Is Prabhav Residency RERA registered?", "a": "Yes. MahaRERA No. P99000000000." }
  ],
  "seo": {
    "title": "Prabhav Residency: 2 & 3 BHK Flats in Virar West",
    "description": "RERA-registered 2 & 3 BHK flats near Virar station from ₹55 L. Pool, clubhouse, possession Dec 2028.",
    "keywords": ["2 BHK in Virar", "flats in Virar West"]
  },
  "publishedAt": "2026-06-01",
  "updatedAt": "2026-09-20"
}
```

All values above are sample data.

| Category | `subType` examples | `units[].label` examples | Extra optional fields |
|---|---|---|---|
| residential | apartments, villas, row-houses | 1 BHK, 2 BHK, 3 BHK, Jodi | — |
| commercial | shops, offices, showrooms | Shop, Office, Showroom | `frontageFt` |
| industrial | galas, warehouses, sheds | Industrial gala, Warehouse | `ceilingHeightFt`, `powerLoadKva`, `floorLoadKgSqm` |

`status` is exactly one of `upcoming | ongoing | completed`. For `upcoming`, price and RERA may be absent (`price.onRequest: true`; `rera` optional only when `status === "upcoming"`).

### 5.4 Other files

| File | Contents |
|---|---|
| `site.json` | Brand name, legal name, logos (light/dark), phones, WhatsApp, email, office addresses, hours, social links, founding year, default SEO image |
| `navigation.json` | Main nav order and labels, footer link groups (Projects dropdown items are derived) |
| `amenities.json` | `{ id, label, icon }`; projects reference amenities by id |
| `pages/home.json` | Hero copy, section headings, stats (verified numbers only), CTA text |
| `pages/about.json` | Story, vision, mission, leadership, milestones, certifications |
| `pages/career.json` | Intro, culture points, perks |
| `jobs.json` | `{ slug, title, department, location, type, experience, description, responsibilities[], requirements[], postedAt, validThrough, open }` |
| `testimonials.json` | `{ name, project, quote, rating?, image? }` (real customers, with consent) |
| `faqs.json` | Site-wide FAQs grouped by page |
| `seo.json` | Title template, per-page titles/descriptions, `sameAs` URLs |

### 5.5 Data access (`lib/data`)

```ts
// lib/data/projects.ts
import fs from "node:fs";
import path from "node:path";
import { ProjectSchema, type Project } from "@/lib/schemas/project.schema";

const DIR = path.join(process.cwd(), "data/projects");

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ProjectSchema.parse(JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"))))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.updatedAt.localeCompare(a.updatedAt));
}

export const getProjectBySlug = (slug: string) => getAllProjects().find((p) => p.slug === slug);

export function getRelatedProjects(p: Project, limit = 3) {
  const score = (x: Project) => (x.station === p.station ? 2 : 0) + (x.category === p.category ? 1 : 0);
  return getAllProjects().filter((x) => x.slug !== p.slug).sort((a, b) => score(b) - score(a)).slice(0, limit);
}
```

```ts
// lib/data/stations.ts
import stations from "@/data/stations.json";
import { getAllProjects } from "./projects";

/** Stations with at least one project, in line order, with counts. */
export function getActiveStations() {
  const counts = new Map<string, number>();
  for (const p of getAllProjects()) counts.set(p.station, (counts.get(p.station) ?? 0) + 1);
  return stations
    .filter((s) => counts.has(s.slug))
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ ...s, count: counts.get(s.slug)! }));
}
```

These run only on the server at build time. Client components receive plain props.

---

## 6. Projects page filters

### 6.1 Filters

| Filter | Control | Values | Source |
|---|---|---|---|
| Category | Segmented buttons | Residential, Commercial, Industrial | Fixed enum |
| Status | Segmented buttons | Upcoming, Ongoing, Completed | Fixed enum |
| Station | Multi-select chips | Only stations with ≥1 project | `getActiveStations()` |
| Configuration | Multi-select chips | 1 BHK, 2 BHK, Shop, Office, Gala… | Derived from `units[].label` |
| Budget | Select | Under ₹50 L, ₹50 L–1 Cr, ₹1–2 Cr, Above ₹2 Cr, Price on request | `price.min` |
| Possession | Select | Ready to move, 2027, 2028, 2029+ | `possession` + `status` |
| RERA registered | Toggle | On / off | `rera.length > 0` |
| Search | Text input | Project name or locality | `name`, `location.locality` |
| Sort | Select | Featured, Newest, Price low→high, Price high→low, Possession soonest | — |

### 6.2 Behaviour

1. **URL is the state.** `/projects?category=residential&status=ongoing&station=virar,nallasopara&budget=50l-1cr`. Shareable, survives refresh and back-button.
2. **Faceted counts.** Each option shows a count computed against the other active filters. Options with 0 results are disabled (not hidden) so the layout doesn't jump.
3. **Cross-filter dependency.** Choosing Industrial hides BHK chips and shows gala/warehouse chips.
4. **Client-side filtering** on the full static list; no network calls.
5. **Mobile.** A "Filters (3)" button opens a bottom sheet with a "Show 12 projects" apply button.
6. **Empty state.** "No projects match these filters." + "Clear filters" + "Tell us what you're looking for" (opens the lead modal pre-filled with the filters).
7. **SEO.** `/projects` with any query string canonicalises to `/projects`. Indexable filtered content lives at the station and type pages.

```ts
export type FilterState = {
  category?: Category[]; status?: Status[]; station?: string[];
  config?: string[]; budget?: BudgetBand; possession?: string;
  rera?: boolean; q?: string; sort?: SortKey;
};
export function applyFilters(projects: Project[], f: FilterState): Project[];
export function getFacetCounts(projects: Project[], f: FilterState): Record<string, Record<string, number>>;
```

### 6.3 Project card

The card uses the overlay-link pattern: a single `<Link href="/projects/[slug]">` stretched over the card, with the "Enquire" button layered above it (not nested inside the link, so the HTML stays valid). Contents: cover image (4:3), status badge, name, locality + station, configurations, price from, possession.

---

## 7. Navigation

### 7.1 Header

```
[Logo]   Home   About us   Projects ▾   Career   Contact us        [☀/☾]  [ Enquire now ]
```

Sticky. Transparent over the hero's top area, becomes solid (`--color-bg`) with a hairline border after 80px scroll. The theme toggle sits immediately left of the primary CTA on desktop, and at the top of the mobile drawer.

### 7.2 Projects dropdown

Built at build time from `getActiveStations()` and category counts.

```
┌──────────────────────────────────────────────────┐
│ By station            │ By type                  │
│ Virar (4)             │ Residential (6)          │
│ Nallasopara (2)       │ Commercial (2)           │
│                       │ Industrial (1)           │
│ View all projects                                │
└──────────────────────────────────────────────────┘
```

Station items link to `/projects/station/[slug]`. Stations without projects never appear. Adding the first project at a new station makes it appear in the dropdown, filters, sitemap and llms.txt on the next build.

Accessibility: hover (desktop, 150ms close delay) and click/Enter/Space; `aria-expanded`, `aria-controls`; Escape closes and returns focus; arrow keys move between items. Accordion inside the mobile drawer.

---

## 8. Page specifications

### 8.1 Home

**Hero.** Uses the supplied hero image (1920×1407: towers in the middle, pool in the foreground, top third fading to white). In the light theme the headline sits in the white area in `--color-primary` with no overlay on the photo. The dark theme needs its own treatment of the white top, described in §10.5.

```
┌───────────────────────────────────────────────────────────┐
│ [Logo]  nav…                              [☀] [Enquire now]│
│                                                           │
│              {Headline from pages/home.json}              │  ← display serif
│            {One-line description of the offer}            │
│        [ Explore projects ]   [ Book a site visit ]       │
│                                                           │
│                  ▲ towers ▲  ▲ towers ▲                   │  ← object-position: center bottom
│   ~~~~~~~~~~~~~~~~~~~~ pool ~~~~~~~~~~~~~~~~~~~~~~~~~~~~   │
├───────────────────────────────────────────────────────────┤
│ Quick finder: [Type ▾] [Station ▾] [Status ▾] [Search]    │
└───────────────────────────────────────────────────────────┘
```

```tsx
<Image src="/images/hero/hero.jpg" alt="Prabhav Construction residential towers across an infinity pool"
       fill priority fetchPriority="high" sizes="100vw" className="object-cover object-bottom" />
```

Mobile crop: `object-position: 50% 85%`. Source under 400 KB.

**Sections, in order:**
1. Quick finder (type, station, status → `/projects?…`).
2. Featured projects (`featured: true`).
3. What we build: Residential / Commercial / Industrial tiles with counts.
4. About teaser with verified stats.
5. Where we build: stations with counts.
6. Testimonials.
7. CTA band: "Visit a project this weekend" + Book a site visit.
8. Footer.

### 8.2 About us

Story, vision and mission, leadership, milestones timeline (a real chronology, so year markers fit), quality and compliance (RERA, certifications), CSR, CTA band.

### 8.3 Projects

Breadcrumb, H1 "Our projects", intro, filters (§6), result count, grid (3/2/1 columns), load-more at 12 (all items stay in the HTML for crawlers).

### 8.4 Project detail (`/projects/[slug]`)

`generateStaticParams()` from `/data/projects`; `dynamicParams = false` so unknown slugs 404.

| Order | Section | Notes |
|---|---|---|
| 1 | Breadcrumb | Home › Projects › {Station} › {Project} |
| 2 | Hero | Cover, name (H1), locality, status, price, possession; CTAs "Book a site visit", "Download brochure" |
| 3 | Sticky sub-nav | In-page anchors |
| 4 | Overview | Description + key facts grid |
| 5 | Configurations | Table with "Get cost sheet" per row (modal pre-filled with unit) |
| 6 | Amenities | Icon grid |
| 7 | Gallery | Carousel + lightbox, lazy |
| 8 | Floor plans | Blurred until the lead form succeeds (sessionStorage flag) |
| 9 | Location & connectivity | Click-to-load map, connectivity list |
| 10 | Construction updates | Ongoing projects only |
| 11 | RERA | Number(s), QR code(s), MahaRERA link, disclaimer |
| 12 | FAQ | Accordion |
| 13 | Related projects | Same station first, then same category |
| 14 | Sticky CTA | Desktop sidebar card; mobile bottom bar |

Floor plans and RERA QR codes sit on a white card in both themes, since they are white-background images.

### 8.5 Station and type landing pages

`/projects/station/[station]`: H1 "Projects near {Station}", 80–150 words of station-specific intro, filtered grid, connectivity blurb, FAQ, CTA. Same template for `/projects/type/[category]`.

### 8.6 Career

Intro, culture, perks, open positions (filter by department) linking to `/career/[jobSlug]` with an "Apply now" form (full name, mobile, email, position, experience, current location, resume). Closed jobs (`open: false`) are removed from the list and sitemap and return 404.

Resume: ≤ 5 MB, PDF/DOC/DOCX, base64-encoded by the API route and saved to Drive by Apps Script; the Drive link goes into the sheet. Simpler alternative: a "Resume link" field.

### 8.7 Contact us

Form (left); phone, WhatsApp, email, address with directions link, hours (right); click-to-load map below. Multiple offices from `site.json`.

### 8.8 Thank-you page

`/thank-you?type=lead|career`, `noindex`. Confirmation matching the action, next steps, links back. Fires the conversion event and serves as the destination-URL conversion for Google Ads and Meta.

---

## 9. Lead capture

### 9.1 CTA placement

Every CTA calls `openLeadModal({ source, project?, unit?, intent? })`.

| Location | CTA |
|---|---|
| Header (all pages) | Enquire now |
| Home hero | Explore projects / Book a site visit |
| Every project card | Enquire |
| Project hero | Book a site visit / Download brochure |
| Configuration rows | Get cost sheet |
| Floor plans | Unlock floor plans |
| Sticky sidebar (project, desktop) | Inline form |
| Mobile bottom bar (all pages) | Call · WhatsApp · Enquire |
| CTA band (bottom of every page) | Book a site visit |
| Empty filter results | Tell us what you're looking for |
| Footer | Enquire now |

Optional timed popup: project pages only, once per session after 25s or 50% scroll, never on Contact/Career/Thank-you, dismissal remembered for 7 days.

CTA labels describe the action ("Book a site visit"), never "Submit".

### 9.2 Form fields

**Lead form (popup and inline):**

| Field | Required | Rule |
|---|---|---|
| Full name | Yes | 2–60 chars, letters, spaces, `.` and `'` |
| Mobile | Yes | Indian mobile (§9.3) |
| Email | No | Valid if filled |
| Interested in | No | Project select, pre-filled from context |
| Configuration | No | Pre-filled from context |
| Message | No | ≤ 500 chars |
| Consent | Yes (not pre-checked) | "I agree to be contacted by Prabhav Construction by call, SMS or WhatsApp, even if my number is on DND." |

**Career form adds:** email (required), position, experience, current location, resume.

Hidden fields: `source`, `formType`, `project`, `unit`, `intent`, `utm_*`, `gclid`, `fbclid`, `landingPage`, `referrer`, honeypot, `renderedAt`.

### 9.3 Validation schema

```ts
// lib/schemas/lead.schema.ts
import { z } from "zod";

const normalizeMobile = (v: string) => v.replace(/\D/g, "").replace(/^(?:91|0)(?=[6-9]\d{9}$)/, "");

export const mobileSchema = z.string().transform(normalizeMobile)
  .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number")
  .refine((v) => !/^(\d)\1{9}$/.test(v), "Enter a valid 10-digit Indian mobile number");

export const nameSchema = z.string().trim()
  .min(2, "Enter your full name").max(60, "Name is too long")
  .regex(/^[A-Za-z][A-Za-z .']*[A-Za-z]$/, "Use letters and spaces only");

export const LeadSchema = z.object({
  fullName: nameSchema,
  mobile: mobileSchema,
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  project: z.string().max(100).optional(),
  unit: z.string().max(50).optional(),
  message: z.string().max(500).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to continue" }) }),
  formType: z.enum(["lead", "career"]),
  intent: z.enum(["enquiry", "site-visit", "brochure", "cost-sheet", "floor-plan"]).optional(),
  source: z.string().max(200),
  tracking: z.record(z.string().max(300)).optional(),
  website: z.string().max(0).optional(),   // honeypot
  renderedAt: z.number(),
  recaptchaToken: z.string().min(10),
});
export type LeadInput = z.infer<typeof LeadSchema>;
```

Accepts `9876543210`, `+91 98765 43210`, `09876543210`, `91-9876543210`; stores 10 digits. `PhoneInput` shows a fixed "+91", `inputMode="numeric"`, `autoComplete="tel-national"`. Errors appear on blur and submit with `aria-invalid` / `aria-describedby`.

### 9.4 Spam protection

1. **Honeypot** `website` field: off-screen, `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden`. If filled → fake success, lead dropped.
2. **Time trap:** submissions < 3s after render → dropped the same way.
3. **reCAPTCHA v3:** action `${formType}_submit`. Server requires `success`, matching `action` and `hostname`, score ≥ 0.5; 0.3–0.5 kept but flagged `review`; < 0.3 dropped.
4. **Rate limit:** 5 per IP per 10 minutes (in-memory LRU, or Upstash Redis on multi-instance serverless).

reCAPTCHA is loaded on first form focus or modal open, not on page load. Badge hidden with CSS, with the required disclosure under every form: "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply."

### 9.5 Submission flow

```
Browser → Zod (client) → grecaptcha.execute → POST /api/lead
/api/lead → rate limit → Zod (server) → honeypot/time trap → verify reCAPTCHA → POST Apps Script (shared secret)
Apps Script → check secret → append row (Leads / Careers) → duplicate flag → optional email
Browser ← { ok: true } → dataLayer.push → /thank-you?type=…
```

The API route keeps the reCAPTCHA secret and Apps Script URL on the server.

### 9.6 API route

```ts
// app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LeadSchema } from "@/lib/schemas/lead.schema";
import { verifyRecaptcha } from "@/lib/lead/verifyRecaptcha";
import { rateLimit } from "@/lib/lead/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) return NextResponse.json({ ok: false, error: "Too many requests. Try again in a few minutes." }, { status: 429 });

  const parsed = LeadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  const lead = parsed.data;

  if (lead.website || Date.now() - lead.renderedAt < 3000) return NextResponse.json({ ok: true });

  const captcha = await verifyRecaptcha(lead.recaptchaToken, `${lead.formType}_submit`);
  if (captcha.score < 0.3) return NextResponse.json({ ok: true });

  const res = await fetch(process.env.GSCRIPT_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    body: JSON.stringify({
      secret: process.env.GSCRIPT_SHARED_SECRET,
      sheet: lead.formType === "career" ? "Careers" : "Leads",
      data: {
        timestamp: new Date().toISOString(),
        fullName: lead.fullName, mobile: lead.mobile, email: lead.email ?? "",
        project: lead.project ?? "", unit: lead.unit ?? "", intent: lead.intent ?? "",
        message: lead.message ?? "", source: lead.source,
        recaptchaScore: captcha.score, quality: captcha.score >= 0.5 ? "ok" : "review",
        ...lead.tracking,
      },
    }),
  });

  if (!res.ok) return NextResponse.json({ ok: false, error: "We couldn't save your details. Please call us instead." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
```

```ts
// lib/lead/verifyRecaptcha.ts
export async function verifyRecaptcha(token: string, expectedAction: string) {
  const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET_KEY!, response: token }),
  }).then((x) => x.json());
  const hostOk = [new URL(process.env.NEXT_PUBLIC_SITE_URL!).hostname, "localhost"].includes(r.hostname);
  if (!r.success || r.action !== expectedAction || !hostOk) return { score: 0 };
  return { score: Number(r.score ?? 0) };
}
```

### 9.7 Google Apps Script (`scripts/google-apps-script/Code.gs`)

Setup:
1. Google Sheet with tabs `Leads` and `Careers` (the script creates missing tabs with headers).
2. Extensions → Apps Script, paste the code.
3. Script properties: `SHARED_SECRET` (= `GSCRIPT_SHARED_SECRET`), optional `NOTIFY_EMAIL`, `RESUME_FOLDER_ID`.
4. Deploy → Web app, execute as **Me**, access **Anyone**. Put the `/exec` URL in `GSCRIPT_WEBHOOK_URL`.
5. After every code change: Manage deployments → Edit → New version.

```js
const HEADERS = {
  Leads: ["timestamp","fullName","mobile","email","project","unit","intent","message","source",
          "utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","fbclid",
          "landingPage","referrer","recaptchaScore","quality","duplicate"],
  Careers: ["timestamp","fullName","mobile","email","position","experience","currentLocation",
          "resumeUrl","message","source","recaptchaScore","quality","duplicate"],
};
// Keep "mobile" as the 3rd column in every tab; isDuplicate() relies on it.

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();
    if (body.secret !== props.getProperty("SHARED_SECRET")) return json({ ok: false, error: "unauthorized" });

    const sheetName = HEADERS[body.sheet] ? body.sheet : "Leads";
    const sheet = getSheet(sheetName);
    const data = body.data || {};

    if (sheetName === "Careers" && data.resumeBase64) data.resumeUrl = saveResume(data, props.getProperty("RESUME_FOLDER_ID"));
    data.duplicate = isDuplicate(sheet, data.mobile) ? "yes" : "";

    sheet.appendRow(HEADERS[sheetName].map((h) => (h === "mobile" ? "'" + (data[h] || "") : data[h] ?? "")));

    const notify = props.getProperty("NOTIFY_EMAIL");
    if (notify) MailApp.sendEmail(notify, `New ${sheetName} enquiry: ${data.fullName}`,
      `${data.fullName}\n${data.mobile}\n${data.project || data.position || ""}\n${data.source}`);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS[name]);
  return sheet;
}

function isDuplicate(sheet, mobile) {
  const last = sheet.getLastRow();
  if (last < 2 || !mobile) return false;
  const start = Math.max(2, last - 200);
  const rows = sheet.getRange(start, 1, last - start + 1, 3).getValues();
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  return rows.some((r) => String(r[2]).replace("'", "") === mobile && new Date(r[0]).getTime() > dayAgo);
}

function saveResume(data, folderId) {
  const blob = Utilities.newBlob(Utilities.base64Decode(data.resumeBase64), data.resumeMime, data.resumeName);
  const file = DriveApp.getFolderById(folderId).createFile(blob);
  delete data.resumeBase64;
  return file.getUrl();
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```

### 9.8 Tracking

`lib/tracking/utm.ts` stores first-touch `utm_*`, `gclid`, `fbclid`, `landingPage` and `referrer` in `sessionStorage`; every form attaches them. On success:

```ts
window.dataLayer?.push({ event: formType === "career" ? "job_application" : "generate_lead", form_type, project, intent, lead_source: source });
```

Job applications use their own event so they don't count as buyer-lead conversions in Google Ads or Meta. Theme changes can be pushed as `theme_change` with `{ theme }` if the business wants to know how many visitors use dark mode.

---

## 10. Design system and theming

### 10.1 Brand colours

| Name | Hex | Role |
|---|---|---|
| Earth brown | `#612f15` | Primary brand colour (given) |
| Shine gold | `#D4AF37` | Accent (see note) |
| White | `#FFFFFF` | Light-theme background (given) |

**Note on "shine gold":** the brief names the colour without a hex value. `#D4AF37` (metallic gold) is used here as the working value; confirm it against the logo or brand guide and change it in one place (`--gold-500`) if it differs.

Supporting shades:

```
brown-50  #f8f1ec   brown-100 #eddccf   brown-500 #8a4a26   brown-700 #612f15 (brand)
brown-800 #4a2310   brown-900 #2a1409   brown-950 #160a04

gold-100  #f7efd2   gold-300  #e5c96a   gold-500  #D4AF37 (brand)
gold-600  #b08f25   gold-700  #8a6f1c
```

Contrast checks (WCAG):
- `#612f15` on white ≈ 11:1 → passes AAA for all text.
- White on `#612f15` ≈ 11:1 → passes.
- `#D4AF37` on white ≈ 2.1:1 → **decoration only** (rules, icons, borders, focus ring). For small gold-tinted text on white use `gold-700 #8a6f1c` (≈ 4.9:1).
- `#D4AF37` on `#612f15` ≈ 5.2:1 → fine for text on brown.
- `#D4AF37` on the dark background `#160a04` ≈ 9:1 → gold becomes the main accent and link colour in dark mode.
- Brown text on gold `#D4AF37` ≈ 5.2:1 → dark-mode primary buttons use gold fill with `brown-900` text.

### 10.2 Semantic tokens (light and dark)

Components never use raw brand colours. They use semantic tokens whose values change with the theme.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | `#ffffff` | `#160a04` (brown-950) | Page background |
| `--surface` | `#faf6f2` | `#211108` | Alternating sections, cards |
| `--surface-raised` | `#ffffff` | `#2c170b` | Modal, dropdown, sticky header |
| `--fg` | `#2a1409` (brown-900) | `#f4ece3` | Body text |
| `--muted` | `#6b5548` | `#bfae9f` | Secondary text |
| `--line` | `#eadfd6` | `#3d2415` | Borders, dividers |
| `--primary` | `#612f15` | `#D4AF37` | Primary buttons, headings, active nav |
| `--primary-fg` | `#ffffff` | `#2a1409` | Text on primary buttons |
| `--primary-hover` | `#4a2310` | `#e5c96a` | Button hover |
| `--accent` | `#D4AF37` | `#D4AF37` | Hairlines, icons, focus ring |
| `--accent-text` | `#8a6f1c` | `#e5c96a` | Small gold text (eyebrow-free labels, prices) |
| `--link` | `#612f15` | `#e5c96a` | Inline links |
| `--footer-bg` | `#612f15` | `#0e0602` | Footer |
| `--footer-fg` | `#f4ece3` | `#bfae9f` | Footer text |

Dark mode is a warm, near-black brown rather than grey, so the brand still reads as brown and gold at night. In dark mode gold takes over the "primary" role because brown on near-black has too little contrast.

### 10.3 Tailwind v4 setup

```css
/* app/globals.css */
@import "tailwindcss";

/* dark: variant follows the data-theme attribute set by next-themes */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

:root {
  color-scheme: light;
  --bg: #ffffff;  --surface: #faf6f2;  --surface-raised: #ffffff;
  --fg: #2a1409;  --muted: #6b5548;    --line: #eadfd6;
  --primary: #612f15; --primary-fg: #ffffff; --primary-hover: #4a2310;
  --accent: #D4AF37;  --accent-text: #8a6f1c; --link: #612f15;
  --footer-bg: #612f15; --footer-fg: #f4ece3;
}

[data-theme="dark"] {
  color-scheme: dark;
  --bg: #160a04;  --surface: #211108;  --surface-raised: #2c170b;
  --fg: #f4ece3;  --muted: #bfae9f;    --line: #3d2415;
  --primary: #D4AF37; --primary-fg: #2a1409; --primary-hover: #e5c96a;
  --accent: #D4AF37;  --accent-text: #e5c96a; --link: #e5c96a;
  --footer-bg: #0e0602; --footer-fg: #bfae9f;
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-primary: var(--primary);
  --color-primary-fg: var(--primary-fg);
  --color-primary-hover: var(--primary-hover);
  --color-accent: var(--accent);
  --color-accent-text: var(--accent-text);
  --color-link: var(--link);
  --color-footer-bg: var(--footer-bg);
  --color-footer-fg: var(--footer-fg);

  --font-display: var(--font-bodoni), Georgia, serif;
  --font-sans: var(--font-figtree), system-ui, sans-serif;
  --radius-card: 0.75rem;
  --radius-control: 0.5rem;
}

body { background: var(--color-bg); color: var(--color-fg); }
```

Components then use `bg-bg text-fg`, `bg-primary text-primary-fg hover:bg-primary-hover`, `border-line`, etc. They switch themes automatically, so the `dark:` variant is only needed for the few one-off exceptions (hero overlay, logo swap).

### 10.4 Theme toggle

**Behaviour**
1. First visit follows the operating system (`prefers-color-scheme`).
2. Clicking the toggle switches between light and dark and saves the choice in `localStorage` (handled by `next-themes`). The saved choice wins over the system setting on later visits.
3. No flash of the wrong theme: `next-themes` injects a tiny blocking script that sets `data-theme` on `<html>` before first paint.
4. Colour transitions are disabled during the switch (`disableTransitionOnChange`) so the page doesn't animate every border and background at once.

```tsx
// components/theme/ThemeProvider.tsx
"use client";
import { ThemeProvider as NextThemes } from "next-themes";
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}
```

```tsx
// app/layout.tsx (excerpt)
<html lang="en-IN" suppressHydrationWarning>
  <body className={`${bodoni.variable} ${figtree.variable} font-sans`}>
    <ThemeProvider>{/* header, main, footer, LeadModalProvider */}</ThemeProvider>
  </body>
</html>
```

```tsx
// components/theme/ThemeToggle.tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Reserve the space before mount so the header doesn't shift
  if (!mounted) return <span className="inline-block size-11" aria-hidden />;

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg
                 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
```

The icon shows the theme you'll switch *to* (moon in light mode, sun in dark mode), which is the most common convention. The button is 44×44px for touch.

**Logo swap without flash** (CSS, not JavaScript, so the right logo is in the first paint):

```tsx
// components/theme/ThemedLogo.tsx
<>
  <Image src="/logo-light.svg" alt="Prabhav Construction" width={180} height={48} priority className="block dark:hidden" />
  <Image src="/logo-dark.svg"  alt="" aria-hidden width={180} height={48} priority className="hidden dark:block" />
</>
```

**Browser UI colour** follows the system setting (it can't read the saved toggle), set in the root layout:

```ts
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#160a04" },
  ],
};
```

### 10.5 Hero in dark mode

The hero image has a white fade baked into its top third. In dark mode that white band would glare against the dark page. Two options, in order of preference:

1. **Dark variant (best result).** Ask the design/3D team to export `hero-dark.jpg` from the same render with the top fading into `#160a04` instead of white (a dusk sky suits this well). Both images are rendered with `fill`; the light one gets `priority`. CSS shows one and hides the other (`dark:hidden` / `hidden dark:block`).
2. **Overlay (no new asset).** Keep one image and lay a gradient over it in dark mode only:

```tsx
<div className="pointer-events-none absolute inset-0 hidden dark:block
                bg-[linear-gradient(to_bottom,var(--bg)_0%,var(--bg)_28%,transparent_55%)]" />
```

Option 2 costs nothing but leaves a slightly hazy transition where the sky meets the gradient; check it on real screens before launch. Headline colour uses `text-primary`, so it becomes gold automatically in dark mode.

### 10.6 Images and embeds in dark mode

- Photography and renders stay as they are (no filters or dimming).
- White-background images (floor plans, RERA QR codes, certificates, partner logos) sit on a white card with padding in both themes so they don't look like glowing rectangles.
- Google Maps iframes can't be themed; the click-to-load placeholder is a themed static image, and the live map is light in both modes.
- OG images and the web manifest use the light brand colours regardless of theme.

### 10.7 Typography

- **Display: Bodoni Moda.** High-contrast serif that pairs with the metallic gold and reads as crafted and premium. H1–H3 only, weights 500–600.
- **Body/UI: Figtree.** Friendly, very legible at small sizes on phones.

Scale 1.25 (rem): 0.8 / 1 / 1.25 / 1.563 / 1.953 / 2.441 / 3.052 (H1 desktop), H1 mobile 2.2. Body 1rem / 1.65, max ~70ch. Sentence case; no all-caps labels above headings. In dark mode body weight stays the same but `--fg` is off-white rather than pure white to reduce glare.

### 10.8 Layout and components

- Container 1240px, gutters 20px mobile / 32px desktop.
- Section spacing 64px mobile / 112px desktop; alternate `bg` and `surface`.
- Cards: 1px `line` border, no drop shadow at rest (shadows disappear on dark backgrounds anyway); hover scales the image 1.03 and turns the border `accent`.
- Buttons: primary (`bg-primary text-primary-fg`), outline (`border-accent text-fg`), ghost. Minimum height 44px.
- Status badges (both themes via tokens): Upcoming (`surface` + `primary` text), Ongoing (gold tint + `accent-text`), Completed (`surface` + `muted`).
- Motion: one hero entrance; everything else responds to user action only. Respect `prefers-reduced-motion`.
- Focus ring: 2px `accent`, 2px offset, visible in both themes.

**UI reference:** reuse the reference image supplied for this client (if any) to check layout rhythm, card style and header treatment against this section before design sign-off.

---

## 11. SEO

### 11.1 Metadata

```ts
// lib/seo/metadata.ts
export function buildMetadata({ title, description, path, image, noindex }: MetaInput): Metadata {
  const url = new URL(path, process.env.NEXT_PUBLIC_SITE_URL).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "Prabhav Construction", locale: "en_IN",
                 images: image ? [{ url: image, width: 1200, height: 630 }] : undefined },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  };
}
```

Root layout also sets `metadataBase`, `title.template: "%s | Prabhav Construction"`, `applicationName`, `publisher`, `formatDetection: { telephone: false }`, `verification.google`, `other: { "geo.region": "IN-MH" }`, and `<html lang="en-IN">`.

| Page | Title | Description pattern |
|---|---|---|
| Home | Prabhav Construction: Residential, Commercial & Industrial Projects in {region} | Who, what, where, proof point |
| Projects | Projects in {stations} | Count + categories + stations |
| Project | {name}: {configs} {category noun} in {locality} | Configs, price from, RERA, possession, one amenity |
| Station | Flats, Shops & Industrial Units near {station} Station | Count and types at that station |
| Career | Careers at Prabhav Construction | Open roles, departments |
| Contact | Contact Prabhav Construction | Address, phone, hours |

### 11.2 On-page rules

1. One H1 per page; headings in order.
2. Descriptive `alt` from JSON; decorative images `alt=""`.
3. Descriptive image file names.
4. Internal linking: project → station page, type page, related projects; station pages → all their projects; footer → all active station pages.
5. Breadcrumbs everywhere except Home.
6. Lowercase hyphenated URLs, no trailing slash, `redirects` array for renamed slugs.
7. Real `<a href>` links for everything crawlable.
8. Custom 404 with links to projects and contact.
9. Station-specific copy on station pages.
10. Theme doesn't affect SEO: both themes render identical HTML; only CSS variables differ.

### 11.3 Structured data (JSON-LD)

| Where | Types |
|---|---|
| All pages | `Organization` (`@id: /#organization`), `WebSite` (`@id: /#website`) |
| Home, Contact | `HomeAndConstructionBusiness` per office (address, geo, hours, telephone, `parentOrganization`) |
| Non-home pages | `BreadcrumbList` |
| Residential project | `ApartmentComplex` (address, geo, `amenityFeature`, image, `containsPlace` unit types as `Apartment` with `floorSize`, `numberOfRooms`) + `Offer` (`priceCurrency: "INR"`) |
| Commercial / industrial project | `Place` with a descriptive `additionalType`, address, geo, image, description |
| Listing / station pages | `ItemList` of project URLs |
| Pages with FAQs | `FAQPage` |
| Job pages | `JobPosting` (`datePosted`, `validThrough`, `employmentType`, `hiringOrganization`, `jobLocation`, `baseSalary` if disclosed) |
| About | `AboutPage` |
| Contact | `ContactPage` |

```ts
export const organizationLd = (site: Site) => ({
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: "Prabhav Construction",
  legalName: site.legalName,
  url: site.url,
  logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 512, height: 512 },
  foundingDate: site.foundingYear,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", ...site.headOffice.address, addressCountry: "IN" },
  sameAs: site.social,
  contactPoint: [{ "@type": "ContactPoint", telephone: site.phone, contactType: "sales", areaServed: "IN", availableLanguage: ["en", "hi", "mr"] }],
});
```

Expectations: Google shows rich results for Breadcrumb, Organization, LocalBusiness and JobPosting. There is no real-estate-project rich result, and FAQ rich results have been limited to authoritative government and health sites since 2023. Project and FAQ schema still help search engines and AI assistants understand the site. Validate every template in the Rich Results Test and Schema.org validator.

### 11.4 `sitemap.xml`

```ts
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const staticPages = ["", "/about-us", "/projects", "/career", "/contact-us"]
    .map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 }));
  const projects = getAllProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`, lastModified: new Date(p.updatedAt), changeFrequency: "weekly" as const, priority: 0.9,
    images: [p.images.cover.src, ...p.images.gallery.slice(0, 5).map((g) => g.src)].map((s) => `${base}${s}`),
  }));
  const stations = getActiveStations().map((s) => ({ url: `${base}/projects/station/${s.slug}`, priority: 0.8 }));
  const types = getActiveCategories().map((c) => ({ url: `${base}/projects/type/${c}`, priority: 0.7 }));
  const jobs = getOpenJobs().map((j) => ({ url: `${base}/career/${j.slug}`, lastModified: new Date(j.postedAt), priority: 0.5 }));
  return [...staticPages, ...projects, ...stations, ...types, ...jobs];
}
```

Excluded: `/thank-you`, `/api/*`, query-string views, closed jobs.

### 11.5 `robots.txt`

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
```

AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are allowed by default so the company can be cited by AI assistants; add per-agent `disallow` rules if the business decides otherwise.

### 11.6 Web app manifest

```ts
// app/manifest.ts
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prabhav Construction",
    short_name: "Prabhav",
    description: "Residential, commercial and industrial projects by Prabhav Construction.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#612f15",
    lang: "en-IN",
    categories: ["business", "lifestyle"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
```

### 11.7 `llms.txt` and `llms-full.txt`

`llms.txt` is a proposed convention (not an official standard; adoption is uneven) for giving language models a clean Markdown summary. Both files are route handlers generated from `/data`, so they stay in sync.

```md
# Prabhav Construction

> Real estate developer building residential, commercial and industrial projects in {region}. All projects are MahaRERA registered.

## Projects
- [Prabhav Residency, Virar West](https://prabhavconstruction.in/projects/prabhav-residency-virar): 2 & 3 BHK, ongoing, from ₹55 L, possession Dec 2028

## Projects by station
- [Virar](https://prabhavconstruction.in/projects/station/virar): 4 projects

## Company
- [About](https://prabhavconstruction.in/about-us)
- [Careers](https://prabhavconstruction.in/career)
- [Contact](https://prabhavconstruction.in/contact-us): phone, office address, hours
```

`/llms-full.txt` adds each project's full details (configurations, areas, prices, amenities, connectivity, RERA numbers, FAQs).

```ts
// app/llms.txt/route.ts
export const dynamic = "force-static";
export function GET() {
  return new Response(buildLlmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
```

### 11.8 Open Graph images

`ImageResponse`, 1200×630: project cover, `#612f15` bar with project name, locality and "from ₹X" in white, gold hairline, logo. Site default uses the hero image.

### 11.9 Other SEO and trust items

| Item | Detail |
|---|---|
| Search Console + Bing Webmaster Tools | Verify, submit sitemap |
| Google Business Profile | One per office; NAP must match `site.json` exactly |
| IndexNow | Optional ping on deploy |
| `security.txt` | Contact email |
| Canonical host | `www` ↔ apex and `http` → `https` redirects at the host |
| Hreflang | Only if a Marathi/Hindi version is added |
| RERA compliance | MahaRERA number and QR code on every project page and any page advertising a project; disclaimer page in footer |

---

## 12. Performance and accessibility

**Performance**
1. All pages static; only `/api/lead` runs on the server.
2. Hero image `priority` + `fetchPriority="high"`; everything else lazy.
3. Fonts via `next/font`, `display: swap`, `latin` subset.
4. Click-to-load maps and lite YouTube embeds.
5. reCAPTCHA on first form interaction only.
6. GTM `afterInteractive`; audit tags quarterly.
7. Client JS limited to header/drawer, theme toggle, filters, gallery, modal/forms.
8. Theme switching is CSS-variable based, so it adds no layout work and no extra CSS per component.
9. Budgets: JS < 170 KB gzipped on project pages; hero < 200 KB AVIF at 1080w.

**Accessibility (WCAG 2.2 AA)**
1. Keyboard-operable nav, dropdown, filters, modal (focus trap, Escape, focus return), gallery, theme toggle.
2. Labels on every input; errors in `aria-live="polite"`.
3. Contrast verified in **both** themes (§10.1); gold is never used for small text on white.
4. Touch targets ≥ 44×44px.
5. `prefers-reduced-motion` respected.
6. Skip-to-content link.
7. Theme toggle has a descriptive `aria-label` that states the action.

---

## 13. Environment and deployment

```
# .env.example
NEXT_PUBLIC_SITE_URL=https://www.prabhavconstruction.in
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
GSCRIPT_WEBHOOK_URL=
GSCRIPT_SHARED_SECRET=
NEXT_PUBLIC_GTM_ID=
GOOGLE_SITE_VERIFICATION=
```

The domain is a placeholder; replace it with the real one.

```ts
// next.config.ts (highlights)
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  trailingSlash: false,
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      ],
    }];
  },
  async redirects() { return []; },
};
```

**Deploy:** Vercel; every push to `main` rebuilds and re-derives stations, filters, sitemap and llms.txt from `/data`.

**Static-export fallback:** with `output: "export"` the `/api/lead` route disappears. The browser then posts directly to Apps Script, and reCAPTCHA verification plus name/mobile/honeypot checks move into Apps Script (`UrlFetchApp` to `siteverify`, secret in Script Properties). The theme toggle works the same in a static export.

---

## 14. Content workflow

**Add a project:** create `/data/projects/<slug>.json` (§5.3), add images and brochure, confirm the station exists in `stations.json`, run `npm run validate`, commit. Page, card, filters, nav dropdown, station page, sitemap, llms.txt and OG image update on deploy.

**Change status:** edit `status` and `updatedAt`.

**Add or close a job:** edit `jobs.json` (`open: true/false`).

**New logo or brand colour:** replace `logo-light.svg` / `logo-dark.svg`; colours change only in the token blocks in `globals.css`.

---

## 15. Launch checklist

- [ ] "Shine gold" hex confirmed against the brand guide
- [ ] Light and dark logos supplied
- [ ] Hero checked in dark mode (dark variant exported, or overlay approved)
- [ ] Every page reviewed in both themes, including modal, dropdown, filters, forms, errors and footer
- [ ] Theme choice persists across pages and reloads; no flash of the wrong theme on a hard refresh
- [ ] All `/data` files pass `npm run validate`; sample data replaced with real content and stations
- [ ] Every project shows a MahaRERA number and QR code
- [ ] Forms tested: valid submit, invalid mobile (`12345`, `5876543210`), honeypot filled, sub-3-second submit, rate limit
- [ ] Rows land in `Leads` / `Careers` with UTM values; duplicate flag works; notification email arrives
- [ ] Production reCAPTCHA keys registered for the live domain
- [ ] `generate_lead` and `job_application` each fire once per submission in GTM preview
- [ ] Rich Results Test passes for Home, a project, a station page, a job
- [ ] `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt` reachable
- [ ] Search Console verified, sitemap submitted
- [ ] Lighthouse mobile ≥ 90 on Home, Projects, one project page (both themes)
- [ ] Keyboard-only walkthrough including the theme toggle
- [ ] Privacy policy (DPDP Act 2023), terms and RERA disclaimer published and linked in the footer
