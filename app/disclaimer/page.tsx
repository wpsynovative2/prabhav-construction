import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { seo } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ ...seo.pages.disclaimer, path: "/disclaimer" });

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="RERA disclaimer"
      subtitle="Please read before relying on any project information."
      path="/disclaimer"
      updated="30 September 2026"
      sections={[
        { title: "RERA registration", points: ["Every launched project is registered with MahaRERA", "Registration numbers are shown on each project page", "Verify details at maharera.maharashtra.gov.in"] },
        { title: "Visuals", points: ["Images and illustrations are artistic impressions", "Furniture, fittings and landscaping shown are indicative"] },
        { title: "Prices & areas", points: ["Areas are carpet areas as defined under RERA", "Prices exclude stamp duty, registration, GST and other charges unless stated"] },
        { title: "Binding terms", points: ["Only the registered agreement for sale is binding", "Nothing on this website forms part of a contract"] },
      ]}
    />
  );
}
