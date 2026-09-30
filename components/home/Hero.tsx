import { ArrowRight, BadgeCheck, CalendarCheck, Star, TrainFront } from "lucide-react";
import { HeroScene } from "@/components/brand/HeroScene";
import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "@/components/ui/Container";
import type { Intent } from "@/lib/schemas/lead.schema";
import { QuickFinder, type FinderStation } from "./QuickFinder";

type HeroData = {
  badge: string;
  headline: string[];
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; intent: string };
  trust: string;
};

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function Hero({ hero, stations }: { hero: HeroData; stations: FinderStation[] }) {
  const [line1, line2] = hero.headline;
  return (
    <section className="relative -mt-[84px] overflow-hidden pt-[84px]">
      {/* Backdrop: warm glow, dot grid, giant radiating rays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_35%,var(--glow),transparent_70%)]" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_20%_30%,black,transparent)]" />
      <LogoMark className="pointer-events-none absolute top-24 -left-40 h-[520px] w-auto -rotate-12 opacity-[0.06]" tone="current" />

      <Container className="relative grid items-center gap-10 pt-8 pb-40 md:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-44">
        <div className="relative z-10 max-w-xl">
          <span className="hero-rise intro-delay inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface-raised/80 px-4 py-1.5 text-sm text-accent-text shadow-soft backdrop-blur" style={d(0.05)}>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {hero.badge}
          </span>

          <h1 className="mt-6 font-display text-[2.7rem] leading-[1.02] font-medium tracking-tight text-fg sm:text-6xl lg:text-[4.4rem]">
            <span className="hero-rise intro-delay block" style={d(0.15)}>
              {line1}
            </span>
            <span className="hero-rise intro-delay gold-shine block pb-2 italic" style={d(0.3)}>
              {line2}
            </span>
          </h1>

          <p className="hero-rise intro-delay mt-5 max-w-md text-lg text-muted" style={d(0.45)}>
            {hero.subline}
          </p>

          <div className="hero-rise intro-delay mt-8 flex flex-wrap gap-3" style={d(0.6)}>
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </ButtonLink>
            <CtaButton source="home:hero" intent={hero.secondaryCta.intent as Intent} variant="outline" size="lg">
              <CalendarCheck className="size-4" />
              {hero.secondaryCta.label}
            </CtaButton>
          </div>

          <div className="hero-rise intro-delay mt-10 flex items-center gap-4" style={d(0.75)}>
            <div className="flex -space-x-3">
              {["#8a4a26", "#b08f25", "#612f15", "#d19a5c"].map((c, i) => (
                <span key={c} className="grid size-10 place-items-center rounded-full border-2 border-bg text-xs font-semibold text-white" style={{ background: c }}>
                  {["RK", "AS", "PM", "NJ"][i]}
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted">{hero.trust}</p>
            </div>
          </div>
        </div>

        {/* Illustration with floating proof cards */}
        <div className="relative mx-auto w-full max-w-[600px]">
          <HeroScene className="relative w-full drop-shadow-[0_30px_40px_rgba(97,47,21,0.15)]" />

          <div className="floaty absolute top-[18%] -left-2 flex items-center gap-3 rounded-2xl border border-line bg-surface-raised/90 p-3 pr-4 shadow-lift backdrop-blur md:-left-8">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-fg">
              <BadgeCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-fg">MahaRERA</p>
              <p className="text-xs text-muted">Registered projects</p>
            </div>
          </div>

          <div className="floaty absolute right-0 bottom-[22%] flex items-center gap-3 rounded-2xl border border-line bg-surface-raised/90 p-3 pr-4 shadow-lift backdrop-blur [animation-delay:-3s] md:-right-6">
            <svg viewBox="0 0 36 36" className="size-11 -rotate-90" aria-hidden>
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--line)" strokeWidth="4" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="94.2" strokeDashoffset="4" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-fg">On-time</p>
              <p className="text-xs text-muted">Possession record</p>
            </div>
          </div>

          <div className="floaty absolute top-[4%] right-[8%] hidden items-center gap-2 rounded-full border border-line bg-surface-raised/90 px-3 py-2 text-xs font-medium text-fg shadow-soft backdrop-blur [animation-delay:-1.5s] sm:flex">
            <TrainFront className="size-4 text-accent-text" />
            Minutes from the station
          </div>
        </div>
      </Container>

      {/* Quick finder overlaps the hero edge, like a search console */}
      <Container className="relative z-20 -mt-28 lg:-mt-32">
        <QuickFinder stations={stations} />
      </Container>
    </section>
  );
}
