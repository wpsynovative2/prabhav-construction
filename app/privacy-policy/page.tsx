import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { seo, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ ...seo.pages.privacy, path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      subtitle="How we collect, use and protect your personal data under the DPDP Act, 2023."
      path="/privacy-policy"
      updated="30 September 2026"
      sections={[
        { title: "What we collect", points: ["Name, mobile number and email you submit", "Project and configuration you are interested in", "Campaign source (UTM tags) and pages visited", "Resume and job details, for career applications"] },
        { title: "Why we use it", points: ["To call, message or email you about your enquiry", "To arrange site visits and share project documents", "To assess job applications", "To measure and improve our advertising"] },
        { title: "Consent", points: ["We process your data only with the consent you give on our forms", "You may withdraw consent at any time by writing to us", "Withdrawal does not affect processing already done"] },
        { title: "Sharing", points: ["We never sell your data", "Shared only with service providers who help us respond (hosting, CRM, analytics)", "Disclosed to authorities when required by law"] },
        { title: "Retention & security", points: ["Kept only as long as needed for the purpose collected", "Stored with access controls and encrypted transport", "Spam protection by Google reCAPTCHA"] },
        { title: "Your rights", points: ["Access, correct or erase your data", "Nominate a person to exercise rights on your behalf", "Raise a grievance with our Grievance Officer", `Write to ${site.email}`] },
      ]}
    />
  );
}
