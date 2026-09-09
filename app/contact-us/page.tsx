import type { Metadata } from "next";

import PageHero from "@/components/common/PageHero";
import FaqSection from "@/components/common/FaqSection";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { contactFaqs } from "@/data/faqs";
import { contact, site, socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us — Talk to Our Sales Team",
  description:
    "Get in touch with Prabhav Construction. Call, WhatsApp or e-mail our Mumbai office, send an enquiry, or visit us at Prabhav House, Andheri West. Site visits seven days a week by appointment.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Prabhav Construction",
    description:
      "Reach our Mumbai sales team by phone, WhatsApp, e-mail or the enquiry form. Office address, map and frequently asked questions.",
    url: `${site.url}/contact-us`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const contactPoints = [
  {
    icon: "phone",
    label: "Call us",
    compact: false,
    lines: contact.phones,
    hrefs: contact.phones.map((phone) => `tel:${phone.replace(/\s/g, "")}`),
    note: "Mon – Sat, 10:00 AM – 7:00 PM",
  },
  {
    icon: "mail",
    label: "E-mail us",
    compact: true,
    lines: contact.emails,
    hrefs: contact.emails.map((email) => `mailto:${email}`),
    note: "We reply within one working day",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    compact: false,
    lines: [contact.phones[0]],
    hrefs: [`https://wa.me/${contact.whatsapp}`],
    note: "Quickest way to reach the sales desk",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="Contact us"
        title="Talk to the people who actually build them"
        description="Whether you are enquiring about a specific project, exploring a joint development, or need help after possession — here is how to reach us."
        crumbs={[{ label: "Contact Us" }]}
      />

      {/* Contact methods */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {contactPoints.map((point, index) => (
              <Reveal key={point.label} delay={index * 90} className="h-full">
                <div className="flex h-full flex-col rounded-4xl border border-line bg-white p-7 shadow-soft transition hover:border-gold-300 hover:shadow-lift">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                    <Icon name={point.icon} size={22} />
                  </span>

                  <h2 className="mt-5 text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">
                    {point.label}
                  </h2>

                  <div className="mt-2 space-y-1">
                    {point.lines.map((line, lineIndex) => (
                      <a
                        key={line}
                        href={point.hrefs[lineIndex]}
                        target={point.icon === "whatsapp" ? "_blank" : undefined}
                        rel={point.icon === "whatsapp" ? "noopener noreferrer" : undefined}
                        className={`block font-display text-ink transition hover:text-gold-700 ${
                          point.compact
                            ? "text-lg [overflow-wrap:anywhere]"
                            : "text-display-xs"
                        }`}
                      >
                        {line}
                      </a>
                    ))}
                  </div>

                  <p className="mt-auto pt-4 text-xs text-ink-muted">{point.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Office details + enquiry form */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Visit us"
                title="Our corporate office"
                description="Drop in during working hours, or let us know you are coming and we will keep the relevant project files ready."
              />

              <Reveal delay={60}>
                <div className="mt-9 rounded-4xl border border-line bg-cream p-7">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                      <Icon name="map-pin" size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink">
                        {contact.office.label}
                      </h3>
                      <address className="mt-2 text-sm text-ink-muted not-italic">
                        {contact.office.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </div>
                  </div>

                  <div className="mt-7 flex gap-4 border-t border-line pt-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                      <Icon name="clock" size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink">Office hours</h3>
                      <dl className="mt-2 space-y-1 text-sm text-ink-muted">
                        {contact.hours.map((entry) => (
                          <div key={entry.days} className="flex flex-wrap gap-x-2">
                            <dt className="font-medium text-ink">{entry.days}</dt>
                            <dd>{entry.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>

                  <ButtonLink
                    href={contact.office.directionsUrl}
                    external
                    variant="outline"
                    className="mt-7 w-full"
                  >
                    <Icon name="external" size={17} />
                    Get directions
                  </ButtonLink>
                </div>
              </Reveal>

              {/* Social */}
              <Reveal delay={100}>
                <div className="mt-8">
                  <h3 className="text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">
                    Follow our work
                  </h3>
                  <ul className="mt-4 flex gap-3">
                    {socials.map((social) => (
                      <li key={social.name}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-gold-400 hover:bg-gold-600 hover:text-white"
                        >
                          <Icon name={social.icon} size={18} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={80}>
              <div className="rounded-4xl border border-line bg-cream p-7 shadow-soft sm:p-9">
                <h2 className="font-display text-display-sm text-ink">
                  Send us an enquiry
                </h2>
                <p className="mt-2.5 text-sm text-ink-muted">
                  Only your name and mobile number are required. We will call you back
                  within one working day.
                </p>

                <div className="mt-7">
                  <EnquiryForm
                    formTitle="Contact Page Enquiry"
                    formType="contact"
                    source="Contact page"
                    submitLabel="Send Enquiry"
                    layout="two-column"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Find us"
            title="Prabhav House, Andheri West"
            description="Two minutes from Link Road, with visitor parking in the building basement."
          />

          <Reveal delay={60}>
            <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-line shadow-soft">
              <iframe
                src={contact.office.mapEmbedUrl}
                title="Map showing the Prabhav Construction corporate office in Andheri West, Mumbai"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[24rem] w-full border-0 sm:h-[30rem]"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <FaqSection faqs={contactFaqs} tone="white" />

      {/* Channel partners & careers pointers */}
      <Section tone="sand">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-4xl border border-line bg-white p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                  <Icon name="handshake" size={22} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">
                  Channel partners
                </h3>
                <p className="mt-3 flex-1 text-sm text-ink-muted">
                  We work with an empanelled network of partners across the MMR.
                  Brokerage is paid against a written schedule, on a fixed cycle, with
                  no deductions introduced after the sale.
                </p>
                <ButtonLink
                  href={`mailto:${contact.primaryEmail}?subject=Channel%20partner%20empanelment`}
                  variant="outline"
                  withArrow
                  className="mt-6 self-start"
                >
                  Write to our channel team
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={90} className="h-full">
              <div className="flex h-full flex-col rounded-4xl border border-line bg-white p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                  <Icon name="users" size={22} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">
                  Looking for a job with us?
                </h3>
                <p className="mt-3 flex-1 text-sm text-ink-muted">
                  We hire year-round across engineering, sales, operations and
                  corporate functions. Applications go to our HR team, not to the
                  sales desk.
                </p>
                <ButtonLink href="/career" variant="outline" withArrow className="mt-6 self-start">
                  See open roles
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
