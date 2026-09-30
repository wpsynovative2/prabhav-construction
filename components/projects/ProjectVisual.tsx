import Image from "next/image";
import type { Project } from "@/lib/schemas/project.schema";
import { BuildingArt } from "@/components/brand/BuildingArt";
import { cn } from "@/lib/utils";

/** The project's cover photo when supplied, otherwise its generated illustration. */
export function ProjectVisual({
  project,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  preload,
  anchor,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  preload?: boolean;
  anchor?: "center" | "ground";
}) {
  const cover = project.images.cover;
  if (cover) {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <BuildingArt
      scene={project.art.scene}
      seed={project.art.seed}
      anchor={anchor}
      title={`Illustration of ${project.name}`}
      className={cn("absolute inset-0", className)}
    />
  );
}
