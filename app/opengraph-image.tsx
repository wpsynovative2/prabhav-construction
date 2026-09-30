import { ImageResponse } from "next/og";
import { OG_SIZE, OgCard } from "@/lib/seo/og";

export const alt = "Prabhav Construction: building trust since 2000";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    await OgCard({
      eyebrow: "Since 2000 · MahaRERA registered",
      title: "Built on trust. Crafted to last.",
      subtitle: "Homes, shops and industrial spaces along the Western line",
    }),
    size,
  );
}
