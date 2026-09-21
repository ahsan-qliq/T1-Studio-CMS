import { NextResponse } from "next/server"

import { saveLandingPage, fetchLandingPage } from "@/lib/landing-page-api"

import type { LandingPageApiData } from "@/types/api-landing-page"

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as LandingPageApiData

    await saveLandingPage(data)

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save Landing page",
      },
      {
        status: 500,
      }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchLandingPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-landing-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Landing page",
      },
      { status: 500 }
    )
  }
}
