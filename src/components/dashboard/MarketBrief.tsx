import { BrainCircuit } from "lucide-react";
import { getLiveNarratives } from "@/lib/conviction/liveNarratives";
import { generateMarketBrief } from "@/lib/conviction/engine/marketBrief";

export default async function MarketBrief() {
  const narratives = await getLiveNarratives();

  if (narratives.length === 0) {
    return (
      <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-6 flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-amber-400" />
          <h2 className="text-xl font-semibold">
            Market Intelligence
          </h2>
        </div>

        <p className="text-zinc-500">
          Waiting for live market data...
        </p>
      </div>
    );
  }

  const brief = generateMarketBrief(
    narratives.map((narrative) => ({
      name: narrative.name,
      convictionScore: narrative.conviction,
      convictionLevel:
        narrative.convictionLevel ?? "Weak",
    }))
  );

  const avgConviction = Math.round(
    narratives.reduce(
      (sum, n) => sum + n.conviction,
      0
    ) / narratives.length
  );

  const sentimentColor =
    brief.sentiment === "Bullish"
      ? "text-green-400"
      : brief.sentiment === "Bearish"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="h-full rounded-sm border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center gap-2">
        <BrainCircuit className="h-5 w-5 text-amber-400" />
        <h2 className="text-xl font-semibold">
          Market Intelligence
        </h2>
      </div>

      <p className="leading-7 text-zinc-300">
        {brief.summary}
      </p>

      <div className="mt-6 space-y-3">
        {brief.highlights.map((highlight) => (
          <div
            key={highlight}
            className="rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300"
          >
            • {highlight}
          </div>
        ))}
      </div>

      <div className="my-6 border-t border-zinc-800" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">
            Market Bias
          </span>

          <span className={`font-medium ${sentimentColor}`}>
            {brief.sentiment}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">
            Narratives
          </span>

          <span>{narratives.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">
            Avg Conviction
          </span>

          <span>{avgConviction}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">
            Status
          </span>

          <span className="text-green-400">
            ● Live
          </span>
        </div>
      </div>
    </div>
  );
}