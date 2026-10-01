import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { LogoMark } from "@/components/brand/LogoMark";

type SectionProps = {
  id?: string;
  /** "bg": plain background. "surface": photo under the dark brand overlay, content light-on-dark. */
  tone?: "bg" | "surface";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({ id, tone = "bg", className, containerClassName, children }: SectionProps) {
  const dark = tone === "surface";
  return (
    <section
      id={id}
      // data-theme="dark" re-scopes the colour tokens so headings and cards read on the dark photo
      data-theme={dark ? "dark" : undefined}
      className={cn("relative py-16 text-fg md:py-28", dark ? "photo-dark" : "bg-bg", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium text-accent-text", className)}>
      <LogoMark className="h-3.5 w-auto" />
      {children}
    </span>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left", action, as: Tag = "h2", className }: HeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-14",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "flex flex-col items-center")}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Tag className="mt-3 font-display text-[1.8rem] leading-[1.15] text-fg md:text-[2.4rem]">{title}</Tag>
        <span className={cn("mt-4 block h-px w-20 hairline", align === "center" && "mx-auto")} />
        {subtitle ? <p className="mt-4 text-muted">{subtitle}</p> : null}
      </div>
      {action}
    </Reveal>
  );
}
