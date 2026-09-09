import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import WhoWeAre from "@/components/home/WhoWeAre";
import FeaturedProject from "@/components/home/FeaturedProject";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import WhyPrabhav from "@/components/home/WhyPrabhav";
import ProcessSection from "@/components/common/ProcessSection";
import CtaSection from "@/components/common/CtaSection";
import Testimonials from "@/components/common/Testimonials";
import Awards from "@/components/common/Awards";
import FaqSection from "@/components/common/FaqSection";
import { homeFaqs } from "@/data/faqs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Prabhav Construction — Real Estate Developers in Mumbai Since 2000",
  description:
    "Prabhav Construction builds residential and commercial landmarks across the Mumbai Metropolitan Region. 25 years, 20+ delivered projects, 1,800+ families — every project MahaRERA registered and handed over on schedule.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Prabhav Construction — Real Estate Developers in Mumbai Since 2000",
    description:
      "25 years, 20+ delivered projects and 1,800+ families across the MMR. Explore our upcoming, ongoing and completed developments.",
    url: site.url,
  },
};

/** FAQ structured data, so the home page can win rich results. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-IN",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteJsonLd, faqJsonLd]),
        }}
      />

      <Hero />
      <TrustStrip />
      <WhoWeAre />
      <FeaturedProject />
      <ProjectsPreview />
      <WhyPrabhav />
      <ProcessSection tone="white" />
      <CtaSection />
      <Testimonials />
      <Awards />
      <FaqSection faqs={homeFaqs} tone="sand" />
    </>
  );
}
