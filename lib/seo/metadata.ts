import type { Metadata } from "next";
import { siteUrl } from "@/lib/utils";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
  /** Use the title as-is, without the "| Prabhav Construction" template */
  absoluteTitle?: boolean;
};

export function buildMetadata({ title, description, path, image, noindex, keywords, absoluteTitle }: MetaInput): Metadata {
  const url = new URL(path, siteUrl()).toString();
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Prabhav Construction",
      locale: "en_IN",
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  };
}
