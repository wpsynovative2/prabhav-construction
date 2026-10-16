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
 * Full-bleed photo hero with the badge on top; the headline is screen-reader only.
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

      {/* Headline is visually hidden (the photo carries the hero) but kept as the page's h1 */}
      <h1 className="sr-only">
        {line1} {line2}
      </h1>
    </section>
  );
}
