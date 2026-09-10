"use client"

import { GripVertical, X, Search } from "lucide-react"
import type { SignatureProjectsContent } from "@/types/cms"

interface ContentTabProps {
  content: SignatureProjectsContent
  onChange: (content: SignatureProjectsContent) => void
}

export function ContentTab({ content, onChange }: ContentTabProps) {
  const updateField = <K extends keyof SignatureProjectsContent>(
    key: K,
    value: SignatureProjectsContent[K]
  ) => {
    onChange({ ...content, [key]: value })
  }

  const removeProject = (id: string) => {
    onChange({
      ...content,
      selectedProjects: content.selectedProjects.filter((p) => p.id !== id),
    })
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Column 1: Section Heading + Button Label */}
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Section Heading
          </h4>
          <div className="space-y-2">
            <div>
              <label htmlFor="heading-en" className="mb-1 block text-[11px] font-medium text-zinc-600">
                English (EN)
              </label>
              <input
                id="heading-en"
                lang="en"
                type="text"
                value={content.headingEn}
                onChange={(e) => updateField("headingEn", e.target.value)}
                className="w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>
            <div>
              <label htmlFor="heading-ar" className="mb-1 block text-[11px] font-medium text-zinc-600">
                Arabic (AR)
              </label>
              <input
                id="heading-ar"
                lang="ar"
                dir="rtl"
                type="text"
                value={content.headingAr}
                onChange={(e) => updateField("headingAr", e.target.value)}
                className="w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Button Label
          </h4>
          <div className="space-y-2">
            <div>
              <label htmlFor="btn-label-en" className="mb-1 block text-[11px] font-medium text-zinc-600">
                English (EN)
              </label>
              <input
                id="btn-label-en"
                lang="en"
                type="text"
                value={content.buttonLabelEn}
                onChange={(e) => updateField("buttonLabelEn", e.target.value)}
                className="w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>
            <div>
              <label htmlFor="btn-label-ar" className="mb-1 block text-[11px] font-medium text-zinc-600">
                Arabic (AR)
              </label>
              <input
                id="btn-label-ar"
                lang="ar"
                dir="rtl"
                type="text"
                value={content.buttonLabelAr}
                onChange={(e) => updateField("buttonLabelAr", e.target.value)}
                className="w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Selected Projects */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Selected Projects ({content.selectedProjects.length})
        </h4>
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search projects..."
            aria-label="Search projects to add"
            className="w-full rounded-md border border-zinc-200 bg-white py-1.5 pl-8 pr-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
        </div>
        <ul className="space-y-1.5" aria-label="Selected projects list">
          {content.selectedProjects.map((project) => (
            <li
              key={project.id}
              className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2 py-2"
            >
              <button
                aria-label={`Drag to reorder ${project.title}`}
                className="cursor-grab text-zinc-300 hover:text-zinc-500 active:cursor-grabbing"
              >
                <GripVertical className="size-4" aria-hidden="true" />
              </button>
              <div
                className="size-8 shrink-0 rounded bg-zinc-100"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-zinc-900">{project.title}</p>
                <p className="truncate text-[10px] text-zinc-500">{project.location}</p>
              </div>
              <button
                aria-label={`Remove ${project.title} from selection`}
                onClick={() => removeProject(project.id)}
                className="rounded p-0.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3: (empty in content tab — data source shown in its own tab) */}
      <div className="hidden md:block" aria-hidden="true" />
    </div>
  )
}
