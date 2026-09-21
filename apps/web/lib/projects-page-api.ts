import type { ProjectsPageApiData } from "@/types/api-projects-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

// Like Home page, Projects page's type mirrors the API response 1:1 (see
// the comment on ProjectsPageApiData) — skip cms-api-client.ts's alias
// translation, which was built for older per-section page schemas and
// otherwise silently mangles sections.partnership.steps (renamed to
// `items` on save, never restored since "partnership" isn't a parent
// key the reverse mapping recognizes).
const opts = { skipAliases: true }

/** Fetches the Projects page exactly as the API returns it — no mapping. */
export async function fetchProjectsPage(): Promise<ProjectsPageApiData> {
  return cmsApiJson<ProjectsPageApiData>(
    "/project-page?slug=projects",
    undefined,
    opts
  )
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
  await cmsApiFetch(
    `/project-page${query}`,
    {
      method,
      headers: { "Content-Type": "application/json" },
      data,
    },
    opts
  )
}
