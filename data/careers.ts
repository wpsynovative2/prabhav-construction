/**
 * ---------------------------------------------------------------------------
 * CAREERS — content for /career
 * ---------------------------------------------------------------------------
 * To close a role, delete it from its department's `roles` array (or set
 * `openings: 0` to keep it listed as "not hiring right now").
 * ---------------------------------------------------------------------------
 */

export const careerHero = {
  eyebrow: "Careers at Prabhav",
  heading: "Build what the city lives in",
  subheading:
    "We hire across engineering, sales, operations and corporate functions — for people who would rather work to a clear plan than improvise their way through a project.",
};

export const whyJoinUs = [
  {
    icon: "compass",
    title: "A place where planning beats improvisation",
    body: "Legal clarity, considered planning and honest dealing are not slogans here — they decide which land we buy, when we launch and what we promise a buyer. That standard applies inward too: you will know what is expected of you and by when.",
  },
  {
    icon: "hardhat",
    title: "Real projects, real scale",
    body: "You will work on buildings that get built. From approvals and design coordination through construction and handover, our teams stay with a project end to end rather than passing it down a chain.",
  },
  {
    icon: "file",
    title: "Clarity over chaos",
    body: "A legally grounded, well-documented way of operating means anyone on the team can see where a project actually stands. Fewer fire-drills, fewer surprises, far less time spent reconstructing what happened.",
  },
  {
    icon: "users",
    title: "Small team, wide scope",
    body: "We are deliberately flat. Your work is visible from your first month, your scope is as wide as you can handle, and growth here is tied to the portfolio expanding — not to waiting your turn.",
  },
];

export const lifeAtPrabhav = [
  {
    icon: "growth",
    title: "Learn on live sites",
    body: "Engineers and managers spend real time on site, not only in drawings. Site exposure is part of every project role, whatever your function.",
  },
  {
    icon: "shield",
    title: "Safety as a standard",
    body: "Documented weekly safety audits, mandatory PPE and stop-work authority for anyone who sees an unsafe condition — including you, on day one.",
  },
  {
    icon: "heart",
    title: "Long tenures",
    body: "More than half our leadership team has been with Prabhav for over a decade. We would rather develop people than replace them.",
  },
  {
    icon: "handshake",
    title: "Owned outcomes",
    body: "Roles are defined by what you deliver, not the hours you sit. Decisions get made close to the work.",
  },
];

export const benefits = [
  "Medical insurance for you and your immediate family",
  "Performance-linked annual bonus",
  "Provident fund and gratuity as per statute",
  "Structured onboarding with a named mentor",
  "Site allowance and travel reimbursement for project roles",
  "Certification and professional membership support",
  "Paid leave, plus a separate sick-leave bank",
  "Employee referral rewards",
];

export interface JobRole {
  title: string;
  experience: string;
  location: string;
  type: string;
  summary: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  roles: JobRole[];
}

