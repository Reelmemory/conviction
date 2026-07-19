export default function DashboardPreview({
  narratives,
  insight,
}: {
  narratives: { name: string; conviction: number }[];
  insight: string;
}) {
  return (
    <div className="rounded-sm border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Narrative leaders</h2>
        <span className="border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-amber-400">
          ● Live
        </span>
      </div>

      <div className="space-y-3">
        {narratives.map((n) => (
          <div
            key={n.name}
            className="flex items-center justify-between rounded-sm border border-zinc-800 bg-zinc-950 p-4"
          >
            <span>{n.name}</span>
            <span className="font-mono font-semibold tabular-nums text-amber-400">
              {n.conviction}
            </span>
          </div>
        ))}
        {narratives.length === 0 && (
          <p className="text-sm text-zinc-500">
            Market data warming up — open the dashboard for the live view.
          </p>
        )}
      </div>

      <div className="mt-8 rounded-sm bg-black/50 p-5">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
          Engine readout
        </p>
        <p className="text-sm leading-7 text-zinc-300">{insight}</p>
      </div>
    </div>
  );
}