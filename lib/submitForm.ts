/**
 * Transport for every form on the site.
 *
 * The site is a static export, so there is no API route to post to. Submissions
 * go straight from the browser to a Google Apps Script Web App, which writes a
 * row to a Google Sheet and sends the notification e-mails.
 *
 * CORS note: Apps Script Web Apps do not answer CORS preflight requests. We
 * therefore send `text/plain`, which is a "simple request" and needs no
 * preflight — Apps Script reads the raw body with `e.postData.contents`.
 * If the response still cannot be read (some corporate proxies, older Safari),
 * we retry once in `no-cors` mode: the row is still written, we just cannot see
 * the reply, so we optimistically report success.
 */

import { APPS_SCRIPT_URL, isFormsConfigured } from "@/lib/config";
import { getRecaptchaToken } from "@/lib/recaptcha";
import { normalizeIndianMobile } from "@/lib/validation";

export type FormType = "enquiry" | "contact" | "career";

export interface SubmissionPayload {
  formType: FormType;
  /** Heading of the form the visitor used, e.g. "Download Brochure". */
  formTitle: string;
  name: string;
  mobile: string;
  email?: string;
  message?: string;
  /** Project the enquiry relates to, when it came from a project page. */
  project?: string;
  /** Career applications only. */
  role?: string;
  experience?: string;
  cv?: { filename: string; mimeType: string; data: string };
  /** Free-form extras that end up in their own sheet columns. */
  extra?: Record<string, string>;
}

export interface SubmissionResult {
  ok: boolean;
  message: string;
}

/** Reads a File as a base64 string (without the data: URL prefix). */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

export async function submitForm(
  payload: SubmissionPayload
): Promise<SubmissionResult> {
  if (!isFormsConfigured) {
    return {
      ok: false,
      message:
        "The enquiry service is not configured yet. Please call us on the number listed in the footer.",
    };
  }

  const recaptchaToken = await getRecaptchaToken(payload.formType);

  const body = JSON.stringify({
    ...payload,
    mobile: normalizeIndianMobile(payload.mobile),
    recaptchaToken,
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    submittedAt: new Date().toISOString(),
  });

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      // Simple request — avoids the CORS preflight Apps Script cannot answer.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      redirect: "follow",
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = (await response.json()) as { ok?: boolean; message?: string };
    if (result.ok === false) {
      return {
        ok: false,
        message:
          result.message ??
          "We could not record your enquiry. Please try again or call us directly.",
      };
    }

    return { ok: true, message: result.message ?? successMessage(payload.formType) };
  } catch {
    // Fallback: fire-and-forget. The request still reaches Apps Script; we just
    // cannot read the response, so we cannot distinguish success from failure.
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
      });
      return { ok: true, message: successMessage(payload.formType) };
    } catch {
      return {
        ok: false,
        message:
          "We could not reach our servers. Please check your connection and try again, or call us directly.",
      };
    }
  }
}

function successMessage(formType: FormType): string {
  if (formType === "career") {
    return "Thank you — your application has reached our HR team. If your profile matches an open role, we will be in touch within seven working days.";
  }
  return "Thank you — your enquiry has reached our sales team. We will call you back within one working day.";
}
