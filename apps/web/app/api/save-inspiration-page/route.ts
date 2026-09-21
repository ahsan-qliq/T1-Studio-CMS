import { NextResponse } from "next/server"
import {
  saveInspirationPage,
  fetchInspirationPage,
} from "@/lib/inspiration-page-api"
import type { InspirationPageApiData } from "@/types/api-inspiration-page"

export async function POST(request: Request) {
  try {
    await saveInspirationPage((await request.json()) as InspirationPageApiData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save Inspiration page",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchInspirationPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-inspiration-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Inspiration page",
      },
      { status: 500 }
    )
  }
}
