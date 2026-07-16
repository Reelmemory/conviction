export interface NarrativeMetrics {
  liquidity: number;
  volume24h: number;
  priceChange24h: number;
  tokenCount: number;
}

function normalize(value: number, min: number, max: number) {
  if (value <= min) return 0;
  if (value >= max) return 100;

  return ((value - min) / (max - min)) * 100;
}

export function calculateConvictionScore(
  metrics: NarrativeMetrics
) {
  const liquidity = normalize(metrics.liquidity, 10000, 1000000);

  const volume = normalize(metrics.volume24h, 5000, 500000);

  const momentum = normalize(metrics.priceChange24h, -20, 40);

  const breadth = normalize(metrics.tokenCount, 1, 20);

  return Math.round(
    liquidity * 0.35 +
      volume * 0.30 +
      momentum * 0.20 +
      breadth * 0.15
  );
}