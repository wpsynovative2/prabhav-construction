import { ImageResponse } from "next/og";
import { OG_SIZE, OgCard } from "@/lib/seo/og";

export const alt = "Prabhav Construction: building trust since 2000";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    await OgCard({
      eyebrow: "Prabhav Construction Co. Pvt. Ltd. · Since 2000",
      title: "Built on trust. Crafted to last.",
      subtitle: "Homes and offices across Mumbai, Igatpuri & Nashik",
    }),
    size,
  );
}
