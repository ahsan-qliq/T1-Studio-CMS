import { NextResponse } from "next/server"
import { saveContactPage, fetchContactPage } from "@/lib/contact-page-api"
import type { ContactPageApiData } from "@/types/api-contact-page"

export async function POST(request: Request) {
  try {
    await saveContactPage((await request.json()) as ContactPageApiData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save Contact page",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await fetchContactPage()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[GET /api/save-contact-page]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Contact page",
      },
      { status: 500 }
    )
  }
}
