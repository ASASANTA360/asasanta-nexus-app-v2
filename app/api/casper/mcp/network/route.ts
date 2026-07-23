import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type McpResponse = {
  result?: {
    content?: Array<{
      type?: string;
      text?: string;
    }>;
    isError?: boolean;
  };
  error?: {
    code?: number;
    message?: string;
  };
};

function parseMcpEvent(body: string): McpResponse {
  const dataLine = body
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:"));

  if (!dataLine) {
    throw new Error("MCP response did not contain a data event.");
  }

  return JSON.parse(dataLine.slice(5).trim()) as McpResponse;
}

export async function GET() {
  const mcpUrl = process.env.CASPER_MCP_URL?.trim();
  const apiKey = process.env.CSPR_CLOUD_API_KEY?.trim();
  const network =
    process.env.CASPER_MCP_NETWORK?.trim() || "testnet";

  if (!mcpUrl || !apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "CASPER_MCP_URL or CSPR_CLOUD_API_KEY is missing.",
      },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(mcpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "X-CSPR-Cloud-Api-Key": apiKey,
        "X-Casper-Network": network,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "tools/call",
        params: {
          name: "get_network_status",
          arguments: {},
        },
      }),
      cache: "no-store",
    });

    const rawResponse = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `Casper MCP returned HTTP ${response.status}.`,
        },
        { status: 502 },
      );
    }

    const mcpResponse = parseMcpEvent(rawResponse);

    if (mcpResponse.error || mcpResponse.result?.isError) {
      return NextResponse.json(
        {
          ok: false,
          error:
            mcpResponse.error?.message ||
            "Casper MCP tool returned an error.",
        },
        { status: 502 },
      );
    }

    const status =
      mcpResponse.result?.content?.find(
        (item) => item.type === "text",
      )?.text || "No network status returned.";

    return NextResponse.json({
      ok: true,
      source: "Casper MCP Server",
      network,
      status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Casper MCP error.",
      },
      { status: 500 },
    );
  }
}
