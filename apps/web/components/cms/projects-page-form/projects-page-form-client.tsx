"use client"

import { ProjectsPageForm } from "./projects-page-form"
import type { ProjectsPageApiData } from "@/types/api-projects-page"

export function ProjectsPageFormClient({
  initialData,
}: {
  initialData: ProjectsPageApiData
}) {
  const handleSave = async (data: ProjectsPageApiData) => {
    const res = await fetch("/api/save-projects-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      alert("Failed to save. Check the console for details.")
      console.error("Save failed:", await res.text())
    }
  }

  return <ProjectsPageForm initialData={initialData} onSave={handleSave} />
}
