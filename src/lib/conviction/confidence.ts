interface ConfidenceInput {
  walletGrowth: number;
  volumeGrowth: number;
  socialGrowth: number;
  liquidityGrowth: number;
}

export interface ConfidenceResult {
  confidence: number;
  label: "High" | "Medium" | "Low";
}

export function calculateConfidence(
  data: ConfidenceInput
): ConfidenceResult {
  const values = [
    data.walletGrowth,
    data.volumeGrowth,
    data.socialGrowth,
    data.liquidityGrowth,
  ];

  const average =
    values.reduce((sum, value) => sum + value, 0) / values.length;

  const spread = Math.max(...values) - Math.min(...values);

  let confidence = Math.round(average - spread * 0.25);

  confidence = Math.max(0, Math.min(100, confidence));

  let label: ConfidenceResult["label"];

  if (confidence >= 80) {
    label = "High";
  } else if (confidence >= 60) {
    label = "Medium";
  } else {
    label = "Low";
  }

  return {
    confidence,
    label,
  };
}