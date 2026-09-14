import { cn } from "@/lib/utils";
import { phaseLabel, type CurvePhase } from "@/lib/launch-status";

const TONE: Record<CurvePhase, string> = {
  new: "border-cyan/30 bg-cyan/10 text-cyan",
  live: "border-lime/30 bg-lime/10 text-lime",
  graduating: "border-lime/50 bg-lime/15 text-lime glow-lime",
  graduated: "border-foreground/20 bg-secondary text-foreground",
};

export function StatusPill({
  phase,
  className,
}: {
  phase: CurvePhase;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full border px-2 font-mono text-[10px] tracking-[0.14em]",
        TONE[phase],
        className,
      )}
    >
      {phaseLabel(phase)}
    </span>
  );
}
