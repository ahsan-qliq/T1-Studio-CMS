import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

/**
 * Fetches a Project Detail page by slug. The documented GET endpoint also
 * accepts a `lang` param — this deliberately omits it since the editor
 * needs both EN and AR at once. If your backend requires `lang` and
 * returns only one language per request, this needs two merged requests.
 */
export async function fetchProjectDetailPage(
  slug: string
): Promise<ProjectDetailPageApiData> {
  return cmsApiJson<ProjectDetailPageApiData>(
    `/project-detail-page?slug=${encodeURIComponent(slug)}`
  )
}

/**
 * Fetches ALL Project Detail pages.
 *
 * Used by the CMS sidebar to populate the Projects dropdown.
 */
export async function fetchAllProjectDetailPages(): Promise<
  ProjectDetailPageApiData[]
> {
  const response = await cmsApiJson<
    | ProjectDetailPageApiData[]
    | {
        data?: ProjectDetailPageApiData[]
        pages?: ProjectDetailPageApiData[]
      }
  >("/project-detail-page")

  if (Array.isArray(response)) {
    return response
  }

  return response.data ?? response.pages ?? []
}

/**
 * Saves a Project Detail page. Uses PATCH when the record already has an
 * _id (an update), POST when it doesn't (first-time creation).
 */
export async function saveProjectDetailPage(
  data: ProjectDetailPageApiData
): Promise<void> {
  const slug = data.slug.trim()
  if (!slug) throw new Error("Project slug is required.")
  if (!data.pageName.trim()) throw new Error("Project page name is required.")
  const method = data._id ? "PATCH" : "POST"
  const query = method === "PATCH" ? `?slug=${encodeURIComponent(slug)}` : ""
  await cmsApiFetch(`/project-detail-page${query}`, {
    method,
    headers: { "Content-Type": "application/json" },
    data: { ...data, slug },
  })
}
