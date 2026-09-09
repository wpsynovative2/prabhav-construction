"use client";

import Icon from "@/components/ui/Icon";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { contact } from "@/data/site";
import type { Project } from "@/data/projects";

/** Sticky side panel on the project page — the main conversion point. */
export function ProjectEnquiryPanel({ project }: { project: Project }) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-4xl border border-line bg-white shadow-lift">
        <div className="border-b border-line bg-cream px-6 py-6">
          <h2 className="font-display text-2xl leading-snug text-ink">
            Enquire about {project.name}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Leave your name and mobile number. We will send the floor plans and price
            list, and call you back within one working day.
          </p>
        </div>

        <div className="px-6 py-6">
          <EnquiryForm
            formTitle={`Enquiry — ${project.name}`}
            defaultProject={project.name}
            source={`Project page — ${project.name}`}
            showProject={false}
            submitLabel="Send Enquiry"
          />
        </div>

        <div className="border-t border-line bg-cream px-6 py-5">
          <a
            href={`tel:${contact.primaryPhone}`}
            className="group flex items-center gap-3 text-ink transition hover:text-gold-700"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-700 transition group-hover:bg-gold-600 group-hover:text-white">
              <Icon name="phone" size={18} />
            </span>
            <span>
              <span className="block text-2xs tracking-wide text-ink-muted uppercase">
                Site enquiries
              </span>
              <span className="block font-medium">{contact.phones[0]}</span>
            </span>
          </a>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 px-2 text-xs text-ink-muted">
        <span className="mt-0.5 shrink-0 text-gold-600">
          <Icon name="shield" size={14} />
        </span>
        MahaRERA {project.reraNumber} · Verify at maharera.maharashtra.gov.in
      </p>
    </aside>
  );
}

export default ProjectEnquiryPanel;
