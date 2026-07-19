import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LiveNarrative } from "@/lib/conviction/liveNarratives";

interface NarrativeCardProps {
  narrative: LiveNarrative;
}

export default function NarrativeCard({
  narrative,
}: NarrativeCardProps) {
  const {
    id,
    name,
    category,
    conviction,
    confidence,
    trend,
    summary,
    volumeGrowth,
    walletGrowth,
  } = narrative;

  const confidenceLabel =
    confidence >= 80
      ? "High"
      : confidence >= 60
        ? "Medium"
        : "Low";

  return (
    <Link
      href={`/dashboard/narrative/${narrative.id}`}
      className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      <Card className="cursor-pointer bg-zinc-900 border-zinc-800 transition-all duration-300 hover:border-amber-400 hover:bg-zinc-800/50">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>

              <h3 className="text-2xl font-bold text-white">
                {name}
              </h3>
            </div>

            <div className="text-right">
              <p className="text-zinc-300 leading-7">
                Conviction
              </p>
              <p className="text-3xl font-bold text-amber-400">
                {conviction}
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-400">
            {summary}
          </p>

          <div className="flex items-center justify-between text-sm">
           <span className="font-mono tabular-nums text-zinc-400">
              Vol {volumeGrowth >= 0 ? "+" : ""}{volumeGrowth.toFixed(1)}%
            </span>
            <span className="text-zinc-400">
              {walletGrowth} Tokens
            </span>
          </div>

          <div className="flex items-center justify-between">
          <span className="border border-zinc-700 px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-zinc-400">
              conf {confidence}% · {confidenceLabel}
            </span>

            {trend === "Bullish" ? (
              <TrendingUp className="text-green-500" />
            ) : trend === "Bearish" ? (
              <TrendingDown className="text-red-500" />
            ) : (
              <Minus className="text-yellow-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}