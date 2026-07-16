import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Narrative {
  id: string;
  name: string;
  description: string;
  icon?: string;
  convictionScore: number;
  tokenCount: number;
  convictionLevel: string;
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
        {narratives.map((narrative) => (
          <Link
            key={narrative.id}
            href={`/dashboard/${narrative.id}`}
            className="flex items-center justify-between rounded-xl border border-zinc-800 p-3 transition-all duration-300 hover:border-violet-500 hover:bg-zinc-800/50"
          >
            <div className="flex items-center gap-3">
              {narrative.icon ? (
                <Image
                  src={narrative.icon}
                  alt={narrative.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
                  {narrative.name.charAt(0)}
                </div>
              )}

              <div>
                <p className="font-semibold">{narrative.name}</p>

                <p className="text-xs text-zinc-500">
                  {narrative.description}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${narrative.convictionLevel === "Conviction"
                        ? "bg-green-500/20 text-green-400"
                        : narrative.convictionLevel === "Strong"
                          ? "bg-blue-500/20 text-blue-400"
                          : narrative.convictionLevel === "Building"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {narrative.convictionLevel}
                  </span>

                  <span className="rounded-full bg-violet-500/20 px-2 py-1 text-[10px] font-semibold text-violet-300">
                    Score {narrative.convictionScore}
                  </span>

                  <span className="text-[10px] text-zinc-500">
                    {narrative.tokenCount} tokens
                  </span>
                </div>
              </div>
            </div>

            <ArrowUpRight className="h-5 w-5 text-violet-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}