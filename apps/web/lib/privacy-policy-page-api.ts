import type { PrivacyPolicyPageApiData } from "@/types/api-privacy-policy-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchPrivacyPolicyPage() {
  return cmsApiJson<PrivacyPolicyPageApiData>("/privacy-policy-page?slug=privacy-policy")
}

export function savePrivacyPolicyPage(data: PrivacyPolicyPageApiData) {
  return cmsApiFetch("/privacy-policy-page?slug=privacy-policy", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    data,
  })
}
