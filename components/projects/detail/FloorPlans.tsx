"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Lock, LockOpen } from "lucide-react";
import { PlanArt } from "@/components/brand/PlanArt";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { UNLOCK_EVENT, UNLOCK_KEY } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Plan = { label: string; src?: string; alt?: string };

/** Floor plans stay blurred until the visitor submits the lead form (sessionStorage flag). */
export function FloorPlans({ plans, project, seed }: { plans: Plan[]; project: string; seed: number }) {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState(0);
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    const check = () => {
      try {
        setUnlocked(sessionStorage.getItem(UNLOCK_KEY) === "1");
      } catch {}
    };
    check();
    window.addEventListener(UNLOCK_EVENT, check);
    return () => window.removeEventListener(UNLOCK_EVENT, check);
  }, []);

  const plan = plans[tab] ?? plans[0];
  if (!plan) return null;

  return (
    <div>
      <div role="tablist" aria-label="Floor plans" className="mb-5 flex flex-wrap gap-2">
        {plans.map((pl, i) => (
          <button
            key={pl.label}
            role="tab"
            type="button"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
            className={cn(
              "min-h-10 rounded-full border px-4 text-sm transition",
              tab === i ? "border-primary bg-primary text-primary-fg" : "border-line text-fg hover:border-accent",
            )}
          >
            {pl.label}
          </button>
        ))}
      </div>
      {/* White card in both themes: plans are white-background artwork */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-line">
        <div className={cn("relative aspect-[4/3] transition-all duration-700", !unlocked && "scale-[1.02] blur-md")}>
          {plan.src ? <Image src={plan.src} alt={plan.alt ?? plan.label} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain" /> : <PlanArt label={plan.label} seed={seed + tab} />}
        </div>
        {!unlocked ? (
          <div className="absolute inset-0 grid place-items-center bg-white/30">
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-white/90 p-6 text-center text-[#2a1409] shadow-lift">
              <span className="grid size-14 place-items-center rounded-full bg-[#612f15] text-white">
                <Lock className="size-6" />
              </span>
              <p className="font-display text-xl">Floor plans are one step away</p>
              <Button onClick={() => openLeadModal({ source: "floor-plans", project, unit: plan.label, intent: "floor-plan" })}>
                <LockOpen className="size-4" />
                Unlock floor plans
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      {!plan.src ? <p className="mt-3 text-xs text-muted">Indicative layout. Detailed plans are shared on request.</p> : null}
    </div>
  );
}
