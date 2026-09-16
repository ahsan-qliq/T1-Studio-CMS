import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"
export function fetchBlogDetailPage(slug: string) { return cmsApiJson<BlogDetailPageApiData>(`/blog-detail-page?slug=${encodeURIComponent(slug)}`) }
export function fetchAllBlogDetailPages() { return cmsApiJson<BlogDetailPageApiData[]>("/blog-detail-page") }
export function saveBlogDetailPage(data: BlogDetailPageApiData) {
  const query = data.slug ? `?slug=${encodeURIComponent(data.slug)}` : ""
  return cmsApiFetch(`/blog-detail-page${query}`, { method: data._id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, data })
}
