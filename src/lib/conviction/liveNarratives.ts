import { getTrendingTokens } from "@/services/dexscreener";

export async function getLiveNarratives() {
  const data = await getTrendingTokens();

  return data.slice(0, 12).map((token: any) => ({
    id: token.tokenAddress,

    name: token.description || "Unknown",

    symbol: token.url
      ?.split("/")
      .pop()
      ?.toUpperCase() || "TOKEN",

    chain: token.chainId,

    icon: token.icon,

    website: token.url,

    description: token.description,

    updatedAt: token.updatedAt,
  }));
}