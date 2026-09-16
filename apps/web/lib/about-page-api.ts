import type { AboutPageApiData } from "@/types/api-about-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchAboutPage() {
  return cmsApiJson<AboutPageApiData>("/about-page?slug=about")
}

export function saveAboutPage(data: AboutPageApiData) {
  const save = async () => {
    let method: "POST" | "PATCH" = data._id ? "PATCH" : "POST"
    if (!data._id) {
      try {
        await fetchAboutPage()
        method = "PATCH"
      } catch {
        method = "POST"
      }
    }
    return cmsApiFetch(`/about-page${method === "PATCH" ? "?slug=about" : ""}`, {
    method,
    headers: { "Content-Type": "application/json" },
    data,
    })
  }
  return save()
}
