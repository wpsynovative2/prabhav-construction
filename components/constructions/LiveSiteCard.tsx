import Link from "next/link";
import { ArrowRight, CalendarCheck, MapPin } from "lucide-react";
import type { Project } from "@/lib/schemas/project.schema";
import { BuildingArt } from "@/components/brand/BuildingArt";
import { cn, formatMonth } from "@/lib/utils";

export const STAGES = ["Foundation", "Structure", "Finishing", "Handover"] as const;

export function stageOf(progress: number) {
  if (progress < 15) return 0;
  if (progress < 65) return 1;
  if (progress < 95) return 2;
  return 3;
}

/**
 * A site under construction. The illustration is solid up to the real completion
 * level; floors still to come are shown as a blueprint outline above it.
 */
export function LiveSiteCard({ project: p, stationName }: { project: Project; stationName: string }) {
  const latest = [...p.constructionUpdates].sort((a, b) => b.date.localeCompare(a.date))[0];
  const progress = latest?.progress ?? 0;
  const stage = stageOf(progress);
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <article className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface-raised shadow-soft transition-shadow duration-500 hover:shadow-lift lg:grid-cols-[1.1fr_1fr]">
      {/* Built vs. planned illustration */}
      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
        <BuildingArt scene={p.art.scene} seed={p.art.seed} anchor="ground" title={`${p.name} under construction`} className="absolute inset-0" />
        {/* Unbuilt portion: blueprint wash with dashed floor lines */}
        <div
          className="absolute inset-x-0 top-0 border-b-2 border-dashed border-accent bg-[#1d3a4a]/55 backdrop-grayscale [background-image:repeating-linear-gradient(0deg,transparent_0_22px,rgba(251,205,140,0.35)_22px_23px)]"
          style={{ height: `${100 - progress}%` }}
        >
          <span className="absolute right-4 bottom-2 rounded-full bg-[#1c0c04]/70 px-3 py-1 text-xs text-[#fbcd8c] backdrop-blur">
            Planned
          </span>
        </div>
        <span
          className="absolute left-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-fg shadow-lift"
          style={{ top: `calc(${100 - progress}% + 10px)` }}
        >
          Built · {progress}%
        </span>
        {/* Crane over the active floor */}
        <svg viewBox="0 0 120 120" className="crane-arm absolute right-[12%] h-24 w-24 origin-bottom-left" style={{ top: `calc(${100 - progress}% - 96px)` }} aria-hidden>
          <rect x="10" y="10" width="4" height="110" fill="var(--accent)" />
          <rect x="0" y="12" width="110" height="4" fill="var(--accent)" />
          <line x1="90" y1="16" x2="90" y2="48" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="82" y="48" width="16" height="9" fill="var(--primary)" />
        </svg>
      </div>

      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4 text-accent-text" />
              {p.location.locality} · near {stationName}
            </p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-fg md:text-4xl">{p.name}</h3>
            <p className="mt-1 text-sm text-muted">
              {p.towers ? `${p.towers} towers · ` : ""}
              {p.floors ?? ""}
            </p>
          </div>
          {/* Progress ring */}
          <div className="relative grid size-32 shrink-0 place-items-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden>
              <circle cx="60" cy="60" r={R} fill="none" stroke="var(--line)" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress / 100)}
              />
            </svg>
            <div className="text-center">
              <p className="font-display text-3xl leading-none text-fg">{progress}%</p>
              <p className="mt-1 text-[0.7rem] text-muted">complete</p>
            </div>
          </div>
        </div>

        {/* Stage tracker */}
        <ol className="mt-8 grid grid-cols-4 gap-2" aria-label="Construction stage">
          {STAGES.map((s, i) => (
            <li key={s} className="text-center">
              <span
                className={cn(
                  "block h-1.5 rounded-full",
                  i < stage ? "bg-accent" : i === stage ? "gold-fill animate-pulse" : "bg-line",
                )}
              />
              <span className={cn("mt-2 block text-xs", i === stage ? "font-semibold text-accent-text" : i < stage ? "text-fg" : "text-muted")}>
                {s}
              </span>
            </li>
          ))}
        </ol>

        {latest ? (
          <div className="mt-8 rounded-2xl bg-surface p-4">
            <p className="text-xs text-accent-text">Latest from site · {formatMonth(latest.date)}</p>
            <p className="mt-1 font-display text-lg text-fg">{latest.title}</p>
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
          {p.possession ? (
            <p className="inline-flex items-center gap-1.5 text-sm text-muted">
              <CalendarCheck className="size-4 text-accent-text" />
              Target possession {formatMonth(p.possession)}
            </p>
          ) : null}
          <Link href={`/projects/${p.slug}#progress`} className="group/l inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Full progress log
            <ArrowRight className="size-4 transition-transform group-hover/l:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
