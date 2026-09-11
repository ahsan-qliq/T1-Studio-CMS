"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { JourneyContentTab } from "./journey-content-tab"
import type { CmsSection, JourneyContent } from "@/types/cms"

interface JourneySectionDetailProps {
  section: CmsSection
  content: JourneyContent
  onContentChange: (content: JourneyContent) => void
}

export function JourneySectionDetail({
  section,
  content,
  onContentChange,
}: JourneySectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Manage the project journey section. Add, edit and reorder the steps."
      tabs={[
        { key: "content", label: "Content" },
        { key: "steps", label: "Steps" },
        { key: "settings", label: "Settings" },
      ]}
      panels={{
        content: ({ language }) => (
          <JourneyContentTab content={content} language={language} onChange={onContentChange} />
        ),
      }}
    />
  )
}
