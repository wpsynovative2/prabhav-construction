import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/projects/LandingPage";
import { getActiveCategories, getAllProjects } from "@/lib/data/projects";
import { stations } from "@/lib/data/stations";
import { site } from "@/lib/data/content";
import { CategorySchema, type Category } from "@/lib/schemas/project.schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { CATEGORY_LABEL } from "@/lib/utils";

export const dynamicParams = false;

const COPY: Record<Category, { title: string; intro: string; noun: string }> = {
  residential: { title: "Residential projects", intro: "Apartments and row houses built for everyday comfort.", noun: "homes" },
  commercial: { title: "Commercial projects", intro: "High-street shops and offices where footfall meets visibility.", noun: "shops and offices" },
  industrial: { title: "Industrial projects", intro: "Galas and warehouses with the height, load and access businesses need.", noun: "galas and warehouses" },
};

export function generateStaticParams() {
  return getActiveCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/projects/type/[category]">): Promise<Metadata> {
  const parsed = CategorySchema.safeParse((await params).category);
  if (!parsed.success) return {};
  const c = parsed.data;
  const count = getAllProjects().filter((p) => p.category === c).length;
  return buildMetadata({
    title: `${CATEGORY_LABEL[c]} Projects by Prabhav Construction`,
    description: `${count} RERA-registered ${COPY[c].noun} near Western line stations. ${COPY[c].intro}`,
    path: `/projects/type/${c}`,
  });
}

export default async function TypePage({ params }: PageProps<"/projects/type/[category]">) {
  const parsed = CategorySchema.safeParse((await params).category);
  if (!parsed.success) notFound();
  const c = parsed.data;
  const projects = getAllProjects().filter((p) => p.category === c);
  if (!projects.length) notFound();
  const stationNames = Object.fromEntries(stations.map((st) => [st.slug, st.name]));
  return (
    <LandingPage
      title={COPY[c].title}
      intro={COPY[c].intro}
      crumbs={[
        { name: "Projects", href: "/projects" },
        { name: CATEGORY_LABEL[c], href: `/projects/type/${c}` },
      ]}
      projects={projects}
      stationNames={stationNames}
      faqs={[]}
      source={`type:${c}`}
      phone={site.phone}
      phoneDisplay={site.phoneDisplay}
    />
  );
}
