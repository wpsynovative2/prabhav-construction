import { ImageResponse } from "next/og";
import { getAllProjects, getProjectBySlug } from "@/lib/data/projects";
import { OG_SIZE, OgCard } from "@/lib/seo/og";
import { formatPrice } from "@/lib/utils";

export const alt = "Prabhav Construction project";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProjectBySlug((await params).slug);
  const from = p && !p.price.onRequest && p.price.min ? `From ${formatPrice(p.price.min)}` : "Price on request";
  return new ImageResponse(
    await OgCard({
      eyebrow: p ? `${p.location.locality} · ${p.units.map((u) => u.label).join(" · ")}` : "Prabhav Construction",
      title: p?.name ?? "Prabhav Construction",
      subtitle: from,
    }),
    size,
  );
}
