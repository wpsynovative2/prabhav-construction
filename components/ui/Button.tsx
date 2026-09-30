import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "light";
export type ButtonSize = "md" | "lg" | "sm";

const base =
  "group/btn relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg shadow-soft hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5",
  accent: "gold-fill text-brown-900 shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  outline: "border border-accent/70 text-fg hover:border-accent hover:bg-accent/10",
  ghost: "text-fg hover:bg-surface",
  light: "bg-white text-brown shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 text-sm",
  md: "px-6 text-[0.95rem]",
  lg: "px-8 py-3.5 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Light sweep that crosses the button on hover */
export const Sheen = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover/btn:left-[120%] group-hover/btn:opacity-100"
  />
);

type LinkProps = React.ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize };

export function ButtonLink({ variant, size, className, children, ...props }: LinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      <Sheen />
      {children}
    </Link>
  );
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, children, type = "button", ...props }: BtnProps) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...props}>
      <Sheen />
      {children}
    </button>
  );
}
