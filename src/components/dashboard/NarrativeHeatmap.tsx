import { getLiveNarratives } from "@/lib/conviction/liveNarratives";

export default async function NarrativeHeatmap() {
  const narratives = await getLiveNarratives();

  if (narratives.length === 0) {
    return (
      <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold">
          Narrative Heatmap
        </h2>

        <p className="mt-6 text-zinc-500">
          No live narratives available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Narrative Heatmap
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Live AI-ranked conviction across active crypto narratives.
        </p>
      </div>

      <div className="space-y-6">
        {narratives.map((narrative) => (
          <div key={narrative.id}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">
                  {narrative.name}
                </p>

                <p className="text-xs text-zinc-500">
                  {narrative.tokenCount ?? 0} tokens
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-amber-400">
                  {narrative.conviction}
                </p>

                <p className="text-xs text-zinc-500">
                  {narrative.convictionLevel}
                </p>
              </div>
            </div>
            <div className="h-3 overflow-hidden rounded-sm bg-zinc-900">
              <div
                className="h-full [background:repeating-linear-gradient(90deg,#f59e0b_0_6px,transparent_6px_10px)] transition-all duration-700"
                style={{
                  width: `${Math.min(
                    Math.max(narrative.conviction, 0),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}