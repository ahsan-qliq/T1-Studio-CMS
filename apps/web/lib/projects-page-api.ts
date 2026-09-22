import type { ProjectsPageApiData } from "@/types/api-projects-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

/**
 * Fetches the Projects page exactly as the API returns it.
 *
 * No alias mapping is applied.
 * All field names and arrays are preserved 1:1.
 */
export async function fetchProjectsPage(): Promise<ProjectsPageApiData> {
  return cmsApiJson<ProjectsPageApiData>("/project-page?slug=projects")
}

/**
 * Saves the Projects page.
 *
 * Existing record with _id -> PATCH
 * New record without _id -> POST
 */
export async function saveProjectsPage(
  data: ProjectsPageApiData
): Promise<void> {
  const method = data._id ? "PATCH" : "POST"
  const query = data._id ? "?slug=projects" : ""

  await cmsApiFetch(`/project-page${query}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
}
