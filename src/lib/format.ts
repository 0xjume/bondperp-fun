export function formatUsd(value?: number | null) {
  if (value == null || !Number.isFinite(value)) return "\u2014";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  const n = abs;
  if (n >= 1_000_000) return `${sign}$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${sign}$${(n / 1_000).toFixed(1)}K`;
  if (n >= 1) return `${sign}$${n.toFixed(2)}`;
  return `${sign}$${n.toFixed(4)}`;
}

export function formatSignedUsd(value?: number | null) {
  if (value == null || !Number.isFinite(value)) return "\u2014";
  const sign = value > 0 ? "+" : value < 0 ? "\u2212" : "";
  return `${sign}${formatUsd(Math.abs(value)).replace("$", "$")}`;
}

export function formatQty(value?: number | null, digits = 2) {
  if (value == null || !Number.isFinite(value)) return "\u2014";
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toFixed(digits);
}

export function formatAddress(value: string) {
  return `${value.slice(0, 6)}\u2026${value.slice(-4)}`;
}

export function formatPct(value?: number | null, digits = 1) {
  if (value == null || !Number.isFinite(value)) return "\u2014";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function formatCompactUsd(value?: number | null) {
  if (value == null || !Number.isFinite(value)) return "\u2014";
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const n = abs / 1_000_000;
    return `$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    const n = abs / 1_000;
    return `$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(0)}K`;
  }
  return `$${abs.toFixed(0)}`;
}
