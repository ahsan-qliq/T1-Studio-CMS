"use client"

import { SpaceDetailForm } from "./space-detail-form"
import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

export function SpaceDetailFormClient({ initialData }: { initialData: SpaceDetailPageApiData }) {
  const handleSave = async (data: SpaceDetailPageApiData) => {
    const res = await fetch("/api/save-space-detail-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      alert("Failed to save. Check the console for details.")
      console.error("Save failed:", await res.text())
    }
  }

  return <SpaceDetailForm initialData={initialData} onSave={handleSave} />
}
