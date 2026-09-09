import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import LegalLink from "@/components/legal/LegalLink";
import CtaButton from "@/components/ui/CtaButton";
import { Container } from "@/components/ui/Section";
import { contact, navigation, site, socials } from "@/data/site";
import { statusOrder, statusMeta, getProjectsByStatus } from "@/data/projects";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream/80">
      {/* Closing call to action */}
      <Container>
        <div className="relative -mt-16 overflow-hidden rounded-4xl bg-linear-to-br from-gold-600 via-gold-500 to-gold-700 px-7 py-10 shadow-lift sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-display-md text-balance text-white">
                Let&apos;s find the right address for you
              </h2>
              <p className="mt-3 text-sm text-white/90">
                Tell us what you are looking for and we will send across the plans,
                pricing and the nearest available site-visit slot.
              </p>
            </div>
            <CtaButton
              label="Talk to Our Team"
              subtitle="Share your name and mobile number — a senior member of our sales team will call you back within one working day."
              source="Footer CTA"
              variant="light"
              size="lg"
              className="shrink-0"
            />
          </div>
        </div>
      </Container>

      <Container>
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image
              src={site.logo.dark}
              alt={site.name}
              width={900}
              height={576}
              className="h-14 w-auto object-contain object-left"
            />
            <p className="mt-5 max-w-sm text-sm">
              A Mumbai developer since 2000, building residential and commercial
              landmarks the way we would want them built for our own families —
              approvals first, dates kept, documents clean.
            </p>

            <ul className="mt-7 flex gap-3">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition hover:border-gold-400 hover:bg-gold-500 hover:text-white"
                  >
                    <Icon name={social.icon} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className="text-2xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-gold-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Projects */}
          <div className="lg:col-span-3">
            <h3 className="text-2xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
              Projects
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {statusOrder.flatMap((status) =>
                getProjectsByStatus(status).map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group flex items-baseline gap-2 transition hover:text-gold-300"
                    >
                      <span>{project.name}</span>
                      <span className="text-2xs text-cream/40 group-hover:text-gold-400">
                        {statusMeta[status].label}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-2xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon name="map-pin" size={17} className="mt-0.5 shrink-0 text-gold-400" />
                <address className="not-italic">
                  {contact.office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" size={17} className="mt-0.5 shrink-0 text-gold-400" />
                <span>
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block transition hover:text-gold-300"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" size={17} className="mt-0.5 shrink-0 text-gold-400" />
                <span>
                  {contact.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block break-all transition hover:text-gold-300"
                    >
                      {email}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* RERA note */}
        <div className="rounded-3xl border border-cream/10 bg-white/[0.03] px-6 py-5 text-xs text-cream/70">
          <strong className="font-semibold text-cream/85">MahaRERA:</strong>{" "}
          {contact.reraDisclaimer}. All images, plans and specifications shown on this
          website are indicative — see our{" "}
          <LegalLink doc="disclaimer" className="underline underline-offset-2">
            Disclaimer
          </LegalLink>{" "}
          for details.
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-7 text-xs sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li>
              <LegalLink doc="privacy">Privacy Policy</LegalLink>
            </li>
            <li>
              <LegalLink doc="terms">Terms &amp; Conditions</LegalLink>
            </li>
            <li>
              <LegalLink doc="disclaimer">Disclaimer</LegalLink>
            </li>
            <li>
              <Link href="/sitemap.xml" className="transition hover:text-gold-400">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
