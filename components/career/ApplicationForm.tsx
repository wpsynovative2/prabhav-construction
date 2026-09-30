"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, FileUp, Loader2 } from "lucide-react";
import {
  CareerFieldsSchema,
  RESUME_MAX_BYTES,
  RESUME_TYPES,
  type CareerFields,
  type CareerFieldsInput,
} from "@/lib/schemas/lead.schema";
import { Button } from "@/components/ui/Button";
import { Honeypot, PhoneInput, RecaptchaNote, SelectInput, TextArea, TextInput } from "@/components/forms/fields";
import { loadRecaptcha } from "@/components/forms/useRecaptcha";
import { submitForm } from "@/components/forms/submit";
import { cn } from "@/lib/utils";

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = reject;
    r.readAsDataURL(file);
  });

export function ApplicationForm({ positions, defaultPosition }: { positions: string[]; defaultPosition?: string }) {
  const router = useRouter();
  // Time trap: the API drops submissions made < 3 s after the form appeared
  const [renderedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CareerFieldsInput, unknown, CareerFields>({
    resolver: zodResolver(CareerFieldsSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", mobile: "", email: "", position: defaultPosition ?? "", experience: "", currentLocation: "", message: "", consent: false },
  });

  const pickFile = (f: File | undefined) => {
    setFileError(null);
    if (!f) return setFile(null);
    if (!(RESUME_TYPES as readonly string[]).includes(f.type)) return setFileError("Upload a PDF, DOC or DOCX file");
    if (f.size > RESUME_MAX_BYTES) return setFileError("Resume must be under 3 MB");
    setFile(f);
  };

  const onSubmit = async (data: CareerFields) => {
    setServerError(null);
    if (!file) return setFileError("Please attach your resume");
    const res = await submitForm(
      "career",
      { ...data, resumeBase64: await toBase64(file), resumeName: file.name, resumeMime: file.type },
      { source: `career:${data.position}`, renderedAt, website },
    );
    if (!res.ok) return setServerError(res.error);
    router.push("/thank-you?type=career");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={() => loadRecaptcha().catch(() => {})} noValidate className="relative grid gap-4">
      <Honeypot value={website} onChange={setWebsite} />
      <TextInput label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <PhoneInput label="Mobile number" error={errors.mobile?.message} {...register("mobile")} />
        <TextInput label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      </div>
      <SelectInput label="Position" options={positions.map((p) => ({ value: p, label: p }))} error={errors.position?.message} {...register("position")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Experience (years)" error={errors.experience?.message} {...register("experience")} />
        <TextInput label="Current location" error={errors.currentLocation?.message} {...register("currentLocation")} />
      </div>

      <label
        className={cn(
          "group flex cursor-pointer items-center gap-4 rounded-[var(--radius-control)] border border-dashed p-4 transition hover:border-accent hover:bg-surface",
          fileError ? "border-red-500" : "border-line",
        )}
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition group-hover:bg-primary group-hover:text-primary-fg">
          <FileUp className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-fg">{file ? file.name : "Upload your resume"}</span>
          <span className="block text-xs text-muted">PDF, DOC or DOCX · up to 3 MB</span>
        </span>
        <input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
      </label>
      {fileError ? <p className="-mt-2 text-xs text-red-600 dark:text-red-400" aria-live="polite">{fileError}</p> : null}

      <TextArea label="Anything else?" optional error={errors.message?.message} {...register("message")} />
      <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted">
        <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]" {...register("consent")} />
        <span>I agree to be contacted by Prabhav Construction about my application by call, SMS, WhatsApp or email.</span>
      </label>
      {errors.consent ? <p className="-mt-2 text-xs text-red-600 dark:text-red-400">{errors.consent.message}</p> : null}
      {serverError ? (
        <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {serverError}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        Send my application
        {!isSubmitting ? <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" /> : null}
      </Button>
      <RecaptchaNote />
    </form>
  );
}
