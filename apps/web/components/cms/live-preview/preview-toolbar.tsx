"use client"

import { Monitor, Tablet, Smartphone, RefreshCw, ChevronDown } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { Language, Viewport } from "@/types/cms"

interface PreviewToolbarProps {
  viewport: Viewport
  onViewportChange: (v: Viewport) => void
  language: Language
  onLanguageChange: (l: Language) => void
  page: string
  onRefresh?: () => void
}

const viewports: { key: Viewport; icon: typeof Monitor; label: string }[] = [
  { key: "desktop", icon: Monitor, label: "Desktop preview" },
  { key: "tablet", icon: Tablet, label: "Tablet preview" },
  { key: "mobile", icon: Smartphone, label: "Mobile preview" },
]

export function PreviewToolbar({
  viewport,
  onViewportChange,
  language,
  onLanguageChange,
  page,
  onRefresh,
}: PreviewToolbarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
      <span className="text-xs font-semibold text-zinc-700 shrink-0">Live Preview</span>

      {/* Page selector */}
      <button
        aria-label="Select preview page"
        aria-haspopup="listbox"
        className="flex flex-1 min-w-0 items-center justify-between gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] text-zinc-700 hover:bg-zinc-50"
      >
        <span className="truncate">{page}</span>
        <ChevronDown className="size-3 shrink-0" aria-hidden="true" />
      </button>

      {/* Viewport toggles */}
      <div
        role="group"
        aria-label="Viewport size"
        className="flex rounded-md border border-zinc-200 bg-white"
      >
        {viewports.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            aria-label={label}
            aria-pressed={viewport === key}
            onClick={() => onViewportChange(key)}
            className={cn(
              "p-1.5 transition-colors first:rounded-l-md last:rounded-r-md",
              viewport === key
                ? "bg-zinc-900 text-white"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Refresh */}
      <button
        aria-label="Refresh preview"
        onClick={onRefresh}
        className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
      >
        <RefreshCw className="size-3.5" aria-hidden="true" />
      </button>

      {/* Language toggle */}
      <div
        role="group"
        aria-label="Preview language"
        className="flex rounded-md border border-zinc-200 bg-white"
      >
        {(["en", "ar"] as Language[]).map((lang) => (
          <button
            key={lang}
            aria-label={`Preview in ${lang === "en" ? "English" : "Arabic"}`}
            aria-pressed={language === lang}
            onClick={() => onLanguageChange(lang)}
            className={cn(
              "px-2 py-1 text-[10px] font-semibold transition-colors first:rounded-l-md last:rounded-r-md",
              language === lang
                ? "bg-zinc-900 text-white"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
            )}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
