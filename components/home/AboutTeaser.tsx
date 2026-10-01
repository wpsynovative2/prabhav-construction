import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";

type Point = { icon: string; title: string; text: string };

/** About teaser: layered photo collage on one side, a statement and four numbered promises on the other. */
export function AboutTeaser({ eyebrow, title, points }: { eyebrow: string; title: string; points: Point[] }) {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      {/* Collage */}
      <Reveal className="relative mx-auto w-full max-w-xl pb-16 lg:pb-10">
        <div className="absolute -top-4 -left-4 h-[78%] w-[78%] rounded-[2rem] border border-accent/60" aria-hidden />
        <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-[2rem] shadow-lift">
          <Image
            src="/images/sunset-towers.jpg"
            alt="Prabhav residential towers at sunset"
            fill
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="object-cover transition-transform duration-[1.5s] hover:scale-105"
          />
        </div>
        <div className="absolute right-0 bottom-0 aspect-square w-[52%] overflow-hidden rounded-[1.5rem] border-4 border-bg shadow-lift">
          <Image src="/images/BG-img1.jpg" alt="A finished Prabhav home interior" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
        </div>
        <div className="floaty absolute top-[42%] right-[6%] grid size-28 place-items-center rounded-full bg-primary text-center text-primary-fg shadow-lift md:size-32">
          <div>
            <p className="font-display text-4xl leading-none">25+</p>
            <p className="mt-1 text-[0.65rem] tracking-[0.15em] uppercase opacity-80">years</p>
          </div>
          <LogoMark className="absolute -top-3 left-1/2 h-7 w-auto -translate-x-1/2" />
        </div>
      </Reveal>

      {/* Statement + promises */}
      <div>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-[2.2rem] leading-[1.08] text-fg md:text-5xl">{title}</h2>
          <span className="mt-5 block h-px w-20 hairline" />
        </Reveal>
        <RevealGroup className="mt-8 grid gap-x-8 sm:grid-cols-2">
          {points.map((p, i) => (
            <RevealItem key={p.title}>
              <div className="group border-t border-line py-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-accent-text">0{i + 1}</span>
                  <h3 className="font-display text-xl text-fg transition-colors group-hover:text-primary">{p.title}</h3>
                </div>
                <p className="mt-1 pl-7 text-sm text-muted">{p.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-6">
          <ButtonLink href="/about-us" variant="outline">
            Our story
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </ButtonLink>
        </Reveal>
      </div>
    </div>
  );
}
