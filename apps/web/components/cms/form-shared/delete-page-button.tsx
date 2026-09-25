"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

interface DeletePageButtonProps {
  /** Slug of the saved page to delete. */
  slug: string
  /** Next.js API route that handles DELETE ?slug=..., e.g. "/api/save-space-detail-page". */
  endpoint: string
  /** Where to go after a successful delete, e.g. "/pages/spaces". */
  redirectTo: string
  /** Human label used in the confirmation text, e.g. "space". */
  label: string
}

export function DeletePageButton({
  slug,
  endpoint,
  redirectTo,
  label,
}: DeletePageButtonProps) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setDeleting(true)
    setError(null)
    try {
      const response = await fetch(
        `${endpoint}?slug=${encodeURIComponent(slug)}`,
        { method: "DELETE" }
      )
      const json = await response.json().catch(() => null)

      if (!response.ok || json?.success === false) {
        throw new Error(
          json?.message || `Failed to delete (${response.status})`
        )
      }

      // Leave the deleted page and refresh server data so the sidebar
      // list no longer shows it.
      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setDeleting(false)
    }
  }

  if (!confirming) {
    return (
      <Button
        type="button"
        variant="destructive"
        onClick={() => setConfirming(true)}
      >
        <Trash2 className="size-4" aria-hidden />
        Delete {label}
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-end gap-2 rounded-md border border-red-200 bg-red-50 p-3">
      <p className="text-sm text-red-900">
        Delete <span className="font-semibold">/{slug}</span>? This can&apos;t
        be undone.
      </p>
      {error && <p className="text-xs text-red-700">{error}</p>}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={deleting}
          onClick={() => {
            setConfirming(false)
            setError(null)
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={deleting}
          onClick={handleDelete}
        >
          {deleting ? "Deleting..." : "Yes, delete"}
        </Button>
      </div>
    </div>
  )
}
