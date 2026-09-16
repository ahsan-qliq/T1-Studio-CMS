import { NextResponse } from "next/server"
import { saveBlogDetailPage } from "@/lib/blog-detail-page-api"
export async function POST(request: Request) {
  try { await saveBlogDetailPage(await request.json()); return NextResponse.json({ success: true }) }
  catch (error) { return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Failed to save Blog detail page" }, { status: 500 }) }
}
