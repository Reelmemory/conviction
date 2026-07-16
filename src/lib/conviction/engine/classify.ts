export type ConvictionLevel =
  | "Weak"
  | "Building"
  | "Strong"
  | "Conviction";

export function classifyConviction(score: number): ConvictionLevel {
  if (score < 30) return "Weak";
  if (score < 60) return "Building";
  if (score < 80) return "Strong";

  return "Conviction";
}