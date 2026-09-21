import { NextResponse } from "next/server"
import { saveTradePage, fetchTradePage } from "@/lib/trade-page-api"
import type { TradePageApiData } from "@/types/api-trade-page"

export async function POST(request: Request) {
  try {
    await saveTradePage((await request.json()) as TradePageApiData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to save Trade page",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchTradePage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-trade-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch Trade page",
      },
      { status: 500 }
    )
  }
}
