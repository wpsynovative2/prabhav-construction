import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Status } from "@/lib/schemas/project.schema";

export type StatusCard = {
  status: Status;
  title: string;
  text: string;
  cta: string;
  count: number;
  /** Covers of projects at this stage; the first one is the card background */
  covers: string[];
};

const FALLBACK = "/images/sunset-towers.jpg";

/** Three doorways into the portfolio: upcoming, ongoing, completed. */
export function ProjectStatusCards({ cards }: { cards: StatusCard[] }) {
  return (
    <RevealGroup className="grid gap-5 md:grid-cols-3" stagger={0.1}>
      {cards.map((c, i) => (
        <RevealItem key={c.status}>
          <Link
            href={`/projects?status=${c.status}`}
            className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[2rem] text-white shadow-soft ring-1 ring-line transition-shadow duration-500 hover:shadow-lift md:aspect-[3/4]"
          >
            <Image
              src={c.covers[0] ?? FALLBACK}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,12,4,0.35)_0%,rgba(28,12,4,0.05)_35%,rgba(28,12,4,0.88)_100%)]" />

            <div className="relative flex items-start justify-between p-6">
              <span className="font-display text-lg text-white/80">{String(i + 1).padStart(2, "0")}</span>
              {c.count > 0 ? (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md ring-1 ring-white/25">
                  {c.count} {c.count === 1 ? "project" : "projects"}
                </span>
              ) : null}
            </div>

            <div className="relative p-6 pt-0">
              {c.covers.length > 1 ? (
                <div className="mb-4 flex -space-x-3">
                  {c.covers.slice(1, 4).map((src) => (
                    <span key={src} className="relative size-10 overflow-hidden rounded-full ring-2 ring-white/80">
                      <Image src={src} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                  ))}
                </div>
              ) : null}
              <h3 className="font-display text-3xl leading-tight">{c.title}</h3>
              <p className="mt-2 max-w-[28ch] text-sm text-white/75">{c.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#3a1a0b] transition-colors duration-300 group-hover:bg-[#e5c96a]">
                {c.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
