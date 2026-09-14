import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PerpSide } from "@/lib/avantis";

export function StockChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-lime",
        className,
      )}
    >
      STOCK
    </span>
  );
}

export function PerpBadge({
  side,
  leverage,
  className,
}: {
  side: PerpSide;
  leverage: number;
  className?: string;
}) {
  const long = side === "long";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[11px] tracking-wide",
        long
          ? "bg-cyan/12 text-cyan shadow-[0_0_16px_rgb(62_235_255/0.12)]"
          : "bg-rose/12 text-rose shadow-[0_0_16px_rgb(255_92_122/0.12)]",
        className,
      )}
    >
      {long ? (
        <ArrowUpRight className="size-3" />
      ) : (
        <ArrowDownRight className="size-3" />
      )}
      {long ? "LONG" : "SHORT"} {leverage}x
    </span>
  );
}
