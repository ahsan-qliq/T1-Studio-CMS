import { NextResponse } from "next/server"
import { saveAboutPage } from "@/lib/about-page-api"
import type { AboutPageApiData } from "@/types/api-about-page"

export async function POST(request: Request) {
  try {
    await saveAboutPage((await request.json()) as AboutPageApiData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to save About page",
      },
      { status: 500 }
    )
  }
}
