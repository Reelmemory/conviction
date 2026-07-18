import {
  Activity,
  TrendingUp,
  Coins,
  BrainCircuit,
} from "lucide-react";
import { getLiveNarratives } from "@/lib/conviction/liveNarratives";

export default async function MarketOverview() {
  const narratives = await getLiveNarratives();

  const bullish = narratives.filter(
    (n) => n.trend === "Bullish"
  ).length;

  const trackedTokens = narratives.reduce(
    (sum, n) => sum + (n.tokenCount ?? 0),
    0
  );

  const avgConviction =
    narratives.length > 0
      ? Math.round(
          narratives.reduce(
            (sum, n) => sum + n.conviction,
            0
          ) / narratives.length
        )
      : 0;

  const stats = [
    {
      title: "Active Narratives",
      value: narratives.length,
      icon: BrainCircuit,
    },
    {
      title: "Bullish Signals",
      value: bullish,
      icon: TrendingUp,
    },
    {
      title: "Tracked Tokens",
      value: trackedTokens,
      icon: Coins,
    },
    {
      title: "Avg Conviction",
      value: avgConviction,
      icon: Activity,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-violet-500/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                {item.title}
              </span>

              <Icon className="h-5 w-5 text-violet-400" />
            </div>

            <h2 className="mt-5 text-3xl font-bold text-white">
              {typeof item.value === "number"
                ? item.value.toLocaleString()
                : item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}