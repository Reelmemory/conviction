interface IntelligenceInput {
  convictionScore: number;
  convictionLevel: string;
  liquidity: number;
  volume24h: number;
  priceChange24h: number;
  tokenCount: number;
}

export function generateNarrativeIntelligence(
  data: IntelligenceInput
) {
  const momentum =
    data.priceChange24h > 15
      ? "Accelerating"
      : data.priceChange24h > 5
      ? "Stable"
      : "Weakening";

  const marketStructure =
    data.liquidity > 5_000_000
      ? "Strong"
      : data.liquidity > 1_000_000
      ? "Healthy"
      : "Emerging";

  const risk =
    data.priceChange24h > 40
      ? "High"
      : data.priceChange24h > 20
      ? "Moderate"
      : "Low";

  const analysis = `Current conviction is ${data.convictionLevel.toLowerCase()} (${data.convictionScore}/100). Liquidity and trading activity indicate ${marketStructure.toLowerCase()} market structure while price momentum is ${momentum.toLowerCase()}. ${data.tokenCount} actively trending tokens are contributing to this narrative.`;

  return {
    momentum,
    marketStructure,
    risk,
    analysis,
  };
}