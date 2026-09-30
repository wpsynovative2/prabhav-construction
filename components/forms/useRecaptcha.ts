"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
let loading: Promise<void> | null = null;

/** Loads reCAPTCHA v3 on first form interaction, never on page load. */
export function loadRecaptcha() {
  if (!KEY || typeof window === "undefined") return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${KEY}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loading = null;
      reject(new Error("reCAPTCHA failed to load"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export async function getRecaptchaToken(action: string): Promise<string> {
  if (!KEY) return "recaptcha-not-configured";
  try {
    await loadRecaptcha();
    return await new Promise<string>((resolve, reject) => {
      const g = window.grecaptcha;
      if (!g) return reject(new Error("reCAPTCHA unavailable"));
      g.ready(() => g.execute(KEY, { action }).then(resolve, reject));
    });
  } catch {
    return "recaptcha-unavailable";
  }
}
