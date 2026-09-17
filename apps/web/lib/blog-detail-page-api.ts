import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchBlogDetailPage(slug: string) {
  return cmsApiJson<BlogDetailPageApiData>(
    `/blog-detail-page?slug=${encodeURIComponent(slug)}`
  )
}

/**
 * Fetches ALL Blog Detail pages.
 *
 * Used by the CMS sidebar to populate the Blog dropdown.
 */
export async function fetchAllBlogDetailPages(): Promise<
  BlogDetailPageApiData[]
> {
  const response = await cmsApiJson<
    | BlogDetailPageApiData[]
    | {
        data?: BlogDetailPageApiData[]
        pages?: BlogDetailPageApiData[]
      }
  >("/blog-detail-page")

  if (Array.isArray(response)) {
    return response
  }

  return response.data ?? response.pages ?? []
}

export async function saveBlogDetailPage(
  data: BlogDetailPageApiData,
  isNew?: boolean
) {
  const slug = data.slug.trim()
  if (!slug) throw new Error("Blog slug is required.")
  if (!data.category.trim()) throw new Error("Blog category is required.")
  let method: "POST" | "PATCH" = data._id ? "PATCH" : "POST"
  if (isNew && !data._id) {
    try {
      await fetchBlogDetailPage(slug)
      method = "PATCH"
    } catch {
      method = "POST"
    }
  }
  const query = method === "PATCH" ? `?slug=${encodeURIComponent(slug)}` : ""
  return cmsApiFetch(`/blog-detail-page${query}`, {
    method,
    headers: { "Content-Type": "application/json" },
    data: { ...data, slug },
  })
}
