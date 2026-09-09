import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import { navigation } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            <Icon name="search" size={28} />
          </span>

          <p className="mt-8 font-display text-6xl text-gold-300 sm:text-7xl">404</p>

          <h1 className="mt-4 font-display text-display-md text-balance text-ink">
            We could not find that page
          </h1>

          <p className="mt-4 text-base text-ink-muted">
            The link may be out of date, or the project you were looking for may have
            moved. Here is where to go instead.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" size="lg" withArrow>
              Back to home
            </ButtonLink>
            <ButtonLink href="/projects" variant="outline" size="lg">
              Browse projects
            </ButtonLink>
          </div>

          <nav aria-label="Site sections" className="mt-12 border-t border-line pt-8">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-ink-muted transition hover:text-gold-700"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
