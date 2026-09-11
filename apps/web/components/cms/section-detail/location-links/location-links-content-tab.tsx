"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { LocationColumnCard } from "./location-column-card"
import type { LocationLinksContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const linkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
})

const columnSchema = z.object({
  id: z.string(),
  number: z.string(),
  titleEn: z.string(),
  titleAr: z.string(),
  links: z.array(linkSchema),
})

const locationLinksSchema = z.object({
  sectionTitleEn: z.string(),
  sectionTitleAr: z.string(),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  columns: z.array(columnSchema),
})

export type LocationLinksFormValues = z.infer<typeof locationLinksSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface LocationLinksContentTabProps {
  content: LocationLinksContent
  language: Language
  onChange: (content: LocationLinksContent) => void
}

export function LocationLinksContentTab({
  content,
  language,
  onChange,
}: LocationLinksContentTabProps) {
  const isEn = language === "en"

  const form = useForm<LocationLinksFormValues>({
    resolver: zodResolver(locationLinksSchema),
    defaultValues: content,
  })

  const { fields: columnFields, append: appendColumn, remove: removeColumn } = useFieldArray({
    control: form.control,
    name: "columns",
  })

  useFormSync(form, onChange)

  const addColumn = () => {
    const nextNum = String(columnFields.length + 1).padStart(2, "0")
    appendColumn({
      id: `col-${Date.now()}`,
      number: nextNum,
      titleEn: "",
      titleAr: "",
      links: [],
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6 px-5 py-5" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <SectionField
            control={form.control}
            name={isEn ? "sectionTitleEn" : "sectionTitleAr"}
            label="Section Title"
            isRtl={!isEn}
            optional
            placeholder={isEn ? "Locations" : "المواقع"}
          />
          <SectionField
            control={form.control}
            name={isEn ? "descriptionEn" : "descriptionAr"}
            label="Section Description"
            isRtl={!isEn}
            optional
            multiline
            placeholder="Enter section description"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Columns</h3>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {columnFields.length} items
            </span>
            <button
              type="button"
              onClick={addColumn}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <Plus className="size-3.5" aria-hidden />
              Add Column
            </button>
          </div>

          <div role="list" aria-label="Location columns" className="space-y-4">
            {columnFields.map((col, colIndex) => (
              <div key={col.id} role="listitem">
                <LocationColumnCard
                  colIndex={colIndex}
                  language={language}
                  control={form.control}
                  register={form.register}
                  onRemoveColumn={() => removeColumn(colIndex)}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </Form>
  )
}
