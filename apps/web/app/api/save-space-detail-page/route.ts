import { NextResponse } from "next/server"

import {
  saveSpaceDetailPage,
  fetchSpaceDetailPage,
  deleteSpaceDetailPage,
} from "@/lib/space-detail-page-api"

import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      data: SpaceDetailPageApiData
      isNew: boolean
    }

    const saved = await saveSpaceDetailPage(body.data, body.isNew)

    return NextResponse.json({
      success: true,
      data: saved,
    })
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Space slug is required.",
        },
        { status: 400 }
      )
    }

    const data = await fetchSpaceDetailPage(slug)

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("[GET /api/save-space-detail-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Space detail page",
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
          message: "Space slug is required.",
        },
        { status: 400 }
      )
    }

    await deleteSpaceDetailPage(slug)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DELETE /api/save-space-detail-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete space page",
      },
      { status: 500 }
    )
  }
}
