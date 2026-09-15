import type { SpacesPageApiData } from "@/types/api-spaces-page"
import { cmsApiJson, cmsApiFetch } from "./cms-api-client"

/** Fetches the Spaces page exactly as the API returns it — no mapping. */
export async function fetchSpacesPage(): Promise<SpacesPageApiData> {
  return cmsApiJson<SpacesPageApiData>("/spaces-page?slug=spaces", { cache: "no-store" })
}

/**
 * Saves the Spaces page. Uses PATCH when the record already has an _id
 * (an update), POST when it doesn't (first-time creation).
 */
export async function saveSpacesPage(data: SpacesPageApiData): Promise<void> {
  const method = data._id ? "PATCH" : "POST"
  const query = data._id ? "?slug=spaces" : ""
  await cmsApiFetch(`/spaces-page${query}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}
