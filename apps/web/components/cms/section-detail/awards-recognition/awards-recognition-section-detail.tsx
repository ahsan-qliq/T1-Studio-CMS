"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { AwardsContentTab } from "./awards-content-tab"
import type { AwardsContent, CmsSection } from "@/types/cms"

interface AwardsRecognitionSectionDetailProps {
  section: CmsSection
  content: AwardsContent
  onContentChange: (content: AwardsContent) => void
}

export function AwardsRecognitionSectionDetail({
  section,
  content,
  onContentChange,
}: AwardsRecognitionSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Add and edit content for the awards & recognition section."
      tabs={[
        { key: "content", label: "Content" },
        { key: "settings", label: "Settings" },
        { key: "style", label: "Style" },
      ]}
      panels={{
        content: ({ language }) => (
          <AwardsContentTab content={content} language={language} onChange={onContentChange} />
        ),
      }}
    />
  )
}
