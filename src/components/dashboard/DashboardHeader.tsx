import { Activity, Sparkles } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
          <Sparkles className="h-3.5 w-3.5" />
          Live AI Narrative Intelligence
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Conviction
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          AI-powered conviction scoring for emerging crypto narratives using
          liquidity, trading activity, market momentum and breadth.
        </p>
      </div>

      <div className="rounded-2xl border border-green-500/20 bg-zinc-900 px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-green-400">
          <Activity className="h-4 w-4" />
          AI Engine Online
        </div>

        <p className="mt-2 text-xs text-zinc-500">
          Live market data • Auto refresh every 5 minutes
        </p>
      </div>
    </div>
  );
}