import { LogoMark } from "@/components/brand/LogoMark";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Compact banner for inner pages: breadcrumb, H1, one-line subtitle, radiating logo rays. */
export function PageHero({
  title,
  subtitle,
  crumbs,
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-(--header-h) overflow-hidden bg-surface pt-(--header-h)">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <LogoMark className="floaty pointer-events-none absolute -top-10 -right-10 h-[380px] w-auto opacity-[0.12] md:right-10" />
      <Container className="relative py-14 md:py-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="page-enter mt-6 max-w-3xl font-display text-[2rem] leading-[1.12] text-fg md:text-[3rem]">
          {title}
        </h1>
        {subtitle ? <p className="page-enter mt-4 max-w-xl text-lg text-muted [animation-delay:120ms]">{subtitle}</p> : null}
        {children}
      </Container>
      <div className="h-px hairline" />
    </section>
  );
}
