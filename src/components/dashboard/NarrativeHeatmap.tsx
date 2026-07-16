const narratives = [
  { name: "AI", score: 94 },
  { name: "Memecoins", score: 91 },
  { name: "RWA", score: 83 },
  { name: "DeFi", score: 74 },
  { name: "Gaming", score: 67 },
  { name: "DePIN", score: 61 },
];

export default function NarrativeHeatmap() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Narrative Heatmap
        </h2>

        <p className="text-sm text-zinc-400 mt-1">
          AI-ranked conviction across active crypto narratives.
        </p>
      </div>

      <div className="space-y-5">
        {narratives.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-2">
              <span>{item.name}</span>

              <span className="font-semibold text-violet-400">
                {item.score}
              </span>
            </div>

            <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500"
                style={{
                  width: `${item.score}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}