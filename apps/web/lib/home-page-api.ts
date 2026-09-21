import type { HomePageApiData } from "@/types/api-home-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

// Home page's types mirror the /api/home-page response 1:1, field for
// field (see the note at the top of types/api-home-page.ts) — so every
// call here skips the alias translation in cms-api-client.ts that was
// built for the older per-section page schemas (spaces, project detail,
// etc). Without this, section fields that happen to share a name with
// one of those aliases (e.g. featuredSpaces.spaces, signatureProjects
// .projects, partnership.steps) get silently renamed on save and never
// restored correctly on the next load.
const opts = { skipAliases: true }

export function fetchHomePage() {
  return cmsApiJson<HomePageApiData>("/home-page?slug=home", undefined, opts)
}

export function saveHomePage(data: HomePageApiData) {
  const save = async () => {
    let method: "POST" | "PATCH" = data._id ? "PATCH" : "POST"
    if (!data._id) {
      try {
        await fetchHomePage()
        method = "PATCH"
      } catch {
        method = "POST"
      }
    }
    return cmsApiFetch(
      `/home-page${method === "PATCH" ? "?slug=home" : ""}`,
      {
        method,
        headers: { "Content-Type": "application/json" },
        data,
      },
      opts
    )
  }
  return save()
}
