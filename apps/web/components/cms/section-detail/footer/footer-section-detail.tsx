"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { FooterContentTab } from "./footer-content-tab"
import type { CmsSection, FooterContent } from "@/types/cms"

interface FooterSectionDetailProps {
  section: CmsSection
  content: FooterContent
  onContentChange: (content: FooterContent) => void
}

export function FooterSectionDetail({
  section,
  content,
  onContentChange,
}: FooterSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Edit the newsletter, link columns, opening hours, showroom details, and legal links shown in the global footer."
      tabs={[
        { key: "content", label: "Content" },
        { key: "settings", label: "Settings" },
        { key: "style", label: "Style" },
      ]}
      panels={{
        content: ({ language }) => (
          <FooterContentTab
            content={content}
            language={language}
            onChange={onContentChange}
          />
        ),
      }}
    />
  )
}
