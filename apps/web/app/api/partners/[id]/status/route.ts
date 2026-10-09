import { NextResponse } from "next/server"
import { cmsApiFetch } from "@/lib/cms-api-client"
import type { EmailPayload } from "@/app/api/send-email/route"

const VALID_CATEGORIES = ["trade", "referral"] as const
const VALID_STATUSES = ["pending", "accepted", "rejected"] as const

type PartnerCategory = (typeof VALID_CATEGORIES)[number]
type PartnerStatus = (typeof VALID_STATUSES)[number]

interface UpdateStatusBody {
  category: PartnerCategory
  status: PartnerStatus
  /** Email address of the applicant to notify */
  email: string
}

interface RouteProps {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const { id } = await params

  let body: UpdateStatusBody
  try {
    body = (await request.json()) as UpdateStatusBody
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    )
  }

  const { category, status, email } = body

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { success: false, message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` },
      { status: 400 }
    )
  }

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { success: false, message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    )
  }

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Missing required field: email" },
      { status: 400 }
    )
  }

  // Proxy status update to the CMS backend
  try {
    await cmsApiFetch(`/partners/${id}/status`, {
      method: "PATCH",
      data: { category, status },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update partner status",
      },
      { status: 502 }
    )
  }

  // Send email notification only on accept/reject (not on pending)
  if (status === "accepted" || status === "rejected") {
    try {
      const emailPayload: EmailPayload = {
        to: email,
        category,
        status,
        submissionId: id,
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.APP_URL ||
        "http://localhost:3000"

      const emailRes = await fetch(`${baseUrl}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      })

      if (!emailRes.ok) {
        console.error("[partners/status] Email notification failed", await emailRes.text())
      }
    } catch (emailError) {
      // Non-fatal: log but don't fail the status update
      console.error("[partners/status] Email notification error:", emailError)
    }
  }

  return NextResponse.json({
    success: true,
    message: `Partner ${id} status updated to "${status}"`,
  })
}
