import { useId } from "react";
import { cn } from "@/lib/utils";

export type TempleKind = "jain" | "sai" | "ganpati";

/** Temple illustrations for the CSR section, themed through the same CSS variables as the other scenes. */
export function TempleArt({ kind, className, title }: { kind: TempleKind; className?: string; title?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" className={cn("h-full w-full", className)} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sky-top)" />
          <stop offset="1" stopColor="var(--sky-bottom)" />
        </linearGradient>
        <linearGradient id={`gold${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbcd8c" />
          <stop offset="1" stopColor="#9a5f2e" />
        </linearGradient>
        <linearGradient id={`marble${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fffaf2" />
          <stop offset="0.6" stopColor="#f1e6d6" />
          <stop offset="1" stopColor="#dccab2" />
        </linearGradient>
        <linearGradient id={`saffron${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6a54b" />
          <stop offset="1" stopColor="#c8601f" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky${uid})`} />
      <circle cx="320" cy="70" r="46" fill="var(--sun)" opacity="0.25" />
      <circle cx="320" cy="70" r="20" fill="var(--sun)" />
      {/* Rays of light behind the shrine */}
      <g opacity="0.18" fill="var(--sun)">
        {[-50, -25, 0, 25, 50].map((a) => (
          <path key={a} d="M200 200 L192 20 L208 20 Z" transform={`rotate(${a} 200 200)`} />
        ))}
      </g>

      {kind === "jain" && (
        <g>
          {/* Tall nagara shikhara in white marble */}
          <path d="M160 190 C160 120 182 70 200 50 C218 70 240 120 240 190 Z" fill={`url(#marble${uid})`} />
          {[80, 100, 120, 140, 160].map((y) => (
            <path key={y} d={`M${170 - (y - 80) * 0.12} ${y} Q200 ${y - 6} ${230 + (y - 80) * 0.12} ${y}`} fill="none" stroke="#d9c5a6" strokeWidth="1.5" />
          ))}
          <ellipse cx="200" cy="48" rx="12" ry="5" fill={`url(#gold${uid})`} />
          <path d="M196 46 L200 26 L204 46 Z" fill={`url(#gold${uid})`} />
          <line x1="200" y1="26" x2="200" y2="6" stroke="#9a5f2e" strokeWidth="1.5" />
          <path className="flag-wave" d="M200 6 L226 11 L200 17 Z" fill="#d6452f" />
          {/* Side shrines */}
          <path d="M120 200 C120 170 132 150 140 140 C148 150 160 170 160 200 Z" fill={`url(#marble${uid})`} />
          <path d="M240 200 C240 170 252 150 260 140 C268 150 280 170 280 200 Z" fill={`url(#marble${uid})`} />
          {/* Mandapa with pillars */}
          <rect x="110" y="190" width="180" height="50" fill={`url(#marble${uid})`} />
          {[124, 152, 180, 208, 236, 264].map((x) => (
            <rect key={x} x={x} y="198" width="8" height="42" fill="#e6d6bf" />
          ))}
          <path d="M188 240 V214 Q200 200 212 214 V240 Z" fill="var(--tower-edge)" />
          <rect x="104" y="186" width="192" height="6" fill={`url(#gold${uid})`} />
        </g>
      )}

      {kind === "sai" && (
        <g>
          {/* Domed shrine */}
          <rect x="120" y="150" width="160" height="90" fill={`url(#marble${uid})`} />
          <path d="M150 150 Q150 92 200 82 Q250 92 250 150 Z" fill={`url(#marble${uid})`} />
          <path d="M150 150 Q150 92 200 82 Q250 92 250 150" fill="none" stroke="#d9c5a6" strokeWidth="2" />
          <circle cx="200" cy="80" r="6" fill={`url(#gold${uid})`} />
          <path d="M197 76 L200 58 L203 76 Z" fill={`url(#gold${uid})`} />
          <line x1="200" y1="58" x2="200" y2="30" stroke="#9a5f2e" strokeWidth="1.5" />
          <path className="flag-wave" d="M200 30 L230 38 L200 46 Z" fill={`url(#saffron${uid})`} />
          {/* Small corner domes */}
          {[132, 268].map((x) => (
            <g key={x}>
              <rect x={x - 10} y="128" width="20" height="22" fill="#efe2cf" />
              <path d={`M${x - 12} 128 Q${x} 108 ${x + 12} 128 Z`} fill={`url(#marble${uid})`} />
            </g>
          ))}
          {/* Arched entrances */}
          {[150, 200, 250].map((x) => (
            <path key={x} d={`M${x - 14} 240 V196 Q${x} 176 ${x + 14} 196 V240 Z`} fill={x === 200 ? "var(--window-lit)" : "#e2d2bb"} />
          ))}
          <rect x="114" y="146" width="172" height="5" fill={`url(#gold${uid})`} />
        </g>
      )}

      {kind === "ganpati" && (
        <g>
          {/* Tiered saffron shikhara */}
          {[0, 1, 2, 3].map((i) => {
            const w = 110 - i * 22;
            const y = 170 - i * 28;
            return <rect key={i} x={200 - w / 2} y={y} width={w} height={26} rx={3} fill={`url(#saffron${uid})`} stroke="#a94f18" strokeWidth="1" />;
          })}
          <path d="M178 86 Q200 60 222 86 Z" fill={`url(#saffron${uid})`} />
          <circle cx="200" cy="66" r="5" fill={`url(#gold${uid})`} />
          <path d="M197 62 L200 44 L203 62 Z" fill={`url(#gold${uid})`} />
          <line x1="200" y1="44" x2="200" y2="20" stroke="#9a5f2e" strokeWidth="1.5" />
          <path className="flag-wave" d="M200 20 L230 27 L200 34 Z" fill="#f08a24" />
          {/* Hall */}
          <rect x="120" y="196" width="160" height="44" fill={`url(#marble${uid})`} />
          {[134, 162, 238, 266].map((x) => (
            <rect key={x} x={x - 4} y="202" width="8" height="38" fill="#e6d6bf" />
          ))}
          <path d="M184 240 V214 Q200 198 216 214 V240 Z" fill="var(--window-lit)" />
          {/* Toran (marigold garland) */}
          <path d="M126 200 Q163 214 200 200 Q237 214 274 200" fill="none" stroke="#f2a33a" strokeWidth="4" strokeDasharray="2 4" strokeLinecap="round" />
          <rect x="114" y="192" width="172" height="5" fill={`url(#gold${uid})`} />
        </g>
      )}

      {/* Steps, ground and trees */}
      <rect x="100" y="240" width="200" height="8" fill="#e6d6bf" />
      <rect x="90" y="248" width="220" height="8" fill="#dccab2" />
      <rect y="256" width="400" height="44" fill="var(--ground)" />
      {[40, 70, 330, 360].map((x, i) => (
        <g key={x} transform={`translate(${x} 256) scale(${i % 2 ? 0.8 : 1.1})`}>
          <rect x="-1.5" y="-12" width="3" height="12" fill="var(--tower-edge)" />
          <circle cy="-20" r="12" fill="var(--leaf)" />
          <circle cx="-6" cy="-13" r="8" fill="var(--leaf-dark)" />
        </g>
      ))}
    </svg>
  );
}
