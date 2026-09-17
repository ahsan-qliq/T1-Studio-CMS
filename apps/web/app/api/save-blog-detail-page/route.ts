import { NextResponse } from "next/server"
import { saveBlogDetailPage } from "@/lib/blog-detail-page-api"
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
    console.error("Failed to save Blog detail page:", error)

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
