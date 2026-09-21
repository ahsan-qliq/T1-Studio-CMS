"use client"

import { useState } from "react"
import { SpacesPageForm } from "./spaces-page-form"
import type { SpacesPageApiData } from "@/types/api-spaces-page"

export function SpacesPageFormClient({
  initialData,
}: {
  initialData: SpacesPageApiData
}) {
  const [data, setData] = useState<SpacesPageApiData>(initialData)

  const handleSave = async (
    values: SpacesPageApiData
  ): Promise<SpacesPageApiData | void> => {
    try {
      const isNew = !data?._id

      // Keep the API's expected request structure
      const res = await fetch("/api/save-spaces-page", {
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
        console.error("Save failed:", json)
        alert(json?.message || "Failed to save.")
        return
      }

      // Refetch the latest saved data
      const fresh = await fetch("/api/save-spaces-page", {
        method: "GET",
        cache: "no-store",
      })

      if (!fresh.ok) {
        console.error("Failed to refetch spaces page")
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

  return <SpacesPageForm initialData={data} onSave={handleSave} />
}
