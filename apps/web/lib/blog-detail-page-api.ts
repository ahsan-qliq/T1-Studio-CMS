import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"
export function fetchBlogDetailPage(slug: string) { return cmsApiJson<BlogDetailPageApiData>(`/blog-detail-page?slug=${encodeURIComponent(slug)}`) }
export function fetchAllBlogDetailPages() { return cmsApiJson<BlogDetailPageApiData[]>("/blog-detail-page") }
export function saveBlogDetailPage(data: BlogDetailPageApiData) {
  const slug = data.slug.trim()
  if (!slug) throw new Error("Blog slug is required.")
  if (!data.category.trim()) throw new Error("Blog category is required.")
  const query = data._id ? `?slug=${encodeURIComponent(slug)}` : ""
  return cmsApiFetch(`/blog-detail-page${query}`, { method: data._id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, data: { ...data, slug } })
}
