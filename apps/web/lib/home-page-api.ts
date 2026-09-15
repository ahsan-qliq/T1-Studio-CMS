import type {
  HomePageApiData,
  HomePageSections,
} from "@/types/api-home-page"
import { cmsApiJson, cmsApiFetch } from "./cms-api-client"

/** Fetches the home page exactly as the API returns it — no mapping. */
export async function fetchRawHomePage(): Promise<HomePageApiData> {
  return cmsApiJson<HomePageApiData>("/home-page?slug=home", {
    cache: "no-store",
  })
}

/**
 * Saves only the edited sections using the documented singleton PATCH endpoint.
 */
export async function saveHomePage(sections: HomePageSections): Promise<void> {
  await cmsApiFetch("/home-page?slug=home", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sections }),
  })
}
