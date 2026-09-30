"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Intent } from "@/lib/schemas/lead.schema";
import { LeadModal } from "./LeadModal";

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
  const value = useMemo(() => ({ openLeadModal, projects }), [openLeadModal, projects]);
  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal context={state} projects={projects} onClose={close} />
    </LeadModalContext.Provider>
  );
}
