import type { AxiosRequestConfig, AxiosResponse } from "axios"
import { getAuthTokens } from "./auth"
import { createCmsAuthInstance } from "./auth-instance"

function getMessage(response: AxiosResponse): string {
  const payload = response.data as { message?: string } | undefined
  return payload?.message ?? `CMS API request failed (${response.status})`
}

export async function cmsApiFetch(
  path: string,
  init?: AxiosRequestConfig
): Promise<AxiosResponse> {
  const { accessToken } = await getAuthTokens()
  const client = createCmsAuthInstance(accessToken ?? process.env.CMS_ACCESS_TOKEN)
  const response = await client.request({ ...init, url: path, validateStatus: () => true })

  if (response.status < 200 || response.status >= 300) {
    throw new Error(getMessage(response))
  }

  return response
}

export async function cmsApiJson<T>(
  path: string,
  init?: AxiosRequestConfig
): Promise<T> {
  const response = await cmsApiFetch(path, init)
  const payload = response.data as { success?: boolean; data?: T; message?: string }

  if (!payload.success || payload.data === undefined) {
    throw new Error(payload.message ?? "Unexpected CMS API response shape")
  }

  return payload.data
}
