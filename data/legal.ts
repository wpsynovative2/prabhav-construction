/**
 * ---------------------------------------------------------------------------
 * LEGAL COPY — rendered inside the Privacy / Terms / Disclaimer modals
 * ---------------------------------------------------------------------------
 * These are working drafts written for an Indian real-estate developer. Have
 * them reviewed by your legal counsel and update the effective date before
 * the site goes live.
 * ---------------------------------------------------------------------------
 */

export type LegalDocId = "privacy" | "terms" | "disclaimer";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDoc {
  id: LegalDocId;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const legalDocs: Record<LegalDocId, LegalDoc> = {
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    updated: "Effective 1 January 2026",
    intro:
      "Prabhav Construction respects your privacy. This policy explains what personal information we collect through this website, why we collect it, how we use and protect it, and the choices available to you.",
    sections: [
      {
        heading: "1. Information we collect",
        paragraphs: [
          "We collect only the information you choose to give us through the forms on this website, together with limited technical information collected automatically.",
        ],
        bullets: [
          "Information you provide: your name, mobile number, e-mail address, city, the project you are interested in, any message you write to us, and — where you apply for a role — your CV and stated experience.",
          "Information collected automatically: your IP address, browser type, device type, referring page, the pages you view on this site and the time of your visit.",
          "Security information: a Google reCAPTCHA v3 assessment token, used only to distinguish genuine visitors from automated submissions.",
        ],
      },
      {
        heading: "2. How we use your information",
        paragraphs: [
          "We use the information you provide to respond to your enquiry, arrange site visits, share project details and pricing, process job applications, and keep you informed about our projects where you have asked us to.",
          "We use automatically collected information in aggregate to understand how the site is used and to improve it. We do not use it to build a profile about you as an individual.",
        ],
      },
      {
        heading: "3. Lawful basis and consent",
        paragraphs: [
          "By submitting a form on this website you consent to being contacted by Prabhav Construction and its authorised representatives by telephone, SMS, WhatsApp or e-mail in connection with your enquiry. This consent overrides any registration you may have made with the National Do Not Call registry, to the extent permitted by law.",
          "You may withdraw this consent at any time by writing to us at the e-mail address given in the Contact section of this policy.",
        ],
      },
      {
        heading: "4. Sharing your information",
        paragraphs: [
          "We do not sell, rent or trade your personal information.",
        ],
        bullets: [
          "We share it internally with our sales, customer relations and human resources teams for the purpose you contacted us about.",
          "We share it with authorised channel partners only where they are handling your specific enquiry, and under a confidentiality obligation.",
          "We use Google Workspace services (Google Sheets, Gmail, Google Drive and Google Apps Script) to receive and store form submissions, and Google reCAPTCHA to protect our forms. Your submission is processed by Google in accordance with the Google Privacy Policy.",
          "We disclose information where we are required to do so by law, by a court, or by a competent regulatory authority.",
        ],
      },
      {
        heading: "5. Data retention",
        paragraphs: [
          "Enquiry records are retained for up to twenty-four months from your last interaction with us, unless you ask us to delete them sooner. Job applications are retained for up to twelve months so that we can consider you for future openings. Records relating to an actual property transaction are retained for the longer period required under applicable tax, RERA and company law.",
        ],
      },
      {
        heading: "6. Security",
        paragraphs: [
          "This website is served over HTTPS and holds no database of its own. Form submissions are transmitted directly to our Google Workspace account, access to which is restricted to authorised personnel and protected by two-factor authentication. While we take reasonable technical and organisational measures to protect your information, no method of transmission over the internet is completely secure.",
        ],
      },
      {
        heading: "7. Cookies and analytics",
        paragraphs: [
          "This site uses only the cookies and local storage strictly necessary for it to function, together with Google reCAPTCHA, which sets cookies to assess whether a visitor is human. If we enable web analytics in future, this policy will be updated before that happens. You can block or delete cookies through your browser settings; the reCAPTCHA protection on our forms may not work if you do.",
        ],
      },
      {
        heading: "8. Your rights",
        paragraphs: [
          "You may ask us to confirm what personal information we hold about you, to correct it if it is inaccurate, to delete it, or to stop contacting you. Write to us at the address below and we will respond within thirty days.",
        ],
      },
      {
        heading: "9. Children",
        paragraphs: [
          "This website is not directed at children under the age of eighteen and we do not knowingly collect their personal information.",
        ],
      },
      {
        heading: "10. Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time. The effective date at the top of this document indicates when it was last revised. Continued use of the site after a revision constitutes acceptance of the updated policy.",
        ],
      },
      {
        heading: "11. Contact",
        paragraphs: [
          "Questions about this policy, or requests concerning your personal information, may be sent to sales@prabhavconstruction.com, or by post to Prabhav Construction, Prabhav House, 3rd Floor, Plot 14, Link Road, Andheri West, Mumbai 400053.",
        ],
      },
    ],
  },

  terms: {
    id: "terms",
    title: "Terms & Conditions",
    updated: "Effective 1 January 2026",
    intro:
      "These terms govern your use of the Prabhav Construction website. By accessing or using this site you agree to be bound by them. If you do not agree, please do not use the site.",
    sections: [
      {
        heading: "1. About this website",
        paragraphs: [
          "This website is owned and operated by Prabhav Construction. It is provided for general information about our company and our projects. It is not an offer, an invitation to offer, or a contract of any kind.",
        ],
      },
      {
        heading: "2. Nature of the information provided",
        paragraphs: [
          "Project information on this site — including plans, elevations, specifications, amenities, dimensions, prices, possession dates and images — is indicative and provided for illustrative purposes. Actual delivery is governed exclusively by the sanctioned plans, the MahaRERA registration for the project, and the agreement for sale executed between the parties.",
          "Computer-generated images, walkthroughs, artists' impressions, model units and landscaping shown are creative depictions and are not to be relied upon as representations of the finished product.",
        ],
      },
      {
        heading: "3. Changes to information",
        paragraphs: [
          "We may change, suspend or withdraw any part of this website, and any information on it — including prices, availability, specifications and timelines — at any time and without prior notice, subject in all cases to our obligations under the Real Estate (Regulation and Development) Act, 2016 and the rules made under it.",
        ],
      },
      {
        heading: "4. Use of the website",
        paragraphs: [
          "You agree to use this website only for lawful purposes.",
        ],
        bullets: [
          "Do not attempt to gain unauthorised access to any part of the site, its servers or connected systems.",
          "Do not use automated means to scrape, harvest, or overload the site.",
          "Do not submit false, misleading or third-party personal information through our forms.",
          "Do not use the site in any way that could damage, disable or impair it, or interfere with another user's use of it.",
        ],
      },
      {
        heading: "5. Intellectual property",
        paragraphs: [
          "All content on this website — including text, photographs, renders, plans, graphics, logos, the Prabhav name and mark, and the design and arrangement of the site — is owned by or licensed to Prabhav Construction and is protected by Indian and international intellectual property law. You may view and print pages for your personal, non-commercial reference. Any other reproduction, distribution, modification or commercial use requires our prior written permission.",
        ],
      },
      {
        heading: "6. Enquiries and communications",
        paragraphs: [
          "When you submit an enquiry, you authorise us and our authorised representatives to contact you by telephone, SMS, WhatsApp or e-mail regarding that enquiry, notwithstanding any DNC or NDNC registration. Submitting an enquiry creates no obligation on either party to enter into a transaction.",
        ],
      },
      {
        heading: "7. Third-party links",
        paragraphs: [
          "This site may link to third-party websites, including Google Maps, MahaRERA and social media platforms. We do not control those sites and are not responsible for their content, availability or privacy practices. A link is not an endorsement.",
        ],
      },
      {
        heading: "8. Limitation of liability",
        paragraphs: [
          "This website is provided on an 'as is' and 'as available' basis. To the fullest extent permitted by law, Prabhav Construction excludes all warranties, express or implied, as to the accuracy, completeness, reliability or availability of the site and its contents, and shall not be liable for any direct, indirect, incidental or consequential loss arising from your use of, or inability to use, this website. Nothing in this clause limits any liability that cannot be excluded under applicable law, including our statutory obligations to allottees under RERA.",
        ],
      },
      {
        heading: "9. Indemnity",
        paragraphs: [
          "You agree to indemnify and hold Prabhav Construction harmless against any claim, loss or expense arising from your breach of these terms or your misuse of this website.",
        ],
      },
      {
        heading: "10. Governing law and jurisdiction",
        paragraphs: [
          "These terms are governed by the laws of India. The courts and tribunals at Mumbai, Maharashtra shall have exclusive jurisdiction over any dispute arising out of or in connection with this website or these terms.",
        ],
      },
      {
        heading: "11. Contact",
        paragraphs: [
          "Questions about these terms may be sent to sales@prabhavconstruction.com.",
        ],
      },
    ],
  },

  disclaimer: {
    id: "disclaimer",
    title: "Disclaimer",
    updated: "Effective 1 January 2026",
    intro:
      "Please read this disclaimer carefully before relying on any information presented on this website.",
    sections: [
      {
        heading: "Not an offer or contract",
        paragraphs: [
          "The content of this website is for general information only. It does not constitute an offer, an invitation to offer, a solicitation, or a legally binding contract in any jurisdiction. No information on this site should be relied upon as a basis for entering into a transaction.",
        ],
      },
      {
        heading: "Images and depictions",
        paragraphs: [
          "All images, renders, walkthroughs, elevations, layouts, landscaping, furniture and fittings shown on this website are artistic impressions and creative depictions. They are indicative only, may include items not part of the standard offering, and do not form part of any agreement. Furniture, appliances, decor items, plants and props shown in show units or renders are not included in the sale unless expressly stated in writing.",
        ],
      },
      {
        heading: "Areas, specifications and pricing",
        paragraphs: [
          "Stated areas are subject to final measurement and to the definitions prescribed under the Real Estate (Regulation and Development) Act, 2016. Carpet, built-up and saleable areas are distinct measures and should not be compared directly. Specifications, amenities, pricing, payment schedules and possession timelines are subject to change at the sole discretion of the developer or as required by the competent authorities, and are binding only to the extent recorded in the registered agreement for sale.",
        ],
      },
      {
        heading: "RERA registration",
        paragraphs: [
          "The projects presented on this website are registered with the Maharashtra Real Estate Regulatory Authority. Registration numbers are stated on the respective project pages and displayed at each site office. Prospective purchasers are advised to verify project details independently at https://maharera.maharashtra.gov.in before making any booking or payment. Nothing on this website supersedes the information filed with MahaRERA.",
        ],
      },
      {
        heading: "Payments",
        paragraphs: [
          "All payments must be made only by cheque, demand draft or electronic transfer in favour of the designated project account, against a receipt issued by Prabhav Construction. We do not accept cash. Prabhav Construction is not responsible for any payment made to any person or account other than the designated project account.",
        ],
      },
      {
        heading: "Third-party content",
        paragraphs: [
          "Distances, travel times, connectivity details and neighbourhood information stated on this website are approximate, drawn from publicly available sources such as Google Maps, and provided for orientation only. They are subject to change and should be independently verified.",
        ],
      },
      {
        heading: "Authorised communication",
        paragraphs: [
          "Prabhav Construction communicates only through its official website, official e-mail domains and the contact numbers published on this site. We are not responsible for information circulated by unauthorised persons, brokers or portals. If in doubt about the authenticity of any communication, please contact us directly on the number listed on our Contact page.",
        ],
      },
    ],
  },
};

export const legalDocList: LegalDoc[] = [
  legalDocs.privacy,
  legalDocs.terms,
  legalDocs.disclaimer,
];
