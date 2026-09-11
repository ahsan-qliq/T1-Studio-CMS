// import { ChevronRight } from "lucide-react"
// import { LanguageSwitcher } from "./language-switcher"
// import { PublishStatus } from "./publish-status"
// import { PageActions } from "./page-actions"
// import type { Language, PageStatus } from "@/types/cms"

// interface PageHeaderProps {
//   pageTitle: string
//   language: Language
//   onLanguageChange: (lang: Language) => void
//   status: PageStatus
//   onStatusChange: (status: PageStatus) => void
// }

// export function PageHeader({
//   pageTitle,
//   language,
//   onLanguageChange,
//   status,
//   onStatusChange,
// }: PageHeaderProps) {
//   return (
//     <div className="border-b border-zinc-200 bg-white px-6 py-4">
//       {/* Breadcrumb */}
//       <nav aria-label="Breadcrumb" className="mb-1 flex items-center gap-1 text-xs text-zinc-400">
//         <span>Pages</span>
//         <ChevronRight className="size-3" aria-hidden="true" />
//         <span className="text-zinc-600">{pageTitle}</span>
//       </nav>

//       {/* Title row */}
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-lg font-semibold text-zinc-900">Edit {pageTitle} Page</h1>
//           <p className="mt-0.5 text-xs text-zinc-500">
//             Manage homepage content, components, and bilingual content.
//           </p>
//         </div>

//         {/* Controls */}
//         <div className="flex shrink-0 flex-wrap items-center gap-2">
//           <LanguageSwitcher activeLanguage={language} onChange={onLanguageChange} />
//           <PublishStatus status={status} onChange={onStatusChange} />
//           <PageActions />
//         </div>
//       </div>
//     </div>
//   )
// }

import { ChevronRight } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { PublishStatus } from "./publish-status"
import { PageActions } from "./page-actions"
import type { Language, PageStatus } from "@/types/cms"

interface PageHeaderProps {
  pageTitle: string
  language: Language
  onLanguageChange: (lang: Language) => void
  status: PageStatus
  onStatusChange: (status: PageStatus) => void
  onSaveDraft?: () => void
  onPublish?: () => void
  savingDraft?: boolean
  savingPublish?: boolean
  saveError?: string | null
}

export function PageHeader({
  pageTitle,
  language,
  onLanguageChange,
  status,
  onStatusChange,
  onSaveDraft,
  onPublish,
  savingDraft,
  savingPublish,
  saveError,
}: PageHeaderProps) {
  return (
    <div className="border-b border-zinc-200 bg-white px-6 py-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-1 flex items-center gap-1 text-xs text-zinc-400">
        <span>Pages</span>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-zinc-600">{pageTitle}</span>
      </nav>

      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900">Edit {pageTitle} Page</h1>
          <p className="mt-0.5 text-xs text-zinc-500">
            Manage homepage content, components, and bilingual content.
          </p>
        </div>

        {/* Controls */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <LanguageSwitcher activeLanguage={language} onChange={onLanguageChange} />
          <PublishStatus status={status} onChange={onStatusChange} />
          <PageActions
            onSaveDraft={onSaveDraft}
            onPublish={onPublish}
            savingDraft={savingDraft}
            savingPublish={savingPublish}
          />
        </div>
      </div>

      {saveError && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          {saveError}
        </p>
      )}
    </div>
  )
}
