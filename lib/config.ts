/**
 * Public runtime configuration.
 *
 * Both values are read at build time from `.env.local` (see `.env.example`).
 * They are safe to expose — the Apps Script URL is a public endpoint and the
 * reCAPTCHA site key is designed to live in the browser. The reCAPTCHA *secret*
 * key never appears here; it lives in Apps Script Script Properties.
 */

/** Google Apps Script Web App URL that receives every form submission. */
export const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "";

/** Google reCAPTCHA v3 site key. */
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export const isFormsConfigured = APPS_SCRIPT_URL.length > 0;
export const isRecaptchaConfigured = RECAPTCHA_SITE_KEY.length > 0;
