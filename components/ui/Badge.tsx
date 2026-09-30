import type { Status } from "@/lib/schemas/project.schema";
import { STATUS_LABEL, cn } from "@/lib/utils";

const styles: Record<Status, string> = {
  upcoming: "bg-surface-raised/90 text-primary border-primary/20",
  ongoing: "bg-[color-mix(in_oklab,var(--accent)_22%,var(--surface-raised))] text-accent-text border-accent/40",
  completed: "bg-surface-raised/90 text-muted border-line",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur",
        styles[status],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", status === "ongoing" ? "animate-pulse bg-accent" : status === "upcoming" ? "bg-primary" : "bg-muted")} />
      {STATUS_LABEL[status]}
    </span>
  );
}
