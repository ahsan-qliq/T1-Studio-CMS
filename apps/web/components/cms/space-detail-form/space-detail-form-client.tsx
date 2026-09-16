"use client"

import { useState } from "react"
import { SpaceDetailForm } from "./space-detail-form"
import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

export function SpaceDetailFormClient({ initialData }: { initialData: SpaceDetailPageApiData }) {
  // `data` tracks the current record so that once a first save creates it
  // (and returns a real _id), subsequent saves correctly go through PATCH
  // instead of POSTing a duplicate.
  const [data, setData] = useState<SpaceDetailPageApiData>(initialData)

  const handleSave = async (values: SpaceDetailPageApiData) => {
    const isNew = !data._id
    const res = await fetch("/api/save-space-detail-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: values, isNew }),
    })
    const json = await res.json()
    if (!res.ok || !json.success) {
      alert("Failed to save. Check the console for details.")
      console.error("Save failed:", json)
      return
    }
    setData(json.data)
  }

  return <SpaceDetailForm initialData={data} onSave={handleSave} />
}
