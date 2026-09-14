import { getAddress, type Address } from "viem";
import {
  DEFAULT_PLATFORM_TREASURY,
  DOPPLER_FEE_SHARE,
  PLATFORM_FEE_SHARE,
} from "./fees";

export type Beneficiary = { beneficiary: Address; shares: bigint };

function mergeShares(entries: Beneficiary[]): Beneficiary[] {
  const map = new Map<string, bigint>();
  for (const entry of entries) {
    const key = entry.beneficiary.toLowerCase();
    map.set(key, (map.get(key) ?? BigInt(0)) + entry.shares);
  }
  return [...map.entries()].map(([addr, shares]) => ({
    beneficiary: getAddress(addr),
    shares,
  }));
}

export function buildFeeBeneficiaries(args: {
  airlockOwner: Address;
  platform?: Address;
}): Beneficiary[] {
  const platform = getAddress(args.platform ?? DEFAULT_PLATFORM_TREASURY);
  const airlock = getAddress(args.airlockOwner);

  return mergeShares([
    { beneficiary: airlock, shares: DOPPLER_FEE_SHARE },
    { beneficiary: platform, shares: PLATFORM_FEE_SHARE },
  ]);
}
