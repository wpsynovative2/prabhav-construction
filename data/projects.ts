/**
 * ---------------------------------------------------------------------------
 * PROJECTS — the single source of truth for the whole site
 * ---------------------------------------------------------------------------
 * Add a new project by appending an object to the `projects` array below.
 * Everything else happens automatically:
 *   • it appears on /projects under its `status` filter
 *   • a dedicated page is generated at /projects/<slug>
 *   • it is added to sitemap.xml
 *   • set `featured: true` to surface it on the home page
 *
 * Images: drop the files into `public/images/projects/` and reference them as
 * "/images/projects/<file>". Missing files fall back to a branded placeholder,
 * so you can add the data first and the photography later.
 * ---------------------------------------------------------------------------
 */

export type ProjectStatus = "upcoming" | "ongoing" | "completed";

export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Mixed Use"
  | "Villas"
  | "Plotted Development"
  | "Redevelopment";

export interface SpecGroup {
  group: string;
  items: { label: string; value: string }[];
}

export interface Project {
  /** URL segment — /projects/<slug>. Lowercase, no spaces. */
  slug: string;
  name: string;
  /** One-line positioning statement, shown under the name. */
  tagline: string;
  status: ProjectStatus;
  category: ProjectCategory;

  /** e.g. "2, 3 & 4 BHK Residences" */
  configuration: string;
  /** e.g. "Rs 1.85 Cr onwards" or "Price on request" */
  priceLabel: string;
  /** e.g. "December 2027" or "Delivered — March 2021" */
  possession: string;
  reraNumber: string;

  location: {
    locality: string;
    city: string;
    /** Full address shown on the project page. */
    address: string;
    /** Google Maps -> Share -> Embed a map -> copy the iframe `src` here. */
    mapEmbedUrl: string;
    directionsUrl: string;
  };

  /** Quick facts rendered as the stat strip on the project page. */
  facts: { label: string; value: string }[];

  heroImage: string;
  thumbnail: string;
  gallery: { src: string; caption: string }[];

  /** Body copy — one string per paragraph. */
  overview: string[];

  highlights: { icon: string; title: string; description: string }[];
  amenities: { icon: string; name: string }[];
  specifications: SpecGroup[];
  floorPlans: { name: string; carpetArea: string; image: string }[];
  connectivity: { label: string; distance: string }[];

  /** Optional PDF in /public — omit to hide the download button. */
  brochureUrl?: string;

  featured: boolean;
  /** Lower numbers sort first within a status group. */
  order: number;

  seo: { title: string; description: string; keywords: string[] };
}

