"use client";

import Modal from "@/components/ui/Modal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import type { EnquiryOptions } from "@/components/providers/SiteProviders";
import { contact } from "@/data/site";

/**
 * The popup behind every CTA on the site. Its heading is whatever the CTA
 * said, so "Download Brochure" opens a dialog headed "Download Brochure".
 */
export function EnquiryModal({
  open,
  options,
  onClose,
}: {
  open: boolean;
  options: EnquiryOptions;
  onClose: () => void;
}) {
  const title = options.title ?? "Enquire Now";
  const subtitle =
    options.subtitle ??
    (options.project
      ? `Tell us how to reach you and our team will call you back about ${options.project} within one working day.`
      : "Share your name and mobile number — our sales team will call you back within one working day.");

  return (
    <Modal open={open} onClose={onClose} title={title} subtitle={subtitle}>
      <EnquiryForm
        formTitle={title}
        defaultProject={options.project}
        source={options.source}
        showProject={!options.project}
        submitLabel={title}
        layout="stacked"
      />

      <p className="mt-5 border-t border-line pt-4 text-xs text-ink-muted">
        Prefer to talk?{" "}
        <a
          href={`tel:${contact.primaryPhone}`}
          className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800"
        >
          Call {contact.phones[0]}
        </a>
      </p>
    </Modal>
  );
}

export default EnquiryModal;
