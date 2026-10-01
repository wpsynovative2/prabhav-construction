"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { X } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { LeadForm } from "./LeadForm";
import type { LeadContext, ProjectOption } from "./LeadModalProvider";

const TITLES: Record<string, string> = {
  "site-visit": "Book a site visit",
  brochure: "Download the brochure",
  "cost-sheet": "Get the cost sheet",
  "floor-plan": "Unlock floor plans",
  enquiry: "Enquire now",
};

type Props = { context: LeadContext | null; projects: ProjectOption[]; onClose: () => void };

export function LeadModal({ context, projects, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = context !== null;

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("input:not([tabindex='-1'])")?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([tabindex='-1']), select, textarea",
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
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
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocus.current?.focus();
    };
  }, [open, onClose]);

  const title = context?.title ?? TITLES[context?.intent ?? "enquiry"];

  return (
    <AnimatePresence>
      {open && context ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-brown-900/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative grid max-h-[92dvh] w-full max-w-3xl overflow-hidden rounded-t-3xl bg-surface-raised shadow-lift sm:rounded-3xl md:grid-cols-[0.85fr_1.15fr]"
          >
            {/* Brand panel */}
            <div className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#7a3c1b,#3a1a0b)] p-8 text-white md:block">
              <LogoMark className="absolute -right-16 -bottom-10 h-72 w-auto opacity-20" />
              <div className="relative grid h-full place-items-center">
                <Image src="/logo/logo-dark.png" alt="Prabhav Construction" width={995} height={637} className="h-auto w-48" />
              </div>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 id="lead-modal-title" className="font-display text-2xl text-fg md:text-3xl">
                    {title}
                  </h2>
                  {context.project ? <p className="mt-1 text-sm text-accent-text">{context.project}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-fg transition hover:rotate-90 hover:border-accent"
                >
                  <X className="size-5" />
                </button>
              </div>
              <LeadForm context={context} projects={projects} onDone={onClose} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
