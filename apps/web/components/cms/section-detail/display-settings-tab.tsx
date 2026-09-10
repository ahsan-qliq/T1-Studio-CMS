"use client"

import { cn } from "@workspace/ui/lib/utils"
import type { SignatureProjectsContent } from "@/types/cms"

interface ToggleRowProps {
  id: string
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleRow({ id, label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-zinc-100 py-3 last:border-0">
      <div className="flex-1">
        <label htmlFor={id} className="cursor-pointer text-sm font-medium text-zinc-800">
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
        )}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
          checked ? "bg-emerald-500" : "bg-zinc-300"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block size-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  )
}

interface DisplaySettingsTabProps {
  content: SignatureProjectsContent
  onChange: (content: SignatureProjectsContent) => void
}

export function DisplaySettingsTab({ content, onChange }: DisplaySettingsTabProps) {
  return (
    <div className="max-w-md">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Display Options
      </h4>
      <div className="rounded-lg border border-zinc-200 bg-white px-4">
        <ToggleRow
          id="toggle-show-location"
          label="Show location"
          description="Display the city/country label beneath each project title"
          checked={content.showLocation}
          onChange={(v) => onChange({ ...content, showLocation: v })}
        />
        <ToggleRow
          id="toggle-show-cta"
          label="Show CTA"
          description="Display the View All Projects button below the section"
          checked={content.showCta}
          onChange={(v) => onChange({ ...content, showCta: v })}
        />
        <ToggleRow
          id="toggle-same-layout-ar"
          label="Use same layout for EN and AR"
          description="When off, the Arabic layout will mirror the English layout direction"
          checked={content.sameLayoutForAr}
          onChange={(v) => onChange({ ...content, sameLayoutForAr: v })}
        />
      </div>
    </div>
  )
}
