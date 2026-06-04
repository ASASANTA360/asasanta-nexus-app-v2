import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { wallet } = await req.json();

    if (!wallet) {
      return NextResponse.json(
        {
          error: "Wallet address is required",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey = process.env.ETHERSCAN_API_KEY;

    const txResponse = await fetch(
  `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
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

    let firstTxDate = "N/A";
    let lastTxDate = "N/A";
    let walletAge = "Unknown";

    if (transactions.length > 0) {
  const firstTx = transactions[0];
  const lastTx = transactions[transactions.length - 1];

  const firstTimestamp =
    parseInt(firstTx?.timeStamp || "0", 10) * 1000;

  const lastTimestamp =
    parseInt(lastTx?.timeStamp || "0", 10) * 1000;

  if (firstTimestamp > 0) {
    firstTxDate = new Date(
      firstTimestamp
    ).toLocaleDateString();

    const ageDays = Math.floor(
      (Date.now() - firstTimestamp) /
        (1000 * 60 * 60 * 24)
    );

    walletAge = `${ageDays} days`;
  }

  if (lastTimestamp > 0) {
    lastTxDate = new Date(
      lastTimestamp
    ).toLocaleDateString();
  }
}

    const analysis = `
Wallet Address: ${wallet}

Wallet Age: ${walletAge}

Transactions: ${txCount}

First Transaction: ${firstTxDate}

Last Activity: ${lastTxDate}

Trust Score: ${score}%

Risk Level: ${risk}

This wallet has ${txCount} recorded Ethereum transactions. Activity history suggests a ${risk.toLowerCase()} risk profile based on transaction volume and wallet age.
`;

    return NextResponse.json({
      score,
      risk,
      txCount,
      walletAge,
      firstTxDate,
      lastTxDate,
      analysis,
      recommendations: [
        "Review transaction history.",
        "Verify counterparties before sending funds.",
        "Monitor unusual activity.",
        "Check wallet reputation before large transfers.",
      ],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to analyze wallet",
      },
      {
        status: 500,
      }
    );
  }
}