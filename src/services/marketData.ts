const BASE_URL = "https://api.dexscreener.com";

export async function getMarketPairs() {
  try {
    const boostsRes = await fetch(
      `${BASE_URL}//latest/dex/search?q=ai
      /latest/dex/search?q=defi
      /latest/dex/search?q=rwa
      /latest/dex/search?q=gaming
      /latest/dex/search?q=depin
      /latest/dex/search?q=meme`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!boostsRes.ok) {
      throw new Error("Failed to fetch token boosts");
    }

    const boosts = await boostsRes.json();

    if (!Array.isArray(boosts) || boosts.length === 0) {
      return [];
    }

    const addresses = boosts
      .slice(0, 30)
      .map((token: any) => token.tokenAddress)
      .filter(Boolean)
      .join(",");

    if (!addresses) {
      return [];
    }

    const pairsRes = await fetch(
      `${BASE_URL}/latest/dex/tokens/${addresses}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!pairsRes.ok) {
      throw new Error("Failed to fetch token pairs");
    }

    const data = await pairsRes.json();

    if (!Array.isArray(data.pairs)) {
      return [];
    }

    return data.pairs;
  } catch (error) {
    console.error("Market Data Error:", error);
    return [];
  }
}