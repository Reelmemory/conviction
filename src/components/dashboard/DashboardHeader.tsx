import { Activity } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          AI Narrative Radar
        </h1>

        <p className="text-zinc-400 mt-2">
          Discover emerging crypto narratives before they become consensus.
        </p>
      </div>

      <div className="mt-6 md:mt-0 rounded-xl border border-violet-500/20 bg-zinc-900 px-5 py-3">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Activity className="w-4 h-4 text-green-500" />
          AI Engine Online
        </div>

        <p className="text-xs text-zinc-500 mt-1">
          Last updated: Just now
        </p>
      </div>
    </div>
    
  );
  
}