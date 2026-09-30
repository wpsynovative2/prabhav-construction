import { CalendarCheck, Download, IndianRupee, MapPin, TrainFront } from "lucide-react";
import type { Project } from "@/lib/schemas/project.schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StatusBadge } from "@/components/ui/Badge";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "@/components/ui/Container";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { formatMonth } from "@/lib/utils";

export function ProjectHero({ project: p, stationName }: { project: Project; stationName: string }) {
  const facts = [
    { icon: IndianRupee, label: "Price", value: p.price.display },
    {
      icon: CalendarCheck,
      label: "Possession",
      value: p.status === "completed" ? "Ready to move" : p.possession ? formatMonth(p.possession) : "To be announced",
    },
    { icon: TrainFront, label: stationName, value: p.location.distanceFromStation ?? "Nearby" },
  ];
  return (
    <section className="relative -mt-[84px] bg-surface pt-[84px]">
      <Container className="pt-6 pb-10 md:pt-8">
        <Breadcrumbs
          items={[
            { name: "Projects", href: "/projects" },
            { name: stationName, href: `/projects/station/${p.station}` },
            { name: p.name, href: `/projects/${p.slug}` },
          ]}
        />
        <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-line">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
            <ProjectVisual project={p} sizes="100vw" preload anchor="ground" className="page-enter" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c0c04]/85 via-[#1c0c04]/20 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-10">
            <div className="page-enter flex flex-wrap items-center gap-2">
              <StatusBadge status={p.status} />
              {p.rera[0] ? (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">MahaRERA {p.rera[0].number}</span>
              ) : null}
            </div>
            <h1 className="page-enter mt-3 font-display text-4xl leading-none font-medium md:text-6xl [animation-delay:100ms]">{p.name}</h1>
            <p className="page-enter mt-3 flex items-center gap-2 text-white/85 [animation-delay:180ms]">
              <MapPin className="size-4 text-[#e5c96a]" />
              {p.location.locality}, {p.location.city}
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-3 -mt-2 grid gap-4 rounded-3xl border border-line bg-surface-raised p-5 shadow-lift md:mx-8 md:-mt-8 md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {facts.map(({ icon: I, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line">
                  <I className="size-5" />
                </span>
                <div>
                  <dt className="text-xs text-muted">{label}</dt>
                  <dd className="font-display text-lg leading-tight text-fg">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <CtaButton source={`project-hero:${p.slug}`} project={p.name} intent="site-visit">
              <CalendarCheck className="size-4" />
              Book a site visit
            </CtaButton>
            <CtaButton source={`project-hero:${p.slug}`} project={p.name} intent="brochure" variant="outline">
              <Download className="size-4" />
              Brochure
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
