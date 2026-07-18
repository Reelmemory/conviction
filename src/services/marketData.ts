const BASE_URL = "https://api.dexscreener.com";

// Each search query maps to the narrative it represents.
// Tokens found by a search get tagged with that narrative directly —
// no guessing from token names.
const NARRATIVE_SEARCHES: { query: string; narrative: string }[] = [
  { query: "ai", narrative: "AI Infrastructure" },
  { query: "defi", narrative: "DeFi" },
  { query: "rwa", narrative: "RWA" },
  { query: "gaming", narrative: "Gaming" },
  { query: "depin", narrative: "DePIN" },
  { query: "meme", narrative: "Memecoins" },
];

export async function getMarketPairs() {
  try {
    const results = await Promise.all(
      NARRATIVE_SEARCHES.map(async ({ query, narrative }) => {
        try {
          const res = await fetch(
            `${BASE_URL}/latest/dex/search?q=${encodeURIComponent(query)}`,
            { next: { revalidate: 300 } }
          );
          if (!res.ok) return [];
          const data = await res.json();
          const pairs = Array.isArray(data?.pairs) ? data.pairs : [];
          // Tag every pair with the narrative that found it
          return pairs.map((pair: any) => ({
            ...pair,
            sourceNarrative: narrative,
          }));
        } catch {
          return [];
        }
      })
    );

    // Merge + dedupe by pairAddress, keep the most liquid version
    const byPair = new Map<string, any>();
    for (const pair of results.flat()) {
      const key = pair?.pairAddress;
      if (!key) continue;
      const existing = byPair.get(key);
      const liq = Number(pair.liquidity?.usd) || 0;
      if (!existing || liq > (Number(existing.liquidity?.usd) || 0)) {
        byPair.set(key, pair);
      }
    }

    return Array.from(byPair.values());
  } catch (error) {
    console.error("Market Data Error:", error);
    return [];
  }
}