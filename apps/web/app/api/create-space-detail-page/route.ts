import { NextResponse } from "next/server"
import { createSpaceDetailPage } from "@/lib/space-detail-page-api"
import { createEmptySpaceDetailPage } from "@/lib/page-defaults"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      pageName: string
      spaceType: string
      slug: string
    }
    if (!body.pageName || !body.spaceType || !body.slug) {
      return NextResponse.json(
        {
          success: false,
          message: "pageName, spaceType, and slug are all required",
        },
        { status: 400 }
      )
    }
    const blank = createEmptySpaceDetailPage(body)
    const created = await createSpaceDetailPage(blank)
    return NextResponse.json({ success: true, data: created })
  } catch (err) {
    console.error("[POST /api/create-space-detail-page]", err)
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
