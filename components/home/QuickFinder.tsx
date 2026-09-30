"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Building2, Search, Sparkles, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type FinderStation = { slug: string; name: string; count: number };

const TYPES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
];
const STATUSES = [
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Ready to move" },
];

/** Type + station + status → /projects?… */
export function QuickFinder({ stations }: { stations: FinderStation[] }) {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [station, setStation] = useState("");
  const [status, setStatus] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (category) sp.set("category", category);
    if (station) sp.set("station", station);
    if (status) sp.set("status", status);
    const qs = sp.toString();
    router.push(qs ? `/projects?${qs}` : "/projects");
  };

  return (
    <form
      onSubmit={go}
      role="search"
      aria-label="Find a project"
      className="hero-rise intro-delay grid gap-2 rounded-[1.75rem] border border-line bg-surface-raised/95 p-3 shadow-lift backdrop-blur-xl md:grid-cols-[1fr_1fr_1fr_auto] md:gap-0 md:p-3"
      style={{ "--d": "0.9s" } as React.CSSProperties}
    >
      <FinderSelect icon={<Building2 className="size-5" />} label="Property type" value={category} onChange={setCategory} options={TYPES} placeholder="All types" />
      <FinderSelect
        icon={<TrainFront className="size-5" />}
        label="Nearest station"
        value={station}
        onChange={setStation}
        options={stations.map((s) => ({ value: s.slug, label: `${s.name} (${s.count})` }))}
        placeholder="Any station"
        divider
      />
      <FinderSelect icon={<Sparkles className="size-5" />} label="Status" value={status} onChange={setStatus} options={STATUSES} placeholder="Any status" divider />
      <Button type="submit" size="lg" className="md:ml-3 md:h-full md:rounded-2xl">
        <Search className="size-5" />
        Search
      </Button>
    </form>
  );
}

function FinderSelect({
  icon,
  label,
  value,
  onChange,
  options,
  placeholder,
  divider,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  divider?: boolean;
}) {
  return (
    <label className={`group relative flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl px-4 transition-colors hover:bg-surface ${divider ? "md:border-l md:border-line" : ""}`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition group-hover:bg-bg group-hover:ring-accent/50">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs text-muted">{label}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent pr-6 font-medium text-fg outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </span>
      <svg className="pointer-events-none absolute right-4 size-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
