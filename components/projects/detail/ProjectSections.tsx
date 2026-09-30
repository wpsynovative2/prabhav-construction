import Image from "next/image";
import {
  ArrowUpDown, Building, CalendarCheck, ExternalLink, Factory, GraduationCap, HeartPulse, Layers, LayoutGrid,
  Maximize, Ruler, ShieldCheck, ShoppingBag, TrainFront, Weight, Zap,
} from "lucide-react";
import type { Project } from "@/lib/schemas/project.schema";
import type { Amenity } from "@/lib/schemas/content.schema";
import { Icon } from "@/components/ui/Icon";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { formatMonth, formatPrice } from "@/lib/utils";
import { MapEmbed } from "./MapEmbed";

export function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-36 border-b border-line py-12 last:border-0 md:py-16">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2 mb-8 font-display text-3xl text-fg md:text-4xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

export function Overview({ project: p }: { project: Project }) {
  const facts = [
    p.landParcelAcres && { icon: Maximize, label: "Land parcel", value: `${p.landParcelAcres} acres` },
    p.towers && { icon: Building, label: "Towers", value: String(p.towers) },
    p.floors && { icon: Layers, label: "Floors", value: p.floors },
    { icon: LayoutGrid, label: "Configurations", value: p.units.map((u) => u.label).join(" · ") },
    p.possession && {
      icon: CalendarCheck,
      label: "Possession",
      value: p.status === "completed" ? "Ready to move" : formatMonth(p.possession),
    },
    p.frontageFt && { icon: Ruler, label: "Frontage", value: `${p.frontageFt} ft` },
    p.ceilingHeightFt && { icon: ArrowUpDown, label: "Clear height", value: `${p.ceilingHeightFt} ft` },
    p.powerLoadKva && { icon: Zap, label: "Power load", value: `Up to ${p.powerLoadKva} kVA` },
    p.floorLoadKgSqm && { icon: Weight, label: "Floor load", value: `${p.floorLoadKgSqm.toLocaleString("en-IN")} kg/m²` },
    { icon: ShieldCheck, label: "RERA", value: p.rera.length ? "Registered" : "Applied" },
  ].filter(Boolean) as { icon: typeof Building; label: string; value: string }[];

  return (
    <Block id="overview" eyebrow="Overview" title={p.tagline}>
      <p className="max-w-2xl text-lg text-muted">{p.description}</p>
      {p.highlights.length ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {p.highlights.map((h) => (
            <li key={h} className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-fg">
              {h}
            </li>
          ))}
        </ul>
      ) : null}
      <RevealGroup className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {facts.map(({ icon: I, label, value }) => (
          <RevealItem key={label}>
            <div className="group h-full rounded-2xl border border-line bg-surface-raised p-5 transition-all duration-500 hover:border-accent/60 hover:shadow-soft">
              <I className="size-6 text-accent-text transition-transform duration-500 group-hover:scale-110" />
              <p className="mt-4 text-xs text-muted">{label}</p>
              <p className="font-display text-lg leading-snug text-fg">{value}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Block>
  );
}

export function ConfigurationTable({ project: p }: { project: Project }) {
  return (
    <Block id="configurations" eyebrow="Configurations" title="Pick your space">
      <div className="grid gap-3">
        {p.units.map((u) => (
          <Reveal key={u.label}>
            <div className="group grid items-center gap-4 rounded-2xl border border-line bg-surface-raised p-5 transition-all duration-500 hover:border-accent/60 hover:shadow-soft sm:grid-cols-[1.2fr_1fr_1fr_auto]">
              <p className="font-display text-2xl text-fg">{u.label}</p>
              <div>
                <p className="text-xs text-muted">Carpet area</p>
                <p className="font-medium text-fg">
                  {u.carpetAreaSqft ? `${u.carpetAreaSqft[0].toLocaleString("en-IN")} – ${u.carpetAreaSqft[1].toLocaleString("en-IN")} sq ft` : "On request"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Starting from</p>
                <p className="font-display text-xl text-accent-text">{u.priceFrom ? formatPrice(u.priceFrom) : "On request"}</p>
              </div>
              <CtaButton source={`config:${p.slug}`} project={p.name} unit={u.label} intent="cost-sheet" variant="outline" size="sm">
                Get cost sheet
              </CtaButton>
            </div>
          </Reveal>
        ))}
      </div>
    </Block>
  );
}

export function AmenitiesGrid({ amenities }: { amenities: Amenity[] }) {
  return (
    <Block id="amenities" eyebrow="Amenities" title="Everything, on site">
      <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" stagger={0.04}>
        {amenities.map((a) => (
          <RevealItem key={a.id}>
            <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-line bg-surface-raised p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-soft">
              <span className="grid size-14 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line transition-all duration-500 group-hover:bg-primary group-hover:text-primary-fg">
                <Icon name={a.icon} className="size-6" />
              </span>
              <span className="text-sm text-fg">{a.label}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Block>
  );
}

export function Gallery({ project: p }: { project: Project }) {
  if (!p.images.gallery.length) return null;
  return (
    <Block id="gallery" eyebrow="Gallery" title="A closer look">
      <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5">
        {p.images.gallery.map((g) => (
          <a key={g.src} href={g.src} target="_blank" rel="noreferrer" className="relative aspect-[4/3] w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[45%]">
            <Image src={g.src} alt={g.alt} fill sizes="(min-width: 640px) 45vw, 80vw" className="object-cover transition-transform duration-700 hover:scale-105" />
          </a>
        ))}
      </div>
    </Block>
  );
}

const CONN_ICON = { transport: TrainFront, education: GraduationCap, health: HeartPulse, shopping: ShoppingBag, work: Factory } as const;

export function LocationConnectivity({ project: p }: { project: Project }) {
  const maxKm = Math.max(...p.connectivity.map((c) => toKm(c.distance)), 1);
  return (
    <Block id="location" eyebrow="Location" title="Well connected">
      <div className="grid gap-6 lg:grid-cols-2">
        <MapEmbed src={p.location.mapEmbedUrl ?? `https://www.google.com/maps?q=${p.location.lat},${p.location.lng}&z=15&output=embed`} title={`Map showing ${p.name}`} />
        <div>
          <p className="mb-5 text-sm text-muted">
            {p.location.address}, {p.location.locality}, {p.location.city} {p.location.pincode}
          </p>
          <ul className="grid gap-4">
            {p.connectivity.map((c) => {
              const I = CONN_ICON[c.type];
              return (
                <li key={c.place} className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-accent-text ring-1 ring-line">
                    <I className="size-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-fg">{c.place}</span>
                      <span className="font-medium text-accent-text">{c.distance}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                      <div className="gold-fill h-full rounded-full" style={{ width: `${Math.max(8, (toKm(c.distance) / maxKm) * 100)}%` }} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${p.location.lat},${p.location.lng}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-link underline-offset-4 hover:underline"
          >
            Get directions <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </Block>
  );
}

const toKm = (d: string) => {
  const n = Number.parseFloat(d);
  return /km/i.test(d) ? n : n / 1000;
};

export function ConstructionUpdates({ project: p }: { project: Project }) {
  if (p.status !== "ongoing" || !p.constructionUpdates.length) return null;
  return (
    <Block id="progress" eyebrow="Construction" title="Progress on site">
      <ol className="relative grid gap-6 border-l-2 border-dashed border-line pl-8">
        {p.constructionUpdates.map((u, i) => (
          <li key={u.date + u.title} className="relative">
            <Reveal delay={i * 0.08}>
              <span className="absolute top-1 -left-[43px] grid size-6 place-items-center rounded-full bg-bg ring-2 ring-accent">
                <span className={`size-2.5 rounded-full ${i === 0 ? "animate-pulse bg-accent" : "bg-muted"}`} />
              </span>
              <p className="text-xs text-accent-text">{formatMonth(u.date)}</p>
              <p className="font-display text-xl text-fg">{u.title}</p>
              {u.progress !== undefined ? (
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                    <div className="gold-fill h-full rounded-full" style={{ width: `${u.progress}%` }} />
                  </div>
                  <span className="text-sm font-medium text-fg">{u.progress}%</span>
                </div>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </Block>
  );
}

export function ReraBlock({ project: p }: { project: Project }) {
  return (
    <Block id="rera" eyebrow="Compliance" title="MahaRERA registration">
      {p.rera.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {p.rera.map((r) => (
            <div key={r.number} className="flex items-center gap-5 rounded-2xl bg-white p-5 text-[#2a1409] ring-1 ring-line">
              {r.qr ? (
                <Image src={r.qr} alt={`MahaRERA QR code for ${r.number}`} width={96} height={96} />
              ) : (
                <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#f8f1ec] text-[#612f15]">
                  <ShieldCheck className="size-8" />
                </span>
              )}
              <div>
                <p className="text-xs text-[#6b5548]">{r.phase ?? "Registration no."}</p>
                <p className="font-display text-xl">{r.number}</p>
                <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-[#612f15] underline">
                  Verify on MahaRERA <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">RERA registration applied for. Details will be published before bookings open.</p>
      )}
      <p className="mt-5 text-xs text-muted">
        Visuals are artistic impressions. Specifications and prices are subject to change. See our <a className="underline" href="/disclaimer">RERA disclaimer</a>.
      </p>
    </Block>
  );
}

export function ProjectFaq({ project: p }: { project: Project }) {
  if (!p.faqs.length) return null;
  return (
    <Block id="faq" eyebrow="FAQ" title="Questions, answered">
      <Accordion items={p.faqs} />
    </Block>
  );
}

