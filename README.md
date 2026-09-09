# Prabhav Construction — website

A fully static marketing site for Prabhav Construction, built with Next.js 16
(App Router), TypeScript and Tailwind CSS v4. There is no backend: `next build`
emits plain HTML/CSS/JS into `out/`, and every form posts directly to a Google
Apps Script Web App that writes to a Google Sheet and sends e-mail.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the two values
npm run dev                  # http://localhost:3000
```

Build the static site:

```bash
npm run build                # output lands in ./out
```

Upload the contents of `out/` to any static host — Netlify, Vercel, Cloudflare
Pages, S3, or plain nginx/Apache. `trailingSlash` is enabled, so every route is
a real `index.html` and no server rewrites are needed.

---

## Deploying to Hostinger (or any cPanel host)

**Build on your machine, upload the result.** This site is a static export, so
the server runs no Node at all — it only serves files. Do not use Hostinger's
git-build/Node.js app deploy; it is slower, more fragile, and unnecessary here.

1. `npm run build`
2. Upload **the contents of `out/`** (not the folder itself) into `public_html/`
   via hPanel → File Manager, or over SFTP.
3. Done. `public/.htaccess` is copied into `out/` automatically and handles
   HTTPS, the `www` → apex redirect, the trailing-slash canonical, the custom
   404 page, gzip and cache headers.

> Environment variables are inlined **at build time**. Set them in `.env.local`
> on your machine and rebuild — setting them in hPanel does nothing for a static
> export.

### Building on the server

Hostinger's build image ships glibc older than 2.29, so Next's native SWC binary
cannot load there. Two failures follow from that, both already handled — a
server-side `npm run build` works as-is:

| Build-log error | Cause | Fix in place |
| --- | --- | --- |
| `Failed to load next.config.ts` → `ERR_MODULE_NOT_FOUND … next.config.compiled.js` | A TypeScript config has to be transpiled before it can be read, and that needs the native binary | The config is plain JS: **`next.config.mjs`**. Do not rename it back to `.ts`. |
| `Turbopack is not supported on this platform … native bindings are not available` | Turbopack, the Next 16 default bundler, is a native binary with no WASM fallback | **`npm run build` is `next build --webpack`.** Webpack falls back to the WASM compiler and works anywhere. |

`npm run build:turbo` is the Turbopack build — faster, but only on a modern
glibc, so use it locally and never as the deploy command.

Expect a server build to take several minutes: without native bindings, Next
compiles through `@next/swc-wasm-nodejs`, which is considerably slower. The
output is identical either way.

---

## Environment variables

Both live in `.env.local` and are inlined at build time — **restart the dev
server / rebuild after changing them**.

| Variable | What it is |
| --- | --- |
| `NEXT_PUBLIC_APPS_SCRIPT_URL` | The `/exec` URL of the deployed Apps Script Web App |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 **site** key (the secret key lives in Apps Script) |

Full setup instructions: [`google-apps-script/README.md`](./google-apps-script/README.md).

Without these the site still builds and runs; forms show a message asking the
visitor to call instead, and reCAPTCHA is skipped.

---

## Adding a new project

Everything about a project lives in one place: **[`data/projects.ts`](./data/projects.ts)**.

1. Copy an existing object in the `projects` array and edit the fields.
2. Set a unique `slug` — this becomes the URL, `/projects/<slug>`.
3. Set `status` to `"upcoming"`, `"ongoing"` or `"completed"`.
4. Set `featured: true` to also surface it on the home page.
5. Drop the images into `public/images/projects/<name>/` and reference them as
   `/images/projects/<name>/hero.jpg`.
6. `npm run build`.

That single edit gives you the listing card, the filter counts, a full detail
page, the footer link, the "project of interest" dropdown in every form, the
sitemap entry and the page-level SEO tags.

**Images are optional at first.** Any file that does not exist yet falls back to
a branded placeholder panel rather than a broken image, so you can publish the
data now and add photography later.

---

## Editing the rest of the content

| File | Controls |
| --- | --- |
| [`data/site.ts`](./data/site.ts) | Company name, phone numbers, e-mail, office address, map embed, social links, nav menu, hero stats |
| [`data/projects.ts`](./data/projects.ts) | Every project (see above) |
| [`data/company.ts`](./data/company.ts) | About page: company copy, vision/mission/values, founder, team, process, timeline, awards, "why Prabhav" |
| [`data/careers.ts`](./data/careers.ts) | Career page: why-join-us, life at Prabhav, benefits, all job openings, form dropdown options |
| [`data/testimonials.ts`](./data/testimonials.ts) | Testimonial carousel |
| [`data/faqs.ts`](./data/faqs.ts) | Contact and home page FAQs (also emitted as FAQ structured data) |
| [`data/legal.ts`](./data/legal.ts) | Privacy Policy, Terms & Conditions and Disclaimer popup copy |

> ⚠️ The contact details, office address, map embeds and MahaRERA numbers
> currently in `data/site.ts` and `data/projects.ts` are **placeholders**.
> Replace them before going live.

---

## How things are wired

### CTA popups
Every call-to-action on the site is a `<CtaButton label="…">`
([`components/ui/CtaButton.tsx`](./components/ui/CtaButton.tsx)). Clicking one
opens the enquiry popup with **the button's own label as the popup heading**, so
"Download Brochure" opens a dialog headed *Download Brochure*. Pass `project` to
tag the enquiry with a project name, or `title`/`subtitle` to override the copy.

### Legal popups
`<LegalLink doc="privacy">Privacy Policy</LegalLink>` opens the corresponding
document from `data/legal.ts` in a dialog. Used in the footer and in every form's
consent line.

### Forms and validation
- Mandatory everywhere: **full name** and **mobile number**. Everything else is
  optional, and validated only if filled in.
- Mobile numbers are validated as Indian mobiles — 10 digits starting 6/7/8/9,
  accepting `+91`, `0` and spacing variants ([`lib/validation.ts`](./lib/validation.ts)).
- reCAPTCHA v3 runs invisibly on submit; the script is loaded lazily on first
  form interaction, and the badge is hidden with the required attribution shown
  in the form footer instead.
- CVs on the career form: PDF/Word, max 5 MB, uploaded to Drive by the script.

### SEO
Per-page `title`/`description`/canonical/Open Graph via the Metadata API,
`sitemap.xml` and `robots.txt` generated at build time, and JSON-LD for
`RealEstateAgent`, `WebSite`, `FAQPage`, `ItemList`, `BreadcrumbList` and
`Residence` (per project). Semantic headings, descriptive alt text, a skip link
and `prefers-reduced-motion` support throughout.

---

## Project structure

```
app/                    Routes (App Router)
  page.tsx              Home
  about-us/             About Us
  projects/             Projects listing
  projects/[slug]/      Generated project pages
  career/               Career
  contact-us/           Contact Us
  sitemap.ts robots.ts  Generated at build time
components/
  layout/               Header, Footer, floating contact bar
  home/ about/ career/  Page-specific sections
  projects/             Cards, gallery, filters, enquiry panel
  common/               Sections reused across pages
  forms/                Enquiry form, popup, shared fields
  legal/                Legal popup + links
  providers/            Enquiry + legal popup context
  ui/                   Buttons, icons, modal, images, section shells
data/                   All editable content (see table above)
lib/                    Validation, reCAPTCHA, form transport, config
google-apps-script/     Backend script + setup guide
```

---

## Notes

- The design reference images now live in `design-references/` at the repo root.
  They used to sit in `public/Refrences/`, which meant they were published with
  the site; they are kept out of the build output now.
- Image optimisation is disabled (`images.unoptimized`), which a static export
  requires. Compress images before adding them to `public/`.
- `npm run lint` runs ESLint directly — `next lint` was removed in Next.js 16.
- `npm run build` deliberately uses Webpack so the same command works locally and
  on hosts without a modern glibc. Use `npm run build:turbo` for a fast local
  build.
