"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { departments } from "@/data/careers";

const totalRoles = departments.reduce(
  (count, department) => count + department.roles.length,
  0
);

export function OpenPositions({
  onApply,
}: {
  /** Selects the role in the application form and scrolls the visitor to it. */
  onApply: (roleTitle: string) => void;
}) {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? departments
        : departments.filter((department) => department.id === active),
    [active]
  );

  return (
    <Section tone="cream" id="openings">
      <Container>
        <SectionHeading
          eyebrow="Open positions"
          title={`${totalRoles} roles across four disciplines`}
          description="We hire year-round for these functions. If your role is not listed, send a general application — we keep strong profiles on file for twelve months."
        />

        {/* Department filter */}
        <div
          role="group"
          aria-label="Filter roles by department"
          className="no-scrollbar mt-9 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
        >
          <button
            type="button"
            aria-pressed={active === "all"}
            onClick={() => setActive("all")}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
              active === "all"
                ? "border-gold-600 bg-gold-600 text-white shadow-soft"
                : "border-line bg-white text-ink-soft hover:border-gold-400 hover:text-gold-700"
            }`}
          >
            All departments
          </button>

          {departments.map((department) => (
            <button
              key={department.id}
              type="button"
              aria-pressed={active === department.id}
              onClick={() => setActive(department.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                active === department.id
                  ? "border-gold-600 bg-gold-600 text-white shadow-soft"
                  : "border-line bg-white text-ink-soft hover:border-gold-400 hover:text-gold-700"
              }`}
            >
              <Icon name={department.icon} size={16} />
              {department.name}
              <span
                className={`rounded-full px-2 py-0.5 text-2xs ${
                  active === department.id
                    ? "bg-white/20 text-white"
                    : "bg-cream-deep text-ink-muted"
                }`}
              >
                {department.roles.length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-12">
          {visible.map((department) => (
            <div key={department.id}>
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                  <Icon name={department.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ink">{department.name}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-ink-muted">
                    {department.description}
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid gap-4 lg:grid-cols-2">
                {department.roles.map((role, index) => (
                  <Reveal key={role.title} delay={(index % 2) * 70} as="li" className="h-full">
                    <article className="flex h-full flex-col rounded-4xl border border-line bg-white p-6 shadow-soft transition hover:border-gold-300 hover:shadow-lift">
                      <h4 className="font-display text-xl leading-snug text-ink">
                        {role.title}
                      </h4>

                      <ul className="mt-3 flex flex-wrap gap-2">
                        <li className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs text-ink-muted">
                          <Icon name="growth" size={13} className="text-gold-600" />
                          {role.experience}
                        </li>
                        <li className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs text-ink-muted">
                          <Icon name="map-pin" size={13} className="text-gold-600" />
                          {role.location}
                        </li>
                        <li className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs text-ink-muted">
                          <Icon name="clock" size={13} className="text-gold-600" />
                          {role.type}
                        </li>
                      </ul>

                      <p className="mt-4 flex-1 text-sm text-ink-muted">
                        {role.summary}
                      </p>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        withArrow
                        className="mt-5 self-start"
                        onClick={() => onApply(role.title)}
                      >
                        Apply for this role
                      </Button>
                    </article>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default OpenPositions;
