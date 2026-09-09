"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import CtaButton from "@/components/ui/CtaButton";
import { contact, navigation, site } from "@/data/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <>
      {/* Utility strip — hidden once the visitor starts scrolling */}
      <div
        className={`hidden overflow-hidden bg-ink text-cream/85 transition-all duration-300 lg:block ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-12 py-2.5 text-xs">
          <p className="flex items-center gap-2 tracking-wide">
            <Icon name="sparkles" size={14} className="text-gold-400" />
            {site.tagline} — MahaRERA registered projects across the MMR
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${contact.primaryPhone}`}
              className="flex items-center gap-2 transition hover:text-gold-300"
            >
              <Icon name="phone" size={14} />
              {contact.phones[0]}
            </a>
            <a
              href={`mailto:${contact.primaryEmail}`}
              className="flex items-center gap-2 transition hover:text-gold-300"
            >
              <Icon name="mail" size={14} />
              {contact.primaryEmail}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line/80 bg-cream/90 shadow-soft backdrop-blur-xl"
            : "border-b border-transparent bg-cream"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="flex shrink-0 items-center py-4"
          >
            <Image
              src={site.logo.light}
              alt={site.name}
              width={900}
              height={575}
              priority
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-10 sm:h-11" : "h-12 sm:h-14"
              }`}
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-gold-800" : "text-ink-soft hover:text-gold-700"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500 transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${contact.primaryPhone}`}
              aria-label="Call us"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700 lg:hidden"
            >
              <Icon name="phone" size={18} />
            </a>

            <div className="hidden lg:block">
              <CtaButton
                label="Enquire Now"
                subtitle="Share your name and mobile number — our sales team will call you back within one working day."
                source="Header"
                size="sm"
              />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-gold-400 hover:bg-gold-50 lg:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 lg:hidden"
      >
        <div
          className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <nav
          aria-label="Mobile"
          className="animate-fade-up absolute inset-x-0 top-0 max-h-full overflow-y-auto rounded-b-4xl bg-cream px-5 pt-24 pb-8 shadow-lift"
        >
          <ul className="space-y-1">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition ${
                      active
                        ? "bg-gold-50 text-gold-800"
                        : "text-ink hover:bg-white"
                    }`}
                  >
                    {item.label}
                    <Icon name="arrow-right" size={18} className="text-gold-500" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 space-y-3 border-t border-line pt-6">
            <CtaButton
              label="Enquire Now"
              source="Mobile menu"
              size="lg"
              className="w-full"
            />
            <a
              href={`tel:${contact.primaryPhone}`}
              className="flex items-center justify-center gap-2 rounded-full border border-line py-3.5 text-sm font-medium text-ink transition hover:border-gold-400 hover:bg-gold-50"
            >
              <Icon name="phone" size={17} />
              {contact.phones[0]}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
