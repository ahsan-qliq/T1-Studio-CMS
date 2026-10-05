import type { ProjectsPageApiData } from "@/types/api-projects-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

const toLocalized = (v: unknown) =>
  v && typeof v === "object" ? v : { en: v ?? "", ar: "" }

function normalizeData(data: ProjectsPageApiData): ProjectsPageApiData {
  return {
    ...data,
    seo: data.seo
      ? {
          ...data.seo,
          metaTitle: toLocalized(data.seo.metaTitle) as any,
          metaDescription: toLocalized(data.seo.metaDescription) as any,
        }
      : data.seo,
    sections: {
      ...data.sections,
      projects: {
        ...data.sections?.projects,
        projects: (data.sections?.projects?.projects ?? []).map((p: any) => ({
          ...p,
          category: toLocalized(p.category),
          completionYear: toLocalized(p.completionYear ?? ""),
        })),
      },
    },
  }
}

export async function fetchProjectsPage(): Promise<ProjectsPageApiData> {
  const data = await cmsApiJson<ProjectsPageApiData>("/project-page?slug=projects")
  return normalizeData(data)
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
