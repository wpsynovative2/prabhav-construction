import { useId } from "react";
import { seeded, cn } from "@/lib/utils";

export type Scene = "towers" | "highrise" | "villas" | "commercial" | "industrial";

type Props = { scene: Scene; seed?: number; className?: string; title?: string; anchor?: "center" | "ground" };

/**
 * Architectural illustration used as a project's cover until real renders are supplied.
 * Deterministic per seed, themed through CSS variables (day in light mode, dusk in dark).
 */
export function BuildingArt({ scene, seed = 1, className, title, anchor = "center" }: Props) {
  const uid = useId().replace(/:/g, "");
  const rand = seeded(seed);
  const sunX = 70 + rand() * 260;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio={anchor === "ground" ? "xMidYMax slice" : "xMidYMid slice"}
      className={cn("h-full w-full", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sky-top)" />
          <stop offset="1" stopColor="var(--sky-bottom)" />
        </linearGradient>
        <linearGradient id={`gold${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbcd8c" />
          <stop offset="1" stopColor="#9a5f2e" />
        </linearGradient>
        <linearGradient id={`shade${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky${uid})`} />
      <circle cx={sunX} cy={70} r={48} fill="var(--sun)" opacity={0.25} />
      <circle cx={sunX} cy={70} r={22} fill="var(--sun)" />
      <path d="M0 250 Q100 225 200 240 T400 232 V300 H0 Z" fill="var(--tower-c)" opacity={0.45} />
      {scene === "towers" && <Towers rand={rand} uid={uid} />}
      {scene === "highrise" && <Highrise rand={rand} uid={uid} />}
      {scene === "villas" && <Villas rand={rand} uid={uid} />}
      {scene === "commercial" && <Commercial rand={rand} uid={uid} />}
      {scene === "industrial" && <Industrial uid={uid} />}
      <rect y={262} width={400} height={38} fill="var(--ground)" />
      <rect y={262} width={400} height={1.5} fill="var(--accent)" opacity={0.6} />
    </svg>
  );
}

type Part = { rand: () => number; uid: string };

function WindowGrid({ x, y, w, h, rand, cell = 12, size = 6 }: { x: number; y: number; w: number; h: number; rand: () => number; cell?: number; size?: number }) {
  const cols = Math.max(1, Math.floor(w / cell));
  const rows = Math.max(1, Math.floor(h / cell));
  const ox = x + (w - cols * cell) / 2 + (cell - size) / 2;
  const cells = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const lit = rand() > 0.45;
      cells.push(
        <rect key={`${r}-${c}`} x={ox + c * cell} y={y + r * cell} width={size} height={size + 1} rx={0.8} fill={lit ? "var(--window-lit)" : "var(--window)"} />,
      );
    }
  return <>{cells}</>;
}

function Tree({ x, s = 1 }: { x: number; s?: number }) {
  return (
    <g transform={`translate(${x} 262) scale(${s})`}>
      <rect x={-1.2} y={-10} width={2.4} height={10} fill="var(--tower-edge)" />
      <circle cy={-18} r={10} fill="var(--leaf)" />
      <circle cx={-5} cy={-12} r={7} fill="var(--leaf-dark)" />
    </g>
  );
}

function Towers({ rand, uid }: Part) {
  const count = 2 + Math.floor(rand() * 2);
  const width = 62;
  const gap = 18;
  const total = count * width + (count - 1) * gap;
  const start = (400 - total) / 2;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const x = start + i * (width + gap);
        const top = 50 + rand() * 70;
        return (
          <g key={i}>
            <rect x={x} y={top} width={width} height={262 - top} fill="var(--tower-a)" />
            <rect x={x + width * 0.7} y={top} width={width * 0.3} height={262 - top} fill={`url(#shade${uid})`} />
            <rect x={x - 3} y={top - 5} width={width + 6} height={5} fill="var(--tower-edge)" />
            <WindowGrid x={x + 4} y={top + 10} w={width - 8} h={262 - top - 24} rand={rand} />
            {[0, 1, 2].map((b) => (
              <rect key={b} x={x} y={top + 40 + b * 55} width={width} height={1.5} fill="var(--accent)" opacity={0.8} />
            ))}
          </g>
        );
      })}
      <Tree x={40} s={1.3} />
      <Tree x={62} s={0.9} />
      <Tree x={348} s={1.2} />
      <Tree x={370} s={0.8} />
    </g>
  );
}

