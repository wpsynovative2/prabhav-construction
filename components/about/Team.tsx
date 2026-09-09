import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { team } from "@/data/company";

export function Team() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="The team"
          title="The people who stay with a project from soil test to handover"
          description="Six functions, all in-house. On a Prabhav site the person answering your question is usually the person who made the decision."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={(index % 3) * 90} as="li" className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-4/5 overflow-hidden">
                  <Media
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fallbackLabel={member.name}
                    className="absolute inset-0"
                    imageClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl text-ink">{member.name}</h3>
                  <p className="mt-1 text-xs font-medium tracking-wide text-gold-700 uppercase">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-ink-muted">
                    {member.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export default Team;
