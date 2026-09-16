import type { AboutPageApiData } from "@/types/api-about-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchAboutPage() {
  return cmsApiJson<AboutPageApiData>("/about-page?slug=about")
}

export function saveAboutPage(data: AboutPageApiData) {
  return cmsApiFetch(`/about-page${data._id ? "?slug=about" : ""}`, {
    method: data._id ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    data,
  })
}
