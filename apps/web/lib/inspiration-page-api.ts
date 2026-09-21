import type { InspirationPageApiData } from "@/types/api-inspiration-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchInspirationPage() {
  return cmsApiJson<InspirationPageApiData>(
    "/inspiration-page?slug=inspiration"
  )
}

export function saveInspirationPage(data: InspirationPageApiData) {
  return cmsApiFetch(
    `/inspiration-page${data._id ? "?slug=inspiration" : ""}`,
    {
      method: data._id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      data,
    }
  )
}
