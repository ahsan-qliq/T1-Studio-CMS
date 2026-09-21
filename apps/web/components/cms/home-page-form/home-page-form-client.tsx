"use client"

import { HomePageForm } from "./home-page-form"
import type { HomePageApiData, HomePageSections } from "@/types/api-home-page"

export function HomePageFormClient({
  initialData,
}: {
  initialData: HomePageApiData
}) {
  const handleSave = async (sections: HomePageSections) => {
    const res = await fetch("/api/save-home-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...initialData, sections }),
    })
    if (!res.ok) {
      // Replace with your preferred toast/notification pattern.
      alert("Failed to save. Check the console for details.")
      console.error("Save failed:", await res.text())
      return
    }
    // Re-fetch the freshly saved page so the form reflects exactly what
    // the backend now has (e.g. CDN URLs the backend fills in from the
    // uploaded image's S3 key). HomePageForm's internal form only manages
    // `sections`, so we return that piece for it to reset() with.
    try {
      const fresh = await fetch("/api/save-home-page")
      if (fresh.ok) {
        const freshData = (await fresh.json()) as HomePageApiData
        return freshData.sections
      }
    } catch (error) {
      console.error("Failed to refresh home page after save:", error)
    }
  }

  return <HomePageForm initialData={initialData} onSave={handleSave} />
}
