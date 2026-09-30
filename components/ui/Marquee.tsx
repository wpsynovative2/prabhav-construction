import { LogoMark } from "@/components/brand/LogoMark";

/** Endless ribbon of trust points. Duplicated once so the loop is seamless. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 px-6 font-display text-lg whitespace-nowrap text-fg md:text-xl">
          {t}
          <LogoMark className="h-4 w-auto" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-surface py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
