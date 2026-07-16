interface NarrativeSummary {
  name: string;
  convictionScore: number;
  convictionLevel: string;
}

export function generateMarketBrief(
  narratives: NarrativeSummary[]
) {
  if (narratives.length === 0) {
    return {
      sentiment: "Neutral",
      summary: "No market data available.",
      highlights: [],
    };
  }

  const top = narratives[0];

  const averageScore =
    narratives.reduce(
      (sum, narrative) => sum + narrative.convictionScore,
      0
    ) / narratives.length;

  const sentiment =
    averageScore >= 75
      ? "Bullish"
      : averageScore >= 50
      ? "Neutral"
      : "Bearish";

  const highlights = [
    `${top.name} is currently the strongest narrative.`,
    `${top.name} has a Conviction Score of ${top.convictionScore}.`,
    `${narratives.length} narratives are actively being tracked.`,
  ];

  return {
    sentiment,
    summary: `${sentiment} market conditions with ${top.name} leading current momentum.`,
    highlights,
  };
}