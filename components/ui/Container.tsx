import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  // On desktop the fixed 88px rail overlays the page, so pad (both sides, to stay centred) until the content clears it.
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 md:px-8 lg:px-[max(2rem,calc(88px+1.5rem-max(0px,(100vw-1240px)/2)))]", className)}>
      {children}
    </div>
  );
}
