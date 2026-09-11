"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { StatsContentTab } from "./stats-content-tab"
import type { CmsSection, StatsContent } from "@/types/cms"

interface StatsSectionDetailProps {
  section: CmsSection
  content: StatsContent
  onContentChange: (content: StatsContent) => void
}

export function StatsSectionDetail({
  section,
  content,
  onContentChange,
}: StatsSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      tabs={[
        { key: "content", label: "Content" },
        { key: "media", label: "Media" },
        { key: "settings", label: "Settings" },
      ]}
      panels={{
        content: ({ language }) => (
          <StatsContentTab content={content} language={language} onChange={onContentChange} />
        ),
      }}
    />
  )
}
