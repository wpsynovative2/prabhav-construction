"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/** Click-to-load map: a themed placeholder until the visitor asks for the live map. */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const [live, setLive] = useState(false);
  if (live) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full rounded-2xl border border-line"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setLive(true)}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-surface"
    >
      {/* Stylised street grid */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
        <rect width="400" height="300" fill="var(--surface)" />
        <g stroke="var(--line)" strokeWidth="10" strokeLinecap="round">
          <path d="M-10 90 H410" />
          <path d="M-10 210 Q200 180 410 230" />
          <path d="M120 -10 V310" />
          <path d="M290 -10 Q270 150 310 310" />
        </g>
        <g stroke="var(--line)" strokeWidth="3">
          <path d="M-10 150 H410" />
          <path d="M60 -10 V310" />
          <path d="M210 -10 V310" />
        </g>
        <path d="M0 260 Q80 240 150 262 T300 250 T400 262 V300 H0 Z" fill="var(--water)" opacity="0.35" />
        <circle cx="210" cy="150" r="46" fill="var(--accent)" opacity="0.12" className="animate-ping" style={{ transformBox: "fill-box", transformOrigin: "center", animationDuration: "2.6s" }} />
      </svg>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-primary drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-[115%]">
        <MapPin className="size-12 fill-accent/40" />
      </span>
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-surface-raised px-4 py-2 text-sm font-medium text-fg shadow-soft ring-1 ring-line transition group-hover:ring-accent">
        Load interactive map
      </span>
    </button>
  );
}
