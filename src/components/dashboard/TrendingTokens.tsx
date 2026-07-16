import { TrendingUp } from "lucide-react";

const tokens = [
  {
    symbol: "BONK",
    change: "+18.2%",
    conviction: 91,
  },
  {
    symbol: "AIXBT",
    change: "+12.4%",
    conviction: 88,
  },
  {
    symbol: "FARTCOIN",
    change: "+26.1%",
    conviction: 93,
  },
  {
    symbol: "USELESS",
    change: "+15.8%",
    conviction: 84,
  },
];

export default function TrendingTokens() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-violet-400" />
        <h2 className="text-xl font-semibold">Trending Tokens</h2>
      </div>

      <div className="space-y-4">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="flex items-center justify-between border-b border-zinc-800 pb-3"
          >
            <div>
              <p className="font-medium">{token.symbol}</p>
              <p className="text-sm text-green-400">{token.change}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-zinc-400">Conviction</p>
              <p className="font-bold text-violet-400">
                {token.conviction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}