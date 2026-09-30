import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { LogoMark } from "@/components/brand/LogoMark";

type SectionProps = {
  id?: string;
  tone?: "bg" | "surface";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({ id, tone = "bg", className, containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-16 md:py-28", tone === "surface" ? "bg-surface" : "bg-bg", className)}>
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
        <Tag className="mt-3 font-display text-[2rem] leading-[1.1] font-medium text-fg md:text-[2.75rem]">{title}</Tag>
        <span className={cn("mt-4 block h-px w-20 hairline", align === "center" && "mx-auto")} />
        {subtitle ? <p className="mt-4 text-muted">{subtitle}</p> : null}
      </div>
      {action}
    </Reveal>
  );
}
