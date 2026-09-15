import { NextResponse } from "next/server"
import { cmsApiRawFetch } from "@/lib/cms-api-client"
import {
  getAuthTokens,
  setAuthCookies,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/auth"

type AuthAction = "register" | "login" | "refresh" | "logout" | "me"

interface AuthRouteProps {
  params: Promise<{ action: AuthAction }>
}

async function readBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json()
    return body && typeof body === "object" ? body : {}
  } catch {
    return {}
  }
}

async function proxyAuthRequest(
  action: AuthAction,
  request: Request,
  body: Record<string, unknown>
) {
  const tokens = await getAuthTokens()
  const headers = new Headers({ "Content-Type": "application/json" })
  const accessToken = tokens.accessToken

  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)

  const apiResponse = await cmsApiRawFetch(`/auth/${action}`, {
    method: request.method,
    headers,
    body: request.method === "GET" ? undefined : JSON.stringify(body),
  })
  const payload = await apiResponse.json()
  const response = NextResponse.json(payload, { status: apiResponse.status })

  if (action === "login" || action === "refresh") {
    const data = payload?.data as
      | { accessToken?: string; refreshToken?: string }
      | undefined
    setAuthCookies(response, data ?? {})
  }

  if (action === "logout") {
    response.cookies.delete(ACCESS_TOKEN_COOKIE)
    response.cookies.delete(REFRESH_TOKEN_COOKIE)
  }

  return response
}

export async function POST(request: Request, { params }: AuthRouteProps) {
  const { action } = await params
  if (!["register", "login", "refresh", "logout"].includes(action)) {
    return NextResponse.json({ success: false, message: "Unsupported auth action" }, { status: 404 })
  }

  const body = await readBody(request)
  const tokens = await getAuthTokens()
  if (action === "refresh" && !body.refreshToken && tokens.refreshToken) {
    body.refreshToken = tokens.refreshToken
  }

  try {
    return await proxyAuthRequest(action, request, body)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Authentication request failed" },
      { status: 502 }
    )
  }
}

export async function GET(request: Request, { params }: AuthRouteProps) {
  const { action } = await params
  if (action !== "me") {
    return NextResponse.json({ success: false, message: "Unsupported auth action" }, { status: 404 })
  }

  try {
    return await proxyAuthRequest(action, request, {})
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Authentication request failed" },
      { status: 502 }
    )
  }
}
