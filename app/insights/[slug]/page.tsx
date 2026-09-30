import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { InsightCover } from "@/components/insights/InsightCover";
import { InsightMeta, InsightRow } from "@/components/insights/InsightCard";
import { CtaBand } from "@/components/home/CtaBand";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getInsight, insights, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const i = getInsight((await params).slug);
  if (!i) return {};
  return buildMetadata({ title: i.title, description: i.summary, path: `/insights/${i.slug}` });
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const i = getInsight((await params).slug);
  if (!i) notFound();
  const more = insights.filter((x) => x.slug !== i.slug).slice(0, 3);

  return (
    <>
      <section className="relative -mt-[84px] bg-surface pt-[84px]">
        <Container className="max-w-4xl pt-6 pb-12 md:pt-8">
          <Breadcrumbs items={[{ name: "Insights", href: "/insights" }, { name: i.category, href: `/insights/${i.slug}` }]} />
          <div className="mt-8">
            <InsightMeta insight={i} />
            <h1 className="page-enter mt-4 font-display text-[2.2rem] leading-[1.08] font-medium text-fg md:text-[3.2rem]">{i.title}</h1>
            <p className="page-enter mt-4 text-lg text-muted [animation-delay:120ms]">{i.summary}</p>
          </div>
          <div className="group mt-8">
            <InsightCover insight={i} large className="aspect-[21/9] rounded-[1.75rem]" />
          </div>
        </Container>
      </section>

      <section className="bg-bg py-14 md:py-20">
        <Container className="max-w-4xl">
          <Eyebrow>Key takeaways</Eyebrow>
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
            {i.points.map((pt, n) => (
              <RevealItem key={pt}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-surface-raised p-5 transition-all duration-500 hover:border-accent/60 hover:shadow-soft">
                  <span className="gold-fill grid size-10 shrink-0 place-items-center rounded-full font-display text-[#2a1409]">{n + 1}</span>
                  <p className="pt-1.5 text-fg">{pt}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-6 text-xs text-muted">For general information only. Verify details with official sources before making decisions.</p>

          {more.length ? (
            <Reveal className="mt-16">
              <h2 className="mb-6 font-display text-3xl text-fg">Keep reading</h2>
              <div className="grid gap-4">
                {more.map((m) => (
                  <InsightRow key={m.slug} insight={m} />
                ))}
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <CtaBand title="Ready to take the next step?" source={`insight:${i.slug}`} phone={site.phone} phoneDisplay={site.phoneDisplay} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: i.title,
          description: i.summary,
          datePublished: i.date,
          url: `${siteUrl()}/insights/${i.slug}`,
          author: { "@id": `${siteUrl()}/#organization` },
          publisher: { "@id": `${siteUrl()}/#organization` },
        }}
      />
    </>
  );
}
