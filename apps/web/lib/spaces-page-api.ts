// import type { SpacesPageApiData, SpacesPageApiResponse } from "@/types/api-spaces-page"

// const API_BASE_URL = process.env.CMS_API_BASE_URL ?? "http://localhost:3000"

// /** Fetches the Spaces page exactly as the API returns it — no mapping. */
// export async function fetchSpacesPage(): Promise<SpacesPageApiData> {
//   const res = await fetch(`${API_BASE_URL}/api/spaces-page?slug=spaces`, { cache: "no-store" })
//   if (!res.ok) throw new Error(`Failed to fetch spaces page (${res.status})`)

//   const json = (await res.json()) as SpacesPageApiResponse
//   if (!json.success || !json.data) throw new Error("Unexpected API response shape")

//   return json.data
// }

// /**
//  * Saves the Spaces page. Uses PATCH when the record already has an _id
//  * (an update), POST when it doesn't (first-time creation).
//  */
// export async function saveSpacesPage(data: SpacesPageApiData): Promise<void> {
//   const method = data._id ? "PATCH" : "POST"
//   const res = await fetch(`${API_BASE_URL}/api/spaces-page`, {
//     method,
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//   if (!res.ok) throw new Error(`Failed to save spaces page (${res.status})`)
// }

import type {
  SpacesPageApiData,
  SpacesPageApiResponse,
} from "@/types/api-spaces-page"

const API_BASE_URL = process.env.CMS_API_BASE_URL ?? "http://localhost:5000"

/** Fetches the Spaces page exactly as the API returns it — no mapping. */
export async function fetchSpacesPage(): Promise<SpacesPageApiData> {
  const params = new URLSearchParams({ slug: "spaces" })
  const res = await fetch(`${API_BASE_URL}/api/spaces-page?${params}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Failed to fetch spaces page (${res.status})`)

  const json = (await res.json()) as SpacesPageApiResponse
  if (!json.success || !json.data)
    throw new Error("Unexpected API response shape")

  return json.data
}

/**
 * Saves the Spaces page. Uses PATCH when the record already has an _id
 * (an update), POST when it doesn't (first-time creation).
 */
export async function saveSpacesPage(data: SpacesPageApiData): Promise<void> {
  const method = data._id ? "PATCH" : "POST"
  const url = new URL(`${API_BASE_URL}/api/spaces-page`)
  if (method === "PATCH") {
    url.searchParams.set("slug", data.slug)
  }

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const message = await getApiErrorMessage(res, "Failed to save spaces page")
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
