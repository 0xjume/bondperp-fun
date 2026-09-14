# Bondperp.fun

Bonding curve to perpetual alpha. Launch a token on **Base**. Fund an [Avantis](https://avantisfi.com) perp.

This app is a Bondperp-branded Doppler launchpad: new listings are **Rehype V4 multicurve** auctions quoted in **USDC**. Each listing names an Avantis **stock** perp (pair, long/short, leverage). Bondperp only offers seven names — NVIDIA, META, Tesla, Google, Amazon, Microsoft, Apple — and caps leverage at **5x**.

Doppler Airlock and the Rehype hook are already live on Base. This repo does **not** redeploy protocol contracts.

## How it works

1. Creator lists a token against USDC on a locked Rehype curve from **$5k to $50k** FDV.
2. Traders buy and sell on the Uniswap V4 pool. The hook takes a **1%** fee.
3. **Token-side fees convert 100% to USDC.** Quote-side fees stay USDC.
4. That USDC accrues to `NEXT_PUBLIC_PLATFORM_TREASURY` for the operator to open the selected Avantis market later.
5. The pool uses **no-op migration** — it stays locked after the curve fills.

Older lockable V3 listings remain readable and tradeable. They still stream both tokens; the operator collects and burns the token share on those rows only.

Auto-open on Avantis is **not** in this slice.

## Live

- App: [https://web-production-c3c58.up.railway.app](https://web-production-c3c58.up.railway.app)
- Custom: [https://bondperp.fun](https://bondperp.fun) and [https://www.bondperp.fun](https://www.bondperp.fun)
- Public source: [https://github.com/0xjume/bondperp-fun](https://github.com/0xjume/bondperp-fun) (`main`)
- Private mirror: [https://github.com/0xjume/bondperp](https://github.com/0xjume/bondperp) (`main`)

Verified HTTPS GET 200 on `/`, `/create`, and `/treasury` (deployment `14cdb946`, commit `8aa4613`).

## Run locally

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
npm run dev
```

Dev server: [http://127.0.0.1:43127](http://127.0.0.1:43127)

Connect an injected wallet on Base to create or trade. Seeded demo listings fill the grid so the UI is usable without a wallet.

## Railway (MCP only)

Railway project **bondperp** (`603bffa5-102c-46a7-85ca-05c8d7b570e3`), service **web** (`9f143905-0f85-4df3-bf29-33454c7138a2`), environment **production** (`90f12fbe-5f0b-498a-aab5-14f97040ea2d`).

Do **not** use the Railway CLI (`railway up`). Do **not** call `create-deployment` — that creates a second service.

1. Pin Node 20 (`.nvmrc`, `engines.node`, `nixpacks.toml`, `NIXPACKS_NODE_VERSION=20`) and TypeScript `target` `ES2020` (BigInt literals).
2. `connect-service-source` on service `web` to GitHub repo `0xjume/bondperp-fun` branch `main`. The Railway GitHub App cannot reliably read the private `0xjume/bondperp` mirror.
3. Poll `list-deployments` + `get-status` until `SUCCESS`. On `FAILED`/`CRASHED`, read `get-logs` with `types: ["build","deploy"]`, fix, and redeploy.

Build uses Nixpacks: `npm install --legacy-peer-deps && npm run build`, start `npx next start --port ${PORT:-43127}`. No database.

Verified HTTPS (2026-09-14, deployment `14cdb946`, commit `8aa4613`): GET `/`, `/create`, `/treasury` all returned 200.

Set these on the service **before** the first compile (`NEXT_PUBLIC_*` is baked in):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_PLATFORM_TREASURY` | Operator address |
| `NEXT_PUBLIC_INDEXER_URL` | Doppler indexer |
| `NEXT_PUBLIC_AVANTIS_API` | Avantis tx-builder |
| `NEXT_PUBLIC_BASE_RPC` | Optional Base RPC |
| `NIXPACKS_NODE_VERSION` | `20` |

### DNS

Railway attaches the hostnames but **cannot write registrar DNS**. Create these records at the registrar:

| Type | Host | Target | Railway status |
| --- | --- | --- | --- |
| CNAME | `bondperp.fun` | `3nshq7k3.up.railway.app` | verified, TLS valid; CNAME propagated / currently unset |
| CNAME | `www.bondperp.fun` | `u94drgu4.up.railway.app` | verified, TLS valid, CNAME propagated |

Apex CNAMEs often need ALIAS/ANAME at the registrar.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_PLATFORM_TREASURY` | Operator address (integrator + buyback destination for converted USDC) |
| `NEXT_PUBLIC_BASE_RPC` | Optional Base RPC |
| `NEXT_PUBLIC_INDEXER_URL` | Doppler indexer (hosted index is Base Sepolia today) |
| `NEXT_PUBLIC_AVANTIS_API` | Avantis v2 tx-builder, default `https://tx-builder.avantisfi.com` |

## Operator runbook (later)

1. `collectFees` on each Rehype pool — USDC is already converted.
2. Legacy V3 only: collect the lockable pool, then burn the launched-token share.
3. Open the stored Avantis market (`pairIndex`, side, leverage) with accumulated USDC.
4. Attach a Bondperp builder code for order-flow attribution.

## Stack

- Next.js 16, TypeScript, Tailwind, shadcn/ui
- wagmi + viem
- `@whetstone-research/doppler-sdk`
- Avantis v2 HTTP catalog (`GET /v2/pairs`)
- Railway Nixpacks (Node 20)

## Disclaimer

Perpetuals are risky. This is not financial advice. Demo cards are seeded UI, not live positions.
