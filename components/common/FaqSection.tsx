"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Faq } from "@/data/faqs";

export function FaqSection({
  faqs,
  eyebrow = "Questions",
  title = "Frequently asked questions",
  description = "The things buyers ask us most often, answered plainly. If your question is not here, call us — we would rather explain it than have you guess.",
  tone = "cream",
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "cream" | "white" | "sand";
}) {
  // First answer open by default, so the pattern is obvious at a glance.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone={tone}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          <ul className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <Reveal key={faq.question} delay={index * 50} as="li">
                  <div
                    className={`overflow-hidden rounded-3xl border bg-white transition-colors ${
                      isOpen ? "border-gold-300" : "border-line"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-button-${index}`}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition hover:bg-gold-50/50"
                      >
                        <span className="font-display text-lg leading-snug text-ink sm:text-lg">
                          {faq.question}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen
                              ? "rotate-180 bg-gold-600 text-white"
                              : "bg-gold-100 text-gold-700"
                          }`}
                        >
                          <Icon name="chevron-down" size={17} />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      hidden={!isOpen}
                      className="px-6 pb-6"
                    >
                      <p className="measure border-t border-line pt-4 text-base text-ink-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export default FaqSection;
