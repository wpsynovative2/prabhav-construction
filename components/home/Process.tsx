import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Step = { icon: string; title: string; text: string };

export function Process({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      {/* Connecting gold line (desktop) */}
      <svg className="absolute top-12 left-[12%] hidden h-2 w-[76%] md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden>
        <line x1="0" y1="1" x2="100" y2="1" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <RevealGroup className="relative grid grid-cols-2 gap-6 md:grid-cols-4" stagger={0.15}>
        {steps.map((s, i) => (
          <RevealItem key={s.title}>
            <div className="group flex flex-col items-center text-center">
              <div className="relative">
                <span className="grid size-24 place-items-center rounded-full border border-line bg-surface-raised text-accent-text shadow-soft transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-lift">
                  <Icon name={s.icon} className="size-9 transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="gold-fill absolute -top-1 -right-1 grid size-8 place-items-center rounded-full text-sm font-semibold text-[#2a1409] ring-4 ring-bg">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-fg">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
