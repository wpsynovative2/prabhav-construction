"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LeadModalProvider, type ProjectOption } from "@/components/forms/LeadModalProvider";
import { captureTracking } from "@/lib/tracking/utm";

export function Providers({ projects, children }: { projects: ProjectOption[]; children: React.ReactNode }) {
  useEffect(() => captureTracking(), []);
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <LeadModalProvider projects={projects}>{children}</LeadModalProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
