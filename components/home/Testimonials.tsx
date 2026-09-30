"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/schemas/content.schema";

const TINTS = ["#8a4a26", "#b08f25", "#612f15", "#d19a5c", "#6b5548"];

export function Testimonials({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={track}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:mx-0 md:px-0"
        aria-label="Customer testimonials"
      >
        {items.map((t, i) => (
          <li key={t.name + i} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
            <figure className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface-raised p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift">
              <Quote className="absolute top-6 right-6 size-10 text-accent/25 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }, (_, k) => (
                  <Star key={k} className={`size-4 ${k < (t.rating ?? 5) ? "fill-current" : "opacity-30"}`} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-fg">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-11 place-items-center rounded-full text-sm font-semibold text-white" style={{ background: TINTS[i % TINTS.length] }}>
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <span className="block font-medium text-fg">{t.name}</span>
                  <span className="block text-xs text-accent-text">{t.project}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous testimonials" className="grid size-12 place-items-center rounded-full border border-line text-fg transition hover:border-accent hover:bg-primary hover:text-primary-fg">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next testimonials" className="grid size-12 place-items-center rounded-full border border-line text-fg transition hover:border-accent hover:bg-primary hover:text-primary-fg">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
