"use client"

import { useState } from "react"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { ServicesContentTab } from "./services-content-tab"
import type { CmsSection, Language, ServicesContent } from "@/types/cms"

type ServicesTab = "content" | "media" | "settings"

const TABS: { key: ServicesTab; label: string }[] = [
  { key: "content", label: "Content" },
  { key: "media", label: "Media" },
  { key: "settings", label: "Settings" },
]

interface ServicesSectionDetailProps {
  section: CmsSection
  content: ServicesContent
  onContentChange: (content: ServicesContent) => void
}

export function ServicesSectionDetail({
  section,
  content,
  onContentChange,
}: ServicesSectionDetailProps) {
  const [activeTab, setActiveTab] = useState<ServicesTab>("content")
  const [language, setLanguage] = useState<Language>("en")

  if (!content) return null

  return (
    <div
      className="border-b border-zinc-200 bg-white"
      role="region"
      aria-label={`Edit ${section.name.en} section`}
    >
      {/* Header — matches Hero/Stats pattern */}
      <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-bold text-zinc-600"
          aria-hidden
        >
          {section.number}
        </span>

        <h2 className="flex-1 text-sm font-semibold text-zinc-900">
          Edit {section.name.en} Section
        </h2>

        {/* EN / AR language switcher */}
        <div
          role="group"
          aria-label="Content language"
          className="flex overflow-hidden rounded-md border border-zinc-200"
        >
          {(["en", "ar"] as Language[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={language === l}
              onClick={() => setLanguage(l)}
              className={cn(
                "px-3 py-1 text-xs font-semibold uppercase transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900",
                language === l
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
              )}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label={`More options for ${section.name.en}`}
          className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          <MoreHorizontal className="size-4" aria-hidden />
        </button>
      </div>

      {/* Tabs — plain text, no icons */}
      <div
        role="tablist"
        aria-label={`${section.name.en} editor tabs`}
        className="flex border-b border-zinc-100 px-4"
      >
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            id={`svc-tab-${section.id}-${key}`}
            aria-selected={activeTab === key}
            aria-controls={`svc-panel-${section.id}-${key}`}
            onClick={() => setActiveTab(key)}
            className={cn(
              "border-b-2 px-3 py-2.5 text-xs font-medium transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900",
              activeTab === key
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div
        role="tabpanel"
        id={`svc-panel-${section.id}-content`}
        aria-labelledby={`svc-tab-${section.id}-content`}
        hidden={activeTab !== "content"}
      >
        {activeTab === "content" && (
          <ServicesContentTab
            content={content}
            language={language}
            onChange={onContentChange}
          />
        )}
      </div>

      <div
        role="tabpanel"
        id={`svc-panel-${section.id}-media`}
        aria-labelledby={`svc-tab-${section.id}-media`}
        hidden={activeTab !== "media"}
      >
        {activeTab === "media" && (
          <p className="px-5 py-6 text-sm text-zinc-500">
            Background and accent media for this section.
          </p>
        )}
      </div>

      <div
        role="tabpanel"
        id={`svc-panel-${section.id}-settings`}
        aria-labelledby={`svc-tab-${section.id}-settings`}
        hidden={activeTab !== "settings"}
      >
        {activeTab === "settings" && (
          <p className="px-5 py-6 text-sm text-zinc-500">
            Layout and display settings coming soon.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-4 py-3">
        <button
          type="button"
          aria-label={`Delete ${section.name.en} section`}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Trash2 className="size-3.5" aria-hidden />
          Delete Section
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            Save Draft
          </button>
          <button
            type="button"
            className="rounded-md bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1"
          >
            Update Section
          </button>
        </div>
      </div>
    </div>
  )
}
