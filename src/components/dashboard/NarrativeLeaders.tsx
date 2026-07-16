import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Narrative {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  icon: string;
  description: string;
  website?: string;
}

interface NarrativeLeadersProps {
  narratives: Narrative[];
}

export default function NarrativeLeaders({
  narratives,
}: NarrativeLeadersProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          Narrative Leaders
        </h2>

        <span className="text-xs text-zinc-500">
          Live
        </span>
      </div>

      <div className="space-y-4">
        {narratives.map((token) => {
          const row = (
            <>
              <div className="flex items-center gap-3">
                <Image
                  src={token.icon}
                  alt={token.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div>
                  <p className="font-semibold">
                    {token.name}
                  </p>

                  <p className="text-xs text-zinc-500">
                    {token.chain}
                  </p>
                </div>
              </div>

              <ArrowUpRight className="w-5 h-5 text-violet-400" />
            </>
          );

          if (!token.website) {
            return (
              <div
                key={token.id}
                className="flex items-center justify-between rounded-xl border border-zinc-800 p-3"
              >
                {row}
              </div>
            );
          }

          return (
            <a
              key={token.id}
              href={token.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 p-3 transition-all duration-300 hover:border-violet-500 hover:bg-zinc-800/50"
            >
              {row}
            </a>
          );
        })}
      </div>
    </div>
  );
}