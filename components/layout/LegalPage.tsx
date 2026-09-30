import { PageHero } from "./PageHero";
import { Container } from "@/components/ui/Container";

export type LegalSection = { title: string; points: string[] };

/** Legal pages as scannable numbered cards of short points. */
export function LegalPage({ title, subtitle, path, sections, updated }: { title: string; subtitle: string; path: string; sections: LegalSection[]; updated: string }) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} crumbs={[{ name: title, href: path }]} />
      <section className="bg-bg py-14 md:py-20">
        <Container className="max-w-4xl">
          <p className="mb-8 text-sm text-muted">Last updated: {updated}</p>
          <div className="grid gap-4">
            {sections.map((s, i) => (
              <article key={s.title} className="rounded-2xl border border-line bg-surface-raised p-6 md:p-8">
                <h2 className="flex items-center gap-4 font-display text-2xl text-fg">
                  <span className="gold-fill grid size-10 shrink-0 place-items-center rounded-full text-base text-[#2a1409]">{i + 1}</span>
                  {s.title}
                </h2>
                <ul className="mt-4 grid gap-2 pl-14 text-muted">
                  {s.points.map((p) => (
                    <li key={p} className="list-disc marker:text-accent">
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted">Template text: have it reviewed by your legal adviser before launch.</p>
        </Container>
      </section>
    </>
  );
}
