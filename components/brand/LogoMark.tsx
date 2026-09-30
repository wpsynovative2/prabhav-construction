import { useId } from "react";

/** The five-ray fan from the Prabhav logo, redrawn as vector so each ray can animate. */
export const RAYS = [
  "M790 353 Q795 325 820 304 L907 581 Z",
  "M852 247 Q873 220 907 210 L946 570 Z",
  "M950 143 Q986 125 1023 143 L986 563 Z",
  "M1066 210 Q1100 220 1121 247 L1027 570 Z",
  "M1153 304 Q1178 325 1183 353 L1066 581 Z",
];

type Props = {
  className?: string;
  /** "gold" follows the logo gradient; "current" uses currentColor (for watermarks) */
  tone?: "gold" | "current";
  rayClassName?: string;
  title?: string;
};

export function LogoMark({ className, tone = "gold", rayClassName, title }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="782 124 408 462"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="140" x2="0" y2="585" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fbcd8c" />
          <stop offset="0.28" stopColor="#f2bd7f" />
          <stop offset="0.62" stopColor="#bf8450" />
          <stop offset="1" stopColor="#7c451f" />
        </linearGradient>
      </defs>
      {RAYS.map((d) => (
        <path key={d} d={d} className={rayClassName} fill={tone === "gold" ? `url(#g${id})` : "currentColor"} />
      ))}
    </svg>
  );
}
