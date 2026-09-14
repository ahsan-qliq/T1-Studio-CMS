"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { ServicesContentTab } from "./services-content-tab"
import type { CmsSection, ServicesContent } from "@/types/cms"

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
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      tabs={[
        { key: "content", label: "Content" },
        // { key: "media", label: "Media" },
        // { key: "settings", label: "Settings" },
      ]}
      panels={{
        content: ({ language }) => (
          <ServicesContentTab content={content} language={language} onChange={onContentChange} />
        ),
      }}
    />
  )
}
