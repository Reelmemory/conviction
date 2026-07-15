import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TriangleAlert } from "lucide-react";

export default function InsightCard() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-violet-400" />
          AI Insight
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-zinc-300 leading-7">
          AI infrastructure continues outperforming the broader crypto market.
          Wallet activity has accelerated while trading volume remains healthy,
          suggesting sustained interest rather than short-term speculation.
        </p>

        <div>
          <h3 className="font-semibold mb-2">Signals Detected</h3>

          <ul className="space-y-2 text-sm text-zinc-400">
            <li>✅ Wallet Growth +42%</li>
            <li>✅ Trading Volume +218%</li>
            <li>✅ Liquidity Stable</li>
            <li>✅ Social Mindshare Rising</li>
          </ul>
        </div>

        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
          <div className="flex items-center gap-2 font-medium text-yellow-400">
            <TriangleAlert className="w-4 h-4" />
            Risk
          </div>

          <p className="mt-2 text-sm text-zinc-300">
            Holder concentration remains elevated. Monitor whale activity before
            increasing conviction.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}