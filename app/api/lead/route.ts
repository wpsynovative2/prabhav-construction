import { NextResponse, type NextRequest } from "next/server";
import { SubmissionSchema } from "@/lib/schemas/lead.schema";
import { verifyRecaptcha } from "@/lib/lead/verifyRecaptcha";
import { rateLimit } from "@/lib/lead/rateLimit";
import { forwardToSheet } from "@/lib/lead/forwardToSheet";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Try again in a few minutes." }, { status: 429 });
  }

  const parsed = SubmissionSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const lead = parsed.data;

  // Honeypot or submitted too fast: pretend success, drop the lead
  if (lead.website || Date.now() - lead.renderedAt < 3000) return NextResponse.json({ ok: true });

  const captcha = await verifyRecaptcha(lead.recaptchaToken, `${lead.formType}_submit`);
  if (captcha.score < 0.3) return NextResponse.json({ ok: true });

  const quality = captcha.skipped ? "unverified" : captcha.score >= 0.5 ? "ok" : "review";
  const common = {
    timestamp: new Date().toISOString(),
    fullName: lead.fullName,
    mobile: lead.mobile,
    email: lead.email ?? "",
    message: lead.message ?? "",
    source: lead.source,
    recaptchaScore: captcha.score,
    quality,
    ...lead.tracking,
  };

  let saved: boolean;
  switch (lead.formType) {
    case "career":
      saved = await forwardToSheet("Careers", {
        ...common,
        position: lead.position,
        experience: lead.experience,
        currentLocation: lead.currentLocation,
        resumeBase64: lead.resumeBase64,
        resumeName: lead.resumeName,
        resumeMime: lead.resumeMime,
      });
      break;
    case "collaborate":
      saved = await forwardToSheet("Collaborations", {
        ...common,
        organisation: lead.organisation ?? "",
        collaborationType: lead.collaborationType,
        city: lead.city,
      });
      break;
    case "redevelopment":
      saved = await forwardToSheet("Redevelopment", {
        ...common,
        societyName: lead.societyName,
        designation: lead.designation,
        location: lead.location,
        flats: lead.flats ?? "",
        plotArea: lead.plotArea ?? "",
        buildingAge: lead.buildingAge ?? "",
      });
      break;
    default:
      saved = await forwardToSheet("Leads", {
        ...common,
        project: lead.project ?? "",
        unit: lead.unit ?? "",
        intent: lead.intent ?? "",
      });
  }

  if (!saved) {
    return NextResponse.json(
      { ok: false, error: "We couldn't save your details. Please call us instead." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