export const projects: Project[] = [
  /* ===================================================================== */
  {
    slug: "codenamecrown",
    name: "Codename Crown",
    tagline: "A limited collection of sky residences in the heart of Andheri",
    status: "upcoming",
    category: "Residential",
    configuration: "2, 3 & 4 BHK Sky Residences",
    priceLabel: "₹ 2.15 Cr onwards",
    possession: "December 2028",
    reraNumber: "P51800XXXXXX",

    location: {
      locality: "Andheri West",
      city: "Mumbai",
      address:
        "Survey No. 42, Off New Link Road, Andheri West, Mumbai, Maharashtra 400053",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2!2d72.8296!3d19.1364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQW5kaGVyaQ!5e0!3m2!1sen!2sin!4v1700000000000",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Andheri+West+Mumbai",
    },

    facts: [
      { label: "Land parcel", value: "3.2 acres" },
      { label: "Towers", value: "2 towers" },
      { label: "Floors", value: "G + 38" },
      { label: "Residences", value: "228 homes" },
      { label: "Open space", value: "72% of plot" },
      { label: "Car parking", value: "2 levels, automated" },
    ],

    heroImage: "/images/projects/crown/hero.jpg",
    thumbnail: "/images/projects/crown/thumb.jpg",
    gallery: [
      { src: "/images/projects/crown/gallery-1.jpg", caption: "Arrival plaza" },
      { src: "/images/projects/crown/gallery-2.jpg", caption: "Tower elevation" },
      { src: "/images/projects/crown/gallery-3.jpg", caption: "Living room" },
      { src: "/images/projects/crown/gallery-4.jpg", caption: "Sky deck" },
      { src: "/images/projects/crown/gallery-5.jpg", caption: "Clubhouse" },
      { src: "/images/projects/crown/gallery-6.jpg", caption: "Landscaped podium" },
    ],

    overview: [
      "Codename Crown is our most ambitious residential address to date — two slender towers rising 38 floors above a landscaped podium, holding just 228 homes on a 3.2-acre parcel off New Link Road. The brief was simple and unusually strict: fewer homes per floor, more daylight in every room, and a podium that gives back three-quarters of the plot as open ground.",
      "Every residence is a corner home. Four apartments per floor share a single core, so each home receives cross-ventilation on two sides and an uninterrupted view line — towards the Aarey green belt to the east or the city skyline to the west. Ceiling heights of 10 feet 6 inches, full-height glazing and 8-foot-deep sundecks make the living spaces feel considerably larger than their carpet area suggests.",
      "The name is temporary. The standard is not. Codename Crown carries the same approval-first discipline every Prabhav project has followed since 2000 — clear title, MahaRERA registration before the first booking, and a construction schedule you can hold us to.",
    ],

    highlights: [
      {
        icon: "sun",
        title: "Four homes per floor",
        description:
          "Every residence is a corner unit with cross-ventilation and daylight on two sides.",
      },
      {
        icon: "ruler",
        title: "10'6\" ceilings",
        description:
          "Full-height glazing and deep sundecks across all living and bedroom spaces.",
      },
      {
        icon: "tree",
        title: "72% open ground",
        description:
          "A 2.3-acre landscaped podium with a 400 m jogging loop and native tree cover.",
      },
      {
        icon: "shield",
        title: "Seismic Zone IV design",
        description:
          "RCC shear-wall structure, third-party audited by an independent structural consultant.",
      },
      {
        icon: "car",
        title: "Automated parking",
        description:
          "Two basement levels with tower-parking, EV charging on every allotted bay.",
      },
      {
        icon: "sparkles",
        title: "28 curated amenities",
        description:
          "A 22,000 sq.ft. clubhouse across the podium and the 21st-floor sky deck.",
      },
    ],

    amenities: [
      { icon: "pool", name: "Infinity lap pool" },
      { icon: "dumbbell", name: "Fitness studio" },
      { icon: "yoga", name: "Yoga & meditation deck" },
      { icon: "kids", name: "Children's play zone" },
      { icon: "tree", name: "Landscaped podium garden" },
      { icon: "run", name: "400 m jogging track" },
      { icon: "clubhouse", name: "22,000 sq.ft. clubhouse" },
      { icon: "theatre", name: "Private screening room" },
      { icon: "work", name: "Co-working lounge" },
      { icon: "party", name: "Banquet & party lawn" },
      { icon: "sports", name: "Indoor games room" },
      { icon: "cafe", name: "Residents' cafe" },
      { icon: "pet", name: "Pet park" },
      { icon: "senior", name: "Senior citizens' court" },
      { icon: "ev", name: "EV charging bays" },
      { icon: "cctv", name: "24x7 CCTV & access control" },
      { icon: "power", name: "100% power backup" },
      { icon: "water", name: "Rainwater harvesting" },
    ],

    specifications: [
      {
        group: "Structure & Walls",
        items: [
          { label: "Structure", value: "RCC shear-wall, seismic Zone IV compliant" },
          { label: "External walls", value: "AAC block masonry with sand-cement plaster" },
          { label: "Internal walls", value: "AAC block with gypsum-finished surfaces" },
          { label: "Ceiling height", value: "10 ft 6 in (floor to floor 11 ft 6 in)" },
        ],
      },
      {
        group: "Flooring",
        items: [
          { label: "Living & dining", value: "1200x1800 mm imported marble" },
          { label: "Bedrooms", value: "Engineered wooden flooring" },
          { label: "Kitchen & utility", value: "Anti-skid vitrified tiles" },
          { label: "Sundecks", value: "Weather-resistant deck tiles" },
        ],
      },
      {
        group: "Doors & Windows",
        items: [
          { label: "Main door", value: "8 ft veneer-finished flush door with digital lock" },
          { label: "Internal doors", value: "Laminate-finished flush doors" },
          { label: "Windows", value: "Double-glazed aluminium sliding system" },
        ],
      },
      {
        group: "Kitchen & Bathrooms",
        items: [
          {
            label: "Kitchen counter",
            value: "Granite counter with SS sink and provision for modular fit-out",
          },
          { label: "Bathroom fittings", value: "Kohler / Grohe or equivalent CP fittings" },
          { label: "Sanitaryware", value: "Wall-hung EWC with concealed cistern" },
          { label: "Hot water", value: "Solar-assisted centralised supply" },
        ],
      },
      {
        group: "Electrical & Safety",
        items: [
          { label: "Wiring", value: "Concealed FRLS copper wiring, modular switches" },
          {
            label: "Backup",
            value: "100% DG backup for common areas and one circuit per home",
          },
          {
            label: "Safety",
            value: "Sprinklers, smoke detectors, fire-refuge floors as per NBC",
          },
          {
            label: "Lifts",
            value: "Four high-speed passenger lifts + one service lift per tower",
          },
        ],
      },
    ],

    floorPlans: [
      {
        name: "2 BHK — Type A",
        carpetArea: "742 sq.ft. carpet",
        image: "/images/projects/crown/plan-2bhk.jpg",
      },
      {
        name: "3 BHK — Type B",
        carpetArea: "1,086 sq.ft. carpet",
        image: "/images/projects/crown/plan-3bhk.jpg",
      },
      {
        name: "4 BHK — Type C",
        carpetArea: "1,624 sq.ft. carpet",
        image: "/images/projects/crown/plan-4bhk.jpg",
      },
    ],

    connectivity: [
      { label: "DN Nagar Metro (Line 2A)", distance: "600 m" },
      { label: "Andheri Railway Station", distance: "3.4 km" },
      { label: "Western Express Highway", distance: "4.1 km" },
      { label: "Mumbai International Airport", distance: "7.8 km" },
      { label: "Infiniti Mall, Andheri", distance: "1.2 km" },
      { label: "Kokilaben Dhirubhai Ambani Hospital", distance: "2.6 km" },
      { label: "Ryan International School", distance: "1.5 km" },
      { label: "Versova Beach", distance: "3.9 km" },
    ],

    featured: true,
    order: 1,

    seo: {
      title: "Codename Crown — 2, 3 & 4 BHK Sky Residences in Andheri West",
      description:
        "Codename Crown by Prabhav Construction: 228 corner-unit sky residences across two 38-storey towers in Andheri West, Mumbai. 10'6\" ceilings, 72% open space, MahaRERA registered.",
      keywords: [
        "Codename Crown Andheri",
        "3 BHK Andheri West",
        "new launch Andheri West",
        "Prabhav Construction projects",
        "luxury apartments Mumbai",
      ],
    },
  },

  /* ===================================================================== */
  {
    slug: "prabhav-solitaire",
    name: "Prabhav Solitaire",
    tagline: "Wide-frontage 3 & 4 BHK homes overlooking the Powai lake belt",
    status: "ongoing",
    category: "Residential",
    configuration: "3 & 4 BHK Residences",
    priceLabel: "₹ 3.10 Cr onwards",
    possession: "June 2027",
    reraNumber: "P51800XXXXXX",

    location: {
      locality: "Powai",
      city: "Mumbai",
      address: "Central Avenue, Hiranandani Gardens Road, Powai, Mumbai 400076",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769!2d72.905!3d19.119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUG93YWk!5e0!3m2!1sen!2sin!4v1700000000001",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=Powai+Mumbai",
    },

    facts: [
      { label: "Land parcel", value: "1.9 acres" },
      { label: "Towers", value: "1 tower" },
      { label: "Floors", value: "G + 26" },
      { label: "Residences", value: "104 homes" },
      { label: "Open space", value: "64% of plot" },
      { label: "Status", value: "18th slab cast" },
    ],

    heroImage: "/images/projects/solitaire/hero.jpg",
    thumbnail: "/images/projects/solitaire/thumb.jpg",
    gallery: [
      { src: "/images/projects/solitaire/gallery-1.jpg", caption: "Tower elevation" },
      { src: "/images/projects/solitaire/gallery-2.jpg", caption: "Lake-facing balcony" },
      { src: "/images/projects/solitaire/gallery-3.jpg", caption: "Entrance lobby" },
      { src: "/images/projects/solitaire/gallery-4.jpg", caption: "Podium deck" },
    ],

    overview: [
      "Prabhav Solitaire is a single-tower address on Powai's central avenue, planned around one idea: a wider frontage per home. Four residences per floor, each with a 26-foot living-room span and an uninterrupted line of sight towards the lake belt.",
      "Construction is progressing on schedule — the 18th slab has been cast and finishing work has begun on the lower floors. Monthly construction updates are shared with every booked buyer, along with the escrow statement for the quarter.",
    ],

    highlights: [
      {
        icon: "sun",
        title: "26 ft living frontage",
        description: "Wide-format planning with full-height glazing on the lake side.",
      },
      {
        icon: "tree",
        title: "Lake belt views",
        description: "Homes from the 9th floor upward face the Powai green and water belt.",
      },
      {
        icon: "shield",
        title: "On-schedule build",
        description: "18 of 26 slabs cast; monthly progress reports to every buyer.",
      },
      {
        icon: "clubhouse",
        title: "Rooftop clubhouse",
        description: "A 9,000 sq.ft. amenity floor at level 26 with a sky lounge.",
      },
    ],

    amenities: [
      { icon: "pool", name: "Rooftop swimming pool" },
      { icon: "dumbbell", name: "Gymnasium" },
      { icon: "yoga", name: "Yoga deck" },
      { icon: "kids", name: "Kids' play area" },
      { icon: "clubhouse", name: "Sky lounge" },
      { icon: "work", name: "Business centre" },
      { icon: "sports", name: "Multipurpose court" },
      { icon: "tree", name: "Landscaped garden" },
      { icon: "ev", name: "EV charging" },
      { icon: "cctv", name: "Gated security" },
      { icon: "power", name: "Power backup" },
      { icon: "water", name: "Rainwater harvesting" },
    ],

    specifications: [
      {
        group: "Structure & Walls",
        items: [
          { label: "Structure", value: "RCC framed structure, seismic Zone IV compliant" },
          { label: "Walls", value: "AAC block masonry with gypsum finish" },
          { label: "Ceiling height", value: "10 ft" },
        ],
      },
      {
        group: "Flooring",
        items: [
          { label: "Living & dining", value: "Imported marble" },
          { label: "Bedrooms", value: "Large-format vitrified tiles" },
          { label: "Bathrooms", value: "Anti-skid ceramic tiles" },
        ],
      },
      {
        group: "Fittings",
        items: [
          { label: "Windows", value: "Powder-coated aluminium sliding windows" },
          { label: "CP fittings", value: "Jaquar or equivalent" },
          { label: "Electrical", value: "Concealed FRLS copper wiring, modular switches" },
        ],
      },
    ],

    floorPlans: [
      {
        name: "3 BHK — Type A",
        carpetArea: "1,140 sq.ft. carpet",
        image: "/images/projects/solitaire/plan-3bhk.jpg",
      },
      {
        name: "4 BHK — Type B",
        carpetArea: "1,690 sq.ft. carpet",
        image: "/images/projects/solitaire/plan-4bhk.jpg",
      },
    ],

    connectivity: [
      { label: "Powai Lake promenade", distance: "900 m" },
      { label: "IIT Bombay", distance: "2.1 km" },
      { label: "Eastern Express Highway", distance: "4.6 km" },
      { label: "Mumbai International Airport", distance: "6.2 km" },
      { label: "R City Mall, Ghatkopar", distance: "7.4 km" },
      { label: "Hiranandani Hospital", distance: "1.3 km" },
    ],

    featured: true,
    order: 1,

    seo: {
      title: "Prabhav Solitaire — 3 & 4 BHK Residences in Powai, Mumbai",
      description:
        "Prabhav Solitaire: 104 wide-frontage 3 & 4 BHK homes across a single 26-storey tower in Powai, Mumbai. Lake belt views, rooftop clubhouse, possession June 2027.",
      keywords: [
        "Prabhav Solitaire Powai",
        "4 BHK Powai",
        "under construction Powai",
        "Mumbai real estate",
      ],
    },
  },

  /* ===================================================================== */
  {
    slug: "prabhav-business-square",
    name: "Prabhav Business Square",
    tagline: "Grade-A offices and high-street retail on the Thane–Ghodbunder corridor",
    status: "ongoing",
    category: "Commercial",
    configuration: "Office suites & high-street retail",
    priceLabel: "₹ 18,500 / sq.ft. onwards",
    possession: "March 2027",
    reraNumber: "P51700XXXXXX",

    location: {
      locality: "Ghodbunder Road",
      city: "Thane",
      address: "Ghodbunder Road, Kasarvadavali, Thane West, Maharashtra 400615",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766!2d72.96!3d19.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVGhhbmU!5e0!3m2!1sen!2sin!4v1700000000002",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Ghodbunder+Road+Thane",
    },

    facts: [
      { label: "Land parcel", value: "2.4 acres" },
      { label: "Floors", value: "G + 14" },
      { label: "Office suites", value: "96 units" },
      { label: "Retail", value: "22 high-street shops" },
      { label: "Efficiency", value: "78% carpet" },
      { label: "Parking", value: "3 basement levels" },
    ],

    heroImage: "/images/projects/business-square/hero.jpg",
    thumbnail: "/images/projects/business-square/thumb.jpg",
    gallery: [
      { src: "/images/projects/business-square/gallery-1.jpg", caption: "Building facade" },
      {
        src: "/images/projects/business-square/gallery-2.jpg",
        caption: "Double-height lobby",
      },
      { src: "/images/projects/business-square/gallery-3.jpg", caption: "Retail frontage" },
    ],

    overview: [
      "Prabhav Business Square brings a Grade-A workplace address to the Ghodbunder corridor — column-free floor plates, a 78% carpet efficiency and suite sizes from 480 to 6,200 sq.ft. so a growing business can expand without changing address.",
      "The ground and first levels are given over to a 22-unit high street with dedicated visitor parking, keeping retail footfall entirely separate from the office lobby and its three-level basement.",
    ],

    highlights: [
      {
        icon: "ruler",
        title: "Column-free plates",
        description: "Flexible 480 – 6,200 sq.ft. suites with 78% carpet efficiency.",
      },
      {
        icon: "power",
        title: "100% DG backup",
        description: "Full-load power backup across offices, retail and common areas.",
      },
      {
        icon: "car",
        title: "3-level basement",
        description: "Separated office and retail visitor parking with valet access.",
      },
      {
        icon: "shield",
        title: "IGBC Gold pre-certified",
        description: "High-performance glazing, low-flow fixtures, waste segregation.",
      },
    ],

    amenities: [
      { icon: "clubhouse", name: "Double-height lobby" },
      { icon: "cafe", name: "Food court" },
      { icon: "work", name: "Conference centre" },
      { icon: "power", name: "100% DG backup" },
      { icon: "ev", name: "EV charging" },
      { icon: "cctv", name: "24x7 security & BMS" },
      { icon: "car", name: "Valet parking" },
      { icon: "water", name: "STP & rainwater harvesting" },
    ],

    specifications: [
      {
        group: "Structure",
        items: [
          { label: "Structure", value: "RCC framed, column-free office plates" },
          { label: "Floor-to-floor", value: "12 ft 6 in (retail 15 ft)" },
          { label: "Facade", value: "Double-glazed unitised curtain wall" },
        ],
      },
      {
        group: "Services",
        items: [
          { label: "HVAC", value: "VRF-ready with dedicated outdoor unit space" },
          { label: "Lifts", value: "Six passenger lifts + two service lifts" },
          { label: "Fire safety", value: "Addressable panel, sprinklers, NBC compliant" },
        ],
      },
    ],

    floorPlans: [
      {
        name: "Boutique suite",
        carpetArea: "480 sq.ft. carpet",
        image: "/images/projects/business-square/plan-suite.jpg",
      },
      {
        name: "Full floor plate",
        carpetArea: "6,200 sq.ft. carpet",
        image: "/images/projects/business-square/plan-floor.jpg",
      },
    ],

    connectivity: [
      { label: "Thane Railway Station", distance: "8.5 km" },
      { label: "Ghodbunder Road", distance: "On the arterial" },
      { label: "Mumbai–Nashik Expressway", distance: "6.0 km" },
      { label: "Viviana Mall", distance: "7.2 km" },
      { label: "Jupiter Hospital", distance: "8.0 km" },
    ],

    featured: false,
    order: 2,

    seo: {
      title: "Prabhav Business Square — Grade-A Offices & Retail, Thane",
      description:
        "Prabhav Business Square on Ghodbunder Road, Thane: column-free Grade-A office suites from 480 sq.ft. and 22 high-street retail units. Possession March 2027.",
      keywords: [
        "commercial property Thane",
        "office space Ghodbunder Road",
        "Prabhav Business Square",
      ],
    },
  },

  /* ===================================================================== */
  {
    slug: "prabhav-greens",
    name: "Prabhav Greens",
    tagline: "Two acres of low-rise family homes around a central garden",
    status: "completed",
    category: "Residential",
    configuration: "2 & 3 BHK Residences",
    priceLabel: "Sold out",
    possession: "Delivered — March 2021",
    reraNumber: "P51700XXXXXX",

    location: {
      locality: "Mulund West",
      city: "Mumbai",
      address: "LBS Marg, Mulund West, Mumbai, Maharashtra 400080",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767!2d72.95!3d19.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTXVsdW5k!5e0!3m2!1sen!2sin!4v1700000000003",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Mulund+West+Mumbai",
    },

    facts: [
      { label: "Land parcel", value: "2.0 acres" },
      { label: "Buildings", value: "4 low-rise wings" },
      { label: "Floors", value: "G + 7" },
      { label: "Residences", value: "168 homes" },
      { label: "Delivered", value: "March 2021" },
      { label: "OC received", value: "Yes" },
    ],

    heroImage: "/images/projects/greens/hero.jpg",
    thumbnail: "/images/projects/greens/thumb.jpg",
    gallery: [
      { src: "/images/projects/greens/gallery-1.jpg", caption: "Central garden" },
      { src: "/images/projects/greens/gallery-2.jpg", caption: "Wing elevation" },
      { src: "/images/projects/greens/gallery-3.jpg", caption: "Community hall" },
    ],

    overview: [
      "Prabhav Greens is a four-wing, low-rise community in Mulund West arranged around a one-acre central garden — no wing taller than seven floors, so every home stays within sight and shouting distance of the play area.",
      "Handed over in March 2021, two months ahead of the committed date, with the occupation certificate in hand and the society formed within ninety days of possession.",
    ],

    highlights: [
      {
        icon: "tree",
        title: "One-acre central garden",
        description: "Half the plot kept as open, planted ground with mature tree cover.",
      },
      {
        icon: "handshake",
        title: "Delivered early",
        description: "Possession handed over two months ahead of the committed date.",
      },
      {
        icon: "shield",
        title: "OC in hand",
        description:
          "Occupation certificate received before handover; society formed in 90 days.",
      },
      {
        icon: "kids",
        title: "Family-first planning",
        description: "Low-rise wings keep the play area visible from every home.",
      },
    ],

    amenities: [
      { icon: "tree", name: "One-acre garden" },
      { icon: "kids", name: "Children's play area" },
      { icon: "dumbbell", name: "Society gymnasium" },
      { icon: "run", name: "Walking track" },
      { icon: "party", name: "Community hall" },
      { icon: "senior", name: "Senior citizens' corner" },
      { icon: "cctv", name: "Gated security" },
      { icon: "water", name: "Rainwater harvesting" },
    ],

    specifications: [
      {
        group: "Structure",
        items: [
          { label: "Structure", value: "RCC framed structure" },
          { label: "Walls", value: "Block masonry with POP-finished internal surfaces" },
          { label: "Ceiling height", value: "9 ft 6 in" },
        ],
      },
      {
        group: "Finishes",
        items: [
          { label: "Flooring", value: "Vitrified tiles throughout" },
          { label: "Kitchen", value: "Granite counter with SS sink" },
          { label: "Bathrooms", value: "Branded CP fittings and sanitaryware" },
        ],
      },
    ],

    floorPlans: [
      {
        name: "2 BHK",
        carpetArea: "665 sq.ft. carpet",
        image: "/images/projects/greens/plan-2bhk.jpg",
      },
      {
        name: "3 BHK",
        carpetArea: "912 sq.ft. carpet",
        image: "/images/projects/greens/plan-3bhk.jpg",
      },
    ],

    connectivity: [
      { label: "Mulund Railway Station", distance: "1.8 km" },
      { label: "Eastern Express Highway", distance: "2.2 km" },
      { label: "Nirmal Lifestyle Mall", distance: "1.1 km" },
      { label: "Fortis Hospital, Mulund", distance: "2.9 km" },
    ],

    featured: false,
    order: 1,

    seo: {
      title: "Prabhav Greens, Mulund West — Delivered 2 & 3 BHK Homes",
      description:
        "Prabhav Greens: 168 low-rise 2 & 3 BHK homes around a one-acre garden in Mulund West, Mumbai. Delivered March 2021, two months ahead of schedule.",
      keywords: [
        "Prabhav Greens Mulund",
        "completed projects Mumbai",
        "2 BHK Mulund West",
      ],
    },
  },

  /* ===================================================================== */
  {
    slug: "prabhav-heights",
    name: "Prabhav Heights",
    tagline: "A 24-storey landmark on the Borivali link road",
    status: "completed",
    category: "Residential",
    configuration: "2 & 3 BHK Residences",
    priceLabel: "Sold out",
    possession: "Delivered — September 2018",
    reraNumber: "P51800XXXXXX",

    location: {
      locality: "Borivali West",
      city: "Mumbai",
      address: "New Link Road, Borivali West, Mumbai, Maharashtra 400092",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765!2d72.84!3d19.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQm9yaXZhbGk!5e0!3m2!1sen!2sin!4v1700000000004",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Borivali+West+Mumbai",
    },

    facts: [
      { label: "Land parcel", value: "1.4 acres" },
      { label: "Towers", value: "1 tower" },
      { label: "Floors", value: "G + 24" },
      { label: "Residences", value: "192 homes" },
      { label: "Delivered", value: "September 2018" },
      { label: "OC received", value: "Yes" },
    ],

    heroImage: "/images/projects/heights/hero.jpg",
    thumbnail: "/images/projects/heights/thumb.jpg",
    gallery: [
      { src: "/images/projects/heights/gallery-1.jpg", caption: "Tower at dusk" },
      { src: "/images/projects/heights/gallery-2.jpg", caption: "Entrance lobby" },
      { src: "/images/projects/heights/gallery-3.jpg", caption: "Podium amenities" },
    ],

    overview: [
      "Prabhav Heights was our first high-rise on the Borivali link road — 192 homes in a single 24-storey tower, with the entire ground plane handed to landscape and the parking pushed below grade.",
      "Seven years on, it remains one of the best-maintained buildings on the stretch; the society took over facility management in 2019 and has retained our maintenance team by choice ever since.",
    ],

    highlights: [
      {
        icon: "building",
        title: "First high-rise",
        description: "Our debut 24-storey tower on the Borivali link road.",
      },
      {
        icon: "tree",
        title: "Ground-plane landscape",
        description: "All parking pushed below grade to free the ground for planting.",
      },
      {
        icon: "handshake",
        title: "Still well kept",
        description: "Society retained our facility team by choice after the 2019 handover.",
      },
      {
        icon: "shield",
        title: "OC in hand",
        description: "Occupation certificate received prior to possession.",
      },
    ],

    amenities: [
      { icon: "pool", name: "Swimming pool" },
      { icon: "dumbbell", name: "Gymnasium" },
      { icon: "kids", name: "Play area" },
      { icon: "tree", name: "Landscaped garden" },
      { icon: "party", name: "Party lawn" },
      { icon: "sports", name: "Indoor games" },
      { icon: "cctv", name: "24x7 security" },
      { icon: "power", name: "Power backup" },
    ],

    specifications: [
      {
        group: "Structure",
        items: [
          { label: "Structure", value: "RCC framed structure" },
          { label: "Walls", value: "Block masonry, POP finish" },
          { label: "Ceiling height", value: "9 ft 6 in" },
        ],
      },
      {
        group: "Finishes",
        items: [
          { label: "Flooring", value: "Vitrified tiles" },
          { label: "Windows", value: "Anodised aluminium sliding windows" },
        ],
      },
    ],

    floorPlans: [
      {
        name: "2 BHK",
        carpetArea: "690 sq.ft. carpet",
        image: "/images/projects/heights/plan-2bhk.jpg",
      },
      {
        name: "3 BHK",
        carpetArea: "985 sq.ft. carpet",
        image: "/images/projects/heights/plan-3bhk.jpg",
      },
    ],

    connectivity: [
      { label: "Borivali Railway Station", distance: "2.4 km" },
      { label: "Western Express Highway", distance: "1.6 km" },
      { label: "Sanjay Gandhi National Park", distance: "3.0 km" },
      { label: "Growel's 101 Mall", distance: "4.5 km" },
    ],

    featured: false,
    order: 2,

    seo: {
      title: "Prabhav Heights, Borivali West — Delivered 2 & 3 BHK Homes",
      description:
        "Prabhav Heights: 192 homes in a 24-storey tower on New Link Road, Borivali West. Delivered September 2018 with occupation certificate in hand.",
      keywords: [
        "Prabhav Heights Borivali",
        "3 BHK Borivali West",
        "completed projects Mumbai",
      ],
    },
  },

  /* ===================================================================== */
  {
    slug: "prabhav-riverwood-villas",
    name: "Prabhav Riverwood Villas",
    tagline: "Thirty-two courtyard villas on the Karjat river bend",
    status: "upcoming",
    category: "Villas",
    configuration: "3 & 4 BHK Courtyard Villas",
    priceLabel: "₹ 1.45 Cr onwards",
    possession: "September 2028",
    reraNumber: "P52000XXXXXX",

    location: {
      locality: "Karjat",
      city: "Raigad",
      address: "Off Karjat–Chowk Road, Karjat, Raigad, Maharashtra 410201",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773!2d73.32!3d18.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS2FyamF0!5e0!3m2!1sen!2sin!4v1700000000005",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=Karjat+Raigad",
    },

    facts: [
      { label: "Land parcel", value: "9.6 acres" },
      { label: "Villas", value: "32 units" },
      { label: "Plot sizes", value: "3,200 – 6,000 sq.ft." },
      { label: "Built-up", value: "2,100 – 3,400 sq.ft." },
      { label: "Open space", value: "68% of estate" },
      { label: "River frontage", value: "220 m" },
    ],

    heroImage: "/images/projects/riverwood/hero.jpg",
    thumbnail: "/images/projects/riverwood/thumb.jpg",
    gallery: [
      { src: "/images/projects/riverwood/gallery-1.jpg", caption: "Villa courtyard" },
      { src: "/images/projects/riverwood/gallery-2.jpg", caption: "River frontage" },
      { src: "/images/projects/riverwood/gallery-3.jpg", caption: "Estate clubhouse" },
    ],

    overview: [
      "Riverwood is a 9.6-acre villa estate on a bend of the Ulhas river near Karjat — thirty-two courtyard homes, each planned around a private open court that pulls light and air into the centre of the plan.",
      "The estate keeps 68% of its land open, holds 220 metres of river frontage as a protected buffer, and is designed for weekend use as easily as for full-time living: an hour and forty minutes from Andheri on the expressway.",
    ],

    highlights: [
      {
        icon: "tree",
        title: "220 m river frontage",
        description: "Held as a protected green buffer, not parcelled into plots.",
      },
      {
        icon: "sun",
        title: "Courtyard planning",
        description:
          "Each villa is built around a private open court for light and cross-air.",
      },
      {
        icon: "ruler",
        title: "3,200 – 6,000 sq.ft. plots",
        description: "Generous land parcels with private garden and parking court.",
      },
      {
        icon: "clubhouse",
        title: "Estate clubhouse",
        description: "A shared 6,500 sq.ft. clubhouse with pool, cafe and guest suites.",
      },
    ],

    amenities: [
      { icon: "pool", name: "Estate swimming pool" },
      { icon: "clubhouse", name: "Clubhouse & guest suites" },
      { icon: "run", name: "Nature trail" },
      { icon: "kids", name: "Children's play meadow" },
      { icon: "party", name: "Riverside deck" },
      { icon: "cafe", name: "Estate cafe" },
      { icon: "pet", name: "Pet-friendly grounds" },
      { icon: "cctv", name: "Gated estate security" },
      { icon: "power", name: "Backup power" },
      { icon: "water", name: "Water treatment & harvesting" },
    ],

    specifications: [
      {
        group: "Structure",
        items: [
          { label: "Structure", value: "RCC framed with load-bearing courtyard walls" },
          { label: "Roof", value: "Sloping Mangalore-tile roof over RCC slab" },
          { label: "Ceiling height", value: "10 ft ground, 9 ft 6 in upper" },
        ],
      },
      {
        group: "Finishes",
        items: [
          { label: "Flooring", value: "Kota stone and engineered wood" },
          { label: "Courtyard", value: "Natural stone paving with planted bed" },
          {
            label: "Joinery",
            value: "Solid teak doors, powder-coated aluminium windows",
          },
        ],
      },
    ],

    floorPlans: [
      {
        name: "3 BHK Villa",
        carpetArea: "2,100 sq.ft. built-up",
        image: "/images/projects/riverwood/plan-3bhk.jpg",
      },
      {
        name: "4 BHK Villa",
        carpetArea: "3,400 sq.ft. built-up",
        image: "/images/projects/riverwood/plan-4bhk.jpg",
      },
    ],

    connectivity: [
      { label: "Karjat Railway Station", distance: "8.2 km" },
      { label: "Mumbai–Pune Expressway", distance: "22 km" },
      { label: "Andheri (via expressway)", distance: "1 hr 40 min" },
      { label: "Pune", distance: "1 hr 55 min" },
    ],

    featured: false,
    order: 2,

    seo: {
      title: "Prabhav Riverwood Villas — 3 & 4 BHK Courtyard Villas, Karjat",
      description:
        "Prabhav Riverwood Villas: 32 courtyard villas on a 9.6-acre river-bend estate near Karjat. Plots from 3,200 sq.ft., 220 m of protected river frontage.",
      keywords: ["villas in Karjat", "weekend home near Mumbai", "Prabhav Riverwood"],
    },
  },
];

/* ---------------------------------------------------------------------- */
/* Helpers — used by the projects listing, detail pages and the home page  */
/* ---------------------------------------------------------------------- */

export const statusMeta: Record<
  ProjectStatus,
  { label: string; badge: string; description: string }
> = {
  upcoming: {
    label: "Upcoming",
    badge: "New Launch",
    description: "Approved, registered and opening for first bookings.",
  },
  ongoing: {
    label: "Ongoing",
    badge: "Under Construction",
    description: "Under construction, with monthly progress shared with buyers.",
  },
  completed: {
    label: "Completed",
    badge: "Delivered",
    description: "Delivered and occupied, with occupation certificate in hand.",
  },
};

/** Display order for filters and listing groups. */
export const statusOrder: ProjectStatus[] = ["upcoming", "ongoing", "completed"];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects
    .filter((project) => project.status === status)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/** The single project showcased in the home-page hero and featured section. */
export function getHeroProject(): Project {
  return getProject("codenamecrown") ?? projects[0];
}
