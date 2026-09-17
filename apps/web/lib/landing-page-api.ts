import type { LandingPageApiData } from "@/types/api-landing-page"

import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchLandingPage(slug = "landing-dubai") {
  return cmsApiJson<LandingPageApiData>(
    `/landing-page?slug=${encodeURIComponent(slug)}`
  )
}

export function saveLandingPage(data: LandingPageApiData) {
  return cmsApiFetch(
    `/landing-page${data._id ? `?slug=${encodeURIComponent(data.slug)}` : ""}`,
    {
      method: data._id ? "PATCH" : "POST",

      headers: {
        "Content-Type": "application/json",
      },

      data,
    }
  )
}
