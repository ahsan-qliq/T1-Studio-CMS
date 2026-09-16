import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"
import { cmsApiJson, cmsApiFetch } from "./cms-api-client"

/**
 * Fetches a Space Detail page by slug. The documented GET endpoint also
 * accepts a `lang` param — this deliberately omits it since the editor
 * needs both EN and AR at once. If your backend requires `lang` and
 * returns only one language per request, this needs two merged requests.
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
 * Saves a Space Detail page. Uses PATCH when the record already has an _id
 * (an update), POST when it doesn't (first-time creation).
 */
export async function saveSpaceDetailPage(
  data: SpaceDetailPageApiData
): Promise<void> {
  const slug = data.slug.trim()
  const validSpaceTypes = ["kitchen", "wardrobe", "living-room", "bedroom", "bathroom", "home-office", "outdoor-living", "bespoke-joinery"]
  if (!slug) throw new Error("Space slug is required.")
  if (!validSpaceTypes.includes(data.spaceType)) throw new Error("Select a valid space type.")
  const method = data._id ? "PATCH" : "POST"
  const query = method === "PATCH" ? `?slug=${encodeURIComponent(slug)}` : ""
  await cmsApiFetch(`/space-detail-page${query}`, {
    method,
    headers: { "Content-Type": "application/json" },
    data: { ...data, slug },
  })
}
