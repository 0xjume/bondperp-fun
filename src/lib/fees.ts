import { parseEther, type Address } from "viem";

/** Legacy Uniswap V3 1% fee tier. Used only for pre-Rehype lockable listings. */
export const POOL_FEE = 10_000;

/** Rehype hook fee in pips. 10_000 = 1%. */
export const HOOK_FEE = 10_000;

/** V4 tick spacing paired with pool fee 0 on the Rehype curve. */
export const REHYPE_TICK_SPACING = 200;

/**
 * Integrator share of the gross Rehype hook fee, in millionths.
 * Must be 1…750_000 so the SDK encodes conversion ratios.
 */
export const REHYPE_INTEGRATOR_FEE_SHARE = 750_000;

/** 1_000_000_000 = convert 100% of asset-denominated fees to USDC. */
export const ASSET_TO_NUMERAIRE_RATIO = 1_000_000_000;

export const PLATFORM_FEE_SHARE = parseEther("0.95");
export const DOPPLER_FEE_SHARE = parseEther("0.05");

export const FEE_COPY = {
  pool: "1%",
  operator: "95%",
  doppler: "5%",
  quote:
    "The 1% Rehype hook converts token fees to USDC. That USDC accrues to the operator treasury and later funds the Avantis perp.",
  convert:
    "Token-side fees convert 100% to USDC. Quote-side fees stay USDC.",
  footnote:
    "1% Rehype hook. Token fees convert to USDC for the Avantis open. Residual USDC lands at the Bondperp operator. Airlock keeps its 5% beneficiary share on the curve list.",
} as const;

export const DEFAULT_PLATFORM_TREASURY =
  (process.env.NEXT_PUBLIC_PLATFORM_TREASURY as Address | undefined) ??
  "0x1111111111111111111111111111111111111111";

export const DEFAULT_MARKET_CAP = {
  start: 5_000,
  end: 50_000,
} as const;

export const DEFAULT_SUPPLY = {
  initialSupply: parseEther("1000000000"),
  numTokensToSell: parseEther("900000000"),
} as const;

export const DEFAULT_GRADUATION_TARGET = 50_000;
