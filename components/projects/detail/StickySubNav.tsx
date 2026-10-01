"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** In-page anchors that highlight the section currently in view. */
export function StickySubNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-(--header-h) z-30 border-y border-line bg-surface-raised/90 backdrop-blur-xl">
      <ul className="no-scrollbar mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-5 md:px-8">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                "relative inline-flex min-h-12 items-center px-3 text-sm whitespace-nowrap transition-colors",
                active === i.id ? "text-primary" : "text-muted hover:text-fg",
              )}
            >
              {i.label}
              <span className={cn("absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent transition-transform duration-300", active === i.id ? "scale-x-100" : "scale-x-0")} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
