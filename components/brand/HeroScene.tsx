import { seeded } from "@/lib/utils";

type Tower = { x: number; w: number; top: number; delay: number; crown?: boolean; building?: boolean };

const BASE = 440;
const TOWERS: Tower[] = [
  { x: 132, w: 74, top: 200, delay: 0.35 },
  { x: 214, w: 96, top: 104, delay: 0.15, crown: true },
  { x: 320, w: 84, top: 158, delay: 0.25 },
  { x: 414, w: 70, top: 232, delay: 0.45, building: true },
];

function Windows({ t, rand }: { t: Tower; rand: () => number }) {
  const cols = Math.floor((t.w - 14) / 14);
  const startX = t.x + (t.w - cols * 14) / 2 + 3;
  const out = [];
  const topY = t.building ? t.top + 46 : t.top + 16;
  for (let y = topY; y < BASE - 22; y += 15) {
    for (let c = 0; c < cols; c++) {
      const lit = rand() > 0.42;
      out.push(
        <rect
          key={`${y}-${c}`}
          x={startX + c * 14}
          y={y}
          width={8}
          height={9}
          rx={1}
          fill={lit ? "var(--window-lit)" : "var(--window)"}
          className={lit && rand() > 0.8 ? "win-twinkle" : undefined}
          style={lit ? { animationDelay: `${(rand() * 3).toFixed(2)}s` } : undefined}
        />,
      );
    }
  }
  return <>{out}</>;
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-1.5} y={-4} width={3} height={14} fill="var(--tower-edge)" />
      <circle cx={0} cy={-12} r={11} fill="var(--leaf)" />
      <circle cx={-6} cy={-6} r={8} fill="var(--leaf-dark)" />
      <circle cx={6} cy={-7} r={7} fill="var(--leaf)" />
    </g>
  );
}

function Cloud({ y, s, dur, delay }: { y: number; s: number; dur: number; delay: number }) {
  return (
    <g className="cloud-drift" style={{ animationDuration: `${dur}s`, animationDelay: `-${delay}s` }}>
      <g transform={`translate(0 ${y}) scale(${s})`} fill="var(--cloud)" opacity={0.85}>
        <ellipse cx={40} cy={10} rx={34} ry={11} />
        <ellipse cx={30} cy={2} rx={16} ry={12} />
        <ellipse cx={52} cy={0} rx={20} ry={15} />
      </g>
    </g>
  );
}

/**
 * Illustrated hero: towers rise inside an arched frame, a crane swings over the tower
 * still being built, and the pool ripples. Every colour is a CSS variable, so night
 * falls (lit windows, moon, stars) when the site switches to the dark theme.
 */
