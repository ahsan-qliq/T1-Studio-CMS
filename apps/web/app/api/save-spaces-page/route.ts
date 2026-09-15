import { NextResponse } from "next/server"
import { saveSpacesPage } from "@/lib/spaces-page-api"
import type { SpacesPageApiData } from "@/types/api-spaces-page"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SpacesPageApiData
    await saveSpacesPage(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[POST /api/save-spaces-page]", err)
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
