import Link from "next/link";
import { ArrowRight, TrainFront } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type LineStation = { slug: string; name: string; count: number };

/**
 * A stylised Western-line route map. Stations with projects light up as gold stops
 * with a count; a small train runs the line on a loop.
 */
export function StationPresence({ stations }: { stations: LineStation[] }) {
  const n = stations.length;
  const x = (i: number) => 60 + (i * 880) / Math.max(1, n - 1);
  const path = `M20 90 H980`;
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface-raised p-6 shadow-soft md:p-10">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mb-6 flex items-center gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-fg">
            <TrainFront className="size-4 text-accent-text" />
            Western line
          </span>
          <span className="hidden sm:inline">Tap a gold stop to see projects there</span>
        </div>

        {/* Desktop: horizontal route */}
        <div className="relative hidden md:block">
          <svg viewBox="0 0 1000 180" className="w-full" aria-hidden>
            <path d={path} stroke="var(--line)" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d={path} stroke="var(--accent)" strokeWidth="3" strokeDasharray="14 10" fill="none" opacity="0.8" />
            <g>
              <animateMotion dur="14s" repeatCount="indefinite" path={path} />
              <rect x="-22" y="-9" width="44" height="18" rx="9" fill="var(--primary)" />
              <rect x="-14" y="-4" width="8" height="6" rx="1" fill="var(--bg)" />
              <rect x="-2" y="-4" width="8" height="6" rx="1" fill="var(--bg)" />
              <rect x="10" y="-4" width="6" height="6" rx="1" fill="var(--accent)" />
            </g>
            {stations.map((s, i) => (
              <g key={s.slug} transform={`translate(${x(i)} 90)`}>
                {s.count ? <circle r="22" fill="var(--accent)" opacity="0.18" className="animate-ping" style={{ transformBox: "fill-box", transformOrigin: "center", animationDuration: "2.8s" }} /> : null}
                <circle r={s.count ? 14 : 9} fill={s.count ? "var(--accent)" : "var(--surface-raised)"} stroke={s.count ? "var(--primary)" : "var(--line)"} strokeWidth="3" />
              </g>
            ))}
          </svg>
          <div className="absolute inset-0">
            {stations.map((s, i) => (
              <div key={s.slug} className="absolute top-0 flex h-full -translate-x-1/2 flex-col items-center" style={{ left: `${(x(i) / 1000) * 100}%` }}>
                {s.count ? (
                  <Link
                    href={`/projects/station/${s.slug}`}
                    className="group mt-1 flex flex-col items-center rounded-2xl px-3 py-1 text-center transition hover:-translate-y-1"
                  >
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-fg">
                      {s.count} {s.count === 1 ? "project" : "projects"}
                    </span>
                  </Link>
                ) : (
                  <span className="mt-1 h-6" />
                )}
                {s.count ? (
                  <Link href={`/projects/station/${s.slug}`} className="mt-auto mb-2 font-display text-lg whitespace-nowrap text-fg hover:text-primary">
                    {s.name}
                  </Link>
                ) : (
                  <span className="mt-auto mb-2 font-display text-lg whitespace-nowrap text-muted/70">{s.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical route */}
        <ol className="relative grid gap-1 md:hidden">
          <span className="absolute top-3 bottom-3 left-[13px] w-1 rounded bg-line" aria-hidden />
          {stations.map((s) => (
            <li key={s.slug} className="relative">
              {s.count ? (
                <Link href={`/projects/station/${s.slug}`} className="flex items-center gap-4 rounded-xl py-2.5 pr-2">
                  <span className="relative z-10 grid size-7 place-items-center rounded-full border-[3px] border-primary bg-accent" />
                  <span className="flex-1 font-display text-lg text-fg">{s.name}</span>
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs text-primary-fg">{s.count}</span>
                  <ArrowRight className="size-4 text-accent-text" />
                </Link>
              ) : (
                <div className="flex items-center gap-4 py-2.5">
                  <span className="relative z-10 ml-[5px] size-[18px] rounded-full border-[3px] border-line bg-surface-raised" />
                  <span className="text-muted">{s.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
