import type { AxiosRequestConfig, AxiosResponse } from "axios"
import { getAuthTokens } from "./auth"
import { createCmsAuthInstance } from "./auth-instance"

function toApiValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(toApiValue)
  if (!value || typeof value !== "object") return value

  const object = value as Record<string, unknown>
  if ("url" in object && "alt" in object && typeof object.url === "string") {
    return { src: object.url, alt: toApiValue(object.alt) }
  }

  const aliases: Record<string, string> = {
    images: "items",
    materials: "items",
    brands: "items",
    projects: "items",
    steps: "items",
    faqs: "items",
    spaces: "items",
  }
  return Object.fromEntries(
    Object.entries(object)
      .filter(([key, entry]) => !(key === "_id" && typeof entry === "string" && entry.startsWith("tmp-")))
      .map(([key, entry]) => [aliases[key] ?? key, toApiValue(entry)])
  )
}

function fromApiValue(value: unknown, parentKey?: string): unknown {
  if (Array.isArray(value)) return value.map((entry) => fromApiValue(entry))
  if (!value || typeof value !== "object") return value

  const object = value as Record<string, unknown>
  if ("src" in object && "alt" in object && typeof object.src === "string" && !("url" in object)) {
    return { url: object.src, key: typeof object.key === "string" ? object.key : "", alt: fromApiValue(object.alt) }
  }

  const aliases: Record<string, string> = {
    gallery: "images",
    materials: "materials",
    brands: "brands",
    relatedProjects: "projects",
    journey: "steps",
    faq: "faqs",
    relatedSpaces: "spaces",
    projects: "projects",
    process: "steps",
  }
  return Object.fromEntries(Object.entries(object).map(([key, entry]) => [
    aliases[parentKey ?? ""] && key === "items" ? aliases[parentKey ?? ""] : key,
    fromApiValue(entry, key),
  ]))
}

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
  const response = await client.request({
    ...init,
    url: path,
    data: init?.data === undefined ? undefined : toApiValue(init.data),
    validateStatus: () => true,
  })

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

  return fromApiValue(payload.data) as T
}
