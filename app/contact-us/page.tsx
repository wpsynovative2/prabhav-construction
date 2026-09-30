import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { MapEmbed } from "@/components/projects/detail/MapEmbed";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/Icon";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPage, faqs, seo, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { localBusinessLd } from "@/lib/seo/jsonld";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({ ...seo.pages.contact, path: "/contact-us", absoluteTitle: true });

export default function ContactPage() {
  const office = site.offices[0]!;
  const channels = [
    { icon: <Phone className="size-5" />, label: "Call us", value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: <SocialIcon name="whatsapp" className="size-5" />, label: "WhatsApp", value: "Chat with sales", href: `https://wa.me/${site.whatsapp}` },
    { icon: <Mail className="size-5" />, label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      icon: <MapPin className="size-5" />,
      label: office.name,
      value: `${office.address.streetAddress}, ${office.address.addressLocality}`,
      href: office.mapsUrl,
    },
  ];

  return (
    <>
      <PageHero title={contactPage.hero.title} subtitle={contactPage.hero.subtitle} crumbs={[{ name: "Contact us", href: "/contact-us" }]} />

      <section className="bg-bg py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-line bg-surface-raised p-6 shadow-lift md:p-10">
              <h2 className="mb-6 font-display text-3xl text-fg">{contactPage.formTitle}</h2>
              <InlineLeadForm source="contact-page" />
            </div>
          </Reveal>

          <div className="grid content-start gap-4">
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((c) => (
                <RevealItem key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-raised p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-soft"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition group-hover:bg-primary group-hover:text-primary-fg">
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">{c.label}</span>
                      <span className="block truncate font-medium text-fg">{c.value}</span>
                    </span>
                    <ArrowUpRight className="size-5 text-muted transition group-hover:rotate-45 group-hover:text-accent-text" />
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="flex items-center gap-4 rounded-2xl bg-[linear-gradient(140deg,#612f15,#2a1409)] p-5 text-white">
              <Clock className="size-6 text-[#e5c96a]" />
              <div>
                <p className="text-xs text-white/70">Office hours</p>
                <p className="font-display text-lg">{site.hours}</p>
              </div>
            </div>
          </div>
        </Container>

        <Container className="mt-10">
          <Reveal>
            <MapEmbed src={office.mapEmbedUrl} title={`Map of ${site.name} ${office.name}`} />
          </Reveal>
        </Container>
      </section>

      <Section tone="surface">
        <SectionHeading eyebrow="Questions" title="Before you visit" align="center" />
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqs.contact} />
        </div>
      </Section>

      {localBusinessLd(site).map((ld, i) => (
        <JsonLd key={i} data={ld} />
      ))}
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: `${siteUrl()}/contact-us` }} />
    </>
  );
}
