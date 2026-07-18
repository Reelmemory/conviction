import { getLiveNarratives } from "@/lib/conviction/liveNarratives";
import NarrativeCard from "@/components/dashboard/NarrativeCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MarketOverview from "@/components/dashboard/MarketOverview";
import MarketBrief from "@/components/dashboard/MarketBrief";
import NarrativeHeatmap from "@/components/dashboard/NarrativeHeatmap";
import NarrativeLeaders from "@/components/dashboard/NarrativeLeaders";
import ConvictionFeed from "@/components/onchain/ConvictionFeed";

export default async function DashboardPage() {
  const liveNarratives = await getLiveNarratives();


  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        <DashboardHeader />
        <NarrativeLeaders narratives={liveNarratives} />
        <MarketOverview />
        <br />
        {/* Top Dashboard Section */}
        <div className="grid gap-6 lg:grid-cols-3 mt-8">

          {/* Heatmap */}
          <div className="lg:col-span-2">
            <NarrativeHeatmap />
          </div>

          <MarketBrief />

        </div>

        {/* Narrative Cards */}
        <div className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {liveNarratives.map((narrative) => (
              <NarrativeCard
                key={narrative.id}
                narrative={narrative}
              />
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div className="mt-8">
          <ConvictionFeed />
        </div>

      </div>
    </main>
  );
}