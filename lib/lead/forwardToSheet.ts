import "server-only";

type SheetName = "Leads" | "Careers" | "Collaborations" | "Redevelopment";

export async function forwardToSheet(sheet: SheetName, data: Record<string, unknown>) {
  const url = process.env.GSCRIPT_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[lead] GSCRIPT_WEBHOOK_URL not set; ${sheet} row (dev only):`, { ...data, resumeBase64: undefined });
      return true;
    }
    console.error("[lead] GSCRIPT_WEBHOOK_URL not set in production");
    return false;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({ secret: process.env.GSCRIPT_SHARED_SECRET, sheet, data }),
    });
    if (!res.ok) return false;
    const body = await res.json().catch(() => ({ ok: true }));
    return body.ok !== false;
  } catch (err) {
    console.error("[lead] forwarding failed", err);
    return false;
  }
}
