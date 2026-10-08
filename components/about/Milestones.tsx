"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Milestone = { year: string; title: string; text: string };

/**
 * Vertical timeline. A gold spine fills as you scroll; cards slide in from
 * alternating sides on desktop (from the right on mobile, where the spine sits left).
 */
export function Milestones({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const desktop = useIsDesktop();

  return (
    <ol ref={ref} className="relative mx-auto max-w-5xl">
      {/* Spine */}
      <span aria-hidden className="absolute inset-y-0 left-[23px] w-px bg-line md:left-1/2 md:-translate-x-1/2" />
      <motion.span
        aria-hidden
        style={{ scaleY: fill }}
        className="gold-fill absolute inset-y-0 left-[22px] w-[3px] origin-top rounded-full md:left-1/2 md:-translate-x-1/2"
      />

      {items.map((m, i) => {
        const left = i % 2 === 0;
        const fromX = desktop && left ? -90 : 90;
        return (
          <li key={m.year} className="relative grid grid-cols-[48px_1fr] items-center gap-5 pb-14 last:pb-0 md:grid-cols-[1fr_72px_1fr] md:gap-12 md:pb-32">
            {/* Node */}
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative z-10 col-start-1 row-start-1 grid size-12 place-items-center justify-self-center rounded-full border-2 border-accent bg-surface-raised shadow-soft md:col-start-2 md:size-[72px]"
            >
              <span className="gold-fill size-3 rounded-full md:size-4" />
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-accent/50 [animation-duration:2.6s]" />
            </motion.span>

            {/* Card: slides in from its own side */}
            <motion.div
              key={fromX}
              initial={{ opacity: 0, x: fromX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={cn("col-start-2 row-start-1", left ? "md:col-start-1" : "md:col-start-3")}
            >
              <div
                className={cn(
                  "group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift md:p-8",
                  left && "md:text-right",
                )}
              >
                <span
                  aria-hidden
                  className={cn("gold-fill absolute inset-y-0 left-0 w-1 transition-all duration-500 group-hover:w-1.5", left && "md:right-0 md:left-auto")}
                />
                <p className="gold-text font-display text-4xl leading-none md:hidden">{m.year}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-fg md:mt-0">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{m.text}</p>
              </div>
            </motion.div>

            {/* Year on the opposite side (desktop) */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              aria-hidden
              className={cn(
                "gold-text row-start-1 hidden font-display text-7xl leading-none select-none md:block lg:text-8xl",
                left ? "md:col-start-3 md:justify-self-start" : "md:col-start-1 md:justify-self-end",
              )}
            >
              {m.year}
            </motion.p>
            <span className="sr-only">{m.year}</span>
          </li>
        );
      })}
    </ol>
  );
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}
