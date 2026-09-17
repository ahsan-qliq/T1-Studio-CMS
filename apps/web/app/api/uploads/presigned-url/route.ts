import { NextResponse } from "next/server"
import { getPresignedUploadUrl } from "@/lib/uploads-api"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const fileName = body?.fileName as string | undefined
    const contentType = body?.contentType as string | undefined

    if (!fileName || !contentType) {
      return NextResponse.json(
        {
          success: false,
          message: "fileName and contentType are required.",
        },
        { status: 400 }
      )
    }

    const presigned = await getPresignedUploadUrl(fileName, contentType)

    return NextResponse.json({
      success: true,
      data: presigned,
    })
  } catch (error) {
    console.error("Failed to get presigned upload URL:", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get presigned upload URL",
      },
      { status: 500 }
    )
  }
}
