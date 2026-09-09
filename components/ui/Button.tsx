import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import Icon from "@/components/ui/Icon";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "outlineInvert"
  | "ghost"
  | "light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-600 text-white shadow-soft hover:-translate-y-px hover:bg-gold-700 hover:shadow-lift active:translate-y-0 active:scale-[0.99]",
  outline:
    "border border-line-strong bg-transparent text-ink hover:border-gold-500 hover:bg-gold-50 hover:text-gold-800",
  // For dark sections — never override `outline`'s colour via className.
  outlineInvert:
    "border border-cream/30 bg-transparent text-cream hover:border-gold-400 hover:bg-cream/8 hover:text-gold-200",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  light:
    "bg-white text-ink shadow-soft hover:-translate-y-px hover:bg-gold-50 hover:text-gold-800 hover:shadow-lift",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4.5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = ""
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

/** Trailing arrow that nudges right on hover. */
export function ButtonArrow() {
  return (
    <Icon
      name="arrow-right"
      size={18}
      className="transition-transform duration-200 group-hover:translate-x-1"
    />
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  withArrow = false,
  ...rest
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  children: ReactNode;
}) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {withArrow ? <ButtonArrow /> : null}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  withArrow = false,
  external = false,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  external?: boolean;
  children: ReactNode;
}) {
  const classes = buttonClasses(variant, size, className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        {withArrow ? <ButtonArrow /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {withArrow ? <ButtonArrow /> : null}
    </Link>
  );
}

export default Button;
