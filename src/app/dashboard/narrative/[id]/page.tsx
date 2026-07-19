import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingUp, Users, BarChart3, Droplets } from "lucide-react";
import { getLiveNarratives } from "@/lib/conviction/liveNarratives";
import RecordConviction from "@/components/onchain/RecordConviction";

export default async function NarrativeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const narratives = await getLiveNarratives();
  const narrative = narratives.find((item) => item.id === id);

  if (!narrative) {
    notFound();
  }

  const signals = [
    {
      title: "Trending Tokens",
      value: `${narrative.walletGrowth}`,
      icon: Users,
      reason: "Projects currently driving this narrative.",
    },
    {
      title: "24H Price Change",
      value: `${narrative.volumeGrowth.toFixed(2)}%`,
      icon: TrendingUp,
      reason: "Average price movement across tracked tokens.",
    },
    {
      title: "24H Volume",
      value: `$${Number(narrative.volume24h).toLocaleString()}`,
      icon: BarChart3,
      reason: "Total trading volume across tracked tokens.",
    },
    {
      title: "Liquidity",
      value: `$${Number(narrative.liquidity).toLocaleString()}`,
      icon: Droplets,
      reason: "Combined liquidity across tracked tokens.",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <h1 className="mt-6 text-3xl font-bold">{narrative.name}</h1>

        <p className="mt-2 text-zinc-400">{narrative.summary}</p>

        <div className="mt-8 rounded-sm border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-amber-400">
                Conviction Score
              </p>

              <h2 className="mt-2 text-5xl font-bold">
                {narrative.conviction}
              </h2>
            </div>

            <span className="rounded-full bg-amber-400/10 px-4 py-2 text-sm font-medium text-violet-300">
              {narrative.convictionLevel}
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-sm border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-lg font-semibold">
            Explainable AI
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            Conviction is based on the following live market signals.
          </p>

          <div className="mt-6 space-y-4">
            {signals.map((signal) => {
              const Icon = signal.icon;

              return (
                <div
                  key={signal.title}
                  className="flex items-start gap-4 rounded-sm border border-zinc-800 bg-zinc-950 p-4"
                >
                  <div className="rounded-lg bg-amber-400/10 p-2">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{signal.title}</h4>

                      <span className="text-amber-400 font-semibold">
                        {signal.value}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-zinc-400">
                      {signal.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-sm border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold">
              AI Narrative Intelligence
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Market Structure
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {narrative.intelligence.marketStructure}
                </p>
              </div>

              <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Momentum
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {narrative.intelligence.momentum}
                </p>
              </div>

              <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase text-zinc-500">
                  Risk
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {narrative.intelligence.risk}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-sm border border-amber-400/20 bg-amber-400/5 p-5">
              <p className="text-sm font-medium text-violet-300">
                AI Analysis
              </p>

              <p className="mt-3 leading-7 text-zinc-300">
                {narrative.intelligence.analysis}
              </p>
            </div>
            <div className="mt-8 rounded-sm border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold">
                Top Tokens
              </h3>

              <p className="mt-1 text-sm text-zinc-400">
                Tokens currently contributing to this narrative.
              </p>

              <div className="mt-6 space-y-3">
                {narrative.tokens
                  ?.filter((token: any, i: number, arr: any[]) =>
                    arr.findIndex(
                      (t: any) =>
                        (t.baseToken?.symbol ?? "").toUpperCase() ===
                        (token.baseToken?.symbol ?? "").toUpperCase()
                    ) === i
                  )
                  .sort(
                    (a: any, b: any) =>
                      Number(b.volume?.h24 ?? 0) - Number(a.volume?.h24 ?? 0)
                  )
                  .slice(0, 5)
                  .map((token: any) => {
                    const change = Number(token.priceChange?.h24 ?? 0);
                    return (
                      <div
                        key={token.pairAddress ?? token.tokenAddress}
                        className="flex items-center justify-between rounded-sm border border-zinc-800 bg-zinc-950 p-4"
                      >
                        <div>
                          <p className="font-semibold">
                            {token.baseToken?.symbol ?? "Unknown"}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {token.baseToken?.name}
                          </p>
                        </div>
                        <div className="text-right font-mono tabular-nums">
                          <p
                            className={`text-sm ${
                              change > 0
                                ? "text-emerald-400"
                                : change < 0
                                  ? "text-rose-400"
                                  : "text-zinc-400"
                            }`}
                          >
                            {change > 0 ? "+" : ""}
                            {change.toFixed(2)}%
                          </p>
                          <p className="text-xs text-zinc-500">
                            ${Number(token.volume?.h24 ?? 0).toLocaleString()} vol
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <RecordConviction
          narrativeId={narrative.id}
          narrativeName={narrative.name}
          score={narrative.conviction}
        />

      </div>
    </main>
  );
}
  