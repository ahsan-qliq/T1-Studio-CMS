import { NextResponse } from "next/server"
import { createCmsAuthInstance } from "@/lib/auth-instance"
import {
  getAuthTokens,
  setAuthCookies,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  AUTH_USER_COOKIE,
  setAuthUserCookie,
  DEV_ACCESS_TOKEN,
  isDevAuthBypassEnabled,
} from "@/lib/auth"

type AuthAction = "register" | "login" | "refresh" | "logout" | "me"

interface AuthRouteProps {
  params: Promise<{ action: string }>
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
  const { accessToken } = await getAuthTokens()
  const client = createCmsAuthInstance(accessToken)
  const apiResponse = await client.request({
    url: `/auth/${action}`,
    method: request.method,
    data: request.method === "GET" ? undefined : body,
    validateStatus: () => true,
  })
  const response = NextResponse.json(apiResponse.data, { status: apiResponse.status })

  if (action === "login" || action === "refresh") {
    const data = apiResponse.data?.data as
      | { accessToken?: string; refreshToken?: string }
      | undefined
    setAuthCookies(response, data ?? {})
    const user = apiResponse.data?.data?.user
    if (user) setAuthUserCookie(response, user)
  }

  if (action === "logout") {
    response.cookies.delete(ACCESS_TOKEN_COOKIE)
    response.cookies.delete(REFRESH_TOKEN_COOKIE)
    response.cookies.delete(AUTH_USER_COOKIE)
  }

  return response
}

function isAuthAction(action: string): action is AuthAction {
  return ["register", "login", "refresh", "logout", "me"].includes(action)
}

export async function POST(request: Request, { params }: AuthRouteProps) {
  const { action } = await params
  if (!isAuthAction(action) || action === "me") {
    return NextResponse.json(
      { success: false, message: "Unsupported auth action" },
      { status: 404 }
    )
  }

  const body = await readBody(request)
  if ((action === "login" || action === "register") && isDevAuthBypassEnabled()) {
    const accessToken = process.env.CMS_ACCESS_TOKEN ?? DEV_ACCESS_TOKEN
    const response = NextResponse.json({
      success: true,
      data: {
        accessToken,
        refreshToken: "dev-refresh-token",
        user: {
          id: "dev-user",
          name: body.name ?? "Development Admin",
          email: body.email ?? "dev@example.com",
          role: "admin",
        },
      },
    })
    response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
    setAuthUserCookie(response, {
      id: "dev-user",
      name: String(body.name ?? body.email ?? "Development Admin"),
      email: String(body.email ?? "dev@example.com"),
      role: "admin",
    })
    return response
  }

  const tokens = await getAuthTokens()
  if (action === "refresh" && !body.refreshToken && tokens.refreshToken) {
    body.refreshToken = tokens.refreshToken
  }

  try {
    return await proxyAuthRequest(action, request, body)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Authentication request failed",
      },
      { status: 502 }
    )
  }
}

export async function GET(request: Request, { params }: AuthRouteProps) {
  const { action } = await params
  if (action !== "me") {
    return NextResponse.json(
      { success: false, message: "Unsupported auth action" },
      { status: 404 }
    )
  }

  try {
    return await proxyAuthRequest(action, request, {})
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Authentication request failed",
      },
      { status: 502 }
    )
  }
}
