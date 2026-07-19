# Conviction_

**Narrative intelligence for crypto — with an immutable onchain conviction record on Monad.**

🔗 **Live app:** https://conviction-phi.vercel.app
📜 **Contract (Monad Testnet):** [`0x5EB1f32Bd9d54256A08549F62E47d95F4249e3Eb`](https://testnet.monadexplorer.com/address/0x5EB1f32Bd9d54256A08549F62E47d95F4249e3Eb)

Built solo for the BuildAnything **Spark** hackathon (Jul 13–19, 2026).

## The problem (a personal one)

I chase crypto narratives on vibes. I buy into "AI season" or "RWA season"
because my feed says so, forget why I entered, and panic-sell into noise.
Worse: after the fact, everyone (me included) pretends they "called it."
There's no honest record.

## What Conviction does

1. **Reads the live market.** Pulls hundreds of trending tokens from
   DexScreener and groups them into narratives (AI, Memecoins, DeFi, RWA,
   Gaming, DePIN).
2. **Scores conviction transparently.** Each narrative gets a 0–100
   conviction score computed from liquidity, 24h volume, price momentum,
   and breadth — with human-readable reasons, not a black box.
3. **Records your call onchain.** Agree or disagree with the engine, and
   commit your call (bullish/bearish + a 280-char thesis) to the
   ConvictionRegistry contract on Monad testnet. Immutable and
   timestamped — you can never rewrite your own history.

The onchain part isn't a checkbox: immutability IS the product. A
conviction journal you can edit is just a diary. One you can't edit is a
track record.

## How it works

- **Frontend:** Next.js 16 (App Router, React Compiler), Tailwind v4
- **Data:** DexScreener API (search across narrative queries, deduped by
  pair, refreshed every 5 min)
- **Engine:** deliberately rule-based and explainable — every score ships
  with its reasons (`src/lib/conviction/engine/`)
- **Onchain:** `ConvictionRegistry.sol` on Monad testnet (`contracts/`),
  called via viem. The dashboard feed reads `latestCalls()` straight from
  the chain.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. To record calls you'll need MetaMask on Monad
testnet (chain 10143) with faucet MON: https://faucet.monad.xyz

## Honest limitations

- Deployed on Monad **testnet** (hackathon scope)
- Narrative classification is keyword/search-based — good, not perfect
- Scores reflect DexScreener's trending universe, not the whole market

## Roadmap

- Telegram alerts when a narrative's conviction crosses a threshold
- Wallet-based public track records ("show me this address's calls")
- Score accuracy backtesting — did high conviction predict returns?
- Mainnet deployment

## Built during the hackathon

Everything in this repo was built within the Spark window (first commit
Jul 15). The initial scaffold was `create-next-app` boilerplate.