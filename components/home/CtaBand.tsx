import { CalendarCheck, Phone } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { BuildingArt } from "@/components/brand/BuildingArt";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  title?: string;
  subtitle?: string;
  button?: string;
  source: string;
  project?: string;
  phone?: string;
  phoneDisplay?: string;
};

/** Closing call to action used at the bottom of every page. */
export function CtaBand({
  title = "See our craftsmanship in person",
  subtitle = "Walk the site with our project engineers.",
  button = "Schedule a site tour",
  source,
  project,
  phone,
  phoneDisplay,
}: Props) {
  return (
    <section className="bg-bg py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#612f15_0%,#3a1a0b_55%,#2a1409_100%)] text-white shadow-lift">
            <LogoMark className="pointer-events-none absolute -bottom-24 -left-10 h-96 w-auto opacity-20" />
            <div className="absolute inset-y-0 right-0 hidden w-[42%] md:block">
              <BuildingArt scene="towers" seed={33} className="opacity-90 [mask-image:linear-gradient(to_right,transparent,black_35%)]" />
            </div>
            <div className="relative grid gap-6 p-8 md:max-w-[62%] md:p-14">
              <h2 className="font-display text-3xl leading-tight md:text-5xl">{title}</h2>
              <p className="text-white/75">{subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <CtaButton source={source} project={project} intent="site-visit" variant="accent" size="lg">
                  <CalendarCheck className="size-5" />
                  {button}
                </CtaButton>
                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-6 text-sm transition hover:border-[#d4af37] hover:text-[#e5c96a]"
                  >
                    <Phone className="size-4" />
                    {phoneDisplay}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
