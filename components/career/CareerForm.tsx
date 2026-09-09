"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  ConsentCheckbox,
  FileField,
  FormStatus,
  RecaptchaNotice,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/Fields";
import { allRoleTitles, experienceOptions } from "@/data/careers";
import { fileToBase64, submitForm } from "@/lib/submitForm";
import { preloadRecaptcha } from "@/lib/recaptcha";
import { validateBase, validateCv, type FieldErrors } from "@/lib/validation";

export function CareerForm({
  role,
  onRoleChange,
}: {
  /** Controlled by the career page so "Apply for this role" can pre-select it. */
  role: string;
  onRoleChange: (role: string) => void;
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validateBase({
      name,
      mobile,
      email,
      consent,
      requireConsent: true,
    });

    const cvError = validateCv(cv);
    if (cvError) nextErrors.cv = cvError;

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    let cvPayload;
    if (cv) {
      try {
        cvPayload = {
          filename: cv.name,
          mimeType: cv.type || "application/octet-stream",
          data: await fileToBase64(cv),
        };
      } catch {
        setSubmitting(false);
        setStatus("error");
        setStatusMessage(
          "We could not read the selected file. Please try a different file, or submit without a CV and e-mail it to us."
        );
        return;
      }
    }

    const result = await submitForm({
      formType: "career",
      formTitle: "Career Application",
      name: name.trim(),
      mobile,
      email: email.trim(),
      message: message.trim(),
      role: role || "Other / General application",
      experience,
      cv: cvPayload,
      extra: { source: "Career page", consent: consent ? "Yes" : "No" },
    });

    setSubmitting(false);
    setStatus(result.ok ? "success" : "error");
    setStatusMessage(result.message);

    if (result.ok) {
      setName("");
      setMobile("");
      setEmail("");
      onRoleChange("");
      setExperience("");
      setCv(null);
      setMessage("");
    }
  }

  if (status === "success") {
    return (
      <div>
        <FormStatus status="success" message={statusMessage} />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={() => {
            setStatus("idle");
            setStatusMessage("");
          }}
        >
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate onFocus={preloadRecaptcha}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="name"
          value={name}
          onChange={setName}
          error={errors.name}
          required
          placeholder="e.g. Ananya Sharma"
          autoComplete="name"
          maxLength={60}
        />

        <TextField
          label="Contact number"
          name="mobile"
          value={mobile}
          onChange={setMobile}
          error={errors.mobile}
          required
          type="tel"
          inputMode="tel"
          prefix="+91"
          placeholder="98200 00000"
          autoComplete="tel"
          maxLength={15}
        />

        <TextField
          label="E-mail address"
          name="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          autoComplete="email"
        />

        <SelectField
          label="Job role"
          name="role"
          value={role}
          onChange={onRoleChange}
          options={allRoleTitles}
          placeholder="Select a role"
        />

        <SelectField
          label="Years of experience"
          name="experience"
          value={experience}
          onChange={setExperience}
          options={experienceOptions}
          placeholder="Select your experience"
        />

        <FileField
          label="Upload your CV"
          name="cv"
          file={cv}
          onChange={(file) => {
            setCv(file);
            setErrors((previous) => ({ ...previous, cv: "" }));
          }}
          error={errors.cv}
          hint="PDF or Word, up to 5 MB"
        />

        <div className="sm:col-span-2">
          <TextAreaField
            label="Message"
            name="message"
            value={message}
            onChange={setMessage}
            rows={4}
            placeholder="Tell us briefly why this role interests you, and when you could start."
          />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} />

        <FormStatus status={status} message={statusMessage} />

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={submitting}
          withArrow={!submitting}
        >
          {submitting ? "Sending…" : "Submit Application"}
        </Button>

        <RecaptchaNotice />
      </div>
    </form>
  );
}

export default CareerForm;
