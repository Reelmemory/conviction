export interface Narrative {
  id: string;
  name: string;
  score: number;
  trend: "up" | "down" | "neutral";
  category: string;
  summary: string;
  volumeChange: number;
  walletGrowth: number;
  risk: "Low" | "Medium" | "High";
}

export const narratives: Narrative[] = [
  {
    id: "ai-agents",
    name: "AI Agents",
    score: 94,
    trend: "up",
    category: "AI",
    summary:
      "AI infrastructure continues gaining momentum with rising wallet activity and trading volume.",
    volumeChange: 218,
    walletGrowth: 42,
    risk: "Medium",
  },
  {
    id: "memecoins",
    name: "Memecoins",
    score: 91,
    trend: "up",
    category: "Meme",
    summary:
      "Capital is rotating back into high-volume memecoins with strong social engagement.",
    volumeChange: 184,
    walletGrowth: 31,
    risk: "High",
  },
  {
    id: "rwa",
    name: "Real World Assets",
    score: 83,
    trend: "up",
    category: "RWA",
    summary:
      "Institutional interest remains steady with healthy liquidity.",
    volumeChange: 52,
    walletGrowth: 15,
    risk: "Low",
  },
];