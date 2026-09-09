"use client";

import Icon from "@/components/ui/Icon";
import { useEnquiry } from "@/components/providers/SiteProviders";
import { contact } from "@/data/site";

/**
 * Persistent contact bar. Full-width on phones (where it is the primary way to
 * reach us) and a compact vertical rail on desktop.
 */
export function FloatingActions() {
  const { openEnquiry } = useEnquiry();

  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    "Hi Prabhav Construction, I would like to know more about your projects."
  )}`;

  return (
    <>
      {/* Phones — sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 backdrop-blur-lg lg:hidden">
        <div className="grid grid-cols-3 divide-x divide-line">
          <a
            href={`tel:${contact.primaryPhone}`}
            className="flex flex-col items-center gap-1 py-2.5 text-2xs font-medium text-ink-soft transition active:bg-gold-50"
          >
            <Icon name="phone" size={19} className="text-gold-600" />
            Call
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-2.5 text-2xs font-medium text-ink-soft transition active:bg-gold-50"
          >
            <Icon name="whatsapp" size={19} className="text-gold-600" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() =>
              openEnquiry({ title: "Enquire Now", source: "Mobile action bar" })
            }
            className="flex flex-col items-center gap-1 bg-gold-600 py-2.5 text-2xs font-medium text-white transition active:bg-gold-700"
          >
            <Icon name="mail" size={19} />
            Enquire
          </button>
        </div>
      </div>

      {/* Desktop — vertical rail */}
      <div className="fixed right-5 bottom-8 z-40 hidden flex-col gap-2.5 lg:flex">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gold-700 shadow-lift transition hover:-translate-y-0.5 hover:bg-gold-600 hover:text-white"
        >
          <Icon name="whatsapp" size={21} />
        </a>
        <a
          href={`tel:${contact.primaryPhone}`}
          aria-label="Call us"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gold-700 shadow-lift transition hover:-translate-y-0.5 hover:bg-gold-600 hover:text-white"
        >
          <Icon name="phone" size={20} />
        </a>
      </div>

      {/* Keeps the mobile bar from covering the end of the page */}
      <div aria-hidden="true" className="h-16 lg:hidden" />
    </>
  );
}

export default FloatingActions;
