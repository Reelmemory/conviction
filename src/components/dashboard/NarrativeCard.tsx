import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NarrativeCardProps {
  id: string;
  name: string;
  category: string;
  score: number;
  trend: "up" | "down" | "neutral";
  summary: string;
  volumeChange: number;
  walletGrowth: number;
  risk: "Low" | "Medium" | "High";
}

export default function NarrativeCard({
  id,
  name,
  category,
  score,
  trend,
  summary,
  volumeChange,
  walletGrowth,
  risk,
}: NarrativeCardProps) {
  return (
    <Link
      href={`/narrative/${id}`}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      <Card className="cursor-pointer bg-zinc-900 border-zinc-800 transition-all duration-300 hover:border-violet-500 hover:bg-zinc-800/50">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary">{category}</Badge>

              <h3 className="text-xl font-semibold mt-3">
                {name}
              </h3>
            </div>

            <div className="text-right">
              <p className="text-sm text-zinc-400">
                Conviction Score
              </p>

              <p className="text-3xl font-bold text-violet-400">
                {score}
              </p>
            </div>
          </div>

          <p className="text-zinc-400 text-sm">
            {summary}
          </p>

          <div className="flex items-center justify-between text-sm">
            <span>
              Volume +{volumeChange}%
            </span>

            <span>
              Wallets +{walletGrowth}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Badge>{risk} Risk</Badge>

            {trend === "up" ? (
              <TrendingUp className="text-green-500" />
            ) : (
              <TrendingDown className="text-red-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
