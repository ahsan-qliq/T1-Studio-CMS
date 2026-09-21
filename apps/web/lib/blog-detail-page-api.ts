import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

/**
 * Fetch a Blog Detail page by slug.
 */
export async function fetchBlogDetailPage(
  slug: string
): Promise<BlogDetailPageApiData> {
  return cmsApiJson<BlogDetailPageApiData>(
    `/blog-detail-page?slug=${encodeURIComponent(slug)}`
  )
}

/**
 * Fetch ALL Blog Detail pages.
 *
 * Used by the CMS sidebar to populate
 * the Blog dropdown.
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

/**
 * Save a Blog Detail page.
 *
 * PATCH = existing blog
 * POST = new blog
 */
export async function saveBlogDetailPage(
  data: BlogDetailPageApiData,
  isNew?: boolean
): Promise<BlogDetailPageApiData> {
  const slug = data.slug.trim()

  if (!slug) {
    throw new Error("Blog slug is required.")
  }

  if (!data.category.trim()) {
    throw new Error("Blog category is required.")
  }

  let method: "POST" | "PATCH" = data._id ? "PATCH" : "POST"

  // If this is explicitly being created but
  // the slug already exists, update it instead.
  if (isNew && !data._id) {
    try {
      await fetchBlogDetailPage(slug)

      method = "PATCH"
    } catch {
      method = "POST"
    }
  }

  const query = method === "PATCH" ? `?slug=${encodeURIComponent(slug)}` : ""

  const response = await cmsApiFetch(`/blog-detail-page${query}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      ...data,
      slug,
    },
  })

  const payload = response.data as {
    data?: BlogDetailPageApiData
  }

  return (
    payload.data ?? {
      ...data,
    }
  )
}
