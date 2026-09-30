import type { Insight } from "@/lib/schemas/content.schema";
import { LogoMark } from "@/components/brand/LogoMark";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Brand-toned gradient per category, so each topic reads at a glance. */
const TONES: Record<Insight["category"], string> = {
  Infrastructure: "bg-[linear-gradient(135deg,#612f15_0%,#2a1409_100%)]",
  Market: "bg-[linear-gradient(135deg,#8a5129_0%,#3a1a0b_100%)]",
  "Buyer guide": "bg-[linear-gradient(135deg,#b08f25_0%,#5a3312_100%)]",
  Policy: "bg-[linear-gradient(135deg,#4a2310_0%,#160a04_100%)]",
};

/** Illustrated cover: blueprint grid, radiating logo rays and the topic's icon. */
export function InsightCover({ insight, className, large, iconHigh }: { insight: Insight; className?: string; large?: boolean; iconHigh?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden", TONES[insight.category], className)} aria-hidden>
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(#fbcd8c_1px,transparent_1px),linear-gradient(90deg,#fbcd8c_1px,transparent_1px)] [background-size:28px_28px]" />
      <LogoMark className={cn("absolute -right-6 -bottom-10 w-auto opacity-25 transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-6", large ? "h-80" : "h-44")} />
      <span
        className={cn(
          "absolute left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d4af37]/50 bg-white/10 text-[#fbcd8c] backdrop-blur-sm transition-transform duration-700 group-hover:scale-110",
          large ? "size-28" : "size-16",
          iconHigh ? "top-[30%]" : "top-1/2",
        )}
      >
        <Icon name={insight.icon} className={large ? "size-12" : "size-7"} strokeWidth={1.4} />
      </span>
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
