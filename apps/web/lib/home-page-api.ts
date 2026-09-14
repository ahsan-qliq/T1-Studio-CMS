import type {
  HomePageApiData,
  HomePageApiResponse,
  HomePageSections,
} from "@/types/api-home-page"

/**
 * Base URL of the backend CMS API. Override with an env var — the Next.js
 * dev server itself defaults to port 5000 too, so if your API is a separate
 * process also on 5000, point this at whatever port it actually runs on.
 */
const API_BASE_URL = process.env.CMS_API_BASE_URL ?? "http://localhost:5000"

/** Fetches the home page exactly as the API returns it — no mapping. */
export async function fetchRawHomePage(): Promise<HomePageApiData> {
  const res = await fetch(`${API_BASE_URL}/api/home-page`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Failed to fetch home page (${res.status})`)

  const json = (await res.json()) as HomePageApiResponse
  if (!json.success || !json.data)
    throw new Error("Unexpected API response shape")

  return json.data
}

/**
 * Saves the edited sections back to the API. Adjust the method/endpoint
 * here to match whatever your backend actually expects (PUT vs PATCH,
 * a different path, etc.) — this is a reasonable default guess.
 */
export async function saveHomePage(sections: HomePageSections): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/home-page`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sections }),
  })
  if (!res.ok) throw new Error(`Failed to save home page (${res.status})`)
}
