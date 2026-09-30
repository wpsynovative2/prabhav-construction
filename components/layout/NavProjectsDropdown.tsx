"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Building2, ChevronDown, Factory, House, TrainFront } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavCategory, NavStation } from "./types";

const CAT_ICON = { residential: House, commercial: Building2, industrial: Factory } as const;

type Props = { stations: NavStation[]; categories: NavCategory[]; active: boolean; label: string };

export function NavProjectsDropdown({ stations, categories, active, label }: Props) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
        if (!links.length) return;
        e.preventDefault();
        const i = links.indexOf(document.activeElement as HTMLAnchorElement);
        const next = e.key === "ArrowDown" ? (i + 1) % links.length : (i - 1 + links.length) % links.length;
        links[next]?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setTimeout(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(), 30);
          }
        }}
        className={cn(
          "relative inline-flex min-h-11 items-center gap-1 px-3 text-[0.95rem] transition-colors hover:text-primary",
          active ? "text-primary" : "text-fg",
        )}
      >
        {label}
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
        <span className={cn("absolute inset-x-3 bottom-1.5 h-px origin-left bg-accent transition-transform duration-300", active ? "scale-x-100" : "scale-x-0")} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id={panelId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 z-50 mt-2 w-[560px] -translate-x-1/2 overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-lift"
          >
            <div className="grid grid-cols-2 gap-2 p-5">
              <div>
                <p className="px-3 pb-2 text-xs font-medium text-muted">By station</p>
                {stations.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/projects/station/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-fg transition-colors hover:bg-surface focus:bg-surface focus:outline-none"
                  >
                    <span className="flex items-center gap-2.5">
                      <TrainFront className="size-4 text-accent-text" />
                      {s.name}
                    </span>
                    <span className="rounded-full bg-surface px-2 text-xs text-muted group-hover:bg-bg">{s.count}</span>
                  </Link>
                ))}
              </div>
              <div>
                <p className="px-3 pb-2 text-xs font-medium text-muted">By type</p>
                {categories.map((c) => {
                  const I = CAT_ICON[c.slug as keyof typeof CAT_ICON] ?? Building2;
                  return (
                    <Link
                      key={c.slug}
                      href={`/projects/type/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-fg transition-colors hover:bg-surface focus:bg-surface focus:outline-none"
                    >
                      <span className="flex items-center gap-2.5">
                        <I className="size-4 text-accent-text" />
                        {c.label}
                      </span>
                      <span className="rounded-full bg-surface px-2 text-xs text-muted group-hover:bg-bg">{c.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-t border-line bg-surface px-8 py-4 text-sm font-medium text-primary focus:outline-none"
            >
              View all projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
