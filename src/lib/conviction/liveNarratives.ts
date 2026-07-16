import { getTrendingTokens } from "@/services/dexscreener";
import { calculateConvictionScore } from "./engine/score";
import { classifyConviction } from "./engine/classify";
import { explainConviction } from "./engine/explain";

const NARRATIVE_KEYWORDS: Record<string, string[]> = {
  "AI Infrastructure": [
    "ai",
    "agent",
    "llm",
    "gpu",
    "compute",
    "inference",
    "model",
    "robot",
  ],

  Memecoins: [
    "meme",
    "dog",
    "cat",
    "frog",
    "pepe",
    "bonk",
    "inu",
  ],

  DeFi: [
    "dex",
    "swap",
    "yield",
    "lending",
    "staking",
    "liquidity",
    "finance",
  ],

  RWA: [
    "real world",
    "asset",
    "treasury",
    "bond",
    "tokenized",
  ],

  Gaming: [
    "game",
    "gaming",
    "play",
    "metaverse",
  ],

  DePIN: [
    "depin",
    "network",
    "wireless",
    "compute",
    "storage",
  ],
};

function classifyNarrative(text: string) {
  const value = text.toLowerCase();

  for (const [narrative, keywords] of Object.entries(
    NARRATIVE_KEYWORDS
  )) {
    if (keywords.some((keyword) => value.includes(keyword))) {
      return narrative;
    }
  }

  return "Emerging";
}

export async function getLiveNarratives() {
  const tokens = await getTrendingTokens();

  const grouped = new Map<string, any[]>();

  for (const token of tokens) {
    const searchable = `
      ${token.baseToken?.name ?? ""}
      ${token.baseToken?.symbol ?? ""}
      ${token.description ?? ""}
    `;

    const narrative = classifyNarrative(searchable);

    if (!grouped.has(narrative)) {
      grouped.set(narrative, []);
    }

    grouped.get(narrative)!.push(token);
  }

  const narratives = Array.from(grouped.entries()).map(
    ([name, tokens]) => {
      const liquidity = tokens.reduce(
        (sum, token) =>
          sum + (Number(token.liquidity?.usd) || 0),
        0
      );

      const volume24h = tokens.reduce(
        (sum, token) =>
          sum + (Number(token.volume?.h24) || 0),
        0
      );

      const avgPriceChange =
        tokens.length > 0
          ? tokens.reduce(
              (sum, token) =>
                sum +
                (Number(token.priceChange?.h24) || 0),
              0
            ) / tokens.length
          : 0;

      const convictionScore = calculateConvictionScore({
        liquidity,
        volume24h,
        priceChange24h: avgPriceChange,
        tokenCount: tokens.length,
      });

      const convictionLevel =
        classifyConviction(convictionScore);

      const reasons = explainConviction({
        liquidity,
        volume24h,
        priceChange24h: avgPriceChange,
        tokenCount: tokens.length,
      });

      return {
        id: name.toLowerCase().replace(/\s+/g, "-"),

        name,

        symbol: `${tokens.length} Tokens`,

        chain: "Multi",

        icon: tokens[0]?.info?.imageUrl ?? "",

        description: `${tokens.length} trending projects detected`,

        updatedAt: new Date().toISOString(),

        convictionScore,
        convictionLevel,
        reasons,

        tokenCount: tokens.length,

        liquidity,
        volume24h,
        priceChange24h: avgPriceChange,

        tokens,
      };
    }
  );

  return narratives.sort(
    (a, b) => b.convictionScore - a.convictionScore
  );
}