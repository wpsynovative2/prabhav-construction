import type { Project } from "@/lib/schemas/project.schema";
import type { Job, Site } from "@/lib/schemas/content.schema";
import { siteUrl } from "@/lib/utils";

const base = () => siteUrl();

export const organizationLd = (site: Site, sameAs: string[]) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${base()}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: base(),
  logo: { "@type": "ImageObject", url: `${base()}/icon.png`, width: 512, height: 512 },
  foundingDate: site.foundingYear,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", ...site.offices[0]!.address, addressCountry: "IN" },
  sameAs,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
  ],
});

export const websiteLd = (site: Site) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${base()}/#website`,
  url: base(),
  name: site.name,
  publisher: { "@id": `${base()}/#organization` },
  inLanguage: "en-IN",
});

export const localBusinessLd = (site: Site) =>
  site.offices.map((o) => ({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: `${site.name}, ${o.name}`,
    image: `${base()}/icon.png`,
    telephone: o.phone,
    url: base(),
    address: { "@type": "PostalAddress", ...o.address, addressCountry: "IN" },
    geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng },
    openingHoursSpecification: site.hoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    parentOrganization: { "@id": `${base()}/#organization` },
  }));

export const breadcrumbLd = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: new URL(it.href, base()).toString(),
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const itemListLd = (projects: Project[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${base()}/projects/${p.slug}`,
    name: p.name,
  })),
});

export function projectLd(p: Project, amenityLabels: string[]) {
  const url = `${base()}/projects/${p.slug}`;
  const address = {
    "@type": "PostalAddress",
    streetAddress: p.location.address,
    addressLocality: p.location.locality,
    addressRegion: p.location.state,
    postalCode: p.location.pincode,
    addressCountry: "IN",
  };
  const geo = { "@type": "GeoCoordinates", latitude: p.location.lat, longitude: p.location.lng };
  const image = p.images.cover ? `${base()}${p.images.cover.src}` : `${url}/opengraph-image`;

  if (p.category === "residential") {
    return {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      name: p.name,
      description: p.description,
      url,
      image,
      address,
      geo,
      amenityFeature: amenityLabels.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
      containsPlace: p.units.map((u) => ({
        "@type": "Apartment",
        name: u.label,
        numberOfRooms: Number.parseInt(u.label) || undefined,
        floorSize: u.carpetAreaSqft
          ? { "@type": "QuantitativeValue", minValue: u.carpetAreaSqft[0], maxValue: u.carpetAreaSqft[1], unitCode: "FTK" }
          : undefined,
      })),
      ...(p.price.onRequest || !p.price.min
        ? {}
        : {
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "INR",
              lowPrice: p.price.min,
              highPrice: p.price.max ?? p.price.min,
              availability: "https://schema.org/InStock",
            },
          }),
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    additionalType: p.category === "commercial" ? "https://schema.org/CommercialBuilding" : "https://schema.org/IndustrialBuilding",
    name: p.name,
    description: p.description,
    url,
    image,
    address,
    geo,
  };
}

export const jobLd = (job: Job, site: Site) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: `<p>${job.description}</p><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul><ul>${job.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
  datePosted: job.postedAt,
  validThrough: job.validThrough,
  employmentType: job.type,
  hiringOrganization: { "@type": "Organization", name: site.name, sameAs: base(), logo: `${base()}/icon.png` },
  jobLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressLocality: job.location, addressRegion: "Maharashtra", addressCountry: "IN" },
  },
});
