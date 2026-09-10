"use client"

import { Info } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { SignatureProjectsContent } from "@/types/cms"

interface DataSourceTabProps {
  content: SignatureProjectsContent
  onChange: (content: SignatureProjectsContent) => void
}

export function DataSourceTab({ content, onChange }: DataSourceTabProps) {
  const sourceTypes = [
    "Linked: Projects",
    "Linked: Services",
    "Linked: Blog",
    "Linked: Spaces",
  ]

  const displayCounts = [3, 4, 6, 8, 12]

  return (
    <div className="max-w-sm space-y-5">
      {/* Source Type */}
      <div>
        <label htmlFor="source-type" className="mb-1.5 block text-xs font-semibold text-zinc-700">
          Source Type
        </label>
        <select
          id="source-type"
          value={content.sourceType}
          onChange={(e) => onChange({ ...content, sourceType: e.target.value })}
          className="w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
        >
          {sourceTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Display Mode */}
      <fieldset>
        <legend className="mb-1.5 text-xs font-semibold text-zinc-700">Display Mode</legend>
        <div className="space-y-2">
          {(["manual", "latest"] as const).map((mode) => (
            <label
              key={mode}
              className="flex cursor-pointer items-center gap-2.5 rounded-md border border-zinc-200 bg-white px-3 py-2 transition-colors hover:bg-zinc-50"
            >
              <input
                type="radio"
                name="display-mode"
                value={mode}
                checked={content.displayMode === mode}
                onChange={() => onChange({ ...content, displayMode: mode })}
                className="text-zinc-900 focus:ring-zinc-900"
              />
              <div>
                <p className="text-xs font-medium text-zinc-800">
                  {mode === "manual" ? "Manually selected" : "Latest projects"}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {mode === "manual"
                    ? "Choose specific projects from the Content tab"
                    : "Automatically shows the most recently added projects"}
                </p>
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Info note */}
      <div className="flex gap-2 rounded-md border border-zinc-100 bg-zinc-50 p-2.5 text-[11px] text-zinc-600">
        <Info className="mt-0.5 size-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
        <p>
          Changing source type will clear your current project selection. Changes take effect after
          publishing.
        </p>
      </div>

      {/* Items to display */}
      <div>
        <label htmlFor="items-count" className="mb-1.5 block text-xs font-semibold text-zinc-700">
          Items to display
        </label>
        <select
          id="items-count"
          value={content.itemsToDisplay}
          onChange={(e) => onChange({ ...content, itemsToDisplay: Number(e.target.value) })}
          className="w-40 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
        >
          {displayCounts.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
