import { cookies } from "next/headers"
import type { NextResponse } from "next/server"

export const ACCESS_TOKEN_COOKIE = "t1_access_token"
export const REFRESH_TOKEN_COOKIE = "t1_refresh_token"
export const AUTH_USER_COOKIE = "t1_auth_user"
export const DEV_ACCESS_TOKEN = "dev-access-token"

export function isDevAuthBypassEnabled() {
  return process.env.NODE_ENV !== "production" && process.env.CMS_DEV_AUTH_BYPASS === "true"
}

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
}

export async function getAuthTokens() {
  const store = await cookies()
  return {
    accessToken:
      store.get(ACCESS_TOKEN_COOKIE)?.value ??
      (isDevAuthBypassEnabled()
        ? process.env.CMS_ACCESS_TOKEN ?? DEV_ACCESS_TOKEN
        : undefined),
    refreshToken: store.get(REFRESH_TOKEN_COOKIE)?.value,
  }
}

export async function getAuthenticatedUser() {
  const store = await cookies()
  const value = store.get(AUTH_USER_COOKIE)?.value
  if (!value) return undefined
  try {
    return JSON.parse(decodeURIComponent(value)) as {
      id?: string
      name?: string
      email?: string
      role?: string
      avatar?: string
    }
  } catch {
    return undefined
  }
}

export function setAuthCookies(
  response: NextResponse,
  tokens: { accessToken?: string; refreshToken?: string },
) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken ?? "", {
    ...cookieOptions,
    maxAge: tokens.accessToken ? 60 * 15 : 0,
  })
  response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken ?? "", {
    ...cookieOptions,
    maxAge: tokens.refreshToken ? 60 * 60 * 24 * 7 : 0,
  })
}

export function setAuthUserCookie(
  response: NextResponse,
  user?: { id?: string; name?: string; email?: string; role?: string; avatar?: string }
) {
  response.cookies.set(AUTH_USER_COOKIE, user ? encodeURIComponent(JSON.stringify(user)) : "", {
    ...cookieOptions,
    maxAge: user ? 60 * 60 * 24 * 7 : 0,
  })
}
