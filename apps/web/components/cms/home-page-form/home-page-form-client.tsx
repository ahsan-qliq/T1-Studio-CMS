"use client"

import { HomePageForm } from "./home-page-form"
import type { HomePageApiData, HomePageSections } from "@/types/api-home-page"

export function HomePageFormClient({ initialData }: { initialData: HomePageApiData }) {
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
  }

  return <HomePageForm initialData={initialData} onSave={handleSave} />
}
