import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** "auto" swaps with the theme; "light-on-dark" always uses the white logo (e.g. brown footer) */
  variant?: "auto" | "light-on-dark";
  preload?: boolean;
};

/** Swaps light/dark logo with CSS, so the right one is in the first paint. */
export function ThemedLogo({ className, variant = "auto", preload }: Props) {
  if (variant === "light-on-dark") {
    return (
      <Image src="/logo/logo-dark.png" alt="Prabhav Construction" width={995} height={637} className={cn("w-auto", className)} />
    );
  }
  return (
    <>
      <Image
        src="/logo/logo-light.png"
        alt="Prabhav Construction"
        width={1188}
        height={760}
        preload={preload}
        className={cn("block w-auto dark:hidden", className)}
      />
      <Image
        src="/logo/logo-dark.png"
        alt=""
        aria-hidden
        width={995}
        height={637}
        className={cn("hidden w-auto dark:block", className)}
      />
    </>
  );
}
