import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Narrative {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  conviction: number;
  tokenCount?: number;
  convictionLevel?: string;
}

interface NarrativeLeadersProps {
  narratives: Narrative[];
}

export default function NarrativeLeaders({
  narratives,
}: NarrativeLeadersProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Narrative Leaders</h2>

        <span className="text-xs text-zinc-500">
          {narratives.length} Narratives
        </span>
      </div>

      <div className="space-y-4">
        {narratives.map((narrative) => {
          const validIcon =
            !!narrative.icon &&
            narrative.icon.startsWith("http");

          return (
            <Link
              key={narrative.id}
              href={`/dashboard/narrative/${narrative.id}`}
              className="flex items-center justify-between rounded-xl border border-zinc-800 p-4 transition-all duration-300 hover:border-violet-500 hover:bg-zinc-800/50"
            >
              <div className="flex items-center gap-4">
                {validIcon ? (
                  <Image
                    src={narrative.icon!}
                    alt={narrative.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold">
                    {narrative.name.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-white">
                    {narrative.name}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    {narrative.description ?? "Live narrative"}
                  </p>

                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="rounded-full bg-violet-500/20 px-2 py-1 text-[10px] font-semibold text-violet-300">
                      {narrative.convictionLevel ?? "Building"}
                    </span>

                    <span className="rounded-full bg-zinc-800 px-2 py-1 text-[10px] text-zinc-300">
                      Score {Math.round(narrative.conviction)}
                    </span>

                    <span className="text-[10px] text-zinc-500">
                      {narrative.tokenCount ?? 0} tokens
                    </span>
                  </div>
                </div>
              </div>

              <ArrowUpRight className="h-5 w-5 text-violet-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}