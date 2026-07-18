import {
  createPublicClient,
  http,
  defineChain,
  parseAbi,
} from "viem";

// ---- Monad Testnet ----
export const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: "https://testnet.monadexplorer.com",
    },
  },
});

// ---- Deployed ConvictionRegistry ----
export const CONVICTION_REGISTRY =
  "0x5EB1f32Bd9d54256A08549F62E47d95F4249e3Eb" as const;

export const registryAbi = parseAbi([
  "function recordConviction(string narrativeId, uint8 direction, uint8 score, string thesis) returns (uint256)",
  "function totalCalls() view returns (uint256)",
  "function latestCalls(uint256 limit) view returns ((address caller, string narrativeId, uint8 direction, uint8 score, string thesis, uint256 timestamp)[])",
]);

// Direction enum: matches the contract (0, 1, 2)
export const DIRECTIONS = ["Bearish", "Neutral", "Bullish"] as const;

// Read-only client (no wallet needed) — used by the live feed
export const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});