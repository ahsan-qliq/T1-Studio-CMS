"use client"

import { cn } from "@workspace/ui/lib/utils"
import type { Language } from "@/types/cms"

interface LanguageSwitcherProps {
  activeLanguage: Language
  onChange: (lang: Language) => void
}

export function LanguageSwitcher({ activeLanguage, onChange }: LanguageSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Language selection"
      className="inline-flex rounded-md border border-zinc-200 bg-zinc-50 p-0.5"
    >
      <button
        role="tab"
        aria-selected={activeLanguage === "en"}
        aria-controls="cms-content-en"
        onClick={() => onChange("en")}
        className={cn(
          "rounded px-3 py-1 text-xs font-semibold transition-colors",
          activeLanguage === "en"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700"
        )}
      >
        EN
      </button>
      <button
        role="tab"
        aria-selected={activeLanguage === "ar"}
        aria-controls="cms-content-ar"
        onClick={() => onChange("ar")}
        className={cn(
          "rounded px-3 py-1 text-xs font-semibold transition-colors",
          activeLanguage === "ar"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700"
        )}
      >
        AR
      </button>
    </div>
  )
}
