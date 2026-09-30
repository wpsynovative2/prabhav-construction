"use client";

import { useLeadModal, type LeadContext } from "@/components/forms/LeadModalProvider";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

type Props = LeadContext & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/** Button that opens the global lead modal with context attached. */
export function CtaButton({ children, variant, size, className, ...ctx }: Props) {
  const { openLeadModal } = useLeadModal();
  return (
    <Button variant={variant} size={size} className={className} onClick={() => openLeadModal(ctx)}>
      {children}
    </Button>
  );
}
