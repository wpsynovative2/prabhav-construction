import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Stat = { value: number; suffix: string; label: string; icon: string };

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <Container className="pt-12 md:pt-16">
      <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {stats.map((s) => (
          <RevealItem key={s.label}>
            <div className="group relative flex h-full items-center gap-4 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-4 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-soft md:p-6">
              <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-surface-raised text-accent-text shadow-soft ring-1 ring-line transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 md:size-14">
                <Icon name={s.icon} className="size-6" />
              </span>
              <div>
                <p className="font-display text-3xl leading-none text-fg md:text-4xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-xs text-muted md:text-sm">{s.label}</p>
              </div>
              <span className="pointer-events-none absolute -right-6 -bottom-6 size-20 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Container>
  );
}
