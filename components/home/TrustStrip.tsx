import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { trustPoints } from "@/data/site";

/** The overlapping credibility card that sits between the hero and the page. */
export function TrustStrip() {
  return (
    <div className="relative z-10 -mt-14 lg:-mt-20">
      <Container>
        <Reveal className="grid gap-px overflow-hidden rounded-4xl bg-line ring-1 ring-line shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-4 bg-white px-6 py-7 transition-colors hover:bg-gold-50/60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                <Icon name={point.icon} size={22} />
              </span>
              <span>
                <span className="block font-display text-xl text-ink">
                  {point.title}
                </span>
                <span className="mt-1 block text-xs leading-snug text-ink-muted">
                  {point.description}
                </span>
              </span>
            </div>
          ))}
        </Reveal>
      </Container>
    </div>
  );
}

export default TrustStrip;
