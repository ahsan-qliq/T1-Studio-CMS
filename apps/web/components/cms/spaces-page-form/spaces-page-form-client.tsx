"use client"

import { SpacesPageForm } from "./spaces-page-form"
import type { SpacesPageApiData } from "@/types/api-spaces-page"

export function SpacesPageFormClient({ initialData }: { initialData: SpacesPageApiData }) {
  const handleSave = async (data: SpacesPageApiData) => {
    const res = await fetch("/api/save-spaces-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      alert("Failed to save. Check the console for details.")
      console.error("Save failed:", await res.text())
    }
  }

  return <SpacesPageForm initialData={initialData} onSave={handleSave} />
}
