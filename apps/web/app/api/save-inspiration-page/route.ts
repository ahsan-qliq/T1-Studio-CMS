import { NextResponse } from "next/server"
import { saveInspirationPage } from "@/lib/inspiration-page-api"
import type { InspirationPageApiData } from "@/types/api-inspiration-page"

export async function POST(request: Request) {
  try {
    await saveInspirationPage((await request.json()) as InspirationPageApiData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to save Inspiration page" },
      { status: 500 }
    )
  }
}
