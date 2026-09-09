import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { Container, Section } from "@/components/ui/Section";
import { contact } from "@/data/site";

/** Full-bleed call-to-action band. Reused on most pages. */
export function CtaSection({
  eyebrow = "Ready when you are",
  title = "Come and see a Prabhav site for yourself",
  description = "Drawings only tell you so much. Walk a floor, look at the finishes, meet the engineer running the build — then decide.",
  ctaLabel = "Book a Site Visit",
  ctaSubtitle = "Tell us when suits you and our team will confirm a slot within one working day.",
  project,
  image = "/images/BG-img1.jpg",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaSubtitle?: string;
  project?: string;
  image?: string;
}) {
  return (
    <Section tone="none" className="bg-cream">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink">
          <div className="absolute inset-0">
            <Media
              src={image}
              alt=""
              fallbackLabel="Prabhav"
              className="absolute inset-0"
              imageClassName="object-cover opacity-30"
              sizes="100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/40"
            />
          </div>

          <div className="relative px-7 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/5 px-4 py-1.5 text-2xs font-semibold tracking-[0.2em] text-gold-200 uppercase">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-300" />
                {eyebrow}
              </span>

              <h2 className="mt-6 font-display text-display-md text-balance text-cream">
                {title}
              </h2>

              <p className="mt-5 max-w-xl text-base text-pretty text-cream/80">
                {description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <CtaButton
                  label={ctaLabel}
                  subtitle={ctaSubtitle}
                  project={project}
                  source="CTA band"
                  variant="primary"
                  size="lg"
                />

                <a
                  href={`tel:${contact.primaryPhone}`}
                  className="group inline-flex items-center gap-3 text-cream transition hover:text-gold-300"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition group-hover:border-gold-400">
                    <Icon name="phone" size={18} />
                  </span>
                  <span className="text-left">
                    <span className="block text-2xs tracking-wide text-cream/65 uppercase">
                      Or call us
                    </span>
                    <span className="block font-medium">{contact.phones[0]}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default CtaSection;
