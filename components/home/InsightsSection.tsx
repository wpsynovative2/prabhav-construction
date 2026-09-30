import { ArrowRight } from "lucide-react";
import type { Insight } from "@/lib/schemas/content.schema";
import { InsightFeature, InsightRow } from "@/components/insights/InsightCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";

/** Editorial block: one lead story beside a stack of the latest insights. */
export function InsightsSection({ items }: { items: Insight[] }) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <>
      <SectionHeading
        eyebrow="Real estate insights"
        title="Latest from the market"
        subtitle="News, guides and trends for smarter property decisions."
        action={
          <ButtonLink href="/insights" variant="outline">
            All insights
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </ButtonLink>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="h-full">
          <InsightFeature insight={lead} />
        </Reveal>
        <RevealGroup className="grid content-between gap-4">
          {rest.slice(0, 3).map((i) => (
            <RevealItem key={i.slug}>
              <InsightRow insight={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
