import type { CookiePolicyPageApiData } from "@/types/api-cookie-policy-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchCookiePolicyPage() {
  return cmsApiJson<CookiePolicyPageApiData>("/cookie-policy-page?slug=cookie-policy")
}

export function saveCookiePolicyPage(data: CookiePolicyPageApiData) {
  return cmsApiFetch("/cookie-policy-page?slug=cookie-policy", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    data,
  })
}
