import { NextResponse } from "next/server"

import { getPresignedUploadUrl } from "@/lib/uploads-api"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const fileName =
      typeof body?.fileName === "string" ? body.fileName.trim() : ""

    const contentType =
      typeof body?.contentType === "string" ? body.contentType.trim() : ""

    if (!fileName || !contentType) {
      return NextResponse.json(
        {
          success: false,
          message: "fileName and contentType are required.",
        },
        { status: 400 }
      )
    }

    /*
     * Keep this restricted to images because this endpoint
     * is used by the CMS image fields.
     */
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPG, PNG and WEBP images are supported.",
        },
        { status: 400 }
      )
    }

    const presigned = await getPresignedUploadUrl(fileName, contentType)

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl: presigned.uploadUrl,
        key: presigned.key,
      },
    })
  } catch (error) {
    console.error("[POST /api/uploads/presigned-url]", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get presigned upload URL.",
      },
      { status: 500 }
    )
  }
}
