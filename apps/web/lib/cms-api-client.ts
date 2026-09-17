import type { AxiosRequestConfig, AxiosResponse } from "axios"

import { getAuthTokens } from "./auth"
import { createCmsAuthInstance } from "./auth-instance"

/**
 * Convert frontend form values into the format expected
 * by the CMS API.
 *
 * Frontend image:
 *
 * {
 *   url: "...",
 *   key: "uploads/abc.jpg",
 *   alt: {
 *     en: "...",
 *     ar: "..."
 *   }
 * }
 *
 * API image:
 *
 * {
 *   src: "...",
 *   key: "uploads/abc.jpg",
 *   alt: {
 *     en: "...",
 *     ar: "..."
 *   }
 * }
 */
function toApiValue(value: unknown): unknown {
  /*
   * Handle arrays recursively.
   */
  if (Array.isArray(value)) {
    return value.map(toApiValue)
  }

  /*
   * Primitive values can be returned as-is.
   */
  if (!value || typeof value !== "object") {
    return value
  }

  const object = value as Record<string, unknown>

  /*
   * IMAGE TRANSFORMATION
   *
   * Frontend:
   * {
   *   url,
   *   key,
   *   alt
   * }
   *
   * Backend:
   * {
   *   src,
   *   key,
   *   alt
   * }
   *
   * IMPORTANT:
   * The old code was dropping `key`.
   *
   * That meant the upload itself succeeded, but when
   * the form was saved the S3 key was lost.
   */
  if ("url" in object && "alt" in object && typeof object.url === "string") {
    return {
      src: object.url,

      /*
       * Preserve the S3 key when it exists.
       */
      ...(typeof object.key === "string" && object.key
        ? {
            key: object.key,
          }
        : {}),

      alt: toApiValue(object.alt),
    }
  }

  /*
   * Frontend field names that are converted to the
   * generic `items` structure expected by the API.
   */
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
      /*
       * Temporary frontend IDs should never be sent
       * to the backend.
       */
      .filter(
        ([key, entry]) =>
          !(
            key === "_id" &&
            typeof entry === "string" &&
            entry.startsWith("tmp-")
          )
      )
      .map(([key, entry]) => [aliases[key] ?? key, toApiValue(entry)])
  )
}

/**
 * Convert CMS API values back into the frontend form shape.
 *
 * API:
 *
 * {
 *   src: "...",
 *   key: "uploads/abc.jpg",
 *   alt: {...}
 * }
 *
 * Frontend:
 *
 * {
 *   url: "...",
 *   key: "uploads/abc.jpg",
 *   alt: {...}
 * }
 */
function fromApiValue(value: unknown, parentKey?: string): unknown {
  /*
   * Handle arrays recursively.
   */
  if (Array.isArray(value)) {
    return value.map((entry) => fromApiValue(entry))
  }

  /*
   * Primitive values can be returned as-is.
   */
  if (!value || typeof value !== "object") {
    return value
  }

  const object = value as Record<string, unknown>

  /*
   * IMAGE TRANSFORMATION
   *
   * API:
   * {
   *   src,
   *   key,
   *   alt
   * }
   *
   * Frontend:
   * {
   *   url,
   *   key,
   *   alt
   * }
   */
  if (
    "src" in object &&
    "alt" in object &&
    typeof object.src === "string" &&
    !("url" in object)
  ) {
    return {
      url: object.src,

      /*
       * Preserve the S3 key.
       *
       * If an older record doesn't have a key,
       * return an empty string so the frontend
       * image type remains consistent.
       */
      key: typeof object.key === "string" ? object.key : "",

      alt: fromApiValue(object.alt),
    }
  }

  /*
   * Convert backend collection names back into
   * the names expected by the frontend forms.
   */
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

  return Object.fromEntries(
    Object.entries(object).map(([key, entry]) => [
      aliases[parentKey ?? ""] && key === "items"
        ? aliases[parentKey ?? ""]
        : key,

      fromApiValue(entry, key),
    ])
  )
}

/**
 * Extract a useful error message from an Axios response.
 */
function getMessage(response: AxiosResponse): string {
  const payload = response.data as
    | {
        message?: string
      }
    | undefined

  return payload?.message ?? `CMS API request failed (${response.status})`
}

/**
 * Generic CMS API request.
 *
 * This:
 *
 * - gets the current auth token
 * - creates the authenticated Axios instance
 * - transforms frontend form data into API data
 * - performs the request
 * - throws an error for non-2xx responses
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

    /*
     * Only transform data when data actually exists.
     */
    data: init?.data === undefined ? undefined : toApiValue(init.data),

    /*
     * We handle status codes ourselves so that
     * we can return the API's actual error message.
     */
    validateStatus: () => true,
  })

  if (response.status < 200 || response.status >= 300) {
    throw new Error(getMessage(response))
  }

  return response
}

/**
 * CMS API helper for endpoints that return:
 *
 * {
 *   success: true,
 *   data: ...
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

  if (!payload.success || payload.data === undefined) {
    throw new Error(payload.message ?? "Unexpected CMS API response shape")
  }

  /*
   * Transform API image objects back into
   * the frontend image structure.
   */
  return fromApiValue(payload.data) as T
}
