"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import type { Project } from "@/data/projects";

export function ProjectGallery({ project }: { project: Project }) {
  const images =
    project.gallery.length > 0
      ? project.gallery
      : [{ src: project.heroImage, caption: project.name }];

  const [active, setActive] = useState(0);
  const current = images[active];

  const step = (delta: number) =>
    setActive((index) => (index + delta + images.length) % images.length);

  return (
    <div>
      <div className="relative aspect-16/10 overflow-hidden rounded-[2.5rem] bg-cream-deep shadow-soft">
        <Media
          src={current.src}
          alt={`${project.name} — ${current.caption}`}
          fallbackLabel={project.name}
          className="absolute inset-0"
          imageClassName="object-cover"
          sizes="(max-width: 1024px) 100vw, 820px"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-ink/70 to-transparent"
        />

        <p className="absolute bottom-5 left-6 text-sm font-medium text-cream">
          {current.caption}
        </p>

        {images.length > 1 ? (
          <div className="absolute right-5 bottom-4 flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink transition hover:bg-gold-600 hover:text-white"
            >
              <Icon name="chevron-left" size={18} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink transition hover:bg-gold-600 hover:text-white"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <li key={image.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${image.caption}`}
                aria-current={index === active ? "true" : undefined}
                className={`relative block h-20 w-28 overflow-hidden rounded-2xl border-2 transition ${
                  index === active
                    ? "border-gold-500"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Media
                  src={image.src}
                  alt=""
                  fallbackLabel={project.name}
                  className="absolute inset-0"
                  imageClassName="object-cover"
                  sizes="112px"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default ProjectGallery;
