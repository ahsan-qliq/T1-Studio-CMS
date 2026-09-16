// import type { SpaceDetailPageApiData, SpaceDetailPageApiResponse } from "@/types/api-space-detail-page"

// const API_BASE_URL = process.env.CMS_API_BASE_URL ?? "http://localhost:3000"

// /**
//  * Fetches a Space Detail page by slug. The documented GET endpoint also
//  * accepts a `lang` param — this deliberately omits it since the editor
//  * needs both EN and AR at once. If your backend requires `lang` and
//  * returns only one language per request, this needs two merged requests.
//  */
// export async function fetchSpaceDetailPage(slug: string): Promise<SpaceDetailPageApiData> {
//   const res = await fetch(`${API_BASE_URL}/api/space-detail-page?slug=${encodeURIComponent(slug)}`, {
//     cache: "no-store",
//   })
//   if (!res.ok) throw new Error(`Failed to fetch space detail page "${slug}" (${res.status})`)

//   const json = (await res.json()) as SpaceDetailPageApiResponse
//   if (!json.success || !json.data) throw new Error("Unexpected API response shape")

//   return json.data
// }

// /**
//  * Saves a Space Detail page. Uses PATCH when the record already has an _id
//  * (an update), POST when it doesn't (first-time creation).
//  */
// export async function saveSpaceDetailPage(data: SpaceDetailPageApiData): Promise<void> {
//   const method = data._id ? "PATCH" : "POST"
//   const res = await fetch(`${API_BASE_URL}/api/space-detail-page`, {
//     method,
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//   if (!res.ok) throw new Error(`Failed to save space detail page (${res.status})`)
// }

import type {
  SpaceDetailPageApiData,
  SpaceDetailPageApiResponse,
} from "@/types/api-space-detail-page"

const API_BASE_URL = process.env.CMS_API_BASE_URL ?? "http://localhost:4000"

/**
 * Fetches a Space Detail page by slug. The documented GET endpoint also
 * accepts a `lang` param — this deliberately omits it since the editor
 * needs both EN and AR at once. If your backend requires `lang` and
 * returns only one language per request, this needs two merged requests.
 */
export async function fetchSpaceDetailPage(
  slug: string
): Promise<SpaceDetailPageApiData> {
  const params = new URLSearchParams({ slug })
  const res = await fetch(`${API_BASE_URL}/api/space-detail-page?${params}`, {
    cache: "no-store",
  })
  if (!res.ok)
    throw new Error(
      `Failed to fetch space detail page "${slug}" (${res.status})`
    )

  const json = (await res.json()) as SpaceDetailPageApiResponse
  if (!json.success || !json.data)
    throw new Error("Unexpected API response shape")

  return json.data
}

/**
 * Saves a Space Detail page. Uses PATCH when the record already has an _id
 * (an update), POST when it doesn't (first-time creation).
 */
export async function saveSpaceDetailPage(
  data: SpaceDetailPageApiData
): Promise<void> {
  const method = data._id ? "PATCH" : "POST"
  const url = new URL(`${API_BASE_URL}/api/space-detail-page`)
  if (method === "PATCH") {
    url.searchParams.set("slug", data.slug)
  }

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const message = await getApiErrorMessage(
      res,
      "Failed to save space detail page"
    )
    throw new Error(`${message} (${res.status})`)
  }
}

async function getApiErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const body = (await response.json()) as { message?: unknown }
    return typeof body.message === "string" ? body.message : fallback
  } catch {
    return fallback
  }
}
