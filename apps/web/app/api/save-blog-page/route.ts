import { NextResponse } from "next/server"
import { saveBlogPage, fetchBlogPage } from "@/lib/blog-page-api"
export async function POST(request: Request) {
  try {
    await saveBlogPage(await request.json())
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to save Blog page",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchBlogPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-blog-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch Blog page",
      },
      { status: 500 }
    )
  }
}
