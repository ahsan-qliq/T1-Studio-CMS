import { NextResponse } from "next/server"

export type EmailPayload = {
  to: string
  category: "trade" | "referral"
  status: "accepted" | "rejected"
  submissionId: string
}

// TODO: Replace with real email service (e.g. Resend, SendGrid, Nodemailer)
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EmailPayload

    const { to, category, status, submissionId } = body

    if (!to || !category || !status || !submissionId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: to, category, status, submissionId" },
        { status: 400 }
      )
    }

    // Dummy: log what would be sent
    console.log("[send-email] Would send email:", {
      to,
      subject: `Your ${category} application has been ${status}`,
      body: `Your ${category} submission (ID: ${submissionId}) has been ${status} by an admin.`,
    })

    return NextResponse.json({
      success: true,
      message: `Email notification queued for ${to}`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    )
  }
}
