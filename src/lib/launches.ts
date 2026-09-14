import type { Address, Hex } from "viem";
import type { PerpSide } from "./avantis";

export type LaunchKind = "rehype" | "v3-lockable";

export type StoredLaunch = {
  tokenAddress: Address;
  poolAddress?: Address;
  poolId?: Hex;
  kind?: LaunchKind;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  twitter?: string;
  telegram?: string;
  creator: Address;
  createdAt: number;
  txHash?: string;
  marketCapUsd?: number;
  volumeUsd?: number;
  holders?: number;
  graduationBps?: number;
  graduationTargetUsd: number;
  lastBuyAt?: number;
  perpPair: string;
  perpIndex: number;
  side: PerpSide;
  leverage: number;
  demo?: boolean;
  feesQuoteUsd?: number;
  feesBaseUsd?: number;
  positionSizeUsd?: number;
  livePnlUsd?: number;
  livePnlPct?: number;
};

const KEY = "bondperp-launches-v1";

export function isRehypeLaunch(launch: Pick<StoredLaunch, "kind" | "demo">) {
  return launch.kind === "rehype";
}

export function loadLaunches(): StoredLaunch[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredLaunch[];
  } catch {
    return [];
  }
}

export function saveLaunch(launch: StoredLaunch) {
  const next = [
    launch,
    ...loadLaunches().filter(
      (item) =>
        item.tokenAddress.toLowerCase() !== launch.tokenAddress.toLowerCase(),
    ),
  ];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("launches-changed"));
}

export function getLaunch(token: string) {
  return loadLaunches().find(
    (item) => item.tokenAddress.toLowerCase() === token.toLowerCase(),
  );
}

export function updateLaunch(token: string, patch: Partial<StoredLaunch>) {
  const current = getLaunch(token);
  if (!current) return;
  saveLaunch({ ...current, ...patch });
}

export function launchTokenUri(args: {
  name: string;
  symbol: string;
  description: string;
  image: string;
  perpPair: string;
  perpIndex: number;
  side: PerpSide;
  leverage: number;
  graduationTargetUsd: number;
}) {
  return `data:application/json,${encodeURIComponent(
    JSON.stringify({
      name: args.name,
      symbol: args.symbol,
      description: args.description,
      image: args.image,
      bondperp: {
        perpPair: args.perpPair,
        perpIndex: args.perpIndex,
        side: args.side,
        leverage: args.leverage,
        graduationTargetUsd: args.graduationTargetUsd,
        quote: "USDC",
        kind: "rehype",
        feePolicy: {
          quote: "operator-avantis",
          convert: "asset-to-usdc",
        },
      },
    }),
  )}`;
}
