import { seeded } from "@/lib/utils";

/** Schematic floor plan used as a teaser until real plans are uploaded. Always drawn on white. */
export function PlanArt({ label, seed = 1 }: { label: string; seed?: number }) {
  const rand = seeded(seed + label.length);
  const split1 = 150 + rand() * 40;
  const split2 = 110 + rand() * 30;
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label={`${label} indicative layout`}>
      <rect width="400" height="300" fill="#ffffff" />
      <g fill="none" stroke="#2a1409" strokeWidth="5" strokeLinejoin="round">
        <rect x="30" y="30" width="340" height="240" />
        <line x1={split1} y1="30" x2={split1} y2="270" />
        <line x1={split1} y1={split2} x2="370" y2={split2} />
        <line x1="30" y1="170" x2={split1} y2="170" />
        <line x1={split1 + 110} y1={split2} x2={split1 + 110} y2="270" />
      </g>
      {/* Door swings */}
      <g fill="none" stroke="#b08f25" strokeWidth="1.5">
        <path d={`M${split1} 200 a28 28 0 0 1 28 28`} />
        <path d={`M${split1 + 40} ${split2} a24 24 0 0 0 24 24`} />
        <path d="M80 170 a26 26 0 0 0 26 -26" />
      </g>
      {/* Furniture hints */}
      <g fill="#f3e7da" stroke="#c9a684" strokeWidth="1">
        <rect x="50" y="60" width="70" height="80" rx="4" />
        <rect x={split1 + 20} y="50" width="90" height="44" rx="4" />
        <rect x={split1 + 130} y={split2 + 30} width="40" height="60" rx="4" />
        <circle cx="90" cy="220" r="22" />
      </g>
      <g fontFamily="system-ui, sans-serif" fontSize="11" fill="#6b5548" textAnchor="middle">
        <text x={(30 + split1) / 2} y="158">Bedroom</text>
        <text x={(split1 + 370) / 2} y={split2 - 8}>Living</text>
        <text x={(30 + split1) / 2} y="258">Dining</text>
        <text x={split1 + 55} y="250">Kitchen</text>
        <text x={(split1 + 110 + 370) / 2} y="258">Bath</text>
      </g>
    </svg>
  );
}
