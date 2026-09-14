"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { FaqContentTab } from "./faq-content-tab"
import type { CmsSection, FaqContent } from "@/types/cms"

interface FaqSectionDetailProps {
  section: CmsSection
  content: FaqContent
  onContentChange: (content: FaqContent) => void
}

export function FaqSectionDetail({ section, content, onContentChange }: FaqSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Add and edit content for the frequently asked questions section."
      tabs={[
        { key: "content", label: "Content" },
        // { key: "settings", label: "Settings" },
        // { key: "style", label: "Style" },
      ]}
      panels={{
        content: ({ language }) => (
          <FaqContentTab content={content} language={language} onChange={onContentChange} />
        ),
      }}
    />
  )
}
