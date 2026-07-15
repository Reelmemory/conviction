import { Button } from "@/components/ui/button";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      {/* Purple glow */}
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* LEFT */}
        <div>
          <div className="mb-6 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm text-purple-300">
            Built on Monad
          </div>

          <h1 className="text-5xl font-black leading-tight lg:text-7xl">
            Discover Narratives
            <br />
            <span className="text-purple-400">
              Before They Become
            </span>
            <br />
            Consensus.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
            Conviction analyzes thousands of crypto conversations, surfaces emerging narratives before they trend, and lets you permanently record your market thesis on Monad.
          </p>

          <div className="mt-10 flex gap-4">
            <Button className="bg-purple-600 px-7 py-6 hover:bg-purple-500">
              Open Dashboard
            </Button>

            <Button
              variant="outline"
              className="border-zinc-700 bg-transparent px-7 py-6"
            >
              View GitHub
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <DashboardPreview />

      </div>
    </section>
  );
}