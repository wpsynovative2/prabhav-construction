import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectEnquiryPanel from "@/components/projects/ProjectEnquiryPanel";
import ProjectCard from "@/components/projects/ProjectCard";
import CtaSection from "@/components/common/CtaSection";
import { getProject, projects, statusMeta } from "@/data/projects";
import { site } from "@/data/site";

/** Static export: every project page is generated at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.seo.title,
    description: project.seo.description,
    keywords: project.seo.keywords,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "website",
      title: project.seo.title,
      description: project.seo.description,
      url: `${site.url}/projects/${project.slug}`,
      images: [{ url: project.heroImage, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  const meta = statusMeta[project.status];
  const related = projects
    .filter((item) => item.slug !== project.slug)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.name,
    description: project.seo.description,
    url: `${site.url}/projects/${project.slug}`,
    image: `${site.url}${project.heroImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: project.location.address,
      addressLocality: project.location.city,
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    amenityFeature: project.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.name,
      value: true,
    })),
    provider: { "@id": `${site.url}/#organization` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${site.url}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${site.url}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd]) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pt-12 pb-16 sm:pt-14 lg:pt-16 lg:pb-20">
        <div className="absolute inset-0">
          <Media
            src={project.heroImage}
            alt=""
            fallbackLabel={project.name}
            className="absolute inset-0"
            imageClassName="object-cover opacity-30"
            sizes="100vw"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-br from-ink via-ink/90 to-ink/60"
          />
        </div>

        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-cream/65">
              <li>
                <Link href="/" className="transition hover:text-gold-300">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <Icon name="chevron-right" size={13} aria-hidden="true" />
                <Link href="/projects" className="transition hover:text-gold-300">
                  Projects
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <Icon name="chevron-right" size={13} aria-hidden="true" />
                <span aria-current="page" className="text-cream/80">
                  {project.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold-600 px-4 py-1.5 text-2xs font-semibold tracking-[0.16em] text-white uppercase">
              {meta.badge}
            </span>
            <span className="rounded-full border border-cream/20 px-4 py-1.5 text-xs text-cream/80">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-cream/72">
              <Icon name="map-pin" size={14} className="text-gold-400" />
              {project.location.locality}, {project.location.city}
            </span>
          </div>

          <h1 className="mt-6 font-display text-display-lg text-balance text-cream">
            {project.name}
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-pretty text-cream/80">
            {project.tagline}
          </p>

          <dl className="mt-9 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-cream/15 pt-8 sm:grid-cols-4">
            <div>
              <dt className="text-xs tracking-wide text-cream/60 uppercase">
                Configuration
              </dt>
              <dd className="mt-1.5 font-display text-lg text-cream">
                {project.configuration}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-cream/60 uppercase">
                Price
              </dt>
              <dd className="mt-1.5 font-display text-lg text-gold-200">
                {project.priceLabel}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-cream/60 uppercase">
                Possession
              </dt>
              <dd className="mt-1.5 font-display text-lg text-cream">
                {project.possession}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-cream/60 uppercase">
                MahaRERA
              </dt>
              <dd className="mt-1.5 font-display text-lg text-cream">
                {project.reraNumber}
              </dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <CtaButton
              label="Request Price & Floor Plans"
              subtitle={`Leave your details and we will send the ${project.name} price list and floor plans right away.`}
              project={project.name}
              source={`Project hero — ${project.name}`}
              size="lg"
            />
            {project.brochureUrl ? (
              <ButtonLink
                href={project.brochureUrl}
                external
                variant="outlineInvert"
                size="lg"
              >
                <Icon name="download" size={18} />
                Download brochure
              </ButtonLink>
            ) : (
              <CtaButton
                label="Download Brochure"
                subtitle={`Tell us where to send it and the ${project.name} brochure will be in your inbox within minutes.`}
                project={project.name}
                source={`Project hero brochure — ${project.name}`}
                variant="outlineInvert"
                size="lg"
              />
            )}
          </div>
        </Container>
      </section>

      {/* Overview + enquiry panel */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div>
              <ProjectGallery project={project} />

              <div className="mt-12">
                <Eyebrow>Overview</Eyebrow>
                <h2 className="mt-5 font-display text-display-md text-balance text-ink">
                  About {project.name}
                </h2>
                <div className="mt-6 space-y-4 text-base text-pretty text-ink-muted">
                  {project.overview.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Quick facts */}
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-4xl bg-line sm:grid-cols-3">
                {project.facts.map((fact) => (
                  <div key={fact.label} className="bg-white px-6 py-6">
                    <dt className="text-xs tracking-wide text-ink-muted uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-xl text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <ProjectEnquiryPanel project={project} />
          </div>
        </Container>
      </Section>

      {/* Highlights */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Highlights"
            title="What makes this project different"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.highlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={(index % 3) * 80} className="h-full">
                <div className="flex h-full flex-col rounded-4xl border border-line bg-cream p-7 transition hover:border-gold-300 hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                    <Icon name={highlight.icon} size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-ink">
                    {highlight.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-ink-muted">
                    {highlight.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Amenities */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="Amenities"
            title={`${project.amenities.length} amenities, all of them planned in`}
            description="Not a list bolted on at the end — each of these was allocated space in the drawings before the first slab was designed."
          />

          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {project.amenities.map((amenity, index) => (
              <Reveal key={amenity.name} delay={(index % 4) * 50} as="li">
                <div className="flex h-full items-center gap-3 rounded-3xl border border-line bg-white px-4 py-4 transition hover:border-gold-300">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                    <Icon name={amenity.icon} size={18} />
                  </span>
                  <span className="text-sm leading-snug text-ink">
                    {amenity.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Floor plans */}
      {project.floorPlans.length > 0 ? (
        <Section tone="white">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="Floor plans"
                title="Choose the layout that fits how you live"
                description="Carpet areas are stated as defined under RERA. Full dimensioned plans are shared on request."
              />
              <Reveal delay={80}>
                <CtaButton
                  label="Get Detailed Floor Plans"
                  subtitle={`Tell us which configuration interests you and we will send the dimensioned ${project.name} plans.`}
                  project={project.name}
                  source={`Floor plans — ${project.name}`}
                  variant="outline"
                />
              </Reveal>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.floorPlans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 80} className="h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-cream shadow-soft">
                    <div className="relative aspect-4/3 bg-white">
                      <Media
                        src={plan.image}
                        alt={`${plan.name} floor plan — ${project.name}`}
                        fallbackLabel={plan.name}
                        className="absolute inset-0"
                        imageClassName="object-contain p-4"
                        sizes="(max-width: 640px) 100vw, 380px"
                      />
                    </div>
                    <div className="border-t border-line p-6">
                      <h3 className="font-display text-lg text-ink">{plan.name}</h3>
                      <p className="mt-1 text-sm text-ink-muted">
                        {plan.carpetArea}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Specifications */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Specifications"
            title="Exactly what goes into the building"
            description="The same specification list that forms part of your agreement for sale — published here so you can compare before you visit."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {project.specifications.map((group, index) => (
              <Reveal key={group.group} delay={(index % 2) * 80} className="h-full">
                <div className="h-full rounded-4xl border border-line bg-white p-7">
                  <h3 className="font-display text-xl text-ink">{group.group}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-px w-10 bg-gold-400"
                  />
                  <dl className="mt-5 space-y-4">
                    {group.items.map((item) => (
                      <div key={item.label} className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-4">
                        <dt className="text-xs tracking-wide text-ink-muted uppercase">
                          {item.label}
                        </dt>
                        <dd className="text-sm text-ink">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Location */}
      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Location"
                title={`Where ${project.name} sits`}
                description={project.location.address}
              />

              <ul className="mt-9 space-y-3">
                {project.connectivity.map((item, index) => (
                  <Reveal key={item.label} delay={index * 45} as="li">
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-cream px-5 py-3.5">
                      <span className="flex items-center gap-3 text-sm text-ink">
                        <Icon name="map-pin" size={16} className="shrink-0 text-gold-500" />
                        {item.label}
                      </span>
                      <span className="shrink-0 font-medium text-gold-700">
                        {item.distance}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={100}>
                <ButtonLink
                  href={project.location.directionsUrl}
                  external
                  variant="outline"
                  className="mt-7"
                >
                  <Icon name="external" size={17} />
                  Open in Google Maps
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal delay={80}>
              <div className="h-full min-h-[26rem] overflow-hidden rounded-4xl border border-line shadow-soft">
                <iframe
                  src={project.location.mapEmbedUrl}
                  title={`Map showing ${project.name}, ${project.location.locality}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full min-h-[26rem] w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Visit the site"
        title={`See ${project.name} in person`}
        description="Walk the site, look at the sample finishes and meet the engineer running the build. Site visits run seven days a week, by appointment."
        ctaLabel="Book a Site Visit"
        ctaSubtitle={`Tell us when suits you and we will confirm your ${project.name} site visit within one working day.`}
        project={project.name}
        image={project.heroImage}
      />

      {/* Related projects */}
      <Section tone="cream">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="More from Prabhav"
              title="Other projects you may want to see"
            />
            <Reveal delay={60}>
              <ButtonLink href="/projects" variant="outline" withArrow>
                View all projects
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80}>
                <ProjectCard project={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
