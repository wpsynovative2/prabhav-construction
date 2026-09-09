"use client";

import { useId, type ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { useLegal } from "@/components/providers/SiteProviders";
import { isRecaptchaConfigured } from "@/lib/config";

const fieldBase =
  // 17px keeps iOS Safari from zooming the viewport when a field takes focus.
  "w-full rounded-2xl border bg-white px-4 py-3.5 text-base text-ink transition placeholder:text-ink-subtle focus:outline-none focus:ring-4";
const fieldOk = "border-line focus:border-gold-500 focus:ring-gold-500/15";
const fieldBad = "border-red-400 focus:border-red-500 focus:ring-red-500/15";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium tracking-wide text-ink-soft"
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-gold-600" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 text-2xs font-normal text-ink-subtle">
          (optional)
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-red-600">
      <span aria-hidden="true" className="mt-0.5">
        <Icon name="close" size={13} />
      </span>
      {children}
    </p>
  );
}

export function TextField({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  prefix,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  maxLength?: number;
  /** Static prefix rendered inside the field, e.g. "+91". */
  prefix?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 border-r border-line pr-3 text-sm text-ink-muted">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldBase} ${error ? fieldBad : fieldOk} ${prefix ? "pl-18" : ""}`}
        />
      </div>
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder = "Please select",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldBase} ${error ? fieldBad : fieldOk} appearance-none pr-11 ${
            value ? "" : "text-ink-subtle"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-muted"
        />
      </div>
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
  placeholder,
  maxLength = 1000,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${fieldBase} ${error ? fieldBad : fieldOk} resize-y`}
      />
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

export function FileField({
  label,
  name,
  file,
  onChange,
  error,
  accept = ".pdf,.doc,.docx",
  hint,
}: {
  label: string;
  name: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  accept?: string;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed bg-white px-4 py-3.5 transition hover:border-gold-500 hover:bg-gold-50/50 ${
          error ? "border-red-400" : "border-line"
        }`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
          <Icon name="download" size={17} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm text-ink">
            {file ? file.name : "Choose a file"}
          </span>
          <span className="block text-xs text-ink-muted">
            {file
              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
              : (hint ?? "PDF or Word, up to 5 MB")}
          </span>
        </span>
        {file ? (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              onChange(null);
            }}
            aria-label="Remove selected file"
            className="shrink-0 rounded-full p-1.5 text-ink-muted transition hover:bg-ink/5 hover:text-ink"
          >
            <Icon name="close" size={16} />
          </button>
        ) : null}
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
      </label>
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

/** Consent checkbox whose "Privacy Policy" text opens the legal popup. */
export function ConsentCheckbox({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const { openLegal } = useLegal();

  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer rounded-sm border-line text-gold-600 accent-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
        />
        <label htmlFor={id} className="cursor-pointer text-xs text-ink-muted">
          I authorise Prabhav Construction and its representatives to contact me by
          phone, SMS, WhatsApp or e-mail about this enquiry. This overrides my DNC /
          NDNC registration. I have read the{" "}
          <button
            type="button"
            onClick={() => openLegal("privacy")}
            className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800"
          >
            Privacy Policy
          </button>
          ,{" "}
          <button
            type="button"
            onClick={() => openLegal("terms")}
            className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800"
          >
            Terms &amp; Conditions
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() => openLegal("disclaimer")}
            className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800"
          >
            Disclaimer
          </button>
          .
        </label>
      </div>
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

/** Google requires this attribution wherever the reCAPTCHA badge is hidden. */
export function RecaptchaNotice() {
  if (!isRecaptchaConfigured) return null;
  return (
    <p className="text-2xs text-ink-subtle">
      Protected by reCAPTCHA. The Google{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-ink"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-ink"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}

export function FormStatus({
  status,
  message,
}: {
  status: "idle" | "success" | "error";
  message: string;
}) {
  if (status === "idle" || !message) return null;

  const success = status === "success";
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-sm ${
        success
          ? "border-green-600/25 bg-green-50 text-green-900"
          : "border-red-500/25 bg-red-50 text-red-900"
      }`}
    >
      <span
        className={`mt-0.5 shrink-0 ${success ? "text-green-700" : "text-red-600"}`}
        aria-hidden="true"
      >
        <Icon name={success ? "check" : "close"} size={16} />
      </span>
      <span>{message}</span>
    </div>
  );
}
