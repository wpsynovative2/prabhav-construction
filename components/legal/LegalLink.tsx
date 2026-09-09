"use client";

import type { LegalDocId } from "@/data/legal";
import { useLegal } from "@/components/providers/SiteProviders";

/** A hyperlink that opens the corresponding legal document as a popup. */
export function LegalLink({
  doc,
  children,
  className = "",
}: {
  doc: LegalDocId;
  children: React.ReactNode;
  className?: string;
}) {
  const { openLegal } = useLegal();

  return (
    <button
      type="button"
      onClick={() => openLegal(doc)}
      className={`cursor-pointer transition hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${className}`}
    >
      {children}
    </button>
  );
}

export default LegalLink;
