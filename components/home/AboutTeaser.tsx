import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";

type Point = { icon: string; title: string; text: string };

export function AboutTeaser({ eyebrow, title, points }: { eyebrow: string; title: string; points: Point[] }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <Reveal className="relative">
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#7a3c1b,#2a1409)] p-8 text-white md:p-12">
          <LogoMark className="pointer-events-none absolute -top-10 -right-10 h-72 w-auto opacity-15" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <Eyebrow className="text-[#e5c96a]">{eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">{title}</h2>
              <span className="mt-5 block h-px w-16 bg-[#d4af37]" />
              <ButtonLink href="/about-us" variant="accent" className="mt-8">
                Our story
                <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </ButtonLink>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] ring-1 ring-white/15">
                <Image
                  src="/images/BG-img1.jpg"
                  alt="A calm, sunlit living room in a Prabhav home"
                  fill
                  sizes="(min-width: 1024px) 25vw, 80vw"
                  className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                />
              </div>
              <div className="floaty absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 text-[#2a1409] shadow-lift">
                <p className="font-display text-3xl leading-none">25+</p>
                <p className="text-xs text-[#6b5548]">years of craft</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <RevealGroup className="grid gap-4">
        {points.map((p) => (
          <RevealItem key={p.title}>
            <div className="group flex items-center gap-5 rounded-2xl border border-transparent p-4 transition-all duration-500 hover:border-line hover:bg-surface-raised hover:shadow-soft">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition-all duration-500 group-hover:bg-primary group-hover:text-primary-fg group-hover:ring-primary">
                <Icon name={p.icon} className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-xl text-fg">{p.title}</h3>
                <p className="text-sm text-muted">{p.text}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
