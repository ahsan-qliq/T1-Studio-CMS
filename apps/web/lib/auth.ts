import { cookies } from "next/headers"
import type { NextResponse } from "next/server"

export const ACCESS_TOKEN_COOKIE = "t1_access_token"
export const REFRESH_TOKEN_COOKIE = "t1_refresh_token"

export function isDevAuthBypassEnabled() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.CMS_DEV_AUTH_BYPASS === "true" &&
    Boolean(process.env.CMS_ACCESS_TOKEN)
  )
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
      (isDevAuthBypassEnabled() ? process.env.CMS_ACCESS_TOKEN : undefined),
    refreshToken: store.get(REFRESH_TOKEN_COOKIE)?.value,
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