export function HeroScene({ className }: { className?: string }) {
  const rand = seeded(42);
  const stars = Array.from({ length: 26 }, () => ({ x: 70 + rand() * 500, y: 40 + rand() * 180, r: rand() * 1.4 + 0.4 }));
  return (
    <svg viewBox="0 0 640 540" className={className} role="img" aria-label="Illustration of Prabhav residential towers beside a pool">
      <defs>
        <clipPath id="hs-arch">
          <path d="M70 520 V290 A250 250 0 0 1 570 290 V520 Z" />
        </clipPath>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sky-top)" />
          <stop offset="1" stopColor="var(--sky-bottom)" />
        </linearGradient>
        <radialGradient id="hs-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--sun)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--sun)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbcd8c" />
          <stop offset="1" stopColor="#9a5f2e" />
        </linearGradient>
        <linearGradient id="hs-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--water-hi)" />
          <stop offset="1" stopColor="var(--water)" />
        </linearGradient>
        <linearGradient id="hs-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Outer gold frame */}
      <path d="M58 528 V290 A262 262 0 0 1 582 290 V528" fill="none" stroke="url(#hs-gold)" strokeWidth="1.5" opacity="0.7" />

      <g clipPath="url(#hs-arch)">
        <rect width="640" height="540" fill="url(#hs-sky)" />

        {/* Stars (night only) */}
        <g className="night-only">
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fbe7c0" className="win-twinkle" style={{ animationDelay: `${i * 0.23}s` }} />
          ))}
        </g>

        {/* Sun / moon */}
        <circle cx="455" cy="160" r="90" fill="url(#hs-sun)" />
        <circle cx="455" cy="160" r="38" fill="var(--sun)" />
        <circle cx="470" cy="150" r="34" fill="var(--sky-top)" className="night-only" />

        <Cloud y={90} s={1} dur={70} delay={10} />
        <Cloud y={150} s={0.7} dur={90} delay={50} />
        <Cloud y={60} s={0.55} dur={110} delay={80} />

        {/* Distant skyline */}
        <path
          d="M70 440 V380 H96 V350 H120 V395 H150 V360 H176 V410 H470 V340 H494 V372 H520 V330 H548 V385 H570 V440 Z"
          fill="var(--tower-c)"
          opacity="0.55"
        />

        {/* Crane (behind the tower under construction) */}
        <g>
          <rect x="513" y="118" width="6" height="322" fill="var(--accent)" opacity="0.9" />
          <path d="M513 118 L516 100 L519 118" fill="var(--accent)" />
          <g className="crane-arm" style={{ transformOrigin: "516px 124px" }}>
            <rect x="400" y="121" width="170" height="5" fill="var(--accent)" />
            <rect x="560" y="126" width="16" height="12" fill="var(--tower-edge)" />
            <line x1="516" y1="100" x2="410" y2="123" stroke="var(--accent)" strokeWidth="1" />
            <line x1="516" y1="100" x2="566" y2="123" stroke="var(--accent)" strokeWidth="1" />
            <line x1="440" y1="126" x2="440" y2="196" stroke="var(--tower-edge)" strokeWidth="1" />
            <rect x="430" y="196" width="20" height="10" fill="url(#hs-gold)" />
          </g>
        </g>

        {/* Towers */}
        {TOWERS.map((t) => (
          <g key={t.x} className="tower-rise intro-delay" style={{ "--d": `${t.delay}s` } as React.CSSProperties}>
            <rect x={t.x} y={t.top} width={t.w} height={BASE - t.top} fill="var(--tower-a)" />
            <rect x={t.x + t.w * 0.72} y={t.top} width={t.w * 0.28} height={BASE - t.top} fill="url(#hs-shade)" />
            <rect x={t.x} y={t.top} width={t.w} height={4} fill="var(--tower-edge)" />
            {t.building ? (
              // Exposed floors under construction
              <g stroke="var(--tower-edge)" strokeWidth="2">
                {[0, 1, 2].map((i) => (
                  <line key={i} x1={t.x} x2={t.x + t.w} y1={t.top + 12 + i * 12} y2={t.top + 12 + i * 12} />
                ))}
                {[0.1, 0.5, 0.9].map((f) => (
                  <line key={f} x1={t.x + t.w * f} x2={t.x + t.w * f} y1={t.top} y2={t.top + 40} />
                ))}
              </g>
            ) : null}
            <Windows t={t} rand={rand} />
            {/* Gold floor bands every few storeys */}
            {Array.from({ length: Math.floor((BASE - t.top) / 75) }, (_, i) => (
              <rect key={i} x={t.x} y={t.top + 60 + i * 75} width={t.w} height={2} fill="var(--accent)" opacity={0.75} />
            ))}
            {t.crown ? (
              <g>
                <rect x={t.x + 12} y={t.top - 16} width={t.w - 24} height={16} fill="var(--tower-b)" />
                <path d={`M${t.x + t.w / 2 - 3} ${t.top - 16} L${t.x + t.w / 2} ${t.top - 50} L${t.x + t.w / 2 + 3} ${t.top - 16} Z`} fill="url(#hs-gold)" />
                <circle cx={t.x + t.w / 2} cy={t.top - 52} r={2.5} fill="#ff6b4a" className="win-twinkle" />
              </g>
            ) : null}
          </g>
        ))}

        {/* Podium + ground */}
        <rect x="110" y="432" width="420" height="16" rx="3" fill="var(--tower-b)" />
        <rect x="0" y="446" width="640" height="100" fill="var(--ground)" />

        {/* Trees */}
        <Tree x={104} y={442} s={1.2} />
        <Tree x={122} y={446} s={0.9} />
        <Tree x={528} y={444} s={1.1} />
        <Tree x={548} y={447} s={0.8} />
        <Tree x={312} y={446} s={0.7} />

        {/* Pool with reflection */}
        <rect x="150" y="462" width="340" height="44" rx="22" fill="url(#hs-water)" />
        <g opacity="0.22" transform="translate(0 924) scale(1 -1)">
          <rect x="214" y="420" width="96" height="40" fill="var(--tower-a)" />
          <rect x="320" y="420" width="84" height="40" fill="var(--tower-a)" />
        </g>
        <g stroke="var(--cloud)" strokeWidth="2" strokeLinecap="round" opacity="0.8">
          <line className="water-ripple" x1="190" y1="478" x2="240" y2="478" />
          <line className="water-ripple" style={{ animationDelay: "-1.5s" }} x1="300" y1="490" x2="370" y2="490" />
          <line className="water-ripple" style={{ animationDelay: "-3s" }} x1="400" y1="474" x2="440" y2="474" />
        </g>
        <rect x="150" y="462" width="340" height="44" rx="22" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* Inner arch line */}
      <path d="M70 520 V290 A250 250 0 0 1 570 290 V520" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <line x1="40" y1="520" x2="600" y2="520" stroke="url(#hs-gold)" strokeWidth="2" />
    </svg>
  );
}
