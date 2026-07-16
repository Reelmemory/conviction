const BASE_URL = "https://api.dexscreener.com";

export async function getTrendingTokens() {
  try {
    const response = await fetch(
      `${BASE_URL}/token-profiles/latest/v1`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch DexScreener data");
    }

    return await response.json();
  } catch (error) {
    console.error("DexScreener Error:", error);
    return [];
  }
}