"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Intent } from "@/lib/schemas/lead.schema";
import { LeadModal } from "./LeadModal";
import { AUTO_POPUP_DELAY_MS, NO_POPUP_PATHS, hasSeenAutoPopup, markAutoPopupSeen } from "./autoPopup";

export type LeadContext = {
  source: string;
  project?: string;
  unit?: string;
  intent?: Intent;
  message?: string;
  title?: string;
};

export type ProjectOption = { name: string; units: string[] };

type Ctx = {
  openLeadModal: (ctx: LeadContext) => void;
  projects: ProjectOption[];
};

const LeadModalContext = createContext<Ctx | null>(null);


export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used inside LeadModalProvider");
  return ctx;
}

export function LeadModalProvider({ projects, children }: { projects: ProjectOption[]; children: React.ReactNode }) {
  const [state, setState] = useState<LeadContext | null>(null);
  const openLeadModal = useCallback((ctx: LeadContext) => setState(ctx), []);
  const close = useCallback(() => setState(null), []);

  // One-time auto popup ~17 s after arrival; afterwards the form only opens from buttons
  useEffect(() => {
    if (hasSeenAutoPopup()) return;
    let timer = setTimeout(function tryOpen() {
      const busy = document.querySelector("[role=dialog]") || NO_POPUP_PATHS.some((p) => window.location.pathname.startsWith(p));
      if (busy) {
        timer = setTimeout(tryOpen, 5000);
        return;
      }
      markAutoPopupSeen();
      setState((cur) => cur ?? { source: "auto-popup", title: "Let's talk about your next home" });
    }, AUTO_POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);
  const value = useMemo(() => ({ openLeadModal, projects }), [openLeadModal, projects]);
  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal context={state} projects={projects} onClose={close} />
    </LeadModalContext.Provider>
  );
}
