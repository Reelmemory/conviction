import Link from "next/link";
import { getLiveNarratives } from "@/lib/conviction/liveNarratives";
import DashboardPreview from "./DashboardPreview";

export default async function Hero() {
  const narratives = await getLiveNarratives();
  const top = narratives
    .filter((n) => n.walletGrowth > 0)
    .slice(0, 4)
    .map((n) => ({ name: n.name, conviction: n.conviction }));
  const insight =
    narratives[0]?.summary ??
    "Live market data is loading. Open the dashboard for the full picture.";

  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex border border-amber-500/40 bg-amber-500/10 px-4 py-1 font-mono text-xs uppercase tracking-wider text-amber-400">Built on Monad</div>
          <h1 className="text-5xl font-black leading-tight lg:text-7xl">See which narratives<br /><span className="text-amber-400">actually have capital</span><br />behind them.</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">Conviction reads live market data across hundreds of trending tokens, scores each crypto narrative with transparent reasons — and lets you record your own call on Monad, permanently.</p>
          <div className="mt-10 flex gap-4">
            <Link href="/dashboard" className="rounded-sm bg-amber-500 px-7 py-3.5 font-medium text-black transition-colors hover:bg-amber-400">Open Dashboard</Link>
            <a href="https://github.com/Reelmemory/conviction" target="_blank" rel="noopener noreferrer" className="rounded-sm border border-zinc-700 px-7 py-3.5 text-zinc-300 transition-colors hover:border-zinc-500">View GitHub</a>
          </div>
        </div>
        <DashboardPreview narratives={top} insight={insight} />
      </div>
    </section>
  );
}