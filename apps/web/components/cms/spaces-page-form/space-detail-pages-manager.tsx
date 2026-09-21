"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, ExternalLink } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

const slugify = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

interface SpaceDetailPagesManagerProps {
  pages: SpaceDetailPageApiData[]
}

export function SpaceDetailPagesManager({
  pages,
}: SpaceDetailPagesManagerProps) {
  const router = useRouter()
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [pageName, setPageName] = useState("")
  const [spaceType, setSpaceType] = useState("")
  const [slug, setSlug] = useState("")
  const [slugTouched, setSlugTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePageNameChange = (value: string) => {
    setPageName(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  const reset = () => {
    setPageName("")
    setSpaceType("")
    setSlug("")
    setSlugTouched(false)
    setError(null)
    setAdding(false)
  }

  const handleCreate = async () => {
    if (!pageName.trim() || !spaceType.trim() || !slug.trim()) {
      setError("Page name, space type, and slug are all required.")
      return
    }
    setSaving(true)
    setError(null)
    try {
      const res = await fetch("/api/create-space-detail-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageName, spaceType, slug }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.message || `Failed to create (${res.status})`)
      }
      reset()
      // Refresh so this list picks up the new page, then jump into editing it.
      router.refresh()
      router.push(`/pages/space-detail/${slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">
            Space Detail Pages
          </h2>
          <p className="text-xs text-zinc-500">
            Individual pages like Kitchens, Wardrobes, etc. — each edited
            through the space detail API.
          </p>
        </div>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
          >
            <Plus className="size-3.5" aria-hidden />
            Add Space
          </button>
        )}
      </div>

      {pages.length > 0 && (
        <ul className="divide-y divide-zinc-100 border-t border-zinc-100">
          {pages.map((p) => (
            <li
              key={p.slug}
              className="flex items-center justify-between gap-3 px-4 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900">
                  {p.pageName}
                </p>
                <p className="truncate text-xs text-zinc-500">
                  {p.spaceType} · /{p.slug} · {p.status}
                </p>
              </div>
              <Link
                href={`/pages/space-detail/${p.slug}`}
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-900"
              >
                Edit <ExternalLink className="size-3" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {pages.length === 0 && !adding && (
        <p className="border-t border-zinc-100 px-4 py-3 text-xs text-zinc-500">
          No space detail pages yet — add one to get started (Kitchens,
          Wardrobes, Living Rooms...).
        </p>
      )}

      {adding && (
        <div className="space-y-3 border-t border-zinc-100 px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Page Name</Label>
              <Input
                value={pageName}
                onChange={(e) => handlePageNameChange(e.target.value)}
                placeholder="Kitchens"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Space Type</Label>
              <Input
                value={spaceType}
                onChange={(e) => setSpaceType(e.target.value)}
                placeholder="kitchen"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Slug</Label>
              <Input
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(e.target.value)
                }}
                placeholder="kitchens"
              />
            </div>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={reset}
              disabled={saving}
              className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={saving}
              className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create & Edit"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