/** One slender high-rise with a lit crown, flanked by low-rise neighbours. */
function Highrise({ rand, uid }: Part) {
  // Kept within the lower half of the canvas so the crown survives wide, ground-anchored crops
  const x = 174;
  const w = 52;
  const top = 150;
  const floors = Array.from({ length: 14 }, (_, i) => top + 20 + i * 5);
  return (
    <g>
      {[
        { x: 92, w: 46, h: 46 },
        { x: 250, w: 54, h: 60 },
        { x: 132, w: 34, h: 32 },
      ].map((b, i) => (
        <g key={i} opacity={0.75}>
          <rect x={b.x} y={262 - b.h} width={b.w} height={b.h} fill="var(--tower-b)" />
          <WindowGrid x={b.x + 3} y={262 - b.h + 6} w={b.w - 6} h={b.h - 12} rand={rand} cell={9} size={4} />
        </g>
      ))}
      {/* crown */}
      <path d={`M${x + 5} ${top} L${x + 12} ${top - 11} L${x + 19} ${top - 3} L${x + w / 2} ${top - 16} L${x + w - 19} ${top - 3} L${x + w - 12} ${top - 11} L${x + w - 5} ${top} Z`} fill={`url(#gold${uid})`} />
      <circle cx={x + w / 2} cy={top - 18} r={1.6} fill="var(--accent)" />
      {/* shaft */}
      <rect x={x} y={top} width={w} height={262 - top} fill="var(--tower-a)" />
      <rect x={x + w * 0.68} y={top} width={w * 0.32} height={262 - top} fill={`url(#shade${uid})`} />
      <rect x={x - 2} y={top} width={w + 4} height={4} fill="var(--tower-edge)" />
      <rect x={x + 4} y={top + 7} width={w - 8} height={8} fill="var(--window-lit)" opacity={0.9} />
      {floors.map((y, i) => (
        <g key={i}>
          <rect x={x + 4} y={y} width={w - 8} height={3} fill={rand() > 0.4 ? "var(--window-lit)" : "var(--window)"} />
          <rect x={x - 2} y={y + 3.6} width={w * 0.42} height={1} fill="var(--tower-edge)" />
          <rect x={x + w * 0.58 + 2} y={y + 3.6} width={w * 0.42} height={1} fill="var(--tower-edge)" />
        </g>
      ))}
      <rect x={x + w / 2 - 0.6} y={top + 18} width={1.2} height={262 - top - 40} fill="var(--accent)" opacity={0.7} />
      {/* double-height lobby */}
      <rect x={x + 7} y={262 - 18} width={w - 14} height={18} fill="var(--window-lit)" />
      <rect x={x + 3} y={262 - 20} width={w - 6} height={2.4} fill={`url(#gold${uid})`} />
      <Tree x={160} s={0.8} />
      <Tree x={242} s={0.9} />
      <Tree x={40} s={1.2} />
      <Tree x={362} s={1.2} />
    </g>
  );
}

function Villas({ rand, uid }: Part) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const x = 26 + i * 90;
        const h = 70 + rand() * 12;
        const top = 262 - h;
        return (
          <g key={i}>
            <rect x={x} y={top} width={72} height={h} fill="var(--tower-a)" />
            <rect x={x + 50} y={top} width={22} height={h} fill={`url(#shade${uid})`} />
            <path d={`M${x - 8} ${top} L${x + 36} ${top - 34} L${x + 80} ${top} Z`} fill="var(--primary)" opacity={0.85} />
            <path d={`M${x - 8} ${top} L${x + 36} ${top - 34} L${x + 80} ${top}`} fill="none" stroke={`url(#gold${uid})`} strokeWidth={2} />
            <rect x={x + 10} y={top + 14} width={16} height={14} rx={1} fill="var(--window-lit)" />
            <rect x={x + 44} y={top + 14} width={16} height={14} rx={1} fill="var(--window)" />
            <rect x={x + 28} y={262 - 30} width={16} height={30} rx={1} fill="var(--tower-edge)" />
            <circle cx={x + 40} cy={262 - 15} r={1.2} fill="var(--accent)" />
          </g>
        );
      })}
      <g stroke="var(--tower-edge)" strokeWidth={1.4} opacity={0.7}>
        <line x1={0} x2={400} y1={255} y2={255} />
        {Array.from({ length: 40 }, (_, i) => (
          <line key={i} x1={i * 10 + 5} x2={i * 10 + 5} y1={250} y2={262} />
        ))}
      </g>
      <Tree x={18} s={1.1} />
      <Tree x={385} s={1.1} />
    </g>
  );
}

