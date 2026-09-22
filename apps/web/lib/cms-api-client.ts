import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"
import { getAuthTokens } from "@/lib/auth"

/**
 * Convert frontend CMS data to the exact API structure.
 *
 * IMPORTANT:
 * - No collection/field aliases are used.
 * - Field names are preserved exactly as provided.
 * - Frontend image shape: { url, key, alt }
 * - API image shape:       { src, key, alt }
 * - Temporary React field-array IDs (tmp-...) are removed.
 */
function toApiValue(value: unknown): unknown {
  // Arrays are preserved exactly
  if (Array.isArray(value)) {
    return value.map((entry) => toApiValue(entry))
  }

  // Primitive values
  if (!value || typeof value !== "object") {
    return value
  }

  const object = value as Record<string, unknown>

  /**
   * Frontend image:
   *
   * {
   *   url: "",
   *   key: "",
   *   alt: {
   *     en: "",
   *     ar: ""
   *   }
   * }
   *
   * API:
   *
   * {
   *   src: "",
   *   key: "",
   *   alt: {
   *     en: "",
   *     ar: ""
   *   }
   * }
   */
  if ("url" in object && "alt" in object && typeof object.url === "string") {
    return {
      src: object.url,
      ...(typeof object.key === "string" && object.key
        ? {
            key: object.key,
          }
        : {}),
      alt: toApiValue(object.alt),
    }
  }

  /**
   * Preserve every field name exactly.
   *
   * Examples:
   * spaces  -> spaces
   * projects -> projects
   * steps -> steps
   * faqs -> faqs
   * gallery -> gallery
   * items -> items
   */
  return Object.fromEntries(
    Object.entries(object)
      // Remove only temporary frontend IDs.
      // Keep real MongoDB _id values untouched.
      .filter(
        ([key, entry]) =>
          !(
            key === "_id" &&
            typeof entry === "string" &&
            entry.startsWith("tmp-")
          )
      )
      .map(([key, entry]) => [key, toApiValue(entry)])
  )
}

/**
 * Convert API CMS data back to the frontend structure.
 *
 * API image:
 * {
 *   src: "",
 *   key: "",
 *   alt: {
 *     en: "",
 *     ar: ""
 *   }
 * }
 *
 * Frontend image:
 * {
 *   url: "",
 *   key: "",
 *   alt: {
 *     en: "",
 *     ar: ""
 *   }
 * }
 *
 * No collection aliases are applied.
 */
function fromApiValue(value: unknown): unknown {
  // Preserve arrays
  if (Array.isArray(value)) {
    return value.map((entry) => fromApiValue(entry))
  }

  // Primitive values
  if (!value || typeof value !== "object") {
    return value
  }

  const object = value as Record<string, unknown>

  /**
   * API image -> frontend image
   */
  if (
    "src" in object &&
    "alt" in object &&
    typeof object.src === "string" &&
    !("url" in object)
  ) {
    return {
      url: object.src,
      key: typeof object.key === "string" ? object.key : "",
      alt: fromApiValue(object.alt),
    }
  }

  /**
   * Preserve every API field name exactly.
   */
  return Object.fromEntries(
    Object.entries(object).map(([key, entry]) => [key, fromApiValue(entry)])
  )
}

/**
 * Extract a useful error message from the API response.
 */
function getMessage(response: AxiosResponse): string {
  const data = response?.data

  if (typeof data === "string" && data.trim()) {
    return data
  }

  if (data && typeof data === "object") {
    const message = (data as { message?: unknown }).message

    if (typeof message === "string" && message.trim()) {
      return message
    }

    const error = (data as { error?: unknown }).error

    if (typeof error === "string" && error.trim()) {
      return error
    }

    if (
      error &&
      typeof error === "object" &&
      typeof (error as { message?: unknown }).message === "string"
    ) {
      return (error as { message: string }).message
    }
  }

  return `CMS API request failed with status ${response?.status ?? "unknown"}`
}

/**
 * Create authenticated CMS API client.
 */
function createCmsAuthInstance(accessToken?: string) {
  const baseURL =
    process.env.NEXT_PUBLIC_CMS_API_URL ||
    process.env.CMS_API_URL ||
    "https://2gns9fe744.execute-api.ap-south-1.amazonaws.com/api"

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {}),
    },
  })
}

/**
 * Generic CMS API request.
 *
 * IMPORTANT:
 * There is intentionally NO skipAliases option anymore.
 * The API field names are sent exactly as provided.
 */
export async function cmsApiFetch(
  path: string,
  init?: AxiosRequestConfig
): Promise<AxiosResponse> {
  const { accessToken } = await getAuthTokens()

  const client = createCmsAuthInstance(
    accessToken ?? process.env.CMS_ACCESS_TOKEN
  )

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

/**
 * CMS API request that returns the `data` property.
 *
 * API response expected:
 *
 * {
 *   success: true,
 *   data: {...},
 *   message: "..."
 * }
 */
export async function cmsApiJson<T>(
  path: string,
  init?: AxiosRequestConfig
): Promise<T> {
  const response = await cmsApiFetch(path, init)

  const payload = response.data as {
    success?: boolean
    data?: T
    message?: string
  }

  if (payload.success === false || payload.data === undefined) {
    throw new Error(payload.message ?? "Unexpected CMS API response shape")
  }

  return fromApiValue(payload.data) as T
}
