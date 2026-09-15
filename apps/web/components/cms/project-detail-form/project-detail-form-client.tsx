"use client"

import { ProjectDetailForm } from "./project-detail-form"
import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"

export function ProjectDetailFormClient({ initialData }: { initialData: ProjectDetailPageApiData }) {
  const handleSave = async (data: ProjectDetailPageApiData) => {
    const res = await fetch("/api/save-project-detail-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      alert("Failed to save. Check the console for details.")
      console.error("Save failed:", await res.text())
    }
  }

  return <ProjectDetailForm initialData={initialData} onSave={handleSave} />
}
