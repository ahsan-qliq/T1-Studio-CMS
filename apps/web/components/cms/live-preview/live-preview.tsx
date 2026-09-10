"use client"

import { useState } from "react"
import { PreviewToolbar } from "./preview-toolbar"
import { PreviewFrame } from "./preview-frame"
import type { Language, Viewport } from "@/types/cms"

export function LivePreview() {
  const [viewport, setViewport] = useState<Viewport>("desktop")
  const [language, setLanguage] = useState<Language>("en")
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="flex h-full flex-col border-l border-zinc-200 bg-zinc-50">
      <PreviewToolbar
        viewport={viewport}
        onViewportChange={setViewport}
        language={language}
        onLanguageChange={setLanguage}
        page="Home Page (Desktop)"
        onRefresh={() => setRefreshKey((k) => k + 1)}
      />
      <div className="flex flex-1 overflow-hidden">
        <PreviewFrame key={refreshKey} viewport={viewport} language={language} />
      </div>
    </div>
  )
}
