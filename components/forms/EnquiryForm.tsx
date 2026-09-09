"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  ConsentCheckbox,
  FormStatus,
  RecaptchaNotice,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/Fields";
import { projects } from "@/data/projects";
import { submitForm, type FormType } from "@/lib/submitForm";
import { preloadRecaptcha } from "@/lib/recaptcha";
import { validateBase, type FieldErrors } from "@/lib/validation";

const interests = [
  "Buying a home",
  "Commercial / office space",
  "Site visit request",
  "Brochure & price list",
  "Channel partnership",
  "NRI enquiry",
  "Something else",
] as const;

const projectOptions = [...projects.map((project) => project.name), "Not sure yet"];

export function EnquiryForm({
  formTitle,
  formType = "enquiry",
  defaultProject,
  source,
  showInterest = true,
  showProject = true,
  submitLabel = "Submit Enquiry",
  onSuccess,
  layout = "stacked",
}: {
  /** Recorded against the submission so you can see which CTA produced it. */
  formTitle: string;
  formType?: FormType;
  defaultProject?: string;
  source?: string;
  showInterest?: boolean;
  showProject?: boolean;
  submitLabel?: string;
  onSuccess?: () => void;
  layout?: "stacked" | "two-column";
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState(defaultProject ?? "");
  const [interest, setInterest] = useState("");
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
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    const result = await submitForm({
      formType,
      formTitle,
      name: name.trim(),
      mobile,
      email: email.trim(),
      message: message.trim(),
      project: project || defaultProject || "",
      extra: {
        interest,
        source: source ?? formTitle,
        consent: consent ? "Yes" : "No",
      },
    });

    setSubmitting(false);
    setStatus(result.ok ? "success" : "error");
    setStatusMessage(result.message);

    if (result.ok) {
      setName("");
      setMobile("");
      setEmail("");
      setMessage("");
      setInterest("");
      if (!defaultProject) setProject("");
      onSuccess?.();
    }
  }

  // A successful submission replaces the form with the confirmation, so the
  // visitor is not tempted to send the same enquiry twice.
  if (status === "success") {
    return (
      <div className="py-2">
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
          Send another enquiry
        </Button>
      </div>
    );
  }

  const gridClass =
    layout === "two-column" ? "grid gap-4 sm:grid-cols-2" : "grid gap-4";

  return (
    <form onSubmit={handleSubmit} noValidate onFocus={preloadRecaptcha}>
      <div className={gridClass}>
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
          label="Mobile number"
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

        {showProject ? (
          <SelectField
            label="Project of interest"
            name="project"
            value={project}
            onChange={setProject}
            options={projectOptions}
            placeholder="Select a project"
          />
        ) : null}

        {showInterest ? (
          <SelectField
            label="I am enquiring about"
            name="interest"
            value={interest}
            onChange={setInterest}
            options={interests}
            placeholder="Select an option"
          />
        ) : null}

        <div className={layout === "two-column" ? "sm:col-span-2" : ""}>
          <TextAreaField
            label="Message"
            name="message"
            value={message}
            onChange={setMessage}
            rows={3}
            placeholder="Anything you would like us to know before we call?"
          />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} />

        <FormStatus status={status} message={statusMessage} />

        <Button type="submit" size="lg" className="w-full" disabled={submitting} withArrow={!submitting}>
          {submitting ? "Sending…" : submitLabel}
        </Button>

        <RecaptchaNotice />
      </div>
    </form>
  );
}

export default EnquiryForm;
