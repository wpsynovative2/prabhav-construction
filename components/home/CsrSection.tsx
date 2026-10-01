import Image from "next/image";
import { HandHeart, MapPin } from "lucide-react";
import type { CsrItem } from "@/lib/schemas/content.schema";
import { TempleArt } from "@/components/brand/TempleArt";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** CSR: temples Prabhav has built and gifted to the community. */
export function CsrSection({ items }: { items: CsrItem[] }) {
  return (
    <>
      <RevealGroup className="grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <RevealItem key={t.slug}>
            <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden">
                {t.image ? (
                  <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <TempleArt kind={t.icon} title={`Illustration of the ${t.name}`} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                )}
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#1c0c04]/75 px-3 py-1 text-xs text-[#fbcd8c] backdrop-blur">
                  <HandHeart className="size-3.5" />
                  Built &amp; gifted by Prabhav
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium tracking-[0.15em] text-accent-text uppercase">{t.deity}</p>
                <h3 className="mt-1 font-display text-2xl text-fg">{t.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted">
                  <MapPin className="size-3.5 text-accent-text" />
                  {t.locality}
                </p>
                <p className="mt-3 text-sm text-muted">{t.line}</p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
      <p className="mx-auto mt-10 max-w-xl text-center font-display text-xl text-fg md:text-2xl">
        &ldquo;We don&apos;t just build homes. We build the places a community gathers.&rdquo;
      </p>
    </>
  );
}
