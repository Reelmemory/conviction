export interface Narrative {
  id: string;
  name: string;
  convictionScore: number;
  volumeChange: number;
  liquidity: string;
  trend: "up" | "down" | "neutral";
  summary: string;
  risk: string;
}