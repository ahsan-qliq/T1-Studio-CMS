import { NextResponse } from "next/server"
import { saveHomePage } from "@/lib/home-page-api"
import type { HomePageSections } from "@/types/api-home-page"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { sections: HomePageSections }
    await saveHomePage(body.sections, Boolean((body as { _id?: string })._id))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[POST /api/save-home-page]", err)
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
