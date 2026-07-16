export type Confidence = "Low" | "Medium" | "High";

export function calculateConfidence(
  score: number,
  tokenCount: number
): Confidence {
  if (score >= 80 && tokenCount >= 5) {
    return "High";
  }

  if (score >= 55) {
    return "Medium";
  }

  return "Low";
}