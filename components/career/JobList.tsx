"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Briefcase, Clock, MapPin } from "lucide-react";
import type { Job } from "@/lib/schemas/content.schema";
import { cn } from "@/lib/utils";

export function JobList({ jobs }: { jobs: Job[] }) {
  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];
  const [dept, setDept] = useState("All");
  const shown = dept === "All" ? jobs : jobs.filter((j) => j.department === dept);

  return (
    <div>
      <div role="group" aria-label="Filter by department" className="mb-8 flex flex-wrap justify-center gap-2">
        {departments.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={dept === d}
            onClick={() => setDept(d)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-sm transition",
              dept === d ? "border-primary bg-primary text-primary-fg" : "border-line text-fg hover:border-accent",
            )}
          >
            {d}
          </button>
        ))}
      </div>
      <ul className="grid gap-4">
        {shown.map((j) => (
          <li key={j.slug}>
            <Link
              href={`/career/${j.slug}`}
              className="group grid items-center gap-4 rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lift md:grid-cols-[1.5fr_1fr_auto]"
            >
              <div>
                <span className="text-xs text-accent-text">{j.department}</span>
                <h3 className="font-display text-2xl text-fg">{j.title}</h3>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" />{j.location}</span>
                <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4" />{j.experience}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-4" />{j.type === "FULL_TIME" ? "Full time" : j.type.toLowerCase().replace("_", " ")}</span>
              </div>
              <span className="grid size-12 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-fg">
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
