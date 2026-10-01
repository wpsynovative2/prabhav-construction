"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt: string };

/** Snap-scrolling image strip with arrows, dots and a counter. */
export function GalleryCarousel({ images }: { images: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(images.length < 2);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slide = track.firstElementChild as HTMLElement | null;
      if (!slide) return;
      const step = slide.offsetWidth + 16;
      setActive(Math.min(images.length - 1, Math.round(track.scrollLeft / step)));
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [images.length]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[Math.max(0, Math.min(images.length - 1, i))] as HTMLElement | undefined;
    if (track && slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const single = images.length < 2;
  const arrow =
    "grid size-11 place-items-center rounded-full border border-line bg-surface-raised text-fg transition hover:border-accent hover:bg-primary hover:text-primary-fg disabled:pointer-events-none disabled:opacity-35";

  return (
    <div aria-roledescription="carousel" aria-label="Project gallery">
      <div className="relative">
        <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto">
          {images.map((g, i) => (
            <a
              key={g.src}
              href={g.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`${g.alt} (image ${i + 1} of ${images.length})`}
              className={cn(
                "relative aspect-[4/3] shrink-0 snap-start overflow-hidden rounded-2xl bg-surface",
                single ? "w-full" : "w-[85%] sm:w-[calc(50%-0.5rem)]",
              )}
            >
              <Image src={g.src} alt="" aria-hidden fill sizes="(min-width: 640px) 45vw, 85vw" className="scale-125 object-cover opacity-80 blur-2xl" />
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 640px) 45vw, 85vw" className="object-contain transition-transform duration-700 hover:scale-105" />
            </a>
          ))}
        </div>
        {/* fade hints that more slides follow */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent transition-opacity",
            atEnd && "opacity-0",
          )}
        />
      </div>

      {single ? null : (
        <div className="mt-5 flex items-center gap-4">
          <p className="font-display text-lg text-fg tabular-nums" aria-live="polite">
            {String(active + 1).padStart(2, "0")}
            <span className="text-muted"> / {String(images.length).padStart(2, "0")}</span>
          </p>
          <div className="flex flex-1 items-center gap-1.5">
            {images.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={cn("h-1.5 rounded-full transition-all", i === active ? "gold-fill w-8" : "w-3 bg-line hover:bg-accent/60")}
              />
            ))}
          </div>
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous image" className={arrow}>
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={atEnd} aria-label="Next image" className={arrow}>
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
