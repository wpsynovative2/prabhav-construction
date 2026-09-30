"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { LeadFieldsSchema, type LeadFields, type LeadFieldsInput } from "@/lib/schemas/lead.schema";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Honeypot, PhoneInput, RecaptchaNote, SelectInput, TextArea, TextInput } from "./fields";
import { loadRecaptcha } from "./useRecaptcha";
import { submitForm } from "./submit";
import type { LeadContext, ProjectOption } from "./LeadModalProvider";

export const UNLOCK_KEY = "pc-floorplans-unlocked";
export const UNLOCK_EVENT = "pc:unlock-floorplans";

const CTA_LABEL: Record<string, string> = {
  "site-visit": "Book my site visit",
  brochure: "Get the brochure",
  "cost-sheet": "Get the cost sheet",
  "floor-plan": "Unlock floor plans",
  enquiry: "Request a call back",
};

type Props = {
  context: LeadContext;
  projects: ProjectOption[];
  compact?: boolean;
  onDone?: () => void;
  className?: string;
};

export function LeadForm({ context, projects, compact, onDone, className }: Props) {
  const router = useRouter();
  // Time trap: the API drops submissions made < 3 s after the form appeared
  const [renderedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LeadFieldsInput, unknown, LeadFields>({
    resolver: zodResolver(LeadFieldsSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      project: context.project ?? "",
      unit: context.unit ?? "",
      message: context.message ?? "",
      consent: false,
    },
  });

  const selected = useWatch({ control, name: "project" });
  const units = projects.find((p) => p.name === selected)?.units ?? [];

  const onSubmit = async (data: LeadFields) => {
    setServerError(null);
    const res = await submitForm("lead", data, {
      source: context.source,
      intent: context.intent ?? "enquiry",
      renderedAt,
      website,
    });
    if (!res.ok) return setServerError(res.error);
    if (context.intent === "floor-plan") {
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {}
      window.dispatchEvent(new Event(UNLOCK_EVENT));
      onDone?.();
      return;
    }
    onDone?.();
    router.push(`/thank-you?type=lead${context.intent ? `&intent=${context.intent}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={() => loadRecaptcha().catch(() => {})}
      noValidate
      className={cn("relative grid gap-4", className)}
    >
      <Honeypot value={website} onChange={setWebsite} />
      <TextInput label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
      <PhoneInput label="Mobile number" error={errors.mobile?.message} {...register("mobile")} />
      <TextInput label="Email" type="email" autoComplete="email" optional error={errors.email?.message} {...register("email")} />
      {!compact || !context.project ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectInput
            label="Interested in"
            optional
            options={projects.map((p) => ({ value: p.name, label: p.name }))}
            {...register("project")}
          />
          <SelectInput
            label="Configuration"
            optional
            options={(units.length ? units : context.unit ? [context.unit] : []).map((u) => ({ value: u, label: u }))}
            {...register("unit")}
          />
        </div>
      ) : null}
      {!compact ? <TextArea label="Message" optional error={errors.message?.message} {...register("message")} /> : null}

      <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted">
        <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]" {...register("consent")} />
        <span>
          I agree to be contacted by Prabhav Construction by call, SMS or WhatsApp, even if my number is on DND.
        </span>
      </label>
      {errors.consent ? (
        <p className="-mt-2 text-xs text-red-600 dark:text-red-400" aria-live="polite">
          {errors.consent.message}
        </p>
      ) : null}

      {serverError ? (
        <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {CTA_LABEL[context.intent ?? "enquiry"]}
        {!isSubmitting ? <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" /> : null}
      </Button>
      <RecaptchaNote />
    </form>
  );
}
