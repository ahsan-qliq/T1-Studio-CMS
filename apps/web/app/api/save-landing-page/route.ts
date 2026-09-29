// import { NextResponse } from "next/server"

// import { saveLandingPage, fetchLandingPage } from "@/lib/landing-page-api"

// import type { LandingPageApiData } from "@/types/api-landing-page"

// export async function POST(request: Request) {
//   try {
//     const data = (await request.json()) as LandingPageApiData

//     await saveLandingPage(data)

//     return NextResponse.json({
//       success: true,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           error instanceof Error
//             ? error.message
//             : "Failed to save Landing page",
//       },
//       {
//         status: 500,
//       }
//     )
//   }
// }

// export async function GET() {
//   try {
//     const data = await fetchLandingPage()
//     return NextResponse.json(data)
//   } catch (error) {
//     console.error("[GET /api/save-landing-page]", error)
//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           error instanceof Error
//             ? error.message
//             : "Failed to fetch Landing page",
//       },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from "next/server"

import {
  saveLandingPage,
  fetchLandingPage,
  deleteLandingPage,
} from "@/lib/landing-page-api"

import type { LandingPageApiData } from "@/types/api-landing-page"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const data = body?.data as LandingPageApiData
    const isNew = Boolean(body?.isNew)

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Landing page data is required.",
        },
        { status: 400 }
      )
    }

    const savedData = await saveLandingPage(data, isNew)

    return NextResponse.json({
      success: true,
      data: savedData,
    })
  } catch (error) {
    console.error("[POST /api/save-landing-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to save Landing page",
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
          message: "Landing page slug is required.",
        },
        { status: 400 }
      )
    }

    const data = await fetchLandingPage(slug)

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("[GET /api/save-landing-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch Landing page",
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
          message: "Landing page slug is required.",
        },
        { status: 400 }
      )
    }

    await deleteLandingPage(slug)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DELETE /api/save-landing-page]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete Landing page",
      },
      { status: 500 }
    )
  }
}
