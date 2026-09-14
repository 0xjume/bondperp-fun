"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { base } from "viem/chains";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/lib/format";

export function ConnectButton() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();

  if (!isConnected || !address) {
    return (
      <Button
        onClick={() => connect({ connector: connectors[0] })}
        disabled={isPending}
      >
        {isPending ? "Connecting…" : "Connect"}
      </Button>
    );
  }

  if (chainId !== base.id) {
    return (
      <Button
        variant="destructive"
        onClick={() => switchChain({ chainId: base.id })}
        disabled={switching}
      >
        {switching ? "Switching…" : "Switch to Base"}
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={() => disconnect()}>
      {formatAddress(address)}
    </Button>
  );
}
