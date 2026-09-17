"use client"

import { useState } from "react"
import { BlogDetailForm } from "./blog-detail-form"
import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"

export function BlogDetailFormClient({
  initialData,
}: {
  initialData: BlogDetailPageApiData
}) {
  const [data, setData] = useState<BlogDetailPageApiData>(initialData)

  const handleSave = async (values: BlogDetailPageApiData) => {
    const isNew = !data._id

    try {
      const response = await fetch("/api/save-blog-detail-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: values,
          isNew,
        }),
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        console.error("Blog save failed:", json)

        alert(json?.message || "Failed to save Blog detail page.")

        return
      }

      if (json.data) {
        setData(json.data)
      }
    } catch (error) {
      console.error("Blog save error:", error)

      alert("Failed to save Blog detail page.")
    }
  }

  return <BlogDetailForm initialData={data} onSave={handleSave} />
}
