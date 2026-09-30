"use client";

import { Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { LogoMark } from "@/components/brand/LogoMark";

/** Desktop sidebar card with an inline enquiry form. */
export function StickyProjectCta({ project, priceDisplay, phone, phoneDisplay }: { project: string; priceDisplay: string; phone: string; phoneDisplay: string }) {
  const { projects } = useLeadModal();
  return (
    <div className="sticky top-36 overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-lift">
      <div className="relative overflow-hidden bg-[linear-gradient(140deg,#612f15,#2a1409)] px-6 py-5 text-white">
        <LogoMark className="absolute -right-6 -bottom-8 h-28 w-auto opacity-25" />
        <p className="text-xs text-white/70">{project}</p>
        <p className="font-display text-2xl">{priceDisplay}</p>
      </div>
      <div className="p-6">
        <p className="mb-4 font-display text-xl text-fg">Get a call back</p>
        <LeadForm context={{ source: `sidebar:${project}`, project, intent: "enquiry" }} projects={projects} compact />
        <a href={`tel:${phone}`} className="mt-4 flex items-center justify-center gap-2 text-sm text-muted hover:text-primary">
          <Phone className="size-4" /> {phoneDisplay}
        </a>
      </div>
    </div>
  );
}
