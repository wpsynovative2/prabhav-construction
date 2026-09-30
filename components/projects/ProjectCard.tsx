import Link from "next/link";
import { ArrowUpRight, CalendarCheck, MapPin, TrainFront } from "lucide-react";
import type { Project } from "@/lib/schemas/project.schema";
import { StatusBadge } from "@/components/ui/Badge";
import { CtaButton } from "@/components/ui/CtaButton";
import { CATEGORY_LABEL, cn, formatMonth, formatPrice } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

type Props = { project: Project; stationName?: string; className?: string };

export function ProjectCard({ project: p, stationName, className }: Props) {
  const priceFrom = p.price.onRequest || !p.price.min ? "On request" : formatPrice(p.price.min);
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/70 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProjectVisual project={p} className="transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <StatusBadge status={p.status} />
        </div>
        <span className="absolute top-4 right-4 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {CATEGORY_LABEL[p.category]}
        </span>
        <span className="absolute right-4 bottom-4 grid size-11 translate-y-3 place-items-center rounded-full bg-white text-brown opacity-0 shadow-lift transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-2xl leading-tight text-fg">
          <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5 text-accent-text" />
            {p.location.locality}
          </span>
          {stationName ? (
            <span className="inline-flex items-center gap-1">
              <TrainFront className="size-3.5 text-accent-text" />
              {p.location.distanceFromStation ? `${p.location.distanceFromStation} to ` : ""}
              {stationName}
            </span>
          ) : null}
        </p>

        <ul className="mt-4 mb-5 flex flex-wrap gap-1.5">
          {p.units.map((u) => (
            <li key={u.label} className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-fg">
              {u.label}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-line pt-4">
          <div>
            <p className="text-xs text-muted">Starting from</p>
            <p className="font-display text-xl text-accent-text">{priceFrom}</p>
            {p.possession ? (
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                <CalendarCheck className="size-3.5" />
                {p.status === "completed" ? "Ready to move" : `Possession ${formatMonth(p.possession)}`}
              </p>
            ) : null}
          </div>
          <CtaButton source={`card:${p.slug}`} project={p.name} size="sm" variant="outline" className="relative z-10">
            Enquire
          </CtaButton>
        </div>
      </div>
    </article>
  );
}
