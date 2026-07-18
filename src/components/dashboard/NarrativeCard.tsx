import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      <Card className="cursor-pointer bg-zinc-900 border-zinc-800 transition-all duration-300 hover:border-violet-500 hover:bg-zinc-800/50">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary">{category}</Badge>

              <h3 className="text-2xl font-bold text-white">
                {name}
              </h3>
            </div>

            <div className="text-right">
              <p className="text-zinc-300 leading-7">
                Conviction
              </p>
              <p className="text-3xl font-bold text-violet-400">
                {conviction}
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-400">
            {summary}
          </p>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">
              Volume +{volumeGrowth.toFixed(1)}%
            </span>
            <span className="text-zinc-400">
              {walletGrowth} Tokens
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline">
              {confidence}% • {confidenceLabel}
            </Badge>

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