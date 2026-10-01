"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

type Milestone = { year: string; title: string; text: string };

/** Year rail; hovering, focusing or tapping a year reveals what happened that year. */
export function Milestones({ items }: { items: Milestone[] }) {
  const [active, setActive] = useState<number | null>(null);
  const m = active !== null ? items[active] : undefined;

  return (
    <div onMouseLeave={() => setActive(null)}>
      <div className="relative">
        <div className="absolute top-[34px] right-0 left-0 h-px hairline" aria-hidden />
        <ol className="no-scrollbar relative -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
          {items.map((it, i) => (
            <li key={it.year} className="shrink-0">
              <button
                type="button"
                aria-expanded={active === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive((a) => (a === i ? null : i))}
                className="group flex w-24 flex-col items-center md:w-full"
              >
                <span
                  className={cn(
                    "relative grid size-[68px] place-items-center rounded-full border font-display text-lg shadow-soft transition-all duration-500",
                    active === i ? "scale-115 border-accent bg-primary text-primary-fg" : "border-line bg-surface-raised text-accent-text group-hover:border-accent",
                  )}
                >
                  {it.year}
                  {active === i ? <span className="absolute inset-0 animate-ping rounded-full border border-accent [animation-duration:2s]" aria-hidden /> : null}
                </span>
                <span className={cn("mt-3 h-6 w-px transition-colors", active === i ? "bg-accent" : "bg-transparent")} aria-hidden />
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Revealed content */}
      <div className="relative min-h-[150px]" aria-live="polite">
        <AnimatePresence mode="wait">
          {m ? (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-accent/40 bg-surface-raised p-6 text-center shadow-lift md:p-8"
            >
              <p className="gold-text font-display text-5xl leading-none">{m.year}</p>
              <h3 className="mt-3 font-display text-2xl text-fg">{m.title}</h3>
              <p className="mt-2 text-muted">{m.text}</p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 pt-10 text-sm text-muted"
            >
              <MousePointerClick className="size-4 text-accent-text" />
              Hover over a year to see the milestone
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
