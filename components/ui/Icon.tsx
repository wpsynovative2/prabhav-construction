/**
 * A small, self-contained stroke-icon set.
 *
 * Kept in-repo rather than pulled from an icon package so the static bundle
 * stays dependency-free and every icon can be referenced by name from the data
 * files in `data/`.
 */

export type IconName = keyof typeof paths;

const paths = {
  /* --- navigation & interface ------------------------------------------ */
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-left": "M19 12H5M11 18l-6-6 6-6",
  "arrow-up-right": "M7 17 17 7M8 7h9v9",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-up": "m18 15-6-6-6 6",
  "chevron-left": "m15 18-6-6 6-6",
  "chevron-right": "m9 18 6-6-6-6",
  close: "M18 6 6 18M6 6l12 12",
  menu: "M4 7h16M4 12h16M4 17h16",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  check: "m20 6-11 11-5-5",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35",
  download: "M12 3v12M7 11l5 5 5-5M4 19h16",
  external: "M14 4h6v6M20 4 10 14M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6",
  quote:
    "M9 7H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1a3 3 0 0 1-3 3M20 7h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1a3 3 0 0 1-3 3",

  /* --- contact ---------------------------------------------------------- */
  phone:
    "M21 16.5v3a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-6-6 19.5 19.5 0 0 1-3-8.6A2 2 0 0 1 3.3 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7.4 9.8a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  "map-pin": "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  whatsapp:
    "M3 21l1.7-4.9A8.5 8.5 0 1 1 7.9 19.3L3 21ZM8.6 8.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.3 0 .5-.1.7l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.5.3.1.5 0 .6-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4v.5c0 .3-.3 1-.9 1.3-.6.3-1.5.4-2.6.1-1.6-.5-3-1.3-4.3-2.7-1.3-1.4-2-2.8-2.3-3.9-.3-1.1-.1-1.9.1-2.4Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.5 2",
  calendar: "M7 3v4M17 3v4M3.5 9.5h17M4 5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",

  /* --- brand values ----------------------------------------------------- */
  shield: "M12 3 5 6v5.5c0 4.3 2.9 8.3 7 9.5 4.1-1.2 7-5.2 7-9.5V6l-7-3ZM9.5 12l1.8 1.9 3.4-3.6",
  handshake: "M9 12.5 6.5 15a2 2 0 1 0 2.8 2.8l.7-.7.9.9a1.8 1.8 0 0 0 2.6-2.6M3 8l3-3 4 1 2 2-2.5 2.5a1.8 1.8 0 0 0 0 2.5M21 8l-3-3-4 1-2 2 5.5 5.5a1.8 1.8 0 0 1-2.5 2.5",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM15.5 8.5l-2 5-5 2 2-5 5-2Z",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  heart: "M12 20s-7-4.4-7-9.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.7c0 4.9-7 9.3-7 9.3Z",
  users: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4M15 4.6a3.5 3.5 0 0 1 0 6.8",
  growth: "M4 19h16M6 16l4-5 3 3 5-7M18 7h-3M18 7v3",
  chart: "M4 20h16M7 20v-6M12 20V8M17 20v-9",
  file: "M14 3v5h5M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8l-4-5ZM9 13h6M9 17h4",
  sparkles: "m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4ZM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z",

  /* --- construction & project ------------------------------------------ */
  building: "M4 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16M13 21V10h6a1 1 0 0 1 1 1v10M3 21h18M7 8h2M7 12h2M7 16h2M16 14h1M16 18h1",
  hardhat: "M4 16a8 8 0 0 1 16 0M3 16h18v2H3zM10 8V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V8M9 16V9.5M15 16V9.5",
  ruler: "m3.5 14.5 7-7 6 6-7 7-6-6ZM7 11l1.5 1.5M9.5 8.5 11 10M12 6l1.5 1.5",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  tree: "M12 21v-4M12 17l-4-3M12 15l4-3M12 3 6.5 11h11L12 3ZM8.5 15.5h7L12 9.5l-3.5 6Z",
  car: "M5 16v2M19 16v2M4 16h16v-3.2a2 2 0 0 0-.3-1L18 9H6L4.3 11.8a2 2 0 0 0-.3 1V16ZM7 13h1M16 13h1",
  key: "M15 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM20 4a6 6 0 0 1-8 8.9L5 20H3v-2l7-7A6 6 0 0 1 20 4Z",

  /* --- amenities -------------------------------------------------------- */
  pool: "M3 18c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1M8 14V6a2 2 0 0 1 4 0M16 14V6a2 2 0 0 0-4 0M8 8h4M8 11h4",
  dumbbell: "M6.5 6.5v11M4 9v6M17.5 6.5v11M20 9v6M6.5 12h11",
  yoga: "M12 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 8v5M12 13l-4 6M12 13l4 6M7 10h10",
  kids: "M9 9h.01M15 9h.01M9.5 14a3.5 3.5 0 0 0 5 0M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  run: "M15 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM10 21l2-5-3-3 1-5 3 2 3 1M9 8 6 9M13 16l3 5",
  clubhouse: "M3 10 12 3l9 7M5 10v10h14V10M10 20v-5h4v5",
  theatre: "M3 5h18v12H3zM3 9h18M8 21h8M12 17v4",
  work: "M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1ZM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18",
  party: "M4 20l5-13 8 8-13 5ZM14 4v2M18 6l1.5-1.5M19 10h2",
  sports: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 3v18M3 12h18",
  cafe: "M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM16 10h2a2 2 0 0 1 0 4h-2M6 5V3M10 5V3M14 5V3",
  pet: "M8.5 8a1.5 2 0 1 0 0-4 1.5 2 0 0 0 0 4ZM15.5 8a1.5 2 0 1 0 0-4 1.5 2 0 0 0 0 4ZM5 13a1.5 2 0 1 0 0-4 1.5 2 0 0 0 0 4ZM19 13a1.5 2 0 1 0 0-4 1.5 2 0 0 0 0 4ZM12 20c-2.5 0-4-1.4-4-3 0-2 2-4 4-4s4 2 4 4c0 1.6-1.5 3-4 3Z",
  senior: "M13 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM13 8v5l-3 8M13 13l3 8M7 11l4-2M17 21v-7",
  ev: "M6 4h8a1 1 0 0 1 1 1v15H5V5a1 1 0 0 1 1-1ZM5 12h10M15 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0v-5l-2-3M10 6.5 8.5 9.5h3L10 12.5",
  cctv: "M4 6.5 16 3l1.5 5L5.5 11.5 4 6.5ZM6.5 11v3a3 3 0 0 0 3 3H14M17 8l3.5 1M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  power: "M13 3 5 14h6l-1 7 8-11h-6l1-7Z",
  water: "M12 3s6 6.5 6 10.5A6 6 0 1 1 6 13.5C6 9.5 12 3 12 3Z",
  wifi: "M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M12 19h.01M2 9.5a15 15 0 0 1 20 0",

  /* --- social ----------------------------------------------------------- */
  facebook: "M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2a4 4 0 0 0-4 4v1.5H9V11h2v10h3V11h2.2l.3-2.5H14Z",
  instagram:
    "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17.5 6.5h.01",
  linkedin:
    "M5.5 7A1.5 1.5 0 1 0 5.5 4a1.5 1.5 0 0 0 0 3ZM4 9.5h3V20H4zM10 20V9.5h3v1.4a3.6 3.6 0 0 1 3.2-1.7c2.3 0 3.8 1.5 3.8 4.3V20h-3v-6c0-1.4-.6-2.2-1.8-2.2S13 12.7 13 14v6h-3Z",
  youtube:
    "M21 8.2a2.6 2.6 0 0 0-1.8-1.9C17.5 5.8 12 5.8 12 5.8s-5.5 0-7.2.5A2.6 2.6 0 0 0 3 8.2 27 27 0 0 0 2.6 12 27 27 0 0 0 3 15.8a2.6 2.6 0 0 0 1.8 1.9c1.7.5 7.2.5 7.2.5s5.5 0 7.2-.5a2.6 2.6 0 0 0 1.8-1.9 27 27 0 0 0 .4-3.8 27 27 0 0 0-.4-3.8ZM10.2 14.6V9.4l4.5 2.6-4.5 2.6Z",
} as const;

/** Icons that read better filled than stroked. */
const filled = new Set<IconName>([
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "power",
]);

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export function Icon({ name, size = 24, className, ...rest }: IconProps) {
  const path = paths[name as IconName] ?? paths.sparkles;
  const isFilled = filled.has(name as IconName);

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d={path} />
    </svg>
  );
}

export default Icon;
