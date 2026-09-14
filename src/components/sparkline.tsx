import { hashSeed } from "@/lib/launch-status";
import { cn } from "@/lib/utils";

function seededPoints(seed: string, direction: "up" | "down") {
  let hash = hashSeed(seed || "bondperp");
  const count = 14;
  const points: number[] = [];
  let y = direction === "up" ? 18 : 10;
  for (let i = 0; i < count; i++) {
    hash = Math.imul(hash, 1664525) + 1013904223;
    const noise = ((hash >>> 0) % 1000) / 1000 - 0.5;
    const trend = direction === "up" ? -0.72 : 0.72;
    y = Math.min(24, Math.max(4, y + trend + noise * 7.2));
    points.push(y);
  }
  return points;
}

export function Sparkline({
  tone = "lime",
  direction = "up",
  seed,
  className,
}: {
  tone?: "lime" | "cyan" | "rose";
  direction?: "up" | "down";
  seed?: string;
  className?: string;
}) {
  const points = seededPoints(seed ?? direction, direction);
  const d = points
    .map((y, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * 120} ${y}`)
    .join(" ");
  const area = `${d} L 120 28 L 0 28 Z`;
  const stroke =
    tone === "cyan" ? "#3EEBFF" : tone === "rose" ? "#FF5C7A" : "#C7FF3D";
  const fill =
    tone === "cyan"
      ? "rgb(62 235 255 / 14%)"
      : tone === "rose"
        ? "rgb(255 92 122 / 14%)"
        : "rgb(199 255 61 / 14%)";

  return (
    <svg
      viewBox="0 0 120 28"
      className={cn("h-10 w-full overflow-visible", className)}
      aria-hidden
    >
      <path d={area} fill={fill} />
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
