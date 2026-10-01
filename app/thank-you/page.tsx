import type { Metadata } from "next";
import { CalendarCheck, Home, PhoneCall, Search } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { seo, site } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ ...seo.pages.thankYou, path: "/thank-you", noindex: true });

export default async function ThankYouPage({ searchParams }: PageProps<"/thank-you">) {
  const sp = await searchParams;
  const career = sp.type === "career";
  const partner = sp.type === "collaborate" || sp.type === "redevelopment";
  const steps = partner
    ? [
        { icon: Search, text: "Our team reviews your details" },
        { icon: PhoneCall, text: "We call within two working days" },
        { icon: CalendarCheck, text: "Meet to discuss next steps" },
      ]
    : career
    ? [
        { icon: Search, text: "Our HR team reviews your profile" },
        { icon: PhoneCall, text: "Shortlisted? We call within a week" },
        { icon: CalendarCheck, text: "Meet the team" },
      ]
    : [
        { icon: PhoneCall, text: "We call you within one working day" },
        { icon: CalendarCheck, text: "Pick a time for your site visit" },
        { icon: Home, text: "Walk through your future home" },
      ];

  return (
    <section className="relative -mt-(--header-h) grid min-h-[85dvh] place-items-center overflow-hidden bg-surface pt-(--header-h)">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <Container className="relative py-16 text-center">
        <div className="logo-loader mx-auto flex w-fit flex-col items-center">
          <LogoMark className="h-24 w-auto" rayClassName="ray" />
        </div>
        <h1 className="page-enter mt-8 font-display text-4xl text-fg md:text-6xl">
          {career ? "Application received" : partner ? "Thank you for reaching out" : "Thank you"}
        </h1>
        <p className="page-enter mx-auto mt-4 max-w-md text-lg text-muted [animation-delay:120ms]">
          {career
            ? "Thanks for wanting to build with us."
            : sp.type === "redevelopment"
              ? "Your society's details are with our redevelopment team."
              : partner
                ? "Your collaboration request is with our team."
                : "Your details are with our team."}
        </p>
        <ol className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {steps.map(({ icon: I, text }, i) => (
            <li key={text} className="page-enter rounded-2xl border border-line bg-surface-raised p-5 shadow-soft" style={{ animationDelay: `${200 + i * 120}ms` }}>
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary text-primary-fg">
                <I className="size-5" />
              </span>
              <p className="mt-3 text-sm text-fg">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={career ? "/career" : "/projects"}>{career ? "More openings" : "Explore projects"}</ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-muted">
          In a hurry? Call <a className="text-link underline" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
        </p>
      </Container>
    </section>
  );
}
