import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ThemedLogo } from "@/components/theme/ThemedLogo";
import { LogoMark } from "@/components/brand/LogoMark";
import { SocialIcon } from "@/components/ui/Icon";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "@/components/ui/Container";
import type { Site } from "@/lib/schemas/content.schema";
import type { NavCategory, NavStation } from "./types";

type Props = {
  site: Site;
  groups: { title: string; links: { label: string; href: string }[] }[];
  stations: NavStation[];
  categories: NavCategory[];
};

export function Footer({ site, groups, stations, categories }: Props) {
  const office = site.offices[0]!;
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-footer-bg pb-24 text-footer-fg lg:pb-0">
      <LogoMark className="pointer-events-none absolute -right-24 -bottom-24 h-[420px] w-auto opacity-[0.07]" tone="current" />
      <div className="h-px hairline" />
      <Container className="relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <ThemedLogo variant="light-on-dark" className="h-20" />
          <p className="mt-5 max-w-xs text-sm text-footer-fg/80">{site.tagline}.</p>
          <div className="mt-6 flex gap-2">
            {Object.entries(site.social).map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:-translate-y-0.5 hover:border-[#d4af37] hover:text-[#e5c96a]"
              >
                <SocialIcon name={name} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Stations">
          {stations.map((s) => (
            <FooterLink key={s.slug} href={`/projects/station/${s.slug}`}>
              Near {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Portfolio">
          <FooterLink href="/projects">All projects</FooterLink>
          {categories.map((c) => (
            <FooterLink key={c.slug} href={`/projects/type/${c.slug}`}>
              {c.label}
            </FooterLink>
          ))}
        </FooterCol>

        <div className="grid gap-10">
          {groups.map((g) => (
            <FooterCol key={g.title} title={g.title}>
              {g.links.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterCol>
          ))}
        </div>

        <div>
          <h3 className="font-display text-lg text-white">Visit us</h3>
          <ul className="mt-5 grid gap-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#d4af37]" />
              <a href={office.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                {office.address.streetAddress}, {office.address.addressLocality} {office.address.postalCode}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 text-[#d4af37]" />
              <a href={`tel:${site.phone}`} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 text-[#d4af37]" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="size-4 shrink-0 text-[#d4af37]" />
              {site.hours}
            </li>
          </ul>
          <CtaButton source="footer" variant="accent" className="mt-6">
            Enquire now
          </CtaButton>
        </div>
      </Container>
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-footer-fg/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>All projects are registered with MahaRERA. Visuals are artistic impressions.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg text-white">{title}</h3>
      <ul className="mt-5 grid gap-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
        <span className="h-px w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-3" />
        {children}
      </Link>
    </li>
  );
}
