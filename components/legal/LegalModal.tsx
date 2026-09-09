"use client";

import Modal from "@/components/ui/Modal";
import { legalDocs, type LegalDocId } from "@/data/legal";

export function LegalModal({
  docId,
  onClose,
}: {
  docId: LegalDocId | null;
  onClose: () => void;
}) {
  const doc = docId ? legalDocs[docId] : null;

  return (
    <Modal
      open={doc !== null}
      onClose={onClose}
      size="lg"
      title={doc?.title ?? ""}
      subtitle={doc?.updated}
    >
      {doc ? (
        <div className="space-y-7">
          <p className="text-base text-ink-soft">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h3 className="font-display text-lg text-ink">{section.heading}</h3>

              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm text-ink-muted">
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className="space-y-2 pt-1">
                  {section.bullets.map((bullet, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}
    </Modal>
  );
}

export default LegalModal;
