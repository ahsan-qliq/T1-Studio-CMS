import { NextResponse } from "next/server"
import { saveSpaceDetailPage } from "@/lib/space-detail-page-api"
import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      data: SpaceDetailPageApiData
      isNew: boolean
    }
    const saved = await saveSpaceDetailPage(body.data, body.isNew)
    return NextResponse.json({ success: true, data: saved })
  } catch (err) {
    console.error("[POST /api/save-space-detail-page]", err)
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
