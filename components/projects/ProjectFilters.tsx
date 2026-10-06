"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import type { Category, Project, Status } from "@/lib/schemas/project.schema";
import { applyFilters, getFacetCounts, parseFilters, serializeFilters, type FilterState } from "@/lib/data/filters";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CATEGORY_LABEL, STATUS_LABEL, cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

const PAGE = 12;

type Props = { projects: Project[]; stations: { slug: string; name: string }[] };

/** Portfolio filter: type, status and location only. URL-synced so views are shareable. */
export function ProjectFilters({ projects, stations }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const f = useMemo(() => {
    const all = parseFilters(new URLSearchParams(sp.toString()));
    return { category: all.category, status: all.status, station: all.station } satisfies FilterState;
  }, [sp]);
  const [limit, setLimit] = useState(PAGE);

  const results = useMemo(() => applyFilters(projects, f), [projects, f]);
  const counts = useMemo(() => getFacetCounts(projects, f), [projects, f]);
  const stationNames = Object.fromEntries(stations.map((s) => [s.slug, s.name]));
  const active = !!(f.category?.length || f.status?.length || f.station?.length);
  const onlyCompleted = f.status?.length === 1 && f.status[0] === "completed";

  const update = (patch: Partial<FilterState>) => {
    const qs = serializeFilters({ ...f, ...patch });
    setLimit(PAGE);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const toggle = <T extends string>(list: T[] | undefined, v: T) =>
    list?.includes(v) ? list.filter((x) => x !== v) : [...(list ?? []), v];

  return (
    <div>
      <div className="card flex flex-col gap-5 p-5 shadow-soft lg:flex-row lg:items-center lg:gap-8 lg:p-4 lg:pl-6">
        <FilterRow label="Type">
          {(["residential", "commercial", "industrial"] as Category[]).map((c) => (
            <Chip key={c} on={!!f.category?.includes(c)} count={counts.category?.[c] ?? 0} onClick={() => update({ category: toggle(f.category, c) })}>
              {CATEGORY_LABEL[c]}
            </Chip>
          ))}
        </FilterRow>
        <span className="hidden h-8 w-px bg-line lg:block" />
        <FilterRow label="Status">
          {(["upcoming", "ongoing", "completed"] as Status[]).map((s) => (
            <Chip key={s} on={!!f.status?.includes(s)} count={counts.status?.[s] ?? 0} onClick={() => update({ status: toggle(f.status, s) })}>
              {STATUS_LABEL[s]}
            </Chip>
          ))}
        </FilterRow>
        <span className="hidden h-8 w-px bg-line lg:block" />
        <FilterRow label="Location">
          {stations.map((s) => (
            <Chip key={s.slug} on={!!f.station?.includes(s.slug)} count={counts.station?.[s.slug] ?? 0} onClick={() => update({ station: toggle(f.station, s.slug) })}>
              {s.name}
            </Chip>
          ))}
        </FilterRow>
        {active ? (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="text-sm text-link underline-offset-4 hover:underline lg:ml-auto"
          >
            Clear
          </button>
        ) : null}
      </div>

      <p className="mt-8 mb-5 text-sm text-muted" aria-live="polite">
        <strong className="text-fg">{results.length}</strong> {results.length === 1 ? "project" : "projects"}
      </p>

      {results.length ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.04 }}
                className={cn(i >= limit && "hidden")}
              >
                <ProjectCard project={p} stationName={stationNames[p.station]} />
              </motion.div>
            ))}
          </div>
          {results.length > limit ? (
            <div className="mt-10 text-center">
              <Button variant="outline" onClick={() => setLimit((l) => l + PAGE)}>
                Load more projects
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="card grid place-items-center gap-4 px-6 py-16 text-center">
          <p className="font-display text-2xl text-fg">
            {onlyCompleted ? "Our completed developments are coming soon." : "No projects in this combination yet."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {onlyCompleted ? <ButtonLink href="/our-constructions">See buildings we have delivered</ButtonLink> : null}
            <Button variant="outline" onClick={() => router.replace(pathname, { scroll: false })}>
              Show all projects
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-16 text-xs font-medium text-muted lg:w-auto">{label}</span>
      {children}
    </div>
  );
}

function Chip({ on, count, onClick, children }: { on: boolean; count: number; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={!count && !on}
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-full border px-4 text-sm transition-all disabled:opacity-35",
        on ? "border-primary bg-primary text-primary-fg shadow-soft" : "border-line text-fg hover:border-accent/60",
      )}
    >
      {children}
    </button>
  );
}
