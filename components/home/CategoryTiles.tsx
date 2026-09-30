import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BuildingArt, type Scene } from "@/components/brand/BuildingArt";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Category } from "@/lib/schemas/project.schema";
import { CATEGORY_LABEL } from "@/lib/utils";

const META: Record<Category, { scene: Scene; seed: number; line: string }> = {
  residential: { scene: "towers", seed: 14, line: "Apartments · Row houses" },
  commercial: { scene: "commercial", seed: 3, line: "Shops · Offices · Showrooms" },
  industrial: { scene: "industrial", seed: 2, line: "Galas · Warehouses" },
};

export function CategoryTiles({ counts }: { counts: Record<Category, number> }) {
  const cats = (Object.keys(META) as Category[]).filter((c) => counts[c] > 0);
  return (
    <RevealGroup className="grid gap-5 md:grid-cols-3">
      {cats.map((c, i) => (
        <RevealItem key={c}>
          <Link
            href={`/projects/type/${c}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line md:aspect-[3/4]"
          >
            <BuildingArt scene={META[c].scene} seed={META[c].seed} className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c0c04]/90 via-[#1c0c04]/25 to-transparent" />
            <span className="absolute top-5 left-5 font-display text-6xl text-white/25 transition-colors duration-500 group-hover:text-[#e5c96a]/60">
              0{i + 1}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-3xl">{CATEGORY_LABEL[c]}</h3>
                  <p className="mt-1 text-sm text-white/75">{META[c].line}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#2a1409]">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="h-px flex-1 origin-left scale-x-50 bg-[#d4af37] transition-transform duration-700 group-hover:scale-x-100" />
                {counts[c]} {counts[c] === 1 ? "project" : "projects"}
              </div>
            </div>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
