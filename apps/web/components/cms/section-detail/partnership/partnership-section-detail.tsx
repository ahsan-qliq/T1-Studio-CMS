"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { PartnershipContentTab } from "./partnership-content-tab"
import type { CmsSection, PartnershipContent } from "@/types/cms"

interface PartnershipSectionDetailProps {
  section: CmsSection
  content: PartnershipContent
  onContentChange: (content: PartnershipContent) => void
}

export function PartnershipSectionDetail({
  section,
  content,
  onContentChange,
}: PartnershipSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Add and edit content for the partnership section."
      tabs={[
        { key: "content", label: "Content" },
        // { key: "media", label: "Media" },
        // { key: "settings", label: "Settings" },
      ]}
      panels={{
        content: ({ language }) => (
          <PartnershipContentTab
            content={content}
            language={language}
            onChange={onContentChange}
          />
        ),
      }}
    />
  )
}
