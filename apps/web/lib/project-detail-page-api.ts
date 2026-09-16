import type { ProjectDetailPageApiData, ProjectDetailPageApiResponse } from "@/types/api-project-detail-page"

const API_BASE_URL = process.env.CMS_API_BASE_URL ?? "http://localhost:5500"

/**
 * Fetches a Project Detail page by slug. The documented GET endpoint also
 * accepts a `lang` param — this deliberately omits it since the editor
 * needs both EN and AR at once. If your backend requires `lang` and
 * returns only one language per request, this needs two merged requests.
 */
export async function fetchProjectDetailPage(slug: string): Promise<ProjectDetailPageApiData> {
  const res = await fetch(`${API_BASE_URL}/api/project-detail-page?slug=${encodeURIComponent(slug)}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Failed to fetch project detail page "${slug}" (${res.status})`)

  const json = (await res.json()) as ProjectDetailPageApiResponse
  if (!json.success || !json.data) throw new Error("Unexpected API response shape")

  return json.data
}

/**
 * Saves a Project Detail page. Uses PATCH when the record already has an
 * _id (an update), POST when it doesn't (first-time creation).
 */
export async function saveProjectDetailPage(data: ProjectDetailPageApiData): Promise<void> {
  const method = data._id ? "PATCH" : "POST"
  const res = await fetch(`${API_BASE_URL}/api/project-detail-page`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to save project detail page (${res.status})`)
}
