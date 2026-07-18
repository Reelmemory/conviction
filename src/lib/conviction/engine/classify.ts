export type ConvictionLevel =
  | "Very Weak"
  | "Weak"
  | "Moderate"
  | "Strong"
  | "Very Strong";

export function classifyConviction(score: number): ConvictionLevel {
  if (score >= 90) return "Very Strong";
  if (score >= 75) return "Strong";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Weak";
  return "Very Weak";
}