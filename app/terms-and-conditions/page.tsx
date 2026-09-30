import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { seo } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ ...seo.pages.terms, path: "/terms-and-conditions" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      subtitle="The rules for using this website."
      path="/terms-and-conditions"
      updated="30 September 2026"
      sections={[
        { title: "Use of this site", points: ["Information here is for general guidance only", "It is not an offer, contract or commitment to sell", "Do not misuse forms or attempt to disrupt the site"] },
        { title: "Content & intellectual property", points: ["Logos, visuals and text belong to Prabhav Construction", "Do not reproduce them without written permission"] },
        { title: "Accuracy", points: ["Prices, plans and specifications may change without notice", "The agreement for sale prevails over anything on this site"] },
        { title: "Third-party links", points: ["Links to maps, RERA and social sites are for convenience", "We are not responsible for their content"] },
        { title: "Governing law", points: ["These terms are governed by the laws of India", "Courts in Palghar, Maharashtra have jurisdiction"] },
      ]}
    />
  );
}
