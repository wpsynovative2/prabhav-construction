"use client";

import { getTracking } from "@/lib/tracking/utm";
import { pushEvent } from "@/lib/tracking/datalayer";
import { getRecaptchaToken } from "./useRecaptcha";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitForm(
  formType: "lead" | "career",
  payload: Record<string, unknown>,
  meta: { source: string; renderedAt: number; website: string; intent?: string },
): Promise<SubmitResult> {
  const recaptchaToken = await getRecaptchaToken(`${formType}_submit`);
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, ...meta, formType, recaptchaToken, tracking: getTracking() }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.ok === false) return { ok: false, error: body.error ?? "Something went wrong. Please try again." };
    pushEvent(formType === "career" ? "job_application" : "generate_lead", {
      form_type: formType,
      project: payload.project ?? payload.position ?? "",
      intent: meta.intent ?? "",
      lead_source: meta.source,
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
