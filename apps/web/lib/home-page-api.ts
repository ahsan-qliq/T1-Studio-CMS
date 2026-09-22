import type { HomePageApiData } from "@/types/api-home-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchHomePage() {
  return cmsApiJson<HomePageApiData>("/home-page?slug=home")
}

export function saveHomePage(data: HomePageApiData) {
  const save = async () => {
    let method: "POST" | "PATCH" = data._id ? "PATCH" : "POST"

    /**
     * If there is no _id, check whether the Home page
     * already exists in the backend.
     *
     * Existing page -> PATCH
     * No page        -> POST
     */
    if (!data._id) {
      try {
        await fetchHomePage()
        method = "PATCH"
      } catch {
        method = "POST"
      }
    }

    return cmsApiFetch(`/home-page${method === "PATCH" ? "?slug=home" : ""}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    })
  }

  return save()
}
