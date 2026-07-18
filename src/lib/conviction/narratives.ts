import { Narrative } from "./types";
import { calculateConvictionScore } from "./scoring";
import { calculateConfidence } from "./confidence";

const rawNarratives = [
  {
    id: "ai",
    name: "AI Infrastructure",
    category: "AI",

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

export const narratives: Narrative[] = rawNarratives.map((item) => {
  const conviction = calculateConvictionScore({
    walletGrowth: item.walletGrowth,
    volumeGrowth: item.volumeGrowth,
    socialGrowth: item.socialGrowth,
    liquidityGrowth: item.liquidityGrowth,
  });

  const confidence = calculateConfidence({
    walletGrowth: item.walletGrowth,
    volumeGrowth: item.volumeGrowth,
    socialGrowth: item.socialGrowth,
    liquidityGrowth: item.liquidityGrowth,
  });

  return {
    ...item,
    conviction: conviction.score,
    level: conviction.level,
    confidence: confidence.confidence,
    confidenceLabel: confidence.label,
  };
});