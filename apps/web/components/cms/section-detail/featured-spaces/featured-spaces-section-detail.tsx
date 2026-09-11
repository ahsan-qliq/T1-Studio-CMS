"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { FeaturedSpacesContentTab } from "./featured-spaces-content-tab"
import type { CmsSection, FeaturedSpacesContent } from "@/types/cms"

interface FeaturedSpacesSectionDetailProps {
  section: CmsSection
  content: FeaturedSpacesContent
  onContentChange: (content: FeaturedSpacesContent) => void
}

export function FeaturedSpacesSectionDetail({
  section,
  content,
  onContentChange,
}: FeaturedSpacesSectionDetailProps) {
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
          <FeaturedSpacesContentTab
            content={content}
            language={language}
            onChange={onContentChange}
          />
        ),
      }}
    />
  )
}
