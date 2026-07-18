export type Trend = "Bullish" | "Neutral" | "Bearish";

export type ConvictionLevel =
  | "Very High"
  | "High"
  | "Moderate"
  | "Low";

export type ConfidenceLevel =
  | "High"
  | "Medium"
  | "Low";

export interface NarrativeIntelligence {
  marketStructure: string;
  momentum: string;
  risk: string;
  analysis: string;
}

export interface LiveNarrative {
  id: string;

  name: string;
  symbol: string;
  chain: string;

  icon: string;
  description: string;

  updatedAt: string;

  convictionScore: number;
  convictionLevel: ConvictionLevel;

  confidence?: number;
  confidenceLabel?: ConfidenceLevel;

  reasons: string[];

  intelligence: NarrativeIntelligence;

  tokenCount: number;

  liquidity: number;
  volume24h: number;
  priceChange24h: number;

  tokens: unknown[];
}