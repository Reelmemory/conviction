const BASE_URL = "https://api.dexscreener.com";

export async function getTrendingTokens() {
  try {
    const response = await fetch(
      `${BASE_URL}/token-boosts/latest/v1`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch DexScreener");
    }

    const boosts = await response.json();

    const addresses = boosts
      .map((token: any) => token.tokenAddress)
      .filter(Boolean)
      .slice(0, 30);

    const tokens = await Promise.all(
      addresses.map(async (address: string) => {
        try {
          const res = await fetch(
            `${BASE_URL}/latest/dex/tokens/${address}`,
            {
              next: {
                revalidate: 300,
              },
            }
          );

          if (!res.ok) return null;

          const data = await res.json();

          if (!data.pairs?.length) return null;

          const pair = data.pairs[0];

          return {
            pairAddress: pair.pairAddress,
            chainId: pair.chainId,
            dexId: pair.dexId,

            url: pair.url,

            baseToken: pair.baseToken,
            quoteToken: pair.quoteToken,

            priceUsd: Number(pair.priceUsd ?? 0),

            liquidity: {
              usd: Number(pair.liquidity?.usd ?? 0),
            },

            volume: {
              h24: Number(pair.volume?.h24 ?? 0),
            },

            priceChange: {
              h24: Number(pair.priceChange?.h24 ?? 0),
            },

            marketCap: Number(pair.marketCap ?? 0),
            fdv: Number(pair.fdv ?? 0),

            info: pair.info ?? {},

            boosts: token.boostAmount ?? 0,
          };
        } catch {
          return null;
        }
      })
    );

    return tokens.filter(Boolean);
  } catch (error) {
    console.error(error);
    return [];
  }
}