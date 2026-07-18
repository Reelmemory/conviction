"use client";

import { useState } from "react";
import { createWalletClient, custom } from "viem";
import {
  monadTestnet,
  CONVICTION_REGISTRY,
  registryAbi,
  publicClient,
} from "@/lib/onchain";

const DIRECTIONS = [
  { value: 2, label: "Bullish", color: "border-emerald-500 text-emerald-400" },
  { value: 1, label: "Neutral", color: "border-zinc-500 text-zinc-300" },
  { value: 0, label: "Bearish", color: "border-rose-500 text-rose-400" },
];

export default function RecordConviction({
  narrativeId,
  narrativeName,
  score,
}: {
  narrativeId: string;
  narrativeName: string;
  score: number;
}) {
  const [direction, setDirection] = useState<number | null>(null);
  const [thesis, setThesis] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit() {
    if (direction === null) {
      setMessage("Pick Bullish, Neutral, or Bearish first.");
      return;
    }

    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setStatus("error");
      setMessage("No wallet found. Install MetaMask to record your call.");
      return;
    }

    try {
      setStatus("pending");
      setMessage("Confirm in your wallet...");

      const walletClient = createWalletClient({
        chain: monadTestnet,
        transport: custom(ethereum),
      });

      const [account] = await walletClient.requestAddresses();

      // Make sure the wallet is on Monad Testnet
      try {
        await walletClient.switchChain({ id: monadTestnet.id });
      } catch {
        await walletClient.addChain({ chain: monadTestnet });
        await walletClient.switchChain({ id: monadTestnet.id });
      }

      const hash = await walletClient.writeContract({
        account,
        address: CONVICTION_REGISTRY,
        abi: registryAbi,
        functionName: "recordConviction",
        args: [
          narrativeId,
          direction,
          Math.min(100, Math.max(0, Math.round(score))),
          thesis.slice(0, 280),
        ],
      });

      setMessage("Recording onchain...");
      await publicClient.waitForTransactionReceipt({ hash });

      setStatus("success");
      setMessage("Your call is onchain. Permanently.");
      setThesis("");
      setDirection(null);
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.shortMessage ?? err?.message ?? "Transaction failed. Try again."
      );
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-violet-900/50 bg-zinc-900 p-6">
      <p className="text-xs uppercase tracking-wider text-violet-400">
        Record your call
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        Where do you stand on {narrativeName}?
      </h3>

      <p className="mt-1 text-sm text-zinc-400">
        Commit your call to Monad testnet. Immutable — no rewriting history.
      </p>

      <div className="mt-4 flex gap-2">
        {DIRECTIONS.map((d) => (
          <button
            key={d.value}
            onClick={() => setDirection(d.value)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              direction === d.value
                ? `${d.color} bg-zinc-800`
                : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <textarea
        value={thesis}
        onChange={(e) => setThesis(e.target.value)}
        maxLength={280}
        rows={2}
        placeholder="Your thesis in one or two sentences (max 280 chars)"
        className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
      />

      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          onClick={submit}
          disabled={status === "pending"}
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "pending" ? "Confirming..." : "Record onchain"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              status === "success"
                ? "text-emerald-400"
                : status === "error"
                ? "text-rose-400"
                : "text-zinc-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}