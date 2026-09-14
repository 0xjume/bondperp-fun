import type { Address } from "viem";

/** Native USDC on Base — Avantis collateral and Bondperp curve quote. */
export const USDC = {
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address,
  symbol: "USDC",
  decimals: 6,
  usdPrice: 1,
} as const;
