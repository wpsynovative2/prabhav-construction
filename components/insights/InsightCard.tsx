import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Insight } from "@/lib/schemas/content.schema";
import { cn } from "@/lib/utils";
import { InsightCover } from "./InsightCover";

export const formatDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function InsightMeta({ insight, light }: { insight: Insight; light?: boolean }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-xs", light ? "text-white/75" : "text-muted")}>
      <span className={cn("rounded-full px-2.5 py-0.5 font-medium", light ? "bg-white/15 text-[#fbcd8c]" : "bg-accent/15 text-accent-text")}>
        {insight.category}
      </span>
      <time dateTime={insight.date}>{formatDate(insight.date)}</time>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3.5" />
        {insight.readMins} min read
      </span>
    </p>
  );
}

/** Large lead story: artwork on top, story on a dark panel below (never overlapping). */
export function InsightFeature({ insight }: { insight: Insight }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-[#1c0c04] transition-shadow duration-500 hover:shadow-lift">
      <div className="relative min-h-52 flex-1">
        <InsightCover insight={insight} large className="absolute! inset-0" />
      </div>
      <div className="relative p-6 text-white md:p-8">
        <InsightMeta insight={insight} light />
        <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
          <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {insight.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-md text-white/75">{insight.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#fbcd8c]">
          Read the insight
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}

/** Compact row: thumbnail left, headline right. */
export function InsightRow({ insight }: { insight: Insight }) {
  return (
    <article className="group relative flex items-center gap-4 rounded-2xl border border-line bg-surface-raised p-3 pr-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-soft">
      <InsightCover insight={insight} className="size-24 shrink-0 rounded-xl sm:size-28" />
      <div className="min-w-0 flex-1">
        <InsightMeta insight={insight} />
        <h3 className="mt-2 font-display text-lg leading-snug text-fg transition-colors group-hover:text-primary">
          <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {insight.title}
          </Link>
        </h3>
      </div>
      <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-accent-text" />
    </article>
  );
}

/** Standard grid card for the insights index. */
export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-lift">
      <InsightCover insight={insight} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-6">
        <InsightMeta insight={insight} />
        <h3 className="mt-3 font-display text-2xl leading-tight text-fg">
          <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {insight.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{insight.summary}</p>
      </div>
    </article>
  );
}
