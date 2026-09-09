import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  id,
  className = "",
  tone = "cream",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "cream" | "white" | "sand" | "ink" | "none";
}) {
  const tones = {
    cream: "bg-cream text-ink",
    white: "bg-white text-ink",
    sand: "bg-cream-deep text-ink",
    ink: "bg-ink text-cream",
    none: "",
  } as const;

  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-26 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

/** Small pill label that sits above a section heading. */
export function Eyebrow({
  children,
  invert = false,
}: {
  children: ReactNode;
  invert?: boolean;
}) {
  return (
    <span
      className={`label-caps inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${
        invert
          ? "border-gold-300/25 bg-white/6 text-gold-200"
          : "border-gold-300/60 bg-gold-50 text-gold-700"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1 w-1 rounded-full ${invert ? "bg-gold-300" : "bg-gold-500"}`}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <Reveal className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="mb-4">
          <Eyebrow invert={invert}>{eyebrow}</Eyebrow>
        </span>
      ) : null}

      <h2
        className={`font-display text-display-md text-balance ${
          invert ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-4 max-w-2xl text-lg text-pretty ${
            invert ? "text-cream/80" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
