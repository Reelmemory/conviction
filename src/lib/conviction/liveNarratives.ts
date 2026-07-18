import { getMarketPairs } from "@/services/marketData";
import { calculateConvictionScore } from "./engine/score";
import { classifyConviction } from "./engine/classify";
import { explainConviction } from "./engine/explain";
import { generateNarrativeIntelligence } from "./engine/intelligence";

export interface LiveNarrative {
  id: string;
  name: string;
  category: string;
  conviction: number;
  confidence: number;
  trend: "Bullish" | "Bearish" | "Neutral";
  summary: string;
  volumeGrowth: number;
  walletGrowth: number;

  symbol?: string;
  chain?: string;
  icon?: string;
  description?: string;
  updatedAt?: string;

  convictionLevel?: string;
  reasons?: string[];
  tokenCount?: number;
  liquidity?: number;
  volume24h?: number;
  priceChange24h?: number;
  intelligence?: any;
  tokens?: any[];
}

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

  for (const [name, keywords] of Object.entries(NARRATIVE_KEYWORDS)) {
    if (keywords.some((k) => value.includes(k))) {
      return name;
    }
  }

  return "Emerging";
}

export async function getLiveNarratives(): Promise<LiveNarrative[]> {
  const tokens = await getMarketPairs();

  const grouped = new Map<string, any[]>();

  Object.keys(NARRATIVE_KEYWORDS).forEach((name) => {
    grouped.set(name, []);
  });

  grouped.set("Emerging", []);

 for (const token of tokens) {
    const narrative =
      token.sourceNarrative ??
      classifyNarrative(
        `${token.baseToken?.name ?? ""} ${token.baseToken?.symbol ?? ""}`
      );

    if (!grouped.has(narrative)) {
      grouped.set(narrative, []);
    }

    grouped.get(narrative)!.push(token);
  }
  
  const narratives: LiveNarrative[] = Array.from(grouped.entries()).map(
    ([name, tokens]) => {
      const liquidity = tokens.reduce(
        (sum, token) => sum + (Number(token.liquidity?.usd) || 0),
        0
      );

      const volume24h = tokens.reduce(
        (sum, token) => sum + (Number(token.volume?.h24) || 0),
        0
      );

      const priceChange24h =
        tokens.length > 0
          ? tokens.reduce(
            (sum, token) => sum + (Number(token.priceChange?.h24) || 0),
            0
          ) / tokens.length
          : 0;

      const conviction = calculateConvictionScore({
        liquidity,
        volume24h,
        priceChange24h,
        tokenCount: tokens.length,
      });

      const convictionLevel = classifyConviction(conviction);

      const reasons = explainConviction({
        liquidity,
        volume24h,
        priceChange24h,
        tokenCount: tokens.length,
      });

      const intelligence = generateNarrativeIntelligence({
        convictionScore: conviction,
        convictionLevel,
        liquidity,
        volume24h,
        priceChange24h,
        tokenCount: tokens.length,
      });

      return {
        id: name.toLowerCase().replace(/\s+/g, "-"),

        name,

        category: name,

        conviction,

        confidence:
          conviction >= 90
            ? 95
            : conviction >= 75
              ? 85
              : conviction >= 60
                ? 70
                : 50,

        trend:
          priceChange24h > 5
            ? "Bullish"
            : priceChange24h < -5
              ? "Bearish"
              : "Neutral",

        summary: intelligence.analysis,

        volumeGrowth: priceChange24h,

        walletGrowth: tokens.length,

        symbol: `${tokens.length} Tokens`,

        chain: tokens[0]?.chainId ?? "Multi",

        icon:
          tokens[0]?.info?.imageUrl ??
          tokens[0]?.info?.header ??
          "",

        description: intelligence.analysis,

        updatedAt: new Date().toISOString(),

        convictionLevel,

        reasons,

        tokenCount: tokens.length,

        liquidity,

        volume24h,

        priceChange24h,

        intelligence,

        tokens,
      };
    }
  );

  return narratives.sort((a, b) => b.conviction - a.conviction);
}