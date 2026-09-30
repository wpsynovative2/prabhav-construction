"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ThemedLogo } from "@/components/theme/ThemedLogo";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/LogoMark";
import { cn } from "@/lib/utils";
import type { NavCategory, NavItem, NavStation } from "./types";

type Props = { nav: NavItem[]; stations: NavStation[]; categories: NavCategory[]; phone: string; phoneDisplay: string };

export function MobileNav({ nav, stations, categories, phone, phoneDisplay }: Props) {
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const pathname = usePathname();
  const { openLeadModal } = useLeadModal();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-full border border-line text-fg"
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-brown-900/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
            <motion.nav
              aria-label="Mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-surface-raised shadow-lift"
            >
              <LogoMark className="pointer-events-none absolute -right-20 bottom-10 h-80 w-auto opacity-[0.06]" />
              <div className="flex items-center justify-between border-b border-line p-5">
                <ThemedLogo className="h-11" />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="grid size-11 place-items-center rounded-full border border-line text-fg"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              <ul className="flex-1 p-5">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={projectsOpen}
                          onClick={() => setProjectsOpen((o) => !o)}
                          className="flex min-h-14 w-full items-center justify-between font-display text-2xl text-fg"
                        >
                          {item.label}
                          <ChevronDown className={cn("size-5 text-accent-text transition-transform", projectsOpen && "rotate-180")} />
                        </button>
                        {projectsOpen ? (
                          <div className="grid gap-1 pb-4">
                            <Link href="/projects" className="py-2 text-primary">
                              All projects
                            </Link>
                            {stations.map((s) => (
                              <Link key={s.slug} href={`/projects/station/${s.slug}`} className="flex justify-between py-2 text-muted">
                                Near {s.name} <span>{s.count}</span>
                              </Link>
                            ))}
                            {categories.map((c) => (
                              <Link key={c.slug} href={`/projects/type/${c.slug}`} className="flex justify-between py-2 text-muted">
                                {c.label} <span>{c.count}</span>
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={cn("flex min-h-14 items-center font-display text-2xl", pathname === item.href ? "text-primary" : "text-fg")}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="grid gap-3 border-t border-line p-5">
                <Button
                  size="lg"
                  onClick={() => {
                    setOpen(false);
                    openLeadModal({ source: `mobile-nav:${pathname}` });
                  }}
                >
                  Enquire now
                </Button>
                <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 py-2 text-sm text-muted">
                  <Phone className="size-4" /> {phoneDisplay}
                </a>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
