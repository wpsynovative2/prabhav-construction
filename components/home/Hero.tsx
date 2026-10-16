import Image from "next/image";
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
          {hero.badge}
        </span>
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
