import { BrainCircuit } from "lucide-react";

export default function MarketBrief() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 h-full">

      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit className="w-5 h-5 text-violet-400" />

        <h2 className="text-xl font-semibold">
          Market Intelligence
        </h2>
      </div>

      <p className="text-zinc-300 leading-8">
        AI Infrastructure continues leading market attention as wallet
        accumulation accelerates and developer activity remains elevated.
        Memecoins are maintaining strong social momentum, although
        conviction is becoming increasingly selective. Real World Assets
        continue attracting institutional capital while Gaming narratives
        are beginning to cool after recent highs.
      </p>

      <div className="border-t border-zinc-800 my-6"></div>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Market Bias
          </span>

          <span className="text-green-400">
            Bullish
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Confidence
          </span>

          <span className="text-violet-400">
            91%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Last Update
          </span>

          <span>
            Just now
          </span>
        </div>

      </div>

    </div>
  );
}