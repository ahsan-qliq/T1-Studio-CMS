"use client"

import { useState, type ComponentProps } from "react"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { HeroContentTab } from "./hero-content-tab"
import type { CmsSection } from "@/types/cms"

type HeroContent = ComponentProps<typeof HeroContentTab>["content"]

type HeroTab = "content" | "media" | "settings"

const TABS: { key: HeroTab; label: string }[] = [
  { key: "content", label: "Content" },
  { key: "media", label: "Media" },
  { key: "settings", label: "Settings" },
]

interface HeroSectionDetailProps {
  section: CmsSection
  content: HeroContent
  onContentChange: (content: HeroContent) => void
}

export function HeroSectionDetail({ section, content, onContentChange }: HeroSectionDetailProps) {
  const [activeTab, setActiveTab] = useState<HeroTab>("content")

  if (!content) return null

  const toggleVisible = () =>
    onContentChange({ ...content, visible: !content.visible })

  return (
    <div
      className="border-b border-zinc-200 bg-white"
      role="region"
      aria-label={`Edit ${section.name.en} section`}
    >
      {/* Header */}
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

        <div className="flex items-center gap-2">
          <button
            role="switch"
            aria-checked={content.visible}
            aria-label="Toggle section visibility"
            onClick={toggleVisible}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
              content.visible ? "bg-zinc-800" : "bg-zinc-300"
            )}
          >
            <span
              className={cn(
                "inline-block size-3.5 rounded-full bg-white shadow transition-transform",
                content.visible ? "translate-x-4" : "translate-x-0.5"
              )}
            />
          </button>
          <span className="text-xs text-zinc-500">Visible</span>

          <button
            type="button"
            aria-label={`More options for ${section.name.en}`}
            className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            <MoreHorizontal className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label={`${section.name.en} editor tabs`}
        className="flex border-b border-zinc-100 px-4"
      >
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            id={`hero-tab-${section.id}-${key}`}
            aria-selected={activeTab === key}
            aria-controls={`hero-tabpanel-${section.id}-${key}`}
            onClick={() => setActiveTab(key)}
            className={cn(
              "border-b-2 px-3 py-2.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900",
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
      <div>
        <div
          role="tabpanel"
          id={`hero-tabpanel-${section.id}-content`}
          aria-labelledby={`hero-tab-${section.id}-content`}
          hidden={activeTab !== "content"}
        >
          {activeTab === "content" && (
            <HeroContentTab content={content} onChange={onContentChange} />
          )}
        </div>

        <div
          role="tabpanel"
          id={`hero-tabpanel-${section.id}-media`}
          aria-labelledby={`hero-tab-${section.id}-media`}
          hidden={activeTab !== "media"}
        >
          {activeTab === "media" && (
            <p className="px-4 py-6 text-sm text-zinc-500">
              Additional media assets for this section.
            </p>
          )}
        </div>

        <div
          role="tabpanel"
          id={`hero-tabpanel-${section.id}-settings`}
          aria-labelledby={`hero-tab-${section.id}-settings`}
          hidden={activeTab !== "settings"}
        >
          {activeTab === "settings" && (
            <p className="px-4 py-6 text-sm text-zinc-500">
              Layout and behaviour settings for this section.
            </p>
          )}
        </div>
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
