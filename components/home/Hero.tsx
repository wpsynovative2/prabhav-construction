import { ArrowRight, BadgeCheck, HardHat } from "lucide-react";
import Image from "next/image";
import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type HeroData = {
  badge: string;
  headline: string[];
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trust: { value: string; label: string }[];
};

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function Hero({ hero }: { hero: HeroData }) {
  const [line1, line2] = hero.headline;
  return (
    <section className="relative -mt-(--header-h) overflow-hidden pt-(--header-h)">
      {/* Backdrop: warm glow, dot grid, giant radiating rays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_35%,var(--glow),transparent_70%)]" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_20%_30%,black,transparent)]" />
      <LogoMark className="pointer-events-none absolute top-24 -left-40 h-[520px] w-auto -rotate-12 opacity-[0.06]" tone="current" />

      <Container className="relative grid items-center gap-10 pt-8 pb-12 md:pt-12 lg:grid-cols-[1.2fr_1fr] lg:gap-6 lg:pb-16">
        <div className="relative z-10 max-w-2xl">
          <span className="hero-rise intro-delay inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface-raised/80 px-4 py-1.5 text-sm text-accent-text shadow-soft backdrop-blur" style={d(0.05)}>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {hero.badge}
          </span>

          <h1 className="mt-6 font-display text-[2rem] leading-[1.12] text-fg sm:text-[2.5rem] lg:text-[2.6rem]">
            <span className="hero-rise intro-delay block" style={d(0.15)}>
              {line1}
            </span>
            <span className="hero-rise intro-delay gold-shine block pb-2" style={d(0.3)}>
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
            <ButtonLink href={hero.secondaryCta.href} variant="outline" size="lg">
              <HardHat className="size-4" />
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <dl className="hero-rise intro-delay mt-10 grid max-w-lg grid-cols-3 divide-x divide-line border-y border-line py-4" style={d(0.75)}>
            {hero.trust.map((t) => (
              <div key={t.label} className="px-3 first:pl-0 sm:px-5">
                <dt className="sr-only">{t.label}</dt>
                <dd className="font-display text-xl text-fg sm:text-2xl md:text-[1.7rem]">{t.value}</dd>
                <dd className="text-xs text-muted">{t.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Arched photo with floating proof cards */}
        <div className="relative mx-auto w-full max-w-[600px]">
          <div className="absolute -top-3 -right-3 h-full w-full rounded-t-[12rem] rounded-b-[2rem] border border-accent/60" aria-hidden />
          <div className="relative aspect-[6/5] w-full overflow-hidden rounded-t-[12rem] rounded-b-[2rem] shadow-lift">
            <Image
              src="/images/Mumbai Sea Link at Sunset.png"
              alt="Bandra-Worli Sea Link, Mumbai"
              fill
              preload
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>

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
            <HardHat className="size-4 text-accent-text" />
            Engineered in-house
          </div>
        </div>
      </Container>

    </section>
  );
}
