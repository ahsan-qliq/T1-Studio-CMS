"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { ConsultationContentTab } from "./consultation-content-tab"
import type { CmsSection, ConsultationCtaContent } from "@/types/cms"

interface ConsultationCtaSectionDetailProps {
  section: CmsSection
  content: ConsultationCtaContent
  onContentChange: (content: ConsultationCtaContent) => void
}

export function ConsultationCtaSectionDetail({
  section,
  content,
  onContentChange,
}: ConsultationCtaSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Configure the content and form fields for the consultation section."
      tabs={[
        { key: "content", label: "Content" },
        // { key: "form-fields", label: "Form Fields" },
        // { key: "settings", label: "Settings" },
      ]}
      panels={{
        content: ({ language }) => (
          <ConsultationContentTab
            content={content}
            language={language}
            onChange={onContentChange}
          />
        ),
      }}
    />
  )
}
