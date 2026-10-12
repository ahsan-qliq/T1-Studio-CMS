"use client"

import { HomePageForm } from "./home-page-form"
import type { HomePageApiData, HomePageSections } from "@/types/api-home-page"

export function HomePageFormClient({
  initialData,
}: {
  initialData: HomePageApiData
}) {
  const handleSave = async (sections: HomePageSections) => {
    const { seo, ...restSections } = sections
    const res = await fetch("/api/save-home-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...initialData, seo, sections: restSections }),
    })
    if (!res.ok) {
      // Replace with your preferred toast/notification pattern.
      alert("Failed to save. Check the console for details.")
      console.error("Save failed:", await res.text())
      return
    }

    
    try {
      const fresh = await fetch("/api/save-home-page")
      if (fresh.ok) {
        const freshData = (await fresh.json()) as HomePageApiData
        return { ...freshData.sections, seo: freshData.seo }
      }
    } catch (error) {
      console.error("Failed to refresh home page after save:", error)
    }
  }

  return <HomePageForm initialData={initialData} onSave={handleSave} />
}
