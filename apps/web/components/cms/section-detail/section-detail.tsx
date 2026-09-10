"use client"

import { useState } from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { ContentTab } from "./content-tab"
import { DataSourceTab } from "./data-source-tab"
import { DisplaySettingsTab } from "./display-settings-tab"
import type { CmsSection, SignatureProjectsContent, SectionTab } from "@/types/cms"

interface SectionDetailProps {
  section: CmsSection
  content: SignatureProjectsContent
  onContentChange: (content: SignatureProjectsContent) => void
  onCollapse: () => void
}

const tabs: { key: SectionTab; label: string }[] = [
  { key: "content", label: "Content" },
  { key: "data-source", label: "Data Source" },
  { key: "display-settings", label: "Display Settings" },
]

export function SectionDetail({
  section,
  content,
  onContentChange,
  onCollapse,
}: SectionDetailProps) {
  const [activeTab, setActiveTab] = useState<SectionTab>("content")

  return (
    <div
      id={`section-detail-${section.id}`}
      className="border-b border-zinc-200 bg-blue-50/40"
      role="region"
      aria-label={`${section.name.en} section editor`}
    >
      {/* Detail header */}
      <div className="flex flex-wrap items-center gap-3 border-b border-blue-100 px-4 py-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-zinc-900">{section.name.en}</span>
            <span className="rounded border border-teal-200 bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700">
              {section.type}
            </span>
            <span className="text-xs text-zinc-500">
              — Select which projects appear on the home page.
            </span>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-[10px] font-medium text-zinc-500">EN complete</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-[10px] font-medium text-zinc-500">AR complete</span>
            </div>
          </div>
        </div>
        <button
          aria-label={`Collapse ${section.name.en} section`}
          onClick={onCollapse}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
        >
          <ChevronUp className="size-3.5" aria-hidden="true" />
          Collapse
        </button>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label={`${section.name.en} editor tabs`}
        className="flex border-b border-blue-100 px-4"
      >
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            id={`tab-${section.id}-${key}`}
            aria-selected={activeTab === key}
            aria-controls={`tabpanel-${section.id}-${key}`}
            onClick={() => setActiveTab(key)}
            className={cn(
              "border-b-2 px-3 py-2.5 text-xs font-medium transition-colors",
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
      <div className="p-4">
        <div
          role="tabpanel"
          id={`tabpanel-${section.id}-content`}
          aria-labelledby={`tab-${section.id}-content`}
          hidden={activeTab !== "content"}
        >
          {activeTab === "content" && (
            <ContentTab content={content} onChange={onContentChange} />
          )}
        </div>
        <div
          role="tabpanel"
          id={`tabpanel-${section.id}-data-source`}
          aria-labelledby={`tab-${section.id}-data-source`}
          hidden={activeTab !== "data-source"}
        >
          {activeTab === "data-source" && (
            <DataSourceTab content={content} onChange={onContentChange} />
          )}
        </div>
        <div
          role="tabpanel"
          id={`tabpanel-${section.id}-display-settings`}
          aria-labelledby={`tab-${section.id}-display-settings`}
          hidden={activeTab !== "display-settings"}
        >
          {activeTab === "display-settings" && (
            <DisplaySettingsTab content={content} onChange={onContentChange} />
          )}
        </div>
      </div>
    </div>
  )
}
