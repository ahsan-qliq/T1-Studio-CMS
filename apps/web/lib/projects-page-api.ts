import type { ProjectsPageApiData, ProjectsPageApiResponse } from "@/types/api-projects-page"

const API_BASE_URL = process.env.CMS_API_BASE_URL ?? "http://localhost:5000"

/** Fetches the Projects page exactly as the API returns it — no mapping. */
export async function fetchProjectsPage(): Promise<ProjectsPageApiData> {
  const res = await fetch(`${API_BASE_URL}/api/project-page?slug=projects`, { cache: "no-store" })
  if (!res.ok) throw new Error(`Failed to fetch projects page (${res.status})`)

  const json = (await res.json()) as ProjectsPageApiResponse
  if (!json.success || !json.data) throw new Error("Unexpected API response shape")

  return json.data
}

/**
 * Saves the Projects page. Uses PATCH when the record already has an _id
 * (an update), POST when it doesn't (first-time creation).
 */
export async function saveProjectsPage(data: ProjectsPageApiData): Promise<void> {
  const method = data._id ? "PATCH" : "POST"
  const res = await fetch(`${API_BASE_URL}/api/project-page`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to save projects page (${res.status})`)
}
