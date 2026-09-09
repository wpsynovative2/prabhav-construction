"use client";

import { useCallback, useState } from "react";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import OpenPositions from "@/components/career/OpenPositions";
import CareerForm from "@/components/career/CareerForm";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { contact } from "@/data/site";

/**
 * Owns the selected job role so that "Apply for this role" on a listing card
 * pre-fills the application form below and scrolls the visitor to it.
 */
export function CareerSection() {
  const [role, setRole] = useState("");

  const applyFor = useCallback((roleTitle: string) => {
    setRole(roleTitle);
    document
      .getElementById("apply")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <OpenPositions onApply={applyFor} />

      <Section tone="white" id="apply" className="scroll-mt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Apply"
                title="Send us your application"
                description="Full name and contact number are all we strictly need. Everything else helps us route your application to the right person faster."
              />

              <ul className="mt-9 space-y-4">
                <li className="flex gap-3 text-sm text-ink-muted">
                  <span className="mt-0.5 shrink-0 text-gold-600">
                    <Icon name="check" size={17} />
                  </span>
                  Every application is read by a person, not filtered by a keyword
                  match.
                </li>
                <li className="flex gap-3 text-sm text-ink-muted">
                  <span className="mt-0.5 shrink-0 text-gold-600">
                    <Icon name="check" size={17} />
                  </span>
                  If your profile matches an open role, you will hear from us within
                  seven working days.
                </li>
                <li className="flex gap-3 text-sm text-ink-muted">
                  <span className="mt-0.5 shrink-0 text-gold-600">
                    <Icon name="check" size={17} />
                  </span>
                  Strong profiles we cannot place immediately stay on file for twelve
                  months.
                </li>
              </ul>

              <Reveal delay={80}>
                <div className="mt-9 rounded-3xl border border-line bg-cream p-6">
                  <p className="text-sm text-ink-muted">
                    Prefer e-mail? Send your CV to{" "}
                    <a
                      href={`mailto:${contact.careersEmail}`}
                      className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800"
                    >
                      {contact.careersEmail}
                    </a>{" "}
                    with the role in the subject line.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={60}>
              <div className="rounded-4xl border border-line bg-cream p-7 shadow-soft sm:p-9">
                <CareerForm role={role} onRoleChange={setRole} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default CareerSection;
