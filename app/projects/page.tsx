import type { Metadata } from "next";

import PageHero from "@/components/common/PageHero";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import ProcessSection from "@/components/common/ProcessSection";
import CtaSection from "@/components/common/CtaSection";
import Testimonials from "@/components/common/Testimonials";
import { projects, statusMeta, statusOrder } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Projects — Upcoming, Ongoing & Completed",
  description:
    "Explore every Prabhav Construction development across Mumbai and Thane — upcoming launches, projects under construction, and delivered residences and workplaces. All MahaRERA registered.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Prabhav Construction Projects — Upcoming, Ongoing & Completed",
    description:
      "Residential and commercial developments across the Mumbai Metropolitan Region, with current status stated plainly for each.",
    url: `${site.url}/projects`,
  },
};

/** Lists every project so search engines can crawl the whole portfolio. */
const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Prabhav Construction Projects",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${site.url}/projects/${project.slug}`,
    name: project.name,
  })),
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />

      <PageHero
        eyebrow="Our projects"
        title="Everything we have built, are building, or are about to start"
        description="Twenty-five years of work across the Mumbai Metropolitan Region. Each project below carries its current status, configuration and possession date exactly as filed with MahaRERA."
        crumbs={[{ label: "Projects" }]}
      >
        <dl className="grid max-w-2xl grid-cols-3 gap-6 border-t border-cream/15 pt-7">
          {statusOrder.map((status) => (
            <div key={status}>
              <dt className="text-xs tracking-wide text-cream/65 uppercase">
                {statusMeta[status].label}
              </dt>
              <dd className="mt-1 font-display text-2xl text-gold-200">
                {projects.filter((project) => project.status === status).length}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <ProjectsExplorer />
      <ProcessSection tone="white" />

      <CtaSection
        eyebrow="Not sure where to start"
        title="Tell us what you need and we will shortlist for you"
        description="Budget, locality, configuration and timeline — give us those four and we will come back with the two or three options that actually fit."
        ctaLabel="Get a Personal Shortlist"
        ctaSubtitle="Share your requirement and our team will send across a shortlist with plans and pricing."
      />

      <Testimonials />
    </>
  );
}
