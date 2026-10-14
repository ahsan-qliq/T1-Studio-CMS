import type { TermsConditionsPageApiData } from "@/types/api-terms-conditions-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchTermsConditionsPage() {
  return cmsApiJson<TermsConditionsPageApiData>("/terms-conditions-page?slug=terms-conditions")
}

export function saveTermsConditionsPage(data: TermsConditionsPageApiData) {
  return cmsApiFetch("/terms-conditions-page?slug=terms-conditions", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    data,
  })
}
