import type { WhyT1PageApiData } from "@/types/api-why-t1-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchWhyT1Page() {
  return cmsApiJson<WhyT1PageApiData>("/why-t1-page?slug=why-t1")
}

export function saveWhyT1Page(data: WhyT1PageApiData) {
  return cmsApiFetch(`/why-t1-page${data._id ? "?slug=why-t1" : ""}`, {
    method: data._id ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    data,
  })
}
