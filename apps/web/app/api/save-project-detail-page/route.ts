import { NextResponse } from "next/server"

import {
  saveProjectDetailPage,
  fetchProjectDetailPage,
  deleteProjectDetailPage,
} from "@/lib/project-detail-page-api"

import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      data: ProjectDetailPageApiData
      isNew?: boolean
    }

    const saved = await saveProjectDetailPage(body.data)

    return NextResponse.json({
      success: true,
      data: saved,
    })
  } catch (err) {
    console.error("[POST /api/save-project-detail-page]", err)

    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Project slug is required.",
        },
        { status: 400 }
      )
    }

    const data = await fetchProjectDetailPage(slug)

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("[GET /api/save-project-detail-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Project detail page",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Project slug is required.",
        },
        { status: 400 }
      )
    }

    await deleteProjectDetailPage(slug)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DELETE /api/save-project-detail-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete project page",
      },
      { status: 500 }
    )
  }
}
