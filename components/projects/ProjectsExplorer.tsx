"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import CtaButton from "@/components/ui/CtaButton";
import { Container, Section } from "@/components/ui/Section";
import {
  projects,
  statusMeta,
  statusOrder,
  type ProjectStatus,
} from "@/data/projects";

type Filter = ProjectStatus | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All projects" },
  ...statusOrder.map((status) => ({ id: status, label: statusMeta[status].label })),
];

export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const result: Record<Filter, number> = {
      all: projects.length,
      upcoming: 0,
      ongoing: 0,
      completed: 0,
    };
    for (const project of projects) result[project.status] += 1;
    return result;
  }, []);

  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? [...projects].sort(
            (a, b) =>
              statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status) ||
              a.order - b.order
          )
        : projects.filter((project) => project.status === filter);
    return list;
  }, [filter]);

  return (
    <Section tone="cream">
      <Container>
        {/* Filters */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter projects by status"
            className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
          >
            {filters.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                    active
                      ? "border-gold-600 bg-gold-600 text-white shadow-soft"
                      : "border-line bg-white text-ink-soft hover:border-gold-400 hover:text-gold-700"
                  }`}
                >
                  {item.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-2xs ${
                      active ? "bg-white/20 text-white" : "bg-cream-deep text-ink-muted"
                    }`}
                  >
                    {counts[item.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-ink-muted" role="status" aria-live="polite">
            Showing <span className="font-medium text-ink">{visible.length}</span>{" "}
            {visible.length === 1 ? "project" : "projects"}
            {filter !== "all" ? ` — ${statusMeta[filter].description}` : ""}
          </p>
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 3) * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-4xl border border-dashed border-line bg-white p-12 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-gold-700">
              <Icon name="building" size={26} />
            </span>
            <h3 className="mt-5 font-display text-2xl text-ink">
              Nothing in this category right now
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              Register your interest and we will tell you the moment a project opens
              in this category.
            </p>
            <div className="mt-6 flex justify-center">
              <CtaButton
                label="Register Your Interest"
                subtitle="Leave your details and we will be in touch the moment a matching project launches."
                source="Projects — empty state"
              />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default ProjectsExplorer;
