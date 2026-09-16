import type { SpacesPageApiData } from "@/types/api-spaces-page"
import { cmsApiJson, cmsApiFetch } from "./cms-api-client"

/** Fetches the Spaces page exactly as the API returns it — no mapping. */
export async function fetchSpacesPage(): Promise<SpacesPageApiData> {
  return cmsApiJson<SpacesPageApiData>("/spaces-page?slug=spaces")
}

/**
 * Saves the Spaces page. Uses PATCH when the record already has an _id
 * (an update), POST when it doesn't (first-time creation).
 */
export async function saveSpacesPage(
  data: SpacesPageApiData,
  isNew?: boolean
): Promise<SpacesPageApiData | void> {
  const method = isNew || !data._id ? "POST" : "PATCH"
  const query = method === "PATCH" ? "?slug=spaces" : ""
  const response = await cmsApiFetch(`/spaces-page${query}`, {
    method,
    headers: { "Content-Type": "application/json" },
    data,
  })
  if (method === "POST") {
    const payload = response.data as { data?: SpacesPageApiData }
    return payload.data
  }
}
