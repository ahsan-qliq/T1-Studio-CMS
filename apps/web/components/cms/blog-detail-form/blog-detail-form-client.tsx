"use client"

import { useState } from "react"
import { DeletePageButton } from "../form-shared/delete-page-button"
import { BlogDetailForm } from "./blog-detail-form"
import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"

export function BlogDetailFormClient({
  initialData,
}: {
  initialData: BlogDetailPageApiData
}) {
  const [data, setData] = useState<BlogDetailPageApiData>(initialData)

  const handleSave = async (values: BlogDetailPageApiData): Promise<void> => {
    try {
      const isNew = !values?._id

      // Save
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

      if (!response.ok || json?.success === false) {
        console.error("Blog save failed:", json)

        alert(json?.message || "Failed to save Blog detail page.")

        return
      }

      // Update state with saved response
      if (json?.data) {
        setData(json.data)
      }

      // Get slug
      const slug = values.slug?.trim()

      if (!slug) {
        console.error("Blog slug is missing after save.")
        return
      }

      // Refetch freshly saved page
      const fresh = await fetch(
        `/api/save-blog-detail-page?slug=${encodeURIComponent(slug)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      )

      if (!fresh.ok) {
        const errorText = await fresh.text()

        console.error("Failed to refetch Blog detail:", fresh.status, errorText)

        return
      }

      const freshJson = await fresh.json()

      const freshData = freshJson.data ?? freshJson

      if (freshData) {
        setData(freshData)
      }
    } catch (error) {
      console.error("Blog save error:", error)

      alert("Failed to save Blog detail page.")
    }
  }

  return (
    <div className="space-y-4">
      {data._id && data.slug && (
        <div className="flex justify-end">
          <DeletePageButton
            slug={data.slug}
            endpoint="/api/save-blog-detail-page"
            redirectTo="/pages/blog"
            label="blog"
          />
        </div>
      )}
      <BlogDetailForm initialData={data} onSave={handleSave} />
    </div>
  )
}
