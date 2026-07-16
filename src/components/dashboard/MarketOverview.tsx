import {
  Activity,
  TrendingUp,
  Coins,
  BrainCircuit,
} from "lucide-react";

const stats = [
  {
    title: "Active Narratives",
    value: "24",
    icon: BrainCircuit,
  },
  {
    title: "Bullish Signals",
    value: "17",
    icon: TrendingUp,
  },
  {
    title: "Tracked Tokens",
    value: "1,248",
    icon: Coins,
  },
  {
    title: "AI Status",
    value: "Online",
    icon: Activity,
  },
];

export default function MarketOverview() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">
                {item.title}
              </span>

              <Icon className="h-5 w-5 text-violet-400" />
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}