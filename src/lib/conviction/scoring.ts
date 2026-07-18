interface ScoreInput {
  walletGrowth: number;
  volumeGrowth: number;
  socialGrowth: number;
  liquidityGrowth: number;
}

export interface ConvictionExplanation {
  title: string;
  description: string;
  impact: "positive" | "neutral" | "negative";
}

export interface ConvictionResult {
  score: number;
  level: "Very High" | "High" | "Moderate" | "Low";
  explanations: ConvictionExplanation[];
}

export function calculateConvictionScore(
  data: ScoreInput
): ConvictionResult {
  const score =
    data.walletGrowth * 0.30 +
    data.volumeGrowth * 0.25 +
    data.socialGrowth * 0.20 +
    data.liquidityGrowth * 0.25;

  const finalScore = Math.min(Math.round(score), 100);

  const explanations: ConvictionExplanation[] = [];

  if (data.walletGrowth >= 80) {
    explanations.push({
      title: "Wallet Growth",
      description:
        "Rapid increase in unique wallets suggests fresh capital entering this narrative.",
      impact: "positive",
    });
  } else if (data.walletGrowth < 40) {
    explanations.push({
      title: "Wallet Growth",
      description:
        "New wallet activity is relatively weak, reducing overall conviction.",
      impact: "negative",
    });
  }

  if (data.volumeGrowth >= 80) {
    explanations.push({
      title: "Trading Volume",
      description:
        "Strong volume indicates sustained market participation rather than isolated trades.",
      impact: "positive",
    });
  }

  if (data.socialGrowth >= 75) {
    explanations.push({
      title: "Social Momentum",
      description:
        "Discussion across crypto communities is accelerating alongside market activity.",
      impact: "positive",
    });
  }

  if (data.liquidityGrowth >= 70) {
    explanations.push({
      title: "Liquidity",
      description:
        "Growing liquidity improves execution quality and reduces slippage risk.",
      impact: "positive",
    });
  }

  if (explanations.length === 0) {
    explanations.push({
      title: "Balanced Signals",
      description:
        "No single metric dominates. Conviction is based on a balanced combination of market indicators.",
      impact: "neutral",
    });
  }

  let level: ConvictionResult["level"];

  if (finalScore >= 85) {
    level = "Very High";
  } else if (finalScore >= 70) {
    level = "High";
  } else if (finalScore >= 50) {
    level = "Moderate";
  } else {
    level = "Low";
  }

  return {
    score: finalScore,
    level,
    explanations,
  };
}