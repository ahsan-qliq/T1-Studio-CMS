import type { ContactPageApiData } from "@/types/api-contact-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchContactPage() {
  return cmsApiJson<ContactPageApiData>("/contact-page?slug=contact")
}

export function saveContactPage(data: ContactPageApiData) {
  return cmsApiFetch(`/contact-page${data._id ? "?slug=contact" : ""}`, {
    method: data._id ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    data,
  })
}
