export default function DashboardPreview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Trending Narratives
        </h2>

        <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
          Live
        </span>
      </div>

      <div className="space-y-4">

        {[
          ["AI Agents", "92%"],
          ["Real World Assets", "87%"],
          ["DeFi Infrastructure", "82%"],
          ["Gaming", "76%"],
        ].map(([name, score]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
          >
            <span>{name}</span>

            <span className="font-semibold text-purple-400">
              {score}
            </span>
          </div>
        ))}

      </div>

      <div className="mt-8 rounded-2xl bg-black/40 p-5">
        <p className="mb-2 text-sm text-zinc-500">
          AI Insight
        </p>

        <p className="text-sm leading-7 text-zinc-300">
          AI infrastructure narratives continue gaining momentum as
          builders deploy new agents across emerging ecosystems,
          particularly Monad.
        </p>
      </div>

    </div>
  );
}