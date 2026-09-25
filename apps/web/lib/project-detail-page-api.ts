import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

/**
 * Fetch a Project Detail page by slug.
 */
export async function fetchProjectDetailPage(
  slug: string
): Promise<ProjectDetailPageApiData> {
  return cmsApiJson<ProjectDetailPageApiData>(
    `/project-detail-page?slug=${encodeURIComponent(slug)}`
  )
}

/**
 * Fetch ALL Project Detail pages.
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
 * Save a Project Detail page.
 *
 * PATCH = existing project (_id exists)
 * POST = new project (_id does not exist)
 */
export async function saveProjectDetailPage(
  data: ProjectDetailPageApiData
): Promise<ProjectDetailPageApiData> {
  const slug = data.slug.trim()

  if (!slug) {
    throw new Error("Project slug is required.")
  }

  if (!data.pageName.trim()) {
    throw new Error("Project page name is required.")
  }

  const method = data._id ? "PATCH" : "POST"

  const query = method === "PATCH" ? `?slug=${encodeURIComponent(slug)}` : ""

  const response = await cmsApiJson<ProjectDetailPageApiData>(
    `/project-detail-page${query}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...data,
        slug,
      },
    }
  )

  return response
}

/**
 * Delete a project page by slug.
 */
export async function deleteProjectDetailPage(slug: string): Promise<void> {
  const clean = slug.trim()

  if (!clean) {
    throw new Error("Project slug is required.")
  }

  await cmsApiFetch(`/project-detail-page?slug=${encodeURIComponent(clean)}`, {
    method: "DELETE",
  })
}
