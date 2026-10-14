import { NextResponse } from "next/server"
import {
  fetchTermsConditionsPage,
  saveTermsConditionsPage,
} from "@/lib/terms-conditions-page-api"
import type { TermsConditionsPageApiData } from "@/types/api-terms-conditions-page"

export async function POST(request: Request) {
  try {
    await saveTermsConditionsPage(
      (await request.json()) as TermsConditionsPageApiData
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save Terms & Conditions page",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchTermsConditionsPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-terms-conditions-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Terms & Conditions page",
      },
      { status: 500 }
    )
  }
}
