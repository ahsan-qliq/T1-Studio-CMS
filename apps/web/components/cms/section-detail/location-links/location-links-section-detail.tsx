"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { LocationLinksContentTab } from "./location-links-content-tab"
import type { CmsSection, LocationLinksContent } from "@/types/cms"

interface LocationLinksSectionDetailProps {
  section: CmsSection
  content: LocationLinksContent
  onContentChange: (content: LocationLinksContent) => void
}

export function LocationLinksSectionDetail({
  section,
  content,
  onContentChange,
}: LocationLinksSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Add and edit the columns and href links for this section."
      tabs={[
        { key: "content", label: "Content" },
        { key: "settings", label: "Settings" },
        { key: "style", label: "Style" },
      ]}
      panels={{
        content: ({ language }) => (
          <LocationLinksContentTab
            content={content}
            language={language}
            onChange={onContentChange}
          />
        ),
      }}
    />
  )
}
