"use client"

import { Eye, Save } from "lucide-react"

interface PageActionsProps {
  onPreview?: () => void
  onSaveDraft?: () => void
  onPublish?: () => void
}

export function PageActions({ onPreview, onSaveDraft, onPublish }: PageActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Preview page"
        onClick={onPreview}
        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
      >
        <Eye className="size-3.5" aria-hidden="true" />
        Preview
      </button>
      <button
        aria-label="Save as draft"
        onClick={onSaveDraft}
        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
      >
        <Save className="size-3.5" aria-hidden="true" />
        Save Draft
      </button>
      <button
        aria-label="Publish changes"
        onClick={onPublish}
        className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-700"
      >
        Publish Changes
      </button>
    </div>
  )
}
