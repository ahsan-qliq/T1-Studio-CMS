"use client"

import { cn } from "@workspace/ui/lib/utils"
import type { SectionFilterCounts } from "@/types/cms"

export type FilterKey = "all" | "manual" | "linked" | "global"

interface SectionFiltersProps {
  active: FilterKey
  counts: SectionFilterCounts
  onChange: (filter: FilterKey) => void
}

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "manual", label: "Manual" },
  { key: "linked", label: "Linked" },
  { key: "global", label: "Global" },
]

export function SectionFilters({ active, counts, onChange }: SectionFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter sections by type"
      className="flex gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50 p-0.5"
    >
      {filters.map(({ key, label }) => {
        const count = counts[key]
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active === key}
            onClick={() => onChange(key)}
            className={cn(
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              active === key
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700"
            )}
          >
            {label}
            <span
              className={cn(
                "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                active === key ? "bg-zinc-100 text-zinc-700" : "text-zinc-400"
              )}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
