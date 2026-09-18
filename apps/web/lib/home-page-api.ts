import type { HomePageApiData } from "@/types/api-home-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchHomePage() {
  return cmsApiJson<HomePageApiData>("/home-page?slug=home")
}

export function saveHomePage(data: HomePageApiData) {
  const save = async () => {
    /*
     * We use the presence of _id only to determine whether
     * this page already exists.
     *
     * IMPORTANT:
     * Do NOT send _id back to the CMS API.
     *
     * The API identifies the existing Home page using:
     *
     * PATCH /home-page?slug=home
     *
     * This also prevents malformed MongoDB ObjectId values
     * returned by the API from being sent back.
     */
    const hasExistingPage = Boolean(data._id)

    const { _id, ...payload } = data

    const method: "POST" | "PATCH" = hasExistingPage ? "PATCH" : "POST"

    const url = hasExistingPage ? "/home-page?slug=home" : "/home-page"

    return cmsApiFetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    })
  }

  return save()
}
