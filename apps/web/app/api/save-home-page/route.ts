import { NextResponse } from "next/server"
import { saveHomePage } from "@/lib/home-page-api"
import type { HomePageSections } from "@/types/api-home-page"

function removeTemporaryIds(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(removeTemporaryIds)
  if (!value || typeof value !== "object") return value

  const result: Record<string, unknown> = {}
  for (const [key, entry] of Object.entries(value)) {
    if (key === "_id" && typeof entry === "string" && entry.startsWith("tmp-")) {
      continue
    }
    result[key] = removeTemporaryIds(entry)
  }
  return result
}

export async function POST(request: Request) {
  try {
    const rawBody = (await request.json()) as {
      _id?: string
      sections: HomePageSections
    }
    const body = removeTemporaryIds(rawBody) as typeof rawBody
    await saveHomePage(body.sections, Boolean(body._id))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[POST /api/save-home-page]", err)
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}
