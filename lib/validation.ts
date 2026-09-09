/**
 * Form validation shared by the enquiry, contact and career forms.
 *
 * Mandatory fields site-wide: full name and mobile number. Everything else is
 * validated only when the visitor has actually filled it in.
 */

/** Strips spaces, dashes, brackets and a leading +91 / 0 from an Indian number. */
export function normalizeIndianMobile(raw: string): string {
  const digitsOnly = raw.replace(/[^\d]/g, "");
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    return digitsOnly.slice(2);
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    return digitsOnly.slice(1);
  }
  if (digitsOnly.length === 13 && digitsOnly.startsWith("091")) {
    return digitsOnly.slice(3);
  }
  return digitsOnly;
}

/** Indian mobile numbers are 10 digits and start with 6, 7, 8 or 9. */
export function isValidIndianMobile(raw: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizeIndianMobile(raw));
}

export function isValidEmail(raw: string): boolean {
  const value = raw.trim();
  // Deliberately permissive — rejects obvious typos, not unusual-but-legal addresses.
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value) && value.length <= 254;
}

export function isValidName(raw: string): boolean {
  const value = raw.trim();
  // Letters, spaces, apostrophes, dots and hyphens — covers Indian naming forms.
  return value.length >= 2 && value.length <= 60 && /^[A-Za-z\s.'-]+$/.test(value);
}

export type FieldErrors = Record<string, string>;

export interface BaseEnquiryValues {
  name: string;
  mobile: string;
  email: string;
  message: string;
  consent: boolean;
}

/** Validates the fields common to every form on the site. */
export function validateBase(values: {
  name: string;
  mobile: string;
  email?: string;
  consent?: boolean;
  requireConsent?: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your full name.";
  } else if (!isValidName(values.name)) {
    errors.name = "Please enter a valid name (letters only, 2–60 characters).";
  }

  if (!values.mobile.trim()) {
    errors.mobile = "Please enter your mobile number.";
  } else if (!isValidIndianMobile(values.mobile)) {
    errors.mobile =
      "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.";
  }

  // Optional — but if something was typed, it has to be a real address.
  if (values.email && values.email.trim() && !isValidEmail(values.email)) {
    errors.email = "Please enter a valid e-mail address.";
  }

  if (values.requireConsent && !values.consent) {
    errors.consent = "Please accept the privacy policy to continue.";
  }

  return errors;
}

export const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function validateCv(file: File | null): string | undefined {
  if (!file) return undefined; // CV is optional
  if (file.size > MAX_CV_BYTES) {
    return "Your CV must be 5 MB or smaller.";
  }
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (
    !ALLOWED_CV_TYPES.includes(file.type) &&
    !["pdf", "doc", "docx"].includes(extension)
  ) {
    return "Please upload a PDF or Word document.";
  }
  return undefined;
}

/** Formats a 10-digit number as "+91 98200 00000" for display. */
export function formatMobileForDisplay(raw: string): string {
  const digits = normalizeIndianMobile(raw);
  if (digits.length !== 10) return raw;
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}
