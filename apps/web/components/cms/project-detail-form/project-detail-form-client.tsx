"use client"

import { useState } from "react"
import { ProjectDetailForm } from "./project-detail-form"
import { DeletePageButton } from "../form-shared/delete-page-button"
import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"

export function ProjectDetailFormClient({
  initialData,
}: {
  initialData: ProjectDetailPageApiData
}) {
  const [data, setData] = useState<ProjectDetailPageApiData>(initialData)

  const handleSave = async (
    values: ProjectDetailPageApiData
  ): Promise<ProjectDetailPageApiData | void> => {
    try {
      const isNew = !values?._id

      // Save project detail
      const res = await fetch("/api/save-project-detail-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: values,
          isNew,
        }),
      })

      const json = await res.json()

      if (!res.ok || json?.success === false) {
        console.error("Project detail save failed:", json)
        alert(json?.message || "Failed to save project detail.")
        return
      }

      // Use the slug from the saved values
      const slug = values.slug?.trim()

      if (!slug) {
        console.error("Project slug is missing after save")
        return
      }

      // Refetch the freshly saved project detail
      const fresh = await fetch(
        `/api/save-project-detail-page?slug=${encodeURIComponent(slug)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      )

      if (!fresh.ok) {
        const errorText = await fresh.text()

        console.error(
          "Failed to refetch project detail:",
          fresh.status,
          errorText
        )

        return
      }

      const freshJson = await fresh.json()
      const freshData = freshJson.data ?? freshJson

      if (freshData) {
        setData(freshData)
        return freshData
      }
    } catch (error) {
      console.error("Project detail save failed:", error)
      alert("Something went wrong while saving.")
    }
  }

  return (
    <div className="space-y-4">
      {data._id && data.slug && (
        <div className="flex justify-end">
          <DeletePageButton
            slug={data.slug}
            endpoint="/api/save-project-detail-page"
            redirectTo="/pages/projects"
            label="project"
          />
        </div>
      )}
      <ProjectDetailForm initialData={data} onSave={handleSave} />
    </div>
  )
}
