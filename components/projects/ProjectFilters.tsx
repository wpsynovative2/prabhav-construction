"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Category, Project, Status } from "@/lib/schemas/project.schema";
import {
  BUDGETS,
  POSSESSIONS,
  SORTS,
  activeFilterCount,
  applyFilters,
  getConfigOptions,
  getFacetCounts,
  parseFilters,
  serializeFilters,
  type FilterState,
} from "@/lib/data/filters";
import { Button } from "@/components/ui/Button";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { CATEGORY_LABEL, STATUS_LABEL, cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

const PAGE = 12;

type Props = { projects: Project[]; stations: { slug: string; name: string }[] };

export function ProjectFilters({ projects, stations }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const f = useMemo(() => parseFilters(new URLSearchParams(sp.toString())), [sp]);
  const [sheet, setSheet] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const { openLeadModal } = useLeadModal();

  const results = useMemo(() => applyFilters(projects, f), [projects, f]);
  const counts = useMemo(() => getFacetCounts(projects, f), [projects, f]);
  const configs = useMemo(() => getConfigOptions(projects, f.category), [projects, f.category]);
  const stationNames = Object.fromEntries(stations.map((s) => [s.slug, s.name]));
  const active = activeFilterCount(f);

  const update = (patch: Partial<FilterState>) => {
    const next = { ...f, ...patch };
    // Drop configurations that no longer apply to the chosen categories
    if (patch.category) {
      const allowed = getConfigOptions(projects, next.category);
      next.config = next.config?.filter((c) => allowed.includes(c));
    }
    const qs = serializeFilters(next);
    setLimit(PAGE);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = <T extends string>(list: T[] | undefined, v: T) =>
    list?.includes(v) ? list.filter((x) => x !== v) : [...(list ?? []), v];

  const panel = (
    <div className="grid gap-6">
      <Group label="Category">
        <Segmented
          options={(["residential", "commercial", "industrial"] as Category[]).map((c) => ({
            id: c,
            label: CATEGORY_LABEL[c],
            count: counts.category?.[c] ?? 0,
            on: !!f.category?.includes(c),
          }))}
          onToggle={(id) => update({ category: toggle(f.category, id as Category) })}
        />
      </Group>
      <Group label="Status">
        <Segmented
          options={(["upcoming", "ongoing", "completed"] as Status[]).map((s) => ({
            id: s,
            label: STATUS_LABEL[s],
            count: counts.status?.[s] ?? 0,
            on: !!f.status?.includes(s),
          }))}
          onToggle={(id) => update({ status: toggle(f.status, id as Status) })}
        />
      </Group>
      <Group label="Nearest station">
        <Chips
          options={stations.map((s) => ({ id: s.slug, label: s.name, count: counts.station?.[s.slug] ?? 0, on: !!f.station?.includes(s.slug) }))}
          onToggle={(id) => update({ station: toggle(f.station, id) })}
        />
      </Group>
      <Group label="Configuration">
        <Chips
          options={configs.map((c) => ({ id: c, label: c, count: counts.config?.[c] ?? 0, on: !!f.config?.includes(c) }))}
          onToggle={(id) => update({ config: toggle(f.config, id) })}
        />
      </Group>
      <div className="grid gap-4 sm:grid-cols-3">
        <SelectBox
          label="Budget"
          value={f.budget ?? ""}
          onChange={(v) => update({ budget: (v || undefined) as FilterState["budget"] })}
          options={BUDGETS.map((b) => ({ value: b.id, label: `${b.label} (${counts.budget?.[b.id] ?? 0})`, disabled: !counts.budget?.[b.id] }))}
        />
        <SelectBox
          label="Possession"
          value={f.possession ?? ""}
          onChange={(v) => update({ possession: v || undefined })}
          options={POSSESSIONS.map((o) => ({ value: o.id, label: `${o.label} (${counts.possession?.[o.id] ?? 0})`, disabled: !counts.possession?.[o.id] }))}
        />
        <label className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-control)] border border-line bg-bg px-4">
          <span className="text-sm text-fg">RERA registered only</span>
          <input
            type="checkbox"
            role="switch"
            checked={!!f.rera}
            onChange={(e) => update({ rera: e.target.checked || undefined })}
            className="peer sr-only"
          />
          <span className="relative h-6 w-11 rounded-full bg-line transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-accent after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
        </label>
      </div>
    </div>
  );

  return (
    <div>
      {/* Search + sort bar */}
      <div className="card flex flex-col gap-3 p-3 shadow-soft md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search by project or locality</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            defaultValue={f.q ?? ""}
            placeholder="Search by project or locality"
            onChange={(e) => update({ q: e.target.value || undefined })}
            className="min-h-12 w-full rounded-[var(--radius-control)] bg-surface pr-4 pl-11 text-fg outline-none placeholder:text-muted focus:ring-2 focus:ring-accent/40"
          />
        </label>
        <div className="flex gap-3">
          <SelectBox
            label="Sort"
            value={f.sort ?? "featured"}
            onChange={(v) => update({ sort: v === "featured" ? undefined : (v as FilterState["sort"]) })}
            options={SORTS.map((s) => ({ value: s.id, label: s.label }))}
            hideEmpty
            className="flex-1 md:w-56"
          />
          <Button variant="outline" className="md:!hidden" onClick={() => setSheet(true)}>
            <SlidersHorizontal className="size-4" />
            Filters{active ? ` (${active})` : ""}
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden md:block lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl text-fg">Refine</h2>
              {active ? (
                <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="text-sm text-link underline-offset-4 hover:underline">
                  Clear all
                </button>
              ) : null}
            </div>
            {panel}
          </div>
        </aside>

        <div>
          <p className="mb-5 text-sm text-muted" aria-live="polite">
            Showing <strong className="text-fg">{results.length}</strong> of {projects.length} projects
          </p>
          {results.length ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2">
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
              <p className="font-display text-2xl text-fg">No projects match these filters.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={() => router.replace(pathname, { scroll: false })}>
                  Clear filters
                </Button>
                <Button
                  onClick={() =>
                    openLeadModal({
                      source: "projects:empty-results",
                      message: `Looking for: ${serializeFilters(f).replace(/&/g, ", ")}`,
                      title: "Tell us what you're looking for",
                    })
                  }
                >
                  Tell us what you&apos;re looking for
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {sheet ? (
          <motion.div className="fixed inset-0 z-[75] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-brown-900/50" onClick={() => setSheet(false)} aria-hidden />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-3xl bg-surface-raised"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="font-display text-xl">Filters</h2>
                <button type="button" aria-label="Close filters" onClick={() => setSheet(false)} className="grid size-11 place-items-center rounded-full border border-line">
                  <X className="size-5" />
                </button>
              </div>
              <div className="overflow-y-auto p-5">{panel}</div>
              <div className="flex gap-3 border-t border-line p-4">
                <Button variant="outline" onClick={() => router.replace(pathname, { scroll: false })}>
                  Clear
                </Button>
                <Button className="flex-1" onClick={() => setSheet(false)}>
                  Show {results.length} projects
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-xs font-medium text-muted">{label}</legend>
      {children}
    </fieldset>
  );
}

type Opt = { id: string; label: string; count: number; on: boolean };

function Segmented({ options, onToggle }: { options: Opt[]; onToggle: (id: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-full border border-line bg-surface p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={o.on}
          disabled={!o.count && !o.on}
          onClick={() => onToggle(o.id)}
          className={cn(
            "min-h-10 rounded-full px-2 text-xs font-medium transition-all disabled:opacity-40",
            o.on ? "bg-primary text-primary-fg shadow-soft" : "text-fg hover:bg-bg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Chips({ options, onToggle }: { options: Opt[]; onToggle: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={o.on}
          disabled={!o.count && !o.on}
          onClick={() => onToggle(o.id)}
          className={cn(
            "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-all disabled:opacity-40",
            o.on ? "border-accent bg-accent/15 text-fg" : "border-line text-fg hover:border-accent/60",
          )}
        >
          {o.label}
          <span className="text-xs text-muted">{o.count}</span>
        </button>
      ))}
    </div>
  );
}

function SelectBox({
  label,
  value,
  onChange,
  options,
  hideEmpty,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  hideEmpty?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-12 w-full appearance-none rounded-[var(--radius-control)] border border-line bg-bg pr-10 pl-4 text-sm text-fg outline-none focus:border-accent"
      >
        {!hideEmpty ? <option value="">{label}: any</option> : null}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
