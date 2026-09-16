import type { ProjectsPageApiData } from "@/types/api-projects-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

/** Fetches the Projects page exactly as the API returns it — no mapping. */
export async function fetchProjectsPage(): Promise<ProjectsPageApiData> {
  return cmsApiJson<ProjectsPageApiData>("/project-page?slug=projects")
}

/**
 * Saves the Projects page. Uses PATCH when the record already has an _id
 * (an update), POST when it doesn't (first-time creation).
 */
export async function saveProjectsPage(
  data: ProjectsPageApiData
): Promise<void> {
  const method = data._id ? "PATCH" : "POST"
  const query = data._id ? "?slug=projects" : ""
  await cmsApiFetch(`/project-page${query}`, {
    method,
    headers: { "Content-Type": "application/json" },
    data,
  })
}
