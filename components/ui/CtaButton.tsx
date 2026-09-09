"use client";

import type { ReactNode } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useEnquiry } from "@/components/providers/SiteProviders";
import { preloadRecaptcha } from "@/lib/recaptcha";

/**
 * The site-wide call to action. Clicking any of these opens the enquiry popup,
 * with the popup heading taken from the button's own label unless a more
 * specific `title` is supplied.
 */
export function CtaButton({
  label,
  title,
  subtitle,
  project,
  source,
  variant = "primary",
  size = "md",
  withArrow = true,
  className = "",
  children,
}: {
  /** Button text. Doubles as the popup heading when `title` is omitted. */
  label: string;
  title?: string;
  subtitle?: string;
  project?: string;
  source?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const { openEnquiry } = useEnquiry();

  return (
    <Button
      variant={variant}
      size={size}
      withArrow={withArrow}
      className={className}
      // Warm the captcha script the moment a visitor shows intent.
      onMouseEnter={preloadRecaptcha}
      onFocus={preloadRecaptcha}
      onClick={() =>
        openEnquiry({
          title: title ?? label,
          subtitle,
          project,
          source: source ?? label,
        })
      }
    >
      {children ?? label}
    </Button>
  );
}

export default CtaButton;
