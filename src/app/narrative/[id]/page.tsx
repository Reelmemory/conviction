import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getNarratives } from "@/lib/conviction/engine";

export default async function NarrativeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const narratives = await getNarratives();
  const narrative = narratives.find((item) => item.id === id);

  if (!narrative) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-200 hover:text-violet-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <h1 className="text-3xl font-bold mt-6">{narrative.name}</h1>
        <p className="text-zinc-400 mt-2">{narrative.summary}</p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400">
          Full narrative detail view is coming soon.
        </div>
      </div>
    </main>
  );
}
