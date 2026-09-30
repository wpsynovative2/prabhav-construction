"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "peer w-full rounded-[var(--radius-control)] border border-line bg-bg px-4 pt-5 pb-2 text-fg outline-none transition-colors placeholder:text-transparent focus:border-accent focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-red-500";

type FieldProps = { label: string; error?: string; className?: string; optional?: boolean };

/** Floating-label wrapper; the label lifts when the input has focus or a value. */
export function Field({
  label,
  error,
  className,
  optional,
  children,
  id,
  labelClassName,
}: FieldProps & { id: string; children: React.ReactNode; labelClassName?: string }) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <label
        htmlFor={id}
        className={cn("pointer-events-none absolute top-1.5 left-4 text-xs text-muted transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[0.95rem] peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent-text", labelClassName)}
      >
        {label}
        {optional ? <span className="opacity-60"> (optional)</span> : null}
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & FieldProps;

export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
  { label, error, className, optional, ...props },
  ref,
) {
  const id = useId();
  return (
    <Field id={id} label={label} error={error} className={className} optional={optional}>
      <input
        ref={ref}
        id={id}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
        {...props}
      />
    </Field>
  );
});

/** Fixed +91 prefix, numeric keyboard */
export const PhoneInput = forwardRef<HTMLInputElement, InputProps>(function PhoneInput(
  { label, error, className, ...props },
  ref,
) {
  const id = useId();
  return (
    <Field id={id} label={label} error={error} className={className} labelClassName="left-14">
      <input
        ref={ref}
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        maxLength={16}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, "pl-14")}
        {...props}
      />
      <span className="pointer-events-none absolute top-[1.15rem] left-4 border-r border-line pr-2 text-sm font-medium text-muted">
        +91
      </span>
    </Field>
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & FieldProps & { options: { value: string; label: string }[] };

export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(function SelectInput(
  { label, error, className, optional, options, ...props },
  ref,
) {
  const id = useId();
  return (
    <div className={cn("relative", className)}>
      <select
        ref={ref}
        id={id}
        className={cn(inputClass, "appearance-none pr-10")}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <label htmlFor={id} className="pointer-events-none absolute top-1.5 left-4 text-xs text-muted">
        {label}
        {optional ? <span className="opacity-60"> (optional)</span> : null}
      </label>
      <svg className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
});

type AreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps;

export const TextArea = forwardRef<HTMLTextAreaElement, AreaProps>(function TextArea(
  { label, error, className, optional, ...props },
  ref,
) {
  const id = useId();
  return (
    <Field id={id} label={label} error={error} className={className} optional={optional}>
      <textarea
        ref={ref}
        id={id}
        rows={3}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        className={cn(inputClass, "resize-none")}
        {...props}
      />
    </Field>
  );
});

/** Off-screen field bots fill in and people never see */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function RecaptchaNote() {
  return (
    <p className="text-[0.7rem] leading-relaxed text-muted">
      This site is protected by reCAPTCHA and the Google{" "}
      <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
        Privacy Policy
      </a>{" "}
      and{" "}
      <a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
