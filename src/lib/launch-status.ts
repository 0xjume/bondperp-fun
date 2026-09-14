import type { StoredLaunch } from "./launches";

export type CurvePhase = "new" | "live" | "graduating" | "graduated";

export function curvePhase(launch: StoredLaunch): CurvePhase {
  const bps = launch.graduationBps ?? 0;
  if (bps >= 10_000) return "graduated";
  if (bps >= 7_000) return "graduating";
  const ageMs = Date.now() - launch.createdAt;
  if (ageMs < 12 * 60 * 60 * 1000 && bps < 3_000) return "new";
  return "live";
}

export function phaseLabel(phase: CurvePhase) {
  return phase.toUpperCase();
}

export function hashSeed(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
