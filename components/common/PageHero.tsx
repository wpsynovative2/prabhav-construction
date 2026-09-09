import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import { Container, Eyebrow } from "@/components/ui/Section";

export interface Crumb {
  label: string;
  href?: string;
}

/** Compact page header used by every page except the home page. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  image = "/images/BG-img1.jpg",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className="absolute inset-0">
        <Media
          src={image}
          alt=""
          fallbackLabel="Prabhav"
          className="absolute inset-0"
          imageClassName="object-cover opacity-25"
          sizes="100vw"
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-ink via-ink/92 to-ink/70"
        />
      </div>

      <Container className="relative">
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-cream/65">
              <li>
                <Link href="/" className="transition hover:text-gold-300">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <Icon name="chevron-right" size={13} aria-hidden="true" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-gold-300">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-cream/80">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-3xl">
          <Eyebrow invert>{eyebrow}</Eyebrow>

          <h1 className="mt-6 font-display text-display-lg text-balance text-cream">
            {title}
          </h1>

          {description ? (
            <p className="mt-5 max-w-2xl text-base text-pretty text-cream/80 sm:text-lg">
              {description}
            </p>
          ) : null}

          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
