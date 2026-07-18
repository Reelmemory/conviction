"use client";

import { useEffect, useState } from "react";
import {
  publicClient,
  CONVICTION_REGISTRY,
  registryAbi,
  DIRECTIONS,
} from "@/lib/onchain";

interface OnchainCall {
  caller: string;
  narrativeId: string;
  direction: number;
  score: number;
  thesis: string;
  timestamp: bigint;
}

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function timeAgo(ts: bigint) {
  const seconds = Math.floor(Date.now() / 1000) - Number(ts);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

const directionStyle: Record<number, string> = {
  2: "text-emerald-400",
  1: "text-zinc-300",
  0: "text-rose-400",
};

export default function ConvictionFeed() {
  const [calls, setCalls] = useState<OnchainCall[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = (await publicClient.readContract({
          address: CONVICTION_REGISTRY,
          abi: registryAbi,
          functionName: "latestCalls",
          args: [10n],
        })) as unknown as OnchainCall[];

        if (!cancelled) setCalls([...result]);
      } catch (err) {
        console.error("Feed error:", err);
        if (!cancelled) setCalls([]);
      }
    }

    load();
    const interval = setInterval(load, 15000); // refresh every 15s
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Onchain Conviction Feed
        </h2>
        <span className="text-xs text-zinc-500">
          Monad Testnet · live
        </span>
      </div>

      <p className="mt-1 text-sm text-zinc-400">
        Calls recorded by the community. Immutable, timestamped, public.
      </p>

      <div className="mt-6 space-y-4">
        {calls === null && (
          <p className="text-sm text-zinc-500">Reading the chain...</p>
        )}

        {calls?.length === 0 && (
          <p className="text-sm text-zinc-500">
            No calls yet. Be the first to put your conviction onchain.
          </p>
        )}

        {calls?.map((call, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">
                {call.narrativeId}
              </span>
              <span className={directionStyle[call.direction]}>
                {DIRECTIONS[call.direction]}
              </span>
            </div>

            {call.thesis && (
              <p className="mt-2 text-sm text-zinc-300">
                &ldquo;{call.thesis}&rdquo;
              </p>
            )}

            <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
              <span>
                {shortAddress(call.caller)} · score {call.score} at time of
                call
              </span>
              <span>{timeAgo(call.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}