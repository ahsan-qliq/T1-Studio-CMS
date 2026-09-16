import { NextResponse } from "next/server"
import { saveTradePage } from "@/lib/trade-page-api"
import type { TradePageApiData } from "@/types/api-trade-page"

export async function POST(request: Request) {
  try {
    await saveTradePage((await request.json()) as TradePageApiData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to save Trade page" },
      { status: 500 }
    )
  }
}
