import { BuildingArt } from "@/components/brand/BuildingArt";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative -mt-[84px] bg-surface pt-[84px]">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="gold-text font-display text-8xl md:text-9xl">404</p>
          <h1 className="mt-4 font-display text-4xl text-fg md:text-5xl">This floor isn&apos;t built yet</h1>
          <p className="mt-3 text-lg text-muted">The page you&apos;re looking for has moved or never existed.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects">Explore projects</ButtonLink>
            <ButtonLink href="/contact-us" variant="outline">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line shadow-lift">
          <BuildingArt scene="towers" seed={404} />
        </div>
      </Container>
    </section>
  );
}