export const departments: Department[] = [
  {
    id: "projects-engineering",
    name: "Projects & Engineering",
    icon: "hardhat",
    description:
      "The people who take a sanctioned drawing and turn it into a building that stands up, on schedule and within budget.",
    roles: [
      {
        title: "Project Manager",
        experience: "8 – 15 years",
        location: "Mumbai / Thane",
        type: "Full-time",
        summary:
          "Own end-to-end delivery of a residential or commercial project — schedule, budget, contractors, quality and statutory compliance through to handover.",
      },
      {
        title: "Site Engineer",
        experience: "2 – 6 years",
        location: "Project site (MMR)",
        type: "Full-time",
        summary:
          "Day-to-day execution supervision: setting out, checking of reinforcement and shuttering, pour supervision, daily progress and material reconciliation.",
      },
      {
        title: "Civil Engineer",
        experience: "3 – 8 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Structural and civil coordination between consultants and site — drawing review, RFIs, method statements and technical resolution of site queries.",
      },
      {
        title: "Construction Supervisor",
        experience: "5 – 10 years",
        location: "Project site (MMR)",
        type: "Full-time",
        summary:
          "Supervise contractor gangs, sequence daily activities, enforce workmanship standards and maintain the site diary and labour records.",
      },
      {
        title: "Quantity Surveyor",
        experience: "4 – 10 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "BOQ preparation, rate analysis, contractor bill certification, variation management and monthly cost-to-complete reporting.",
      },
      {
        title: "Safety Officer",
        experience: "3 – 8 years",
        location: "Project site (MMR)",
        type: "Full-time",
        summary:
          "Run the site HSE programme: induction, toolbox talks, weekly audits, incident investigation and statutory safety documentation.",
      },
    ],
  },
  {
    id: "sales-marketing",
    name: "Sales & Marketing",
    icon: "chart",
    description:
      "The people who explain what we have built, honestly, and stay with a buyer from the first site visit to registration.",
    roles: [
      {
        title: "Sales Executive / Manager",
        experience: "2 – 10 years",
        location: "Mumbai / Thane",
        type: "Full-time",
        summary:
          "Manage enquiries end to end — site visits, unit selection, pricing discussions, booking, agreement and registration coordination.",
      },
      {
        title: "Channel Partner Manager",
        experience: "4 – 10 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Build and manage the broker and channel-partner network: empanelment, training, inventory updates, brokerage reconciliation and performance tracking.",
      },
      {
        title: "Marketing Executive",
        experience: "2 – 5 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Support launch and ongoing campaigns — collateral, site branding, events, exhibition presence and agency coordination.",
      },
      {
        title: "Digital Marketing Specialist",
        experience: "3 – 7 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Own paid and organic performance: search and social campaigns, landing pages, lead quality, SEO and marketing analytics reporting.",
      },
      {
        title: "Customer Relationship Manager",
        experience: "3 – 8 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Post-booking relationship ownership — demand letters, documentation, construction updates, possession coordination and grievance resolution.",
      },
    ],
  },
  {
    id: "property-operations",
    name: "Property & Operations",
    icon: "building",
    description:
      "The people who keep a delivered building working as well in year eight as it did on handover day.",
    roles: [
      {
        title: "Property Manager",
        experience: "5 – 12 years",
        location: "Mumbai / Thane",
        type: "Full-time",
        summary:
          "Manage the operational and commercial performance of a delivered asset, including society liaison, vendor contracts and budget control.",
      },
      {
        title: "Facility Manager",
        experience: "4 – 10 years",
        location: "Project site (MMR)",
        type: "Full-time",
        summary:
          "Run building services — housekeeping, security, MEP maintenance, AMC schedules, complaint resolution and statutory renewals.",
      },
      {
        title: "Leasing Executive",
        experience: "2 – 6 years",
        location: "Thane",
        type: "Full-time",
        summary:
          "Lease commercial and retail inventory: tenant sourcing, term negotiation, fit-out coordination and lease documentation.",
      },
      {
        title: "Operations Manager",
        experience: "6 – 12 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Coordinate across projects, procurement and facilities to keep processes, vendor performance and reporting consistent company-wide.",
      },
    ],
  },
  {
    id: "corporate-compliance",
    name: "Corporate & Compliance",
    icon: "file",
    description:
      "The people who keep the paperwork clean — which, in this business, is what makes everything else possible.",
    roles: [
      {
        title: "HR Executive",
        experience: "2 – 6 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Recruitment, onboarding, attendance and payroll inputs, statutory records and employee engagement across office and site teams.",
      },
      {
        title: "Accounts Executive",
        experience: "2 – 6 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Day-to-day accounting: vendor invoices, TDS and GST workings, bank reconciliation, collections posting and ledger upkeep.",
      },
      {
        title: "Finance Manager",
        experience: "6 – 12 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Project cash-flow planning, RERA escrow compliance, lender reporting, MIS and coordination with auditors and consultants.",
      },
      {
        title: "Legal Officer (Real Estate / RERA)",
        experience: "4 – 10 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Title diligence, development agreements, MahaRERA filings and quarterly updates, sale agreements and litigation coordination.",
      },
      {
        title: "Admin Executive",
        experience: "2 – 5 years",
        location: "Mumbai",
        type: "Full-time",
        summary:
          "Office administration, vendor and travel coordination, records management and support to site offices.",
      },
    ],
  },
];

/** Flat list used to populate the "Job Role" dropdown in the application form. */
export const allRoleTitles: string[] = [
  ...departments.flatMap((department) =>
    department.roles.map((role) => role.title)
  ),
  "Other / General application",
];

export const experienceOptions = [
  "Fresher (0 – 1 year)",
  "1 – 3 years",
  "3 – 5 years",
  "5 – 8 years",
  "8 – 12 years",
  "12+ years",
];
