"use client"

import { type ComponentProps } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { SectionDetailShell } from "../section-detail-shell"
import { HeroContentTab } from "./hero-content-tab"
import type { CmsSection } from "@/types/cms"

type HeroContent = ComponentProps<typeof HeroContentTab>["content"]

interface HeroSectionDetailProps {
  section: CmsSection
  content: HeroContent
  onContentChange: (content: HeroContent) => void
}

export function HeroSectionDetail({
  section,
  content,
  onContentChange,
}: HeroSectionDetailProps) {
  if (!content) return null

  const visibilityToggle = (
    <div className="flex items-center gap-2">
      <button
        role="switch"
        aria-checked={content.visible}
        aria-label="Toggle section visibility"
        onClick={() =>
          onContentChange({ ...content, visible: !content.visible })
        }
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
    </div>
  )

  return (
    <SectionDetailShell
      section={section}
      tabs={[
        { key: "content", label: "Content" },
        // { key: "media", label: "Media" },
        // { key: "settings", label: "Settings" },
      ]}
      showLanguageSwitcher={false}
      extraHeaderControls={visibilityToggle}
      panels={{
        content: () => (
          <HeroContentTab content={content} onChange={onContentChange} />
        ),
      }}
    />
  )
}
