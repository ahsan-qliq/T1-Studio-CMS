"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { DesignTipsContentTab } from "./design-tips-content-tab"
import type { CmsSection, DesignTipsContent } from "@/types/cms"

interface DesignTipsSectionDetailProps {
  section: CmsSection
  content: DesignTipsContent
  onContentChange: (content: DesignTipsContent) => void
}

export function DesignTipsSectionDetail({
  section,
  content,
  onContentChange,
}: DesignTipsSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Add and edit content for the design tips and insights section."
      tabs={[
        { key: "content", label: "Content" },
        // { key: "settings", label: "Settings" },
        // { key: "style", label: "Style" },
      ]}
      panels={{
        content: ({ language }) => (
          <DesignTipsContentTab content={content} language={language} onChange={onContentChange} />
        ),
      }}
    />
  )
}
