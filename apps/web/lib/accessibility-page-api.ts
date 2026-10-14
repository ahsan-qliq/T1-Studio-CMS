import type { AccessibilityPageApiData } from "@/types/api-accessibility-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchAccessibilityPage() {
  return cmsApiJson<AccessibilityPageApiData>("/accessibility-page?slug=accessibility")
}

export function saveAccessibilityPage(data: AccessibilityPageApiData) {
  return cmsApiFetch("/accessibility-page?slug=accessibility", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    data,
  })
}
