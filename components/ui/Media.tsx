"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * An image that degrades gracefully.
 *
 * Project photography is added over time, so any `src` in `data/` may not exist
 * on disk yet. Rather than showing a broken-image icon, this falls back to a
 * branded gradient panel with the subject's initial — the layout stays intact
 * and the page still looks finished.
 */

export interface MediaProps {
  src: string;
  alt: string;
  /** Text used to derive the placeholder monogram. */
  fallbackLabel?: string;
  className?: string;
  imageClassName?: string;
  /** Renders with `fill` inside a positioned parent (the default). */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export function Media({
  src,
  alt,
  fallbackLabel,
  className = "",
  imageClassName = "object-cover",
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  priority = false,
}: MediaProps) {
  const [failed, setFailed] = useState(false);
  const label = (fallbackLabel ?? alt).trim();

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-linear-to-br from-gold-100 via-cream-deep to-sand ${className}`}
        role="img"
        aria-label={alt}
      >
        <span aria-hidden="true" className="select-none text-center">
          <span className="block font-display text-4xl text-gold-700/45 sm:text-5xl">
            {label.slice(0, 1).toUpperCase() || "P"}
          </span>
          <span className="mt-1 block text-2xs font-medium tracking-[0.22em] text-gold-800/40 uppercase">
            Prabhav
          </span>
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...(fill ? { fill: true, sizes } : { width: width ?? 800, height: height ?? 600 })}
      priority={priority}
      onError={() => setFailed(true)}
      className={`${imageClassName} ${fill ? "" : className}`}
    />
  );
}

export default Media;
