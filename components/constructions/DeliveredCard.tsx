import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Construction } from "@/lib/schemas/content.schema";
import { BuildingArt } from "@/components/brand/BuildingArt";
import { CATEGORY_LABEL } from "@/lib/utils";

/** A delivered building in the portfolio. */
export function DeliveredCard({ item }: { item: Construction }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.image ? (
          <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <BuildingArt scene={item.scene} seed={item.seed} anchor="ground" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-[#1c0c04]/75 px-3 py-1 font-display text-lg text-[#fbcd8c] backdrop-blur">
          {item.year}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white/85 px-2.5 py-0.5 text-xs font-medium text-[#2a1409]">
          {CATEGORY_LABEL[item.category]}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl leading-tight text-fg">{item.name}</h3>
          {item.project ? <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:rotate-45 group-hover:text-accent-text" /> : null}
        </div>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
          <MapPin className="size-3.5 text-accent-text" />
          {item.locality}
        </p>
        <p className="mt-2 text-sm text-accent-text">{item.highlight}</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-dashed border-line pt-4 text-center">
          {[
            { k: "Floors", v: item.floors },
            { k: item.category === "residential" ? "Homes" : "Units", v: String(item.units) },
            { k: "Sq ft", v: `${Math.round(item.builtUpSqft / 1000)}K` },
          ].map((s) => (
            <div key={s.k} className="flex flex-col-reverse">
              <dt className="text-[0.7rem] text-muted">{s.k}</dt>
              <dd className="font-display text-lg text-fg">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
  const cls =
    "group block h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift";
  return item.project ? (
    <Link href={`/projects/${item.project}`} className={cls}>
      {body}
    </Link>
  ) : (
    <article className={cls}>{body}</article>
  );
}
