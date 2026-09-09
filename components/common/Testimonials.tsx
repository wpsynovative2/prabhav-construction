"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const step = (delta: number) =>
    setActive((index) => (index + delta + testimonials.length) % testimonials.length);

  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="In their words"
          title="What our buyers say once they have the keys"
          description="Testimonials collected from residents of delivered projects and buyers currently in construction."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          {/* Active quote */}
          <figure className="relative rounded-4xl border border-line bg-cream p-8 shadow-soft sm:p-10">
            <Icon
              name="quote"
              size={38}
              className="text-gold-300"
              aria-hidden="true"
            />

            <blockquote className="mt-5">
              <p className="font-display text-display-sm leading-[1.4] text-balance text-ink">
                {current.quote}
              </p>
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
              <span className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full">
                <Media
                  src={current.image ?? ""}
                  alt=""
                  fallbackLabel={current.name}
                  className="absolute inset-0"
                  imageClassName="object-cover"
                  sizes="52px"
                />
              </span>
              <span>
                <span className="block font-medium text-ink">{current.name}</span>
                <span className="block text-xs text-ink-muted">
                  {current.detail} · {current.project}
                </span>
              </span>
            </figcaption>

            <div className="mt-7 flex items-center justify-between">
              <div className="flex gap-2" role="group" aria-label="Choose a testimonial">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    aria-pressed={index === active}
                    aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                    onClick={() => setActive(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === active
                        ? "w-8 bg-gold-500"
                        : "w-4 bg-line hover:bg-gold-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700"
                >
                  <Icon name="chevron-left" size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700"
                >
                  <Icon name="chevron-right" size={18} />
                </button>
              </div>
            </div>
          </figure>

          {/* Selectable list */}
          <ul className="space-y-3">
            {testimonials.map((testimonial, index) => (
              <li key={testimonial.name}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={index === active ? "true" : undefined}
                  className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition ${
                    index === active
                      ? "border-gold-400 bg-gold-50"
                      : "border-line bg-white hover:border-gold-300 hover:bg-gold-50/40"
                  }`}
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Media
                      src={testimonial.image ?? ""}
                      alt=""
                      fallbackLabel={testimonial.name}
                      className="absolute inset-0"
                      imageClassName="object-cover"
                      sizes="44px"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-ink">
                      {testimonial.name}
                    </span>
                    <span className="block truncate text-xs text-ink-muted">
                      {testimonial.project}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export default Testimonials;
