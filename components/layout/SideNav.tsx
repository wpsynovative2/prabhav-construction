"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ThemedLogo } from "@/components/theme/ThemedLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

// Theme switching is paused (site is light-only); flip to bring the toggle back.
const SHOW_THEME_TOGGLE = false;
import { LogoMark } from "@/components/brand/LogoMark";
import { SocialIcon } from "@/components/ui/Icon";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; href: string; dropdown?: boolean };
type Props = {
  nav: NavItem[];
  statusCounts: { upcoming: number; ongoing: number; completed: number };
  social: Record<string, string>;
};

/**
 * Left-rail navigation: a slim fixed bar (menu, logo, socials) that opens a full-height
 * panel with the site map. On small screens a top bar opens the same panel.
 */
export function SideNav({ nav, statusCounts, social }: Props) {
  const [open, setOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const pathname = usePathname();
  const { openLeadModal } = useLeadModal();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Close on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a,button")?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>("a[href],button");
      const first = f[0];
      const last = f[f.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const development = [
    { label: "Upcoming", href: "/projects?status=upcoming", count: statusCounts.upcoming },
    { label: "Ongoing", href: "/projects?status=ongoing", count: statusCounts.ongoing },
    { label: "Completed", href: "/projects?status=completed", count: statusCounts.completed },
  ];

  const burger = (
    <span className="relative block h-3.5 w-6" aria-hidden>
      <span className={cn("absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
      <span className={cn("absolute top-1.5 left-0 h-0.5 rounded bg-current transition-all duration-300", open ? "w-0 opacity-0" : "w-4")} />
      <span className={cn("absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
    </span>
  );

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-24 focus:z-[90] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg">
        Skip to content
      </a>

      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-[70] hidden w-[88px] flex-col items-center justify-between border-r border-line bg-surface-raised/90 py-6 backdrop-blur-xl lg:flex">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="group flex flex-col items-center gap-2 text-fg transition-colors hover:text-primary"
        >
          <span className="grid size-12 place-items-center rounded-full border border-line transition group-hover:border-accent">{burger}</span>
          <span className="text-[0.65rem] font-medium tracking-[0.2em] text-muted">{open ? "CLOSE" : "MENU"}</span>
        </button>

        <Link href="/" aria-label="Prabhav Construction home" className="px-2">
          <ThemedLogo className="h-auto w-[68px]" />
        </Link>

        <div className="flex flex-col items-center gap-3">
          {SHOW_THEME_TOGGLE && (
            <>
              <ThemeToggle />
              <span className="h-8 w-px bg-line" />
            </>
          )}
          {Object.entries(social).map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className="grid size-9 place-items-center rounded-full text-muted transition hover:bg-surface hover:text-primary">
              <SocialIcon name={name} className="size-4" />
            </a>
          ))}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-[70] flex h-(--header-h) items-center justify-between border-b border-line bg-surface-raised/90 px-5 backdrop-blur-xl lg:hidden">
        <Link href="/" aria-label="Prabhav Construction home">
          <ThemedLogo preload className="h-11" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-full border border-line text-fg"
        >
          {burger}
        </button>
      </header>

      {/* Right-edge enquiry tab (desktop) */}
      <button
        type="button"
        onClick={() => openLeadModal({ source: `side-tab:${pathname}` })}
        className="fixed top-1/2 right-0 z-[65] hidden -translate-y-1/2 rounded-l-xl bg-primary px-2.5 py-5 text-sm font-medium tracking-wide text-primary-fg shadow-lift transition hover:pr-4 lg:block [writing-mode:vertical-rl]"
      >
        Enquire now
      </button>

      {/* Slide-out menu panel */}
      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[68]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-brown-900/55 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
            <motion.div
              id="site-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              data-theme="dark"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 280 }}
              className="photo-dark no-scrollbar absolute inset-y-0 left-0 flex w-full max-w-[560px] overflow-x-hidden overflow-y-auto pt-(--header-h) text-fg lg:left-[88px] lg:pt-0"
            >
              <LogoMark className="pointer-events-none absolute -right-24 -bottom-24 h-[460px] w-auto opacity-10" />
              <div className="relative grid w-full content-start gap-10 p-7 md:p-12">
                <nav aria-label="Main">
                  <ul className="grid gap-2">
                    {nav.map((item, i) => (
                      <motion.li key={item.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05 }}>
                        {item.dropdown ? (
                          <div>
                            <button
                              type="button"
                              aria-expanded={portfolioOpen}
                              onClick={() => setPortfolioOpen((o) => !o)}
                              className={cn("group flex w-full items-center justify-between py-2 text-left font-display text-2xl md:text-3xl", isActive(item.href) || pathname.startsWith("/our-constructions") ? "text-primary" : "text-fg hover:text-primary")}
                            >
                              {item.label}
                              <ChevronDown className={cn("size-5 text-muted transition-transform duration-300", portfolioOpen && "rotate-180")} />
                            </button>
                            <AnimatePresence initial={false}>
                              {portfolioOpen ? (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                  <div className="grid gap-4 border-l border-accent/40 py-3 pl-5 sm:grid-cols-2">
                                    <div>
                                      <Link href="/projects" className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase hover:underline">
                                        Development
                                      </Link>
                                      <ul className="mt-2 grid gap-1">
                                        {development.map((d) => (
                                          <li key={d.label}>
                                            <Link href={d.href} className="group flex items-center justify-between gap-3 rounded-lg py-1 text-base text-fg/85 transition hover:text-primary">
                                              {d.label}
                                              <span className="rounded-full bg-white/10 px-2 text-xs text-muted">{d.count}</span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <Link href="/our-constructions" className="text-xs font-semibold tracking-[0.2em] text-accent-text uppercase hover:underline">
                                        Construction
                                      </Link>
                                      <ul className="mt-2 grid gap-1">
                                        <li>
                                          <Link href="/our-constructions" className="block py-1 text-base text-fg/85 transition hover:text-primary">
                                            Our constructions
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className={cn("group inline-flex items-center gap-3 py-2 font-display text-2xl transition-colors md:text-3xl", isActive(item.href) ? "text-primary" : "text-fg hover:text-primary")}
                          >
                            {item.label}
                            <ArrowUpRight className="size-5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:hidden">
                  <div className="flex items-center gap-3 lg:hidden">
                    {SHOW_THEME_TOGGLE && <ThemeToggle />}
                    {Object.entries(social).map(([name, href]) => (
                      <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className="grid size-10 place-items-center rounded-full border border-white/15 text-muted hover:text-primary">
                        <SocialIcon name={name} className="size-4" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
