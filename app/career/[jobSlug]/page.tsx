import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Briefcase, CheckCircle2, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ApplicationForm } from "@/components/career/ApplicationForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getJob, getOpenJobs, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { jobLd } from "@/lib/seo/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return getOpenJobs().map((j) => ({ jobSlug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/career/[jobSlug]">): Promise<Metadata> {
  const job = getJob((await params).jobSlug);
  if (!job) return {};
  return buildMetadata({
    title: `${job.title}, ${job.location}`,
    description: `${job.description} ${job.experience} experience. Apply to Prabhav Construction.`,
    path: `/career/${job.slug}`,
  });
}

export default async function JobPage({ params }: PageProps<"/career/[jobSlug]">) {
  const job = getJob((await params).jobSlug);
  if (!job) notFound();
  return (
    <>
      <PageHero
        title={job.title}
        subtitle={job.description}
        crumbs={[
          { name: "Career", href: "/career" },
          { name: job.title, href: `/career/${job.slug}` },
        ]}
      >
        <div className="page-enter mt-6 flex flex-wrap gap-2 [animation-delay:240ms]">
          {[
            { I: MapPin, t: job.location },
            { I: Briefcase, t: job.experience },
            { I: Clock, t: job.type === "FULL_TIME" ? "Full time" : job.type },
          ].map(({ I, t }) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-4 py-2 text-sm text-fg">
              <I className="size-4 text-accent-text" />
              {t}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-bg py-14 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid content-start gap-10">
            {[
              { title: "What you'll do", items: job.responsibilities },
              { title: "What you bring", items: job.requirements },
            ].map((b) => (
              <Reveal key={b.title}>
                <Eyebrow>{b.title}</Eyebrow>
                <ul className="mt-5 grid gap-3">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3 text-fg">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-text" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div id="apply" className="rounded-3xl border border-line bg-surface-raised p-6 shadow-lift md:p-8">
              <h2 className="mb-6 font-display text-3xl text-fg">Apply now</h2>
              <ApplicationForm positions={getOpenJobs().map((j) => j.title)} defaultPosition={job.title} />
            </div>
          </Reveal>
        </Container>
      </section>
      <JsonLd data={jobLd(job, site)} />
    </>
  );
}
