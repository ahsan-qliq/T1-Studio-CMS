"use client"

import { FileText, Image, Settings } from "lucide-react"
import { SectionDetailShell } from "../section-detail-shell"
import { WhyChooseContentTab } from "./why-choose-content-tab"
import type { CmsSection, WhyChooseContent } from "@/types/cms"

interface WhyChooseSectionDetailProps {
  section: CmsSection
  content: WhyChooseContent
  onContentChange: (content: WhyChooseContent) => void
}

export function WhyChooseSectionDetail({
  section,
  content,
  onContentChange,
}: WhyChooseSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Manage the comparison content and section settings."
      tabs={[
        { key: "content", label: "Content", icon: FileText },
        { key: "media", label: "Media", icon: Image },
        { key: "settings", label: "Settings", icon: Settings },
      ]}
      panels={{
        content: ({ language }) => (
          <WhyChooseContentTab content={content} language={language} onChange={onContentChange} />
        ),
      }}
    />
  )
}
