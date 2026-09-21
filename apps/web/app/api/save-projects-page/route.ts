import { NextResponse } from "next/server"
import { saveProjectsPage, fetchProjectsPage } from "@/lib/projects-page-api"
import type { ProjectsPageApiData } from "@/types/api-projects-page"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProjectsPageApiData
    await saveProjectsPage(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[POST /api/save-projects-page]", err)
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
    const data = await fetchProjectsPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-projects-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Project page",
      },
      { status: 500 }
    )
  }
}
