import Link from "next/link";
import { ArrowRight, Building, CalendarCheck, LayoutGrid, MapPin, ShieldCheck } from "lucide-react";
import type { Project } from "@/lib/schemas/project.schema";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { formatMonth } from "@/lib/utils";

/** One flagship project, shown large: visual on the left, the essentials on the right. */
export function FeaturedProject({ project: p, stationName }: { project: Project; stationName: string }) {
  const facts = [
    { icon: LayoutGrid, label: "Configurations", value: p.units.map((u) => u.label).join(" · ") },
    {
      icon: CalendarCheck,
      label: "Possession",
      value: p.status === "completed" ? "Ready to move" : p.possession ? formatMonth(p.possession) : "To be announced",
    },
    { icon: Building, label: "Scale", value: [p.towers && `${p.towers} ${p.towers === 1 ? "tower" : "towers"}`, p.floors].filter(Boolean).join(" · ") || "—" },
    { icon: ShieldCheck, label: "MahaRERA", value: p.rera[0]?.number ?? "Applied" },
  ];
  return (
    <Reveal>
      <article className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface-raised shadow-soft transition-shadow duration-500 hover:shadow-lift lg:grid-cols-[1.25fr_1fr]">
        <Link href={`/projects/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[520px]" aria-label={`View ${p.name}`}>
          <ProjectVisual project={p} anchor="ground" sizes="(min-width: 1024px) 55vw, 100vw" className="transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <span className="absolute top-5 left-5">
            <StatusBadge status={p.status} />
          </span>
        </Link>

        <div className="flex flex-col p-7 md:p-10">
          <p className="inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-4 text-accent-text" />
            {p.location.locality}, {p.location.city}
            {p.location.distanceFromStation ? ` · ${p.location.distanceFromStation} from ${stationName}` : ""}
          </p>
          <h3 className="mt-3 font-display text-4xl leading-[1.05] text-fg md:text-5xl">{p.name}</h3>
          <p className="mt-3 text-lg text-muted">{p.tagline}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6">
            {facts.map(({ icon: I, label, value }) => (
              <div key={label} className="flex gap-3">
                <I className="mt-0.5 size-5 shrink-0 text-accent-text" />
                <div className="flex flex-col-reverse">
                  <dt className="text-xs text-muted">{label}</dt>
                  <dd className="font-display text-lg leading-snug text-fg">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          {p.highlights.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.highlights.slice(0, 4).map((h) => (
                <li key={h} className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm text-fg">
                  {h}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <ButtonLink href={`/projects/${p.slug}`}>
              Explore {p.name}
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </ButtonLink>
            <CtaButton source={`home:featured:${p.slug}`} project={p.name} intent="site-visit" variant="outline">
              Schedule a site tour
            </CtaButton>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
