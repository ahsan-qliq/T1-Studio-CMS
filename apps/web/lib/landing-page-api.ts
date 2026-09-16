import type { LandingPageApiData } from "@/types/api-landing-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"
export function fetchLandingPage() { return cmsApiJson<LandingPageApiData>("/landing-page?slug=landing-page") }
export function saveLandingPage(data: LandingPageApiData) {
  return cmsApiFetch(`/landing-page${data._id ? "?slug=landing-page" : ""}`, { method: data._id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, data })
}
