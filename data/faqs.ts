export interface Faq {
  question: string;
  answer: string;
}

/** Shown on the contact page and emitted as FAQPage structured data. */
export const contactFaqs: Faq[] = [
  {
    question: "How do I book a site visit?",
    answer:
      "Fill in the enquiry form on any project page, or call us on the number listed above. Our sales team will confirm a slot within one working day and can arrange transport from the nearest station for site visits within the MMR.",
  },
  {
    question: "Are all Prabhav projects RERA registered?",
    answer:
      "Yes. Every project is registered with MahaRERA before the first booking is accepted. The registration number is printed on each project page, in the sale agreement and at the site office, and can be verified at maharera.maharashtra.gov.in.",
  },
  {
    question: "Do you assist with home loans?",
    answer:
      "We do. All our projects are approved by leading public and private sector banks and housing finance companies. Our customer relations team will share the approved lender list and help you compile the documentation, though the choice of lender is entirely yours.",
  },
  {
    question: "Can NRIs purchase a home in your projects?",
    answer:
      "Yes. NRIs and persons of Indian origin can purchase residential and commercial property in India under RBI's general permission, subject to FEMA guidelines. Payment must be made through normal banking channels from an NRE, NRO or FCNR account. We can arrange a virtual site tour and handle the transaction through a power of attorney.",
  },
  {
    question: "What is included in the price you quote?",
    answer:
      "The quoted price is the agreement value for the home. Stamp duty, registration charges, GST where applicable, and statutory or society-formation deposits are payable over and above it. Our sales team will give you a written cost sheet listing every component before you book — there are no charges introduced later.",
  },
  {
    question: "How do I track construction progress after booking?",
    answer:
      "Every booked buyer receives a monthly progress update with dated site photographs and the current slab or finishing status, along with the quarterly escrow statement for the project. You are also welcome to visit the site by appointment at any stage.",
  },
  {
    question: "What happens after possession?",
    answer:
      "We hand over with the occupation certificate in hand, complete snagging with you present, and support society formation within ninety days. Every home carries a five-year structural warranty and a one-year defect liability period on fittings, as required under RERA.",
  },
  {
    question: "Do you offer channel partner or broker tie-ups?",
    answer:
      "Yes. We work with an empanelled network of channel partners across the MMR. Write to us using the form on this page, selecting 'Channel partnership' as your interest, and our channel team will share the empanelment process and brokerage terms.",
  },
];

/** Shorter set used on the home page. */
export const homeFaqs: Faq[] = contactFaqs.slice(0, 5);
