// import type { LandingPageApiData } from "@/types/api-landing-page"

// import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

// export function fetchLandingPage(slug = "landing-dubai") {
//   return cmsApiJson<LandingPageApiData>(
//     `/landing-page?slug=${encodeURIComponent(slug)}`
//   )
// }

// export function saveLandingPage(data: LandingPageApiData) {
//   return cmsApiFetch(
//     `/landing-page${data._id ? `?slug=${encodeURIComponent(data.slug)}` : ""}`,
//     {
//       method: data._id ? "PATCH" : "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       data,
//     }
//   )
// }

import type { LandingPageApiData } from "@/types/api-landing-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

/**
 * Fetch a Landing page by slug.
 */
export function fetchLandingPage(slug: string) {
  return cmsApiJson<LandingPageApiData>(
    `/landing-page?slug=${encodeURIComponent(slug)}`
  )
}

/**
 * Fetch ALL Landing pages.
 *
 * Used by the CMS sidebar and the Landing Pages
 * list/manager to show every campaign page.
 */
export async function fetchAllLandingPages(): Promise<LandingPageApiData[]> {
  const response = await cmsApiJson<
    | LandingPageApiData[]
    | {
        data?: LandingPageApiData[]
        pages?: LandingPageApiData[]
      }
  >("/landing-page")

  if (Array.isArray(response)) {
    return response
  }

  return response.data ?? response.pages ?? []
}

/**
 * Save a Landing page.
 *
 * PATCH = existing page (_id exists, or isNew explicitly
 *         resolves to an existing slug)
 * POST  = new page
 */
export async function saveLandingPage(
  data: LandingPageApiData,
  isNew?: boolean
): Promise<LandingPageApiData> {
  const slug = data.slug.trim()

  if (!slug) {
    throw new Error("Landing page slug is required.")
  }

  if (!data.pageName.trim()) {
    throw new Error("Landing page name is required.")
  }

  let method: "POST" | "PATCH" = data._id ? "PATCH" : "POST"

  // If this is explicitly being created but the slug already
  // exists, update it instead of failing on a duplicate slug.
  if (isNew && !data._id) {
    try {
      await fetchLandingPage(slug)

      method = "PATCH"
    } catch {
      method = "POST"
    }
  }

  const query = method === "PATCH" ? `?slug=${encodeURIComponent(slug)}` : ""

  const response = await cmsApiFetch(`/landing-page${query}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      ...data,
      slug,
    },
  })

  const payload = response.data as {
    data?: LandingPageApiData
  }

  return (
    payload.data ?? {
      ...data,
    }
  )
}

/**
 * Create a new Landing page from a blank starting point.
 */
export function createLandingPage(
  data: LandingPageApiData
): Promise<LandingPageApiData> {
  return saveLandingPage(data, true)
}

/**
 * Delete a Landing page by slug.
 */
export async function deleteLandingPage(slug: string): Promise<void> {
  const clean = slug.trim()

  if (!clean) {
    throw new Error("Landing page slug is required.")
  }

  await cmsApiFetch(`/landing-page?slug=${encodeURIComponent(clean)}`, {
    method: "DELETE",
  })
}