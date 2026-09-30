import { Plus } from "lucide-react";

/** Native <details> accordion: keyboard accessible, works without JS, content stays in the HTML. */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-raised">
      {items.map((it) => (
        <details key={it.q} className="group px-5 md:px-7">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
            {it.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-accent-text transition-transform duration-300 group-open:rotate-45 group-open:border-accent">
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="pb-5 text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