function Commercial({ rand, uid }: Part) {
  const backTop = 70 + rand() * 30;
  return (
    <g>
      <rect x={250} y={backTop} width={90} height={262 - backTop} fill="var(--tower-c)" />
      <WindowGrid x={254} y={backTop + 8} w={82} h={262 - backTop - 20} rand={rand} />
      <rect x={60} y={80} width={210} height={182} fill="var(--glass)" />
      <rect x={60} y={80} width={210} height={182} fill={`url(#shade${uid})`} />
      {/* Curtain wall mullions + gold fins */}
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={66 + i * 17.5} y={80} width={i % 3 === 0 ? 3 : 1} height={182} fill={i % 3 === 0 ? `url(#gold${uid})` : "var(--tower-a)"} opacity={i % 3 === 0 ? 1 : 0.6} />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={60} y={100 + i * 20} width={210} height={1} fill="var(--tower-a)" opacity={0.6} />
      ))}
      <g className="night-only">
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={72 + Math.floor(rand() * 11) * 17.5} y={104 + Math.floor(rand() * 6) * 20} width={14} height={14} fill="var(--window-lit)" opacity={0.85} />
        ))}
      </g>
      <rect x={52} y={70} width={226} height={10} fill="var(--tower-edge)" />
      {/* Ground-floor shops with awnings */}
      <rect x={60} y={222} width={210} height={40} fill="var(--tower-a)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={68 + i * 51} y={232} width={42} height={30} fill="var(--window-lit)" opacity={0.9} />
          <path d={`M${64 + i * 51} 232 h50 l-4 -8 h-42 Z`} fill={i % 2 ? "var(--primary)" : `url(#gold${uid})`} />
        </g>
      ))}
      <Tree x={30} s={1.2} />
      <Tree x={370} s={1.1} />
    </g>
  );
}

function Industrial({ uid }: { uid: string }) {
  return (
    <g>
      {[0, 1].map((i) => {
        const x = 30 + i * 180;
        return (
          <g key={i}>
            <rect x={x} y={180} width={160} height={82} fill="var(--tower-a)" />
            <rect x={x + 120} y={180} width={40} height={82} fill={`url(#shade${uid})`} />
            {/* Saw-tooth roof */}
            <path
              d={`M${x} 180 l20 -26 v26 l20 -26 v26 l20 -26 v26 l20 -26 v26 l20 -26 v26 l20 -26 v26 l20 -26 v26 l20 -26 v26 Z`}
              fill="var(--tower-b)"
            />
            {Array.from({ length: 8 }, (_, k) => (
              <rect key={k} x={x + 20 * k + 16} y={156 + 2} width={3} height={22} fill="var(--window-lit)" opacity={0.8} />
            ))}
            {/* Roller shutters */}
            {[0, 1, 2].map((d) => (
              <g key={d}>
                <rect x={x + 14 + d * 50} y={214} width={34} height={48} fill="var(--tower-c)" />
                {Array.from({ length: 8 }, (_, l) => (
                  <line key={l} x1={x + 14 + d * 50} x2={x + 48 + d * 50} y1={218 + l * 6} y2={218 + l * 6} stroke="var(--tower-edge)" strokeWidth={0.8} />
                ))}
              </g>
            ))}
            <rect x={x} y={194} width={160} height={4} fill={`url(#gold${uid})`} />
          </g>
        );
      })}
      {/* Truck */}
      <g transform="translate(250 236)">
        <rect width={62} height={22} rx={2} fill="var(--primary)" />
        <rect x={62} y={6} width={20} height={16} rx={2} fill="var(--tower-edge)" />
        <rect x={68} y={9} width={9} height={6} fill="var(--window-lit)" />
        <circle cx={14} cy={24} r={5} fill="var(--fg)" />
        <circle cx={70} cy={24} r={5} fill="var(--fg)" />
      </g>
    </g>
  );
}
