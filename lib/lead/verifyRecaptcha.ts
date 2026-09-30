import "server-only";
import { siteUrl } from "@/lib/utils";

export type CaptchaResult = { score: number; skipped?: boolean };

export async function verifyRecaptcha(token: string, expectedAction: string): Promise<CaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    // Keys not configured yet: accept, but mark the row for review
    console.warn("[lead] RECAPTCHA_SECRET_KEY missing; skipping verification");
    return { score: 0.5, skipped: true };
  }
  try {
    const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    }).then((x) => x.json());
    const hostOk = [new URL(siteUrl()).hostname, "localhost"].includes(r.hostname);
    if (!r.success || r.action !== expectedAction || !hostOk) return { score: 0 };
    return { score: Number(r.score ?? 0) };
  } catch {
    return { score: 0.5, skipped: true };
  }
}
