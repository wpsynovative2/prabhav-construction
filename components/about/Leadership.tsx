"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/brand/LogoMark";
import { cn } from "@/lib/utils";

type Leader = { name: string; role: string; line: string; initials: string; image?: string };

const INTERVAL = 5000;

/** Two leaders, one at a time: portraits fade out and the next appears. */
export function Leadership({ leaders }: { leaders: Leader[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const l = leaders[i];

  useEffect(() => {
    if (paused || reduce || leaders.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % leaders.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, reduce, leaders.length]);

  if (!l) return null;

  return (
    <div
      className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Portrait */}
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
        <div className="absolute -inset-3 rounded-[2.2rem] border border-accent/50" aria-hidden />
        <div className="relative h-full overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#7a3c1b,#1c0c04)] shadow-lift">
          <LogoMark className="absolute top-1/2 left-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-10" />
          <AnimatePresence mode="sync">
            <motion.div
              key={l.role}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {l.image ? (
                <Image src={l.image} alt={`${l.name}, ${l.role}`} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
              ) : (
                <Silhouette initials={l.initials} />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>

      {/* Copy */}
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={l.role}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="gold-shine font-display text-5xl leading-[1.05] md:text-6xl">{l.role}</p>
            <h3 className="mt-5 font-display text-2xl text-fg">{l.name}</h3>
            <p className="mt-3 max-w-md text-lg text-muted">{l.line}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex gap-3" role="tablist" aria-label="Leaders">
          {leaders.map((x, n) => (
            <button
              key={x.role}
              type="button"
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={cn(
                "relative overflow-hidden rounded-full border px-5 py-2.5 text-sm transition",
                n === i ? "border-accent text-fg" : "border-line text-muted hover:border-accent/60 hover:text-fg",
              )}
            >
              {x.role}
              {n === i && !paused && !reduce ? (
                <motion.span
                  key={`p-${i}`}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Placeholder portrait until real photos are added (set `image` in data/pages/about.json). */
function Silhouette({ initials }: { initials: string }) {
  return (
    <svg viewBox="0 0 300 375" className="h-full w-full" role="img" aria-label="Portrait placeholder">
      <defs>
        <linearGradient id="sil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbcd8c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#9a5f2e" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx="150" cy="140" r="62" fill="url(#sil)" />
      <path d="M40 375 C40 280 92 235 150 235 C208 235 260 280 260 375 Z" fill="url(#sil)" />
      <text x="150" y="152" textAnchor="middle" fontFamily="Georgia, serif" fontSize="40" fill="#2a1409" opacity="0.8">
        {initials}
      </text>
    </svg>
  );
}
