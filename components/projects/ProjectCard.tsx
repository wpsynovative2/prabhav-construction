import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import { statusMeta, type Project } from "@/data/projects";

const badgeTone: Record<Project["status"], string> = {
  upcoming: "bg-gold-600 text-white",
  ongoing: "bg-ink text-cream",
  completed: "bg-white/95 text-ink",
};

export function ProjectCard({ project }: { project: Project }) {
  const meta = statusMeta[project.status];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-4/3 overflow-hidden">
        <Media
          src={project.thumbnail}
          alt={`${project.name} — ${project.tagline}`}
          fallbackLabel={project.name}
          className="absolute inset-0"
          imageClassName="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />

        <span
          className={`absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-2xs font-semibold tracking-[0.14em] uppercase shadow-soft ${badgeTone[project.status]}`}
        >
          {meta.badge}
        </span>

        <span className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3.5 py-1.5 text-2xs font-medium text-ink backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-xs text-ink-muted">
          <Icon name="map-pin" size={14} className="text-gold-500" />
          {project.location.locality}, {project.location.city}
        </p>

        <h3 className="mt-2 font-display text-display-xs leading-snug text-ink transition-colors group-hover:text-gold-800">
          {project.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
          {project.tagline}
        </p>

        <dl className="mt-5 mb-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5 text-xs">
          <div>
            <dt className="text-ink-subtle">Configuration</dt>
            <dd className="mt-0.5 font-medium text-ink">{project.configuration}</dd>
          </div>
          <div>
            <dt className="text-ink-subtle">Possession</dt>
            <dd className="mt-0.5 font-medium text-ink">{project.possession}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <p>
            <span className="block text-2xs tracking-wide text-ink-subtle uppercase">
              Price
            </span>
            <span className="font-display text-lg text-gold-800">
              {project.priceLabel}
            </span>
          </p>

          <span className="flex items-center gap-1.5 text-sm font-medium text-gold-700">
            View project
            <Icon
              name="arrow-right"
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>

      {/* Whole-card link — keeps a single tab stop and one clear accessible name */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 rounded-4xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      >
        <span className="sr-only">
          View {project.name} in {project.location.locality}
        </span>
      </Link>
    </article>
  );
}

export default ProjectCard;
