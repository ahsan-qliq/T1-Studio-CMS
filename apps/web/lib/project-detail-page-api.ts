import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

/**
 * Fetches a Project Detail page by slug. The documented GET endpoint also
 * accepts a `lang` param — this deliberately omits it since the editor
 * needs both EN and AR at once. If your backend requires `lang` and
 * returns only one language per request, this needs two merged requests.
 */
export async function fetchProjectDetailPage(slug: string): Promise<ProjectDetailPageApiData> {
  return cmsApiJson<ProjectDetailPageApiData>(
    `/project-detail-page?slug=${encodeURIComponent(slug)}`
  )
}

/**
 * Saves a Project Detail page. Uses PATCH when the record already has an
 * _id (an update), POST when it doesn't (first-time creation).
 */
export async function saveProjectDetailPage(data: ProjectDetailPageApiData): Promise<void> {
  const method = data._id ? "PATCH" : "POST"
  const query = data._id ? `?slug=${encodeURIComponent(data.slug)}` : ""
  await cmsApiFetch(`/project-detail-page${query}`, {
    method,
    headers: { "Content-Type": "application/json" },
    data,
  })
}
