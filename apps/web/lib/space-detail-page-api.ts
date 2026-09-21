import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"
import { cmsApiJson, cmsApiFetch } from "./cms-api-client"

/**
 * Fetch a Space Detail page by slug.
 */
export async function fetchSpaceDetailPage(
  slug: string
): Promise<SpaceDetailPageApiData> {
  return cmsApiJson<SpaceDetailPageApiData>(
    `/space-detail-page?slug=${encodeURIComponent(slug)}`,
    {}
  )
}

/**
 * Fetch ALL Space Detail pages.
 *
 * Used by the CMS sidebar to populate the Spaces dropdown.
 */
export async function fetchAllSpaceDetailPages(): Promise<
  SpaceDetailPageApiData[]
> {
  const response = await cmsApiJson<
    | SpaceDetailPageApiData[]
    | {
        data?: SpaceDetailPageApiData[]
        pages?: SpaceDetailPageApiData[]
      }
  >("/space-detail-page")

  if (Array.isArray(response)) {
    return response
  }

  return response.data ?? response.pages ?? []
}

/**
 * Saves a Space Detail page.
 *
 * PATCH = existing page
 * POST = new page
 */
export async function saveSpaceDetailPage(
  data: SpaceDetailPageApiData,
  isNew?: boolean
): Promise<SpaceDetailPageApiData> {
  const slug = data.slug.trim()

  const validSpaceTypes = [
    "kitchen",
    "wardrobe",
    "living-room",
    "bedroom",
    "bathroom",
    "home-office",
    "outdoor-living",
    "bespoke-joinery",
  ]

  if (!slug) {
    throw new Error("Space slug is required.")
  }

  if (!validSpaceTypes.includes(data.spaceType)) {
    throw new Error("Select a valid space type.")
  }

  let method: "POST" | "PATCH" = data._id ? "PATCH" : "POST"

  // Handle explicitly-created records that don't have _id yet
  if (isNew && !data._id) {
    try {
      await fetchSpaceDetailPage(slug)

      // Existing slug → update
      method = "PATCH"
    } catch {
      // No existing slug → create
      method = "POST"
    }
  }

  const query = method === "PATCH" ? `?slug=${encodeURIComponent(slug)}` : ""

  const response = await cmsApiFetch(`/space-detail-page${query}`, {
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
    data?: SpaceDetailPageApiData
  }

  return (
    payload.data ?? {
      ...data,
      ...(method === "PATCH" ? {} : { _id: data._id }),
    }
  )
}

export function createSpaceDetailPage(
  data: SpaceDetailPageApiData
): Promise<SpaceDetailPageApiData> {
  return saveSpaceDetailPage(data, true)
}
