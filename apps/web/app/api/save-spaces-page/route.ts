import { NextResponse } from "next/server"
import { saveSpacesPage, fetchSpacesPage } from "@/lib/spaces-page-api"
import type { SpacesPageApiData } from "@/types/api-spaces-page"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      data: SpacesPageApiData
      isNew: boolean
    }
    const saved = await saveSpacesPage(body.data, body.isNew)
    return NextResponse.json({ success: true, data: saved })
  } catch (err) {
    console.error("[POST /api/save-spaces-page]", err)
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchSpacesPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-spaces-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Spaces page",
      },
      { status: 500 }
    )
  }
}
