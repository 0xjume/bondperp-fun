import { useId } from "react";
import { cn } from "@/lib/utils";

export function CurveMark({ className }: { className?: string }) {
  const rawId = useId();
  const id = `bondperp-curve-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("size-8", className)}
      aria-hidden
    >
      <path
        d="M8 28c6-14 12-14 16 0s10 14 16 0"
        stroke={`url(#${id})`}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={id} x1="8" y1="24" x2="40" y2="24">
          <stop stopColor="#C7FF3D" />
          <stop offset="0.55" stopColor="#3EEBFF" />
          <stop offset="1" stopColor="#FF5C7A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BMark({ className }: { className?: string }) {
  const rawId = useId();
  const id = `bondperp-b-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("size-8", className)}
      aria-hidden
    >
      <path
        d="M16 10h10.5c6 0 10 3.2 10 8.1 0 3.1-1.8 5.6-4.7 6.9 3.6 1.2 5.9 4 5.9 7.6 0 5.3-4.4 8.4-11.2 8.4H16V10Z"
        stroke={`url(#${id})`}
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={id} x1="16" y1="10" x2="38" y2="40">
          <stop stopColor="#C7FF3D" />
          <stop offset="1" stopColor="#3EEBFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("text-lg font-semibold tracking-tight", className)}>
      Bondperp.<span className="text-lime">fun</span>
    </span>
  );
}
