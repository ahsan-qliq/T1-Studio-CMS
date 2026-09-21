"use client"

import { useState } from "react"
import { SpaceDetailForm } from "./space-detail-form"
import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

export function SpaceDetailFormClient({
  initialData,
}: {
  initialData: SpaceDetailPageApiData
}) {
  const [data, setData] = useState<SpaceDetailPageApiData>(initialData)

  const handleSave = async (
    values: SpaceDetailPageApiData
  ): Promise<SpaceDetailPageApiData | void> => {
    try {
      const isNew = !values?._id

      // --------------------------------
      // SAVE
      // --------------------------------
      const res = await fetch("/api/save-space-detail-page", {
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
        console.error("Space detail save failed:", json)

        alert(json?.message || "Failed to save space detail.")

        return
      }

      // --------------------------------
      // GET SLUG
      // --------------------------------
      const slug = values.slug?.trim()

      if (!slug) {
        console.error("Space slug is missing after save.")

        return
      }

      // --------------------------------
      // REFETCH FRESH DATA
      // --------------------------------
      const fresh = await fetch(
        `/api/save-space-detail-page?slug=${encodeURIComponent(slug)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      )

      if (!fresh.ok) {
        const errorText = await fresh.text()

        console.error(
          "Failed to refetch space detail:",
          fresh.status,
          errorText
        )

        return
      }

      const freshJson = await fresh.json()

      const freshData = freshJson.data ?? freshJson

      // --------------------------------
      // UPDATE STATE
      // --------------------------------
      if (freshData) {
        setData(freshData)

        return freshData
      }
    } catch (error) {
      console.error("Space detail save failed:", error)

      alert("Something went wrong while saving.")
    }
  }

  return <SpaceDetailForm initialData={data} onSave={handleSave} />
}
