import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/LogoMark";
import { cn } from "@/lib/utils";

type Stat = { value: number; suffix: string; label: string; icon: string };

/** Credentials band: one dark brand panel, big gold numerals, hairline dividers. */
export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="pt-12 md:pt-16">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#612f15_0%,#3a1a0b_55%,#1c0c04_100%)] text-white shadow-lift">
            <LogoMark className="pointer-events-none absolute -top-16 -left-10 h-72 w-auto opacity-[0.12]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_90%_at_90%_0%,rgba(212,175,55,0.22),transparent_70%)]" />
            <dl className="relative grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "group flex flex-col-reverse items-center px-4 py-8 text-center md:py-11",
                    i % 2 === 1 && "border-l border-white/10",
                    i >= 2 && "border-t border-white/10 md:border-t-0",
                    i === 2 && "md:border-l",
                  )}
                >
                  <dt className="mt-3 text-xs tracking-[0.18em] text-white/70 uppercase">{s.label}</dt>
                  <dd className="gold-shine mt-4 font-display text-5xl leading-none md:text-6xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                  <span className="grid size-11 place-items-center rounded-full border border-[#d4af37]/40 text-[#fbcd8c] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6" aria-hidden>
                    <Icon name={s.icon} className="size-5" />
                  </span>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
