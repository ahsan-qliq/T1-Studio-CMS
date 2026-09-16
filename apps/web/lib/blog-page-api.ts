import type { BlogPageApiData } from "@/types/api-blog-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"
export function fetchBlogPage() { return cmsApiJson<BlogPageApiData>("/blog-page?slug=blog") }
export function saveBlogPage(data: BlogPageApiData) {
  return cmsApiFetch(`/blog-page${data._id ? "?slug=blog" : ""}`, { method: data._id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, data })
}
