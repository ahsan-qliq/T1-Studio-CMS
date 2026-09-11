"use client"

import { SectionDetailShell } from "../section-detail-shell"
import { SignatureProjectsContentTab } from "./signature-projects-content-tab"
import { SignatureProjectsPreview } from "./signature-projects-preview"
import type { CmsSection, SignatureProjectsContent } from "@/types/cms"

interface SignatureProjectsSectionDetailProps {
  section: CmsSection
  content: SignatureProjectsContent
  onContentChange: (content: SignatureProjectsContent) => void
}

export function SignatureProjectsSectionDetail({
  section,
  content,
  onContentChange,
}: SignatureProjectsSectionDetailProps) {
  if (!content) return null

  return (
    <SectionDetailShell
      section={section}
      subtitle="Select and arrange the projects to display in this section."
      tabs={[
        { key: "content", label: "Content" },
        { key: "projects", label: "Projects" },
        { key: "settings", label: "Settings" },
      ]}
      panels={{
        content: ({ language }) => (
          <div className="grid grid-cols-[1fr,380px]">
            <div className="overflow-y-auto">
              <SignatureProjectsContentTab
                content={content}
                language={language}
                onChange={onContentChange}
              />
            </div>
            <SignatureProjectsPreview content={content} />
          </div>
        ),
      }}
    />
  )
}
