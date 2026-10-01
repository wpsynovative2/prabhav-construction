"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Building2, Handshake, Loader2 } from "lucide-react";
import {
  COLLAB_TYPES,
  CollaborateFieldsSchema,
  DESIGNATIONS,
  RedevelopmentFieldsSchema,
  type CollaborateFields,
  type CollaborateFieldsInput,
  type RedevelopmentFields,
  type RedevelopmentFieldsInput,
} from "@/lib/schemas/lead.schema";
import { Button } from "@/components/ui/Button";
import { ConsentCheckbox, Honeypot, PhoneInput, RecaptchaNote, SelectInput, TextArea, TextInput } from "@/components/forms/fields";
import { loadRecaptcha } from "@/components/forms/useRecaptcha";
import { submitForm } from "@/components/forms/submit";
import { cn } from "@/lib/utils";

type Tab = "collaborate" | "redevelopment";

const TABS = [
  { id: "collaborate" as const, icon: Handshake, title: "Collaborate with us", text: "Land owners, contractors, vendors and consultants" },
  { id: "redevelopment" as const, icon: Building2, title: "Opportunities with us", text: "Housing societies planning redevelopment" },
];

/** Two forms behind large tab cards; #redevelopment in the URL opens the second one. */
export function CollaborateForms() {
  const [tab, setTab] = useState<Tab>("collaborate");

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#redevelopment") setTab("redevelopment");
      if (window.location.hash === "#collaborate") setTab("collaborate");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div id="forms" className="scroll-mt-24">
      <div role="tablist" aria-label="Choose a form" className="grid gap-4 sm:grid-cols-2">
        {TABS.map(({ id, icon: I, title, text }) => (
          <button
            key={id}
            role="tab"
            type="button"
            id={`tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            onClick={() => {
              setTab(id);
              history.replaceState(null, "", `#${id}`);
            }}
            className={cn(
              "group flex items-center gap-4 rounded-[var(--radius-card)] border p-5 text-left transition-all duration-300",
              tab === id ? "border-accent bg-primary text-primary-fg shadow-lift" : "border-line bg-surface-raised text-fg hover:border-accent/60",
            )}
          >
            <span className={cn("grid size-12 shrink-0 place-items-center rounded-full", tab === id ? "bg-white/15" : "bg-surface text-accent-text ring-1 ring-line")}>
              <I className="size-6" />
            </span>
            <span>
              <span className="block font-display text-xl">{title}</span>
              <span className={cn("block text-sm", tab === id ? "opacity-80" : "text-muted")}>{text}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-line bg-surface-raised p-6 shadow-lift md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tab === "collaborate" ? <CollaborateForm /> : <RedevelopmentForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ServerError({ error }: { error: string | null }) {
  return error ? (
    <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
      {error}
    </p>
  ) : null;
}

function Submit({ busy, children }: { busy: boolean; children: React.ReactNode }) {
  return (
    <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">
      {busy ? <Loader2 className="size-4 animate-spin" /> : null}
      {children}
      {!busy ? <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" /> : null}
    </Button>
  );
}

function CollaborateForm() {
  const router = useRouter();
  const [renderedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CollaborateFieldsInput, unknown, CollaborateFields>({
    resolver: zodResolver(CollaborateFieldsSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", organisation: "", mobile: "", email: "", city: "", message: "", consent: true },
  });

  const onSubmit = async (data: CollaborateFields) => {
    setServerError(null);
    const res = await submitForm("collaborate", data, { source: "collaborate-page", renderedAt, website });
    if (!res.ok) return setServerError(res.error);
    router.push("/thank-you?type=collaborate");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={() => loadRecaptcha().catch(() => {})} noValidate className="relative grid gap-4">
      <Honeypot value={website} onChange={setWebsite} />
      <h2 className="font-display text-3xl text-fg">Let&apos;s build together</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
        <TextInput label="Company / organisation" optional autoComplete="organization" error={errors.organisation?.message} {...register("organisation")} />
        <PhoneInput label="Mobile number" error={errors.mobile?.message} {...register("mobile")} />
        <TextInput label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <SelectInput label="I'd like to collaborate as" options={COLLAB_TYPES.map((t) => ({ value: t, label: t }))} error={errors.collaborationType?.message} {...register("collaborationType")} />
        <TextInput label="City" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
      </div>
      <TextArea label="Regards" optional error={errors.message?.message} {...register("message")} />
      <ConsentCheckbox error={errors.consent?.message} {...register("consent", { onChange: () => trigger("consent") })} />
      <ServerError error={serverError} />
      <Submit busy={isSubmitting}>Send collaboration request</Submit>
      <RecaptchaNote />
    </form>
  );
}

function RedevelopmentForm() {
  const router = useRouter();
  const [renderedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RedevelopmentFieldsInput, unknown, RedevelopmentFields>({
    resolver: zodResolver(RedevelopmentFieldsSchema),
    mode: "onTouched",
    defaultValues: { societyName: "", fullName: "", mobile: "", email: "", location: "", flats: "", plotArea: "", buildingAge: "", message: "", consent: true },
  });

  const onSubmit = async (data: RedevelopmentFields) => {
    setServerError(null);
    const res = await submitForm("redevelopment", data, { source: "redevelopment-page", renderedAt, website });
    if (!res.ok) return setServerError(res.error);
    router.push("/thank-you?type=redevelopment");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={() => loadRecaptcha().catch(() => {})} noValidate className="relative grid gap-4">
      <Honeypot value={website} onChange={setWebsite} />
      <h2 className="font-display text-3xl text-fg">Redevelop your society with Prabhav</h2>
      <TextInput label="Society name" error={errors.societyName?.message} {...register("societyName")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Your name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
        <SelectInput label="Your role in the society" options={DESIGNATIONS.map((d) => ({ value: d, label: d }))} error={errors.designation?.message} {...register("designation")} />
        <PhoneInput label="Mobile number" error={errors.mobile?.message} {...register("mobile")} />
        <TextInput label="Email" type="email" optional autoComplete="email" error={errors.email?.message} {...register("email")} />
      </div>
      <TextInput label="Society area / address" error={errors.location?.message} {...register("location")} />
      <div className="grid gap-4 sm:grid-cols-3">
        <TextInput label="No. of flats" optional inputMode="numeric" {...register("flats")} />
        <TextInput label="Plot area (sq ft)" optional {...register("plotArea")} />
        <TextInput label="Building age (yrs)" optional inputMode="numeric" {...register("buildingAge")} />
      </div>
      <TextArea label="Regards" optional error={errors.message?.message} {...register("message")} />
      <ConsentCheckbox error={errors.consent?.message} {...register("consent", { onChange: () => trigger("consent") })} />
      <ServerError error={serverError} />
      <Submit busy={isSubmitting}>Request a redevelopment consultation</Submit>
      <RecaptchaNote />
    </form>
  );
}
