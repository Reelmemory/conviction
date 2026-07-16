interface ScoreInput {
  walletGrowth: number;
  volumeGrowth: number;
  socialGrowth: number;
  liquidityGrowth: number;
}

export function calculateConvictionScore(
  data: ScoreInput
): number {
  const score =
    data.walletGrowth * 0.30 +
    data.volumeGrowth * 0.25 +
    data.socialGrowth * 0.20 +
    data.liquidityGrowth * 0.25;

  return Math.min(Math.round(score), 100);
}