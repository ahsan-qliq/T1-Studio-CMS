import { NextResponse } from "next/server"
import { saveLandingPage } from "@/lib/landing-page-api"
export async function POST(request: Request) {
  try { await saveLandingPage(await request.json()); return NextResponse.json({ success: true }) }
  catch (error) { return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Failed to save Landing page" }, { status: 500 }) }
}
