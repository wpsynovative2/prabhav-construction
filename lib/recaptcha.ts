/**
 * Google reCAPTCHA v3 — invisible, score-based.
 *
 * The script is injected on first use rather than in the document head, so a
 * visitor who never touches a form never downloads it. The token produced here
 * is verified server-side inside Google Apps Script, using the secret key.
 */

import { RECAPTCHA_SITE_KEY, isRecaptchaConfigured } from "@/lib/config";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null; // allow a retry on the next submit
      reject(new Error("Failed to load reCAPTCHA"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/** Warms the script up on first form interaction so submitting feels instant. */
export function preloadRecaptcha(): void {
  if (!isRecaptchaConfigured) return;
  void loadScript().catch(() => {
    /* non-fatal — getRecaptchaToken() will report it at submit time */
  });
}

/**
 * Returns a fresh reCAPTCHA token for the given action, or an empty string when
 * reCAPTCHA is not configured. Never throws — a captcha failure must not stop a
 * genuine visitor from reaching us, so the Apps Script decides what to do with
 * a missing or low-scoring token.
 */
export async function getRecaptchaToken(action: string): Promise<string> {
  if (!isRecaptchaConfigured) return "";

  try {
    await loadScript();
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return "";

    await new Promise<void>((resolve) => grecaptcha.ready(resolve));
    return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
  } catch {
    return "";
  }
}
