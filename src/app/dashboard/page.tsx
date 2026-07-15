import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import InsightCard from "@/components/dashboard/InsightCard";
import NarrativeCard from "@/components/dashboard/NarrativeCard";
import { narratives } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
  <main className="min-h-screen bg-zinc-950 text-white p-8">
    <div className="max-w-7xl mx-auto">

      <DashboardHeader />

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-3 mt-8">

        {/* Left Side */}
        <div className="lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
            {narratives.map((narrative) => (
              <NarrativeCard
                key={narrative.id}
                {...narrative}
              />
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div>
          <InsightCard />
        </div>

      </div>

    </div>
  </main>
);
}