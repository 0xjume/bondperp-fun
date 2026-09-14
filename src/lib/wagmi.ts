import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { base } from "viem/chains";

const rpc = process.env.NEXT_PUBLIC_BASE_RPC;

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: rpc ? http(rpc) : http(),
  },
  ssr: true,
});
