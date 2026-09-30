"use client";

import { LeadForm } from "./LeadForm";
import { useLeadModal } from "./LeadModalProvider";

/** Page-embedded lead form that reuses the project list from the global provider. */
export function InlineLeadForm({ source }: { source: string }) {
  const { projects } = useLeadModal();
  return <LeadForm context={{ source, intent: "enquiry" }} projects={projects} />;
}
