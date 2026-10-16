<<<<<<< HEAD
import Image from "next/image";
=======
import { ArrowRight, BadgeCheck, HardHat } from "lucide-react";
import Image from "next/image";
import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
>>>>>>> 845a4fff56ccdb5fcc835d0bfa0bccf89a651ec1
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

/**
 * Full-bleed photo hero. Copy sits centred at the bottom over the sea so the sky,
 * the "MUMBAI" lettering and the bridge in the photo stay clear.
 */
export function Hero({ hero }: { hero: HeroData }) {
  const [line1, line2] = hero.headline;
  return (
    <section
      data-theme="dark"
      className="relative -mt-(--header-h) flex min-h-svh flex-col justify-end overflow-hidden bg-[#1c0c04] pt-(--header-h) text-fg"
    >
      <Image
        src="/images/hero-mumbai-sea-link.jpg"
        alt="Bandra-Worli Sea Link, Mumbai, at sunset"
        fill
        preload
        quality={90}
        sizes="100vw"
        className="hero-zoom object-cover object-[45%_100%]"
      />
      {/* Legibility: dark fade from the bottom, light vignette at the top */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(28,12,4,0.96)_0%,rgba(28,12,4,0.82)_32%,rgba(28,12,4,0.45)_52%,rgba(28,12,4,0.08)_72%,transparent_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/30 to-transparent" />

      <Container className="absolute inset-x-0 top-(--header-h) pt-6 text-center md:pt-10">
        <span
          className="hero-rise intro-delay inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-[#fbcd8c] backdrop-blur-md"
          style={d(0.05)}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
<<<<<<< HEAD
          {hero.badge}
        </span>
=======

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
>>>>>>> 845a4fff56ccdb5fcc835d0bfa0bccf89a651ec1
      </Container>

      <Container className="relative pt-40 pb-16 text-center md:pb-24 lg:[@media(max-height:800px)]:pb-14">
        <h1 className="mx-auto max-w-4xl font-display text-[2rem] leading-[1.12] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-[2.6rem] lg:text-[3.1rem] lg:[@media(max-height:800px)]:text-[2.4rem]">
          <span className="hero-rise intro-delay block" style={d(0.15)}>
            {line1}
          </span>
          <span className="hero-rise intro-delay block pb-1 text-[#f6d9a0]" style={d(0.3)}>
            {line2}
          </span>
        </h1>

        <p className="hero-rise intro-delay mx-auto mt-3 max-w-2xl text-base text-white/85 md:text-lg lg:[@media(max-height:800px)]:mt-2 lg:[@media(max-height:800px)]:text-base" style={d(0.45)}>
          {hero.subline}
        </p>
      </Container>
    </section>
  );
}
