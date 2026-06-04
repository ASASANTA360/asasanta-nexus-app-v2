import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { wallet } = await req.json();

    const apiKey = process.env.ETHERSCAN_API_KEY;

    const txResponse = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
    );

    const txData = await txResponse.json();

    const transactions = txData.result || [];

    const txCount = transactions.length;

    let score = 50;

    if (txCount > 100) score += 20;
    if (txCount > 500) score += 10;

    if (txCount < 5) score -= 30;

    score = Math.max(0, Math.min(score, 100));

    let risk = "Medium";

    if (score >= 80) risk = "Low";
    else if (score <= 30) risk = "High";

    return NextResponse.json({
      score,
      risk,
      txCount,
      analysis: `Wallet has ${txCount} recorded transactions on Ethereum.`,
      recommendations: [
        "Review transaction history.",
        "Verify counterparties before sending funds.",
        "Monitor unusual activity."
      ]
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to analyze wallet"
      },
      {
        status: 500
      }
    );
  }
}