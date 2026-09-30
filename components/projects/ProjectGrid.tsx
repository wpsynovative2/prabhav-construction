import type { Project } from "@/lib/schemas/project.schema";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects, stationNames }: { projects: Project[]; stationNames: Record<string, string> }) {
  return (
    <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <RevealItem key={p.slug}>
          <ProjectCard project={p} stationName={stationNames[p.station]} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
