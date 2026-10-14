import { NextResponse } from "next/server"
import {
  fetchAccessibilityPage,
  saveAccessibilityPage,
} from "@/lib/accessibility-page-api"
import type { AccessibilityPageApiData } from "@/types/api-accessibility-page"

export async function POST(request: Request) {
  try {
    await saveAccessibilityPage(
      (await request.json()) as AccessibilityPageApiData
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save Accessibility page",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchAccessibilityPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-accessibility-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Accessibility page",
      },
      { status: 500 }
    )
  }
}
