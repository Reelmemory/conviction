import { narratives } from "./narratives";

export async function getNarratives() {
  // Future:
  // const birdeye = await getBirdeyeData();
  // const dexscreener = await getDexData();
  // return mergeNarratives(birdeye, dexscreener);

  return narratives;
}