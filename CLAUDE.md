@AGENTS.md

## Product Vision — Spark Hackathon (deadline: Jul 19, 11:59 PM UTC)

Conviction is an onchain conviction journal. The personal problem it solves:
"I buy tokens, forget my thesis, and panic-sell into noise."
The onchain part IS the product: your thesis is committed immutably,
so you can't rewrite history and pretend you knew all along.

One flow only:
1. Connect wallet
2. Write a thesis for a token ("why I'm holding this") → committed onchain
   to Monad TESTNET (immutable)
3. View thesis alongside live token data from the DexScreener API

## Hard constraints
- ONE screen, one real end-to-end flow. No watchlists, no screeners,
  no portfolios, no extra charts.
- Contract: minimal Solidity — commitThesis(token, text) + a getter.
  Monad testnet only. Do not attempt mainnet.
- No placeholder/hardcoded data anywhere — the judging agent checks for this
  and judges click every button twice.
- Every feature idea during the sprint gets one test:
  "Does the demo work without it?" If yes, skip it.
- UI: fit in the viewport, one distinctive visual identity, no generic AI-slop look.

## Workflow rules
- Commit after every working milestone (contract deployed / wallet connects /
  thesis writes onchain / thesis displays). Clean history matters to the judge.
- Install and use Monskills for Monad deployment. Get testnet MON from
  https://faucet.monad.xyz

## Submission checklist (ALL required)
- [ ] Contract deployed to Monad testnet + address recorded in README
- [ ] Hosted app URL (Vercel)
- [ ] Public GitHub repo with real README (problem / solution / setup steps)
- [ ] Demo video ≤ 3 min, publicly viewable
- [ ] Social post URL (eligible for $500 viral prize)