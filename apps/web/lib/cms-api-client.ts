import { getAuthTokens } from "./auth"

const configuredBaseUrl = process.env.CMS_API_BASE_URL ?? "http://localhost:5000/api"

export const CMS_API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "").endsWith("/api")
  ? configuredBaseUrl.replace(/\/+$/, "")
  : `${configuredBaseUrl.replace(/\/+$/, "")}/api`

async function getHeaders(headers?: HeadersInit): Promise<Headers> {
  const result = new Headers(headers)
  let accessToken = process.env.CMS_ACCESS_TOKEN
  accessToken = (await getAuthTokens()).accessToken ?? accessToken

  if (accessToken && !result.has("Authorization")) {
    result.set("Authorization", `Bearer ${accessToken}`)
  }

  return result
}

export async function cmsApiRawFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${CMS_API_BASE_URL}${path}`, {
    ...init,
    headers: await getHeaders(init?.headers),
  })
}

export async function cmsApiFetch(path: string, init?: RequestInit): Promise<Response> {
  const response = await cmsApiRawFetch(path, init)
  if (!response.ok) {
    let message = `CMS API request failed (${response.status})`

    try {
      const payload = (await response.clone().json()) as {
        message?: string
      }
      if (payload.message) message = payload.message
    } catch {
      // Preserve the status-based error when the API does not return JSON.
    }

    throw new Error(message)
  }

  return response
}

export async function cmsApiJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await cmsApiFetch(path, init)
  const payload = (await response.json()) as { success?: boolean; data?: T; message?: string }

  if (!payload.success || payload.data === undefined) {
    throw new Error(payload.message ?? "Unexpected CMS API response shape")
  }

  return payload.data
}
