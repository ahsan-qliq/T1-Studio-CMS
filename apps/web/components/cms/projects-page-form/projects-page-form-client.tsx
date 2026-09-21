"use client"

import { useState } from "react"
import { ProjectsPageForm } from "./projects-page-form"
import type { ProjectsPageApiData } from "@/types/api-projects-page"

export function ProjectsPageFormClient({
  initialData,
}: {
  initialData: ProjectsPageApiData
}) {
  const [data, setData] = useState<ProjectsPageApiData>(initialData)

  const handleSave = async (
    values: ProjectsPageApiData
  ): Promise<ProjectsPageApiData | void> => {
    try {
      const res = await fetch("/api/save-projects-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const json = await res.json()

      if (!res.ok || json?.success === false) {
        alert("Failed to save. Check the console for details.")
        console.error("Save failed:", json)
        return
      }

      // Refetch the latest data
      const fresh = await fetch("/api/save-projects-page", {
        method: "GET",
        cache: "no-store",
      })

      if (!fresh.ok) {
        console.error("Failed to refetch projects page")
        return
      }

      const freshJson = await fresh.json()
      const freshData = freshJson.data ?? freshJson

      if (freshData) {
        setData(freshData)
        return freshData
      }
    } catch (error) {
      console.error("Save failed:", error)
      alert("Something went wrong while saving.")
    }
  }

  return <ProjectsPageForm initialData={data} onSave={handleSave} />
}
