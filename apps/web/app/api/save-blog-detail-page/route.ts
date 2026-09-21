import { NextResponse } from "next/server"

import {
  saveBlogDetailPage,
  fetchBlogDetailPage,
} from "@/lib/blog-detail-page-api"

import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const data = body?.data as BlogDetailPageApiData
    const isNew = Boolean(body?.isNew)

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog data is required.",
        },
        { status: 400 }
      )
    }

    const savedData = await saveBlogDetailPage(data, isNew)

    return NextResponse.json({
      success: true,
      data: savedData,
    })
  } catch (error) {
    console.error("[POST /api/save-blog-detail-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save Blog detail page",
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
          message: "Blog slug is required.",
        },
        { status: 400 }
      )
    }

    const data = await fetchBlogDetailPage(slug)

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("[GET /api/save-blog-detail-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Blog detail page",
      },
      { status: 500 }
    )
  }
}
