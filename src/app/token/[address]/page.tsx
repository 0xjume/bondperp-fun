import { Suspense } from "react";
import { TokenView } from "@/components/token-view";

export default async function TokenPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-16"><div className="h-80 animate-pulse rounded-2xl bg-card" /></div>}>
      <TokenView address={address as `0x${string}`} />
    </Suspense>
  );
}
