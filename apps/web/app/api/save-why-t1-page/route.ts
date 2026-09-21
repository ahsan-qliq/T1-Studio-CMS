import { NextResponse } from "next/server"
import { saveWhyT1Page, fetchWhyT1Page } from "@/lib/why-t1-page-api"
import type { WhyT1PageApiData } from "@/types/api-why-t1-page"
export async function POST(request: Request) {
  try {
    await saveWhyT1Page((await request.json()) as WhyT1PageApiData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to save Why T1 page",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchWhyT1Page()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-why-t1-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Why T1 page",
      },
      { status: 500 }
    )
  }
}
