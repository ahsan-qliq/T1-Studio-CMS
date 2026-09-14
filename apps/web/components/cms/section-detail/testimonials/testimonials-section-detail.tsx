"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { TestimonialsContentTab } from "./testimonials-content-tab"
import type { CmsSection, TestimonialsContent } from "@/types/cms"

interface TestimonialsSectionDetailProps {
  section: CmsSection
  content: TestimonialsContent
  onContentChange: (content: TestimonialsContent) => void
}

export function TestimonialsSectionDetail({
  section,
  content,
  onContentChange,
}: TestimonialsSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Add, edit and reorder client testimonials to display in this section."
      tabs={[
        { key: "content", label: "Content" },
        // { key: "media", label: "Media" },
        // { key: "settings", label: "Settings" },
      ]}
      panels={{
        content: ({ language }) => (
          <TestimonialsContentTab
            content={content}
            language={language}
            onChange={onContentChange}
          />
        ),
      }}
    />
  )
}
