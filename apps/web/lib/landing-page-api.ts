import type { LandingPageApiData } from "@/types/api-landing-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"
export function fetchLandingPage(slug = "landing-page") {
  return cmsApiJson<LandingPageApiData>(`/landing-page?slug=${encodeURIComponent(slug)}`)
}
export function saveLandingPage(data: LandingPageApiData) {
  const slug = data.slug.trim()
  if (!slug) throw new Error("Landing page slug is required.")
  const method = data._id ? "PATCH" : "POST"
  const query = method === "PATCH" ? `?slug=${encodeURIComponent(slug)}` : ""
  return cmsApiFetch(`/landing-page${query}`, { method, headers: { "Content-Type": "application/json" }, data: { ...data, slug } })
}
