import "server-only";

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const MAX_KEYS = 5000;
const hits = new Map<string, number[]>();

/** 5 submissions per IP per 10 minutes. In-memory: swap for Upstash Redis on multi-instance serverless. */
export function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.delete(ip);
  hits.set(ip, recent);
  if (hits.size > MAX_KEYS) hits.delete(hits.keys().next().value!);
  return true;
}
