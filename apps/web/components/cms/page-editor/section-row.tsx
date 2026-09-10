"use client"

import { MoreHorizontal, Pencil, ChevronDown } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { CmsSection, SectionType } from "@/types/cms"

function getTypeBadgeClass(type: SectionType): string {
  const base = "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold border"
  if (type === "Manual") return cn(base, "bg-zinc-100 text-zinc-600 border-zinc-200")
  if (type === "Global") return cn(base, "bg-purple-50 text-purple-700 border-purple-200")
  if (type === "Collection") return cn(base, "bg-orange-50 text-orange-700 border-orange-200")
  // Linked variants
  return cn(base, "bg-teal-50 text-teal-700 border-teal-200")
}

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation()
        onChange(!checked)
      }}
      className={cn(
        "relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
        checked ? "bg-emerald-500" : "bg-zinc-300"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block size-3 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-3" : "translate-x-0"
        )}
      />
    </button>
  )
}

interface StatusDotProps {
  filled: boolean
  label: string
}

function StatusDot({ filled, label }: StatusDotProps) {
  return (
    <div className="flex items-center gap-1" title={label}>
      <span
        className={cn(
          "size-1.5 rounded-full",
          filled ? "bg-emerald-500" : "bg-zinc-300"
        )}
        aria-hidden="true"
      />
      <span className="text-[10px] font-medium text-zinc-500">{label.split(" ")[0]}</span>
    </div>
  )
}

interface SectionRowProps {
  section: CmsSection
  expanded: boolean
  onToggleExpand: () => void
  onToggleVisible: (visible: boolean) => void
}

export function SectionRow({
  section,
  expanded,
  onToggleExpand,
  onToggleVisible,
}: SectionRowProps) {
  const isGlobal = section.type === "Global"

  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-zinc-100 px-4 py-3 transition-colors",
        expanded ? "bg-blue-50/60" : isGlobal ? "bg-purple-50/30 hover:bg-purple-50/50" : "bg-white hover:bg-zinc-50/80",
        "cursor-pointer"
      )}
      onClick={onToggleExpand}
      role="button"
      aria-expanded={expanded}
      aria-label={`Section ${section.number}: ${section.name.en}. ${expanded ? "Collapse" : "Expand"} section.`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onToggleExpand()
        }
      }}
    >
      {/* Number */}
      <span className="w-6 shrink-0 text-center text-xs font-mono font-medium text-zinc-400">
        {section.number}
      </span>

      {/* Thumbnail */}
      <div
        className="size-8 shrink-0 rounded border border-zinc-200 bg-zinc-100"
        aria-hidden="true"
      />

      {/* Name */}
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-800">
        {section.name.en}
      </span>

      {/* Type badge */}
      <span className={getTypeBadgeClass(section.type)}>{section.type}</span>

      {/* Language status */}
      <div className="flex items-center gap-2 shrink-0">
        <StatusDot filled={section.status.en} label="EN complete" />
        <StatusDot filled={section.status.ar} label="AR complete" />
      </div>

      {/* Visibility toggle */}
      <div onClick={(e) => e.stopPropagation()}>
        <ToggleSwitch
          checked={section.visible}
          onChange={onToggleVisible}
          label={`Toggle visibility for ${section.name.en}`}
        />
      </div>

      {/* Edit button */}
      <button
        aria-label={`Edit section: ${section.name.en}`}
        onClick={(e) => {
          e.stopPropagation()
          onToggleExpand()
        }}
        className="inline-flex items-center gap-1 rounded border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
      >
        <Pencil className="size-3" aria-hidden="true" />
        Edit
      </button>

      {/* More options */}
      <button
        aria-label={`More options for ${section.name.en}`}
        onClick={(e) => e.stopPropagation()}
        className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
      >
        <MoreHorizontal className="size-4" aria-hidden="true" />
      </button>

      {/* Expand indicator */}
      <ChevronDown
        className={cn(
          "size-3.5 shrink-0 text-zinc-400 transition-transform",
          expanded && "rotate-180"
        )}
        aria-hidden="true"
      />
    </div>
  )
}
