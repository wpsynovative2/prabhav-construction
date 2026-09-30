"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ThemedLogo } from "@/components/theme/ThemedLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { NavProjectsDropdown } from "./NavProjectsDropdown";
import { MobileNav } from "./MobileNav";
import type { NavCategory, NavItem, NavStation } from "./types";

type Props = { nav: NavItem[]; stations: NavStation[]; categories: NavCategory[]; phone: string; phoneDisplay: string };

export function Header({ nav, stations, categories, phone, phoneDisplay }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-line bg-surface-raised/85 shadow-soft backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg">
        Skip to content
      </a>
      <div className={cn("mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 transition-all duration-500 md:px-8", scrolled ? "h-[68px]" : "h-[84px]")}>
        <Link href="/" aria-label="Prabhav Construction home" className="shrink-0">
          <ThemedLogo preload className={cn("transition-all duration-500", scrolled ? "h-11" : "h-14")} />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {nav.map((item) =>
            item.dropdown ? (
              <NavProjectsDropdown key={item.href} label={item.label} stations={stations} categories={categories} active={isActive(item.href)} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "group relative inline-flex min-h-11 items-center px-3 text-[0.95rem] transition-colors hover:text-primary",
                  isActive(item.href) ? "text-primary" : "text-fg",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 bottom-1.5 h-px origin-left bg-accent transition-transform duration-300 group-hover:scale-x-100",
                    isActive(item.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle className="max-lg:hidden" />
          <Button className="max-sm:hidden" onClick={() => openLeadModal({ source: `header:${pathname}` })}>
            Enquire now
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
          <MobileNav nav={nav} stations={stations} categories={categories} phone={phone} phoneDisplay={phoneDisplay} />
        </div>
      </div>
    </header>
  );
}
