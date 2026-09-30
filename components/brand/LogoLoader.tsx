import Image from "next/image";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

/**
 * Logo animation: the five rays rise from their base one after another, the wordmark
 * surfaces from a soft blur, a light sheen sweeps across, and a gold line fills beneath.
 * Pure CSS, so it also works in the server-rendered loading.tsx.
 */
export function LogoLoader({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <div role="status" aria-live="polite" className={cn("logo-loader flex flex-col items-center", className)}>
      <div className="relative">
        <span className="halo absolute left-1/2 top-[38%] -z-10 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />
        <LogoMark className="h-24 w-auto sm:h-28" rayClassName="ray" />
      </div>
      <div className="word relative mt-5 overflow-hidden">
        <Image
          src="/logo/wordmark-light.png"
          alt=""
          width={1188}
          height={256}
          className="block h-9 w-auto sm:h-11 dark:hidden"
          preload
        />
        <Image
          src="/logo/wordmark-dark.png"
          alt=""
          width={995}
          height={215}
          className="hidden h-9 w-auto sm:h-11 dark:block"
        />
        <span className="sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-overlay dark:via-white/30" />
      </div>
      <div className="mt-6 h-px w-40 overflow-hidden bg-line">
        <div className="bar gold-fill h-full w-full" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
