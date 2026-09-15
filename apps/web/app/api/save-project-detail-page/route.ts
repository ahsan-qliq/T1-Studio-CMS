import { NextResponse } from "next/server"
import { saveProjectDetailPage } from "@/lib/project-detail-page-api"
import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProjectDetailPageApiData
    await saveProjectDetailPage(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[POST /api/save-project-detail-page]", err)
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
