import { NarrativeMetrics } from "./score";

export function explainConviction(
  metrics: NarrativeMetrics
): string[] {
  const reasons: string[] = [];

  if (metrics.liquidity > 500000) {
    reasons.push("High liquidity supports market conviction.");
  }

  if (metrics.volume24h > 250000) {
    reasons.push("Strong trading volume indicates active participation.");
  }

  if (metrics.priceChange24h > 10) {
    reasons.push("Positive price momentum is strengthening.");
  } else if (metrics.priceChange24h < -10) {
    reasons.push("Price momentum has weakened recently.");
  }

  if (metrics.tokenCount >= 5) {
    reasons.push(
      `${metrics.tokenCount} projects reinforce this narrative.`
    );
  }

  if (reasons.length === 0) {
    reasons.push(
      "Narrative is emerging with limited supporting signals."
    );
  }

  return reasons;
}