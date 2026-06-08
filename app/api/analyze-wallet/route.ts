import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { wallet } = await req.json();

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ETHERSCAN_API_KEY;

    const txResponse = await fetch(
      `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
    );

    const txData = await txResponse.json();

    if (txData.status !== "1") {
      return NextResponse.json(
        {
          error: "Etherscan API Error",
          details: txData,
        },
        {
          status: 400,
        }
      );
    }

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

    let signal = "Caution";

    if (score >= 80) signal = "Trade";
    else if (score <= 30) signal = "Avoid";

    let reputation = "Active Wallet";

    if (score >= 80) {
      reputation = "Trusted Wallet";
    } else if (score <= 30) {
      reputation = "High Risk Wallet";
    }

    let firstTxDate = "N/A";
    let lastTxDate = "N/A";
    let walletAge = "Unknown";

    if (transactions.length > 0) {
      const firstTimestamp =
        Number(transactions[0]?.timeStamp || 0) * 1000;

      const lastTimestamp =
        Number(
          transactions[transactions.length - 1]?.timeStamp || 0
        ) * 1000;

      if (firstTimestamp > 0) {
        firstTxDate =
          new Date(firstTimestamp).toLocaleDateString();

        const ageDays = Math.floor(
          (Date.now() - firstTimestamp) /
            (1000 * 60 * 60 * 24)
        );

        walletAge = `${ageDays} days`;

        if (ageDays < 30) {
          reputation = "New Wallet";
        }
      }

      if (lastTimestamp > 0) {
        lastTxDate =
          new Date(lastTimestamp).toLocaleDateString();
      }
    }

    const analysis = `
Wallet Address: ${wallet}

Wallet Reputation: ${reputation}

Trading Signal: ${signal}

Wallet Age: ${walletAge}

Transactions: ${txCount}

First Transaction: ${firstTxDate}

Last Activity: ${lastTxDate}

Trust Score: ${score}%

Risk Level: ${risk}

This wallet has ${txCount} recorded Ethereum transactions and has been active for ${walletAge}. Based on transaction activity, wallet age, and trust score, the AI engine classifies this wallet as ${reputation} with a ${risk.toLowerCase()} risk profile. Current trading recommendation: ${signal}.
`;

    return NextResponse.json({
      score,
      risk,
      signal,
      reputation,
      txCount,
      walletAge,
      firstTxDate,
      lastTxDate,
      analysis,
      recommendations: [
        "Review transaction history before trading.",
        "Verify counterparties before sending funds.",
        "Monitor unusual activity patterns.",
        "Check wallet reputation before large transfers.",
        `Current AI Trading Signal: ${signal}`,
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