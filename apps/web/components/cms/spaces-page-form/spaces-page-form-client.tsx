"use client"

import { useState } from "react"
import { SpacesPageForm } from "./spaces-page-form"
import { createEmptySpacesPage } from "@/lib/page-defaults"
import type { SpacesPageApiData } from "@/types/api-spaces-page"

export function SpacesPageFormClient({ initialData }: { initialData: SpacesPageApiData | null }) {
  // `data` tracks the current record so that once a first save creates it
  // (and returns a real _id), subsequent saves correctly go through PATCH
  // instead of POSTing a duplicate.
  const [data, setData] = useState<SpacesPageApiData>(initialData ?? createEmptySpacesPage())

  const handleSave = async (values: SpacesPageApiData) => {
    const isNew = !data._id
    const res = await fetch("/api/save-spaces-page", {
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

  return <SpacesPageForm initialData={data} onSave={handleSave} />
}
