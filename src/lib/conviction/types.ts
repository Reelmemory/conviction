export type Trend = "Bullish" | "Neutral" | "Bearish";

export interface Narrative {
  id: string;
  name: string;
  category: string;
  conviction: number;
  confidence: number;
  trend: Trend;

  walletGrowth: number;
  volumeGrowth: number;
  socialGrowth: number;
  liquidityGrowth: number;

  smartMoney: boolean;

  summary: string;

  updatedAt: string;
}