import { Narrative } from "./types";

export const narratives: Narrative[] = [
  {
    id: "ai",
    name: "AI Infrastructure",
    category: "AI",

    conviction: 94,
    confidence: 91,

    trend: "Bullish",

    walletGrowth: 42,
    volumeGrowth: 218,
    socialGrowth: 61,
    liquidityGrowth: 34,

    smartMoney: true,

    summary:
      "Strong capital inflow supported by wallet growth and increasing trading activity.",

    updatedAt: "Just now",
  },

  {
    id: "memes",
    name: "Memecoins",
    category: "Meme",

    conviction: 89,
    confidence: 84,

    trend: "Bullish",

    walletGrowth: 29,
    volumeGrowth: 175,
    socialGrowth: 94,
    liquidityGrowth: 22,

    smartMoney: false,

    summary:
      "Momentum remains strong although volatility continues increasing.",

    updatedAt: "Just now",
  },
];