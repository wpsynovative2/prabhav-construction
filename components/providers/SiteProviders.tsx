"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import EnquiryModal from "@/components/forms/EnquiryModal";
import LegalModal from "@/components/legal/LegalModal";
import type { LegalDocId } from "@/data/legal";

/* ------------------------------------------------------------------ */
/* Enquiry popup                                                       */
/* ------------------------------------------------------------------ */

export interface EnquiryOptions {
  /**
   * Heading shown at the top of the popup. Every CTA passes its own label
   * through, so the popup always reads as a continuation of the button the
   * visitor clicked ("Download Brochure", "Schedule a Site Visit", …).
   */
  title?: string;
  subtitle?: string;
  /** Project name, pre-filled into the form and sent with the submission. */
  project?: string;
  /** Where the click came from — recorded in the sheet for attribution. */
  source?: string;
}

interface EnquiryContextValue {
  openEnquiry: (options?: EnquiryOptions) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry(): EnquiryContextValue {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used inside <SiteProviders>");
  }
  return context;
}

/* ------------------------------------------------------------------ */
/* Legal popups                                                        */
/* ------------------------------------------------------------------ */

interface LegalContextValue {
  openLegal: (id: LegalDocId) => void;
  closeLegal: () => void;
}

const LegalContext = createContext<LegalContextValue | null>(null);

export function useLegal(): LegalContextValue {
  const context = useContext(LegalContext);
  if (!context) {
    throw new Error("useLegal must be used inside <SiteProviders>");
  }
  return context;
}

/* ------------------------------------------------------------------ */

export function SiteProviders({ children }: { children: ReactNode }) {
  const [enquiry, setEnquiry] = useState<EnquiryOptions | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDocId | null>(null);

  const openEnquiry = useCallback((options: EnquiryOptions = {}) => {
    setEnquiry(options);
  }, []);
  const closeEnquiry = useCallback(() => setEnquiry(null), []);

  const openLegal = useCallback((id: LegalDocId) => setLegalDoc(id), []);
  const closeLegal = useCallback(() => setLegalDoc(null), []);

  const enquiryValue = useMemo(
    () => ({ openEnquiry, closeEnquiry }),
    [openEnquiry, closeEnquiry]
  );
  const legalValue = useMemo(() => ({ openLegal, closeLegal }), [openLegal, closeLegal]);

  return (
    <EnquiryContext.Provider value={enquiryValue}>
      <LegalContext.Provider value={legalValue}>
        {children}

        <EnquiryModal
          open={enquiry !== null}
          options={enquiry ?? {}}
          onClose={closeEnquiry}
        />
        <LegalModal docId={legalDoc} onClose={closeLegal} />
      </LegalContext.Provider>
    </EnquiryContext.Provider>
  );
}

export default SiteProviders;
