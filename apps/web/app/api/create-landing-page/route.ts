import { NextResponse } from "next/server"
import { createLandingPage } from "@/lib/landing-page-api"
import { createEmptyLandingPage } from "@/lib/landing-page-defaults"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      pageName: string
      slug: string
    }

    if (!body.pageName || !body.slug) {
      return NextResponse.json(
        {
          success: false,
          message: "pageName and slug are both required",
        },
        { status: 400 }
      )
    }

    const blank = createEmptyLandingPage(body)
    const created = await createLandingPage(blank)

    return NextResponse.json({ success: true, data: created })
  } catch (err) {
    console.error("[POST /api/create-landing-page]", err)

    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}