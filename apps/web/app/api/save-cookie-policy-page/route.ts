import { NextResponse } from "next/server"
import {
  fetchCookiePolicyPage,
  saveCookiePolicyPage,
} from "@/lib/cookie-policy-page-api"
import type { CookiePolicyPageApiData } from "@/types/api-cookie-policy-page"

export async function POST(request: Request) {
  try {
    await saveCookiePolicyPage(
      (await request.json()) as CookiePolicyPageApiData
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save Cookie Policy page",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchCookiePolicyPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-cookie-policy-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Cookie Policy page",
      },
      { status: 500 }
    )
  }
}
