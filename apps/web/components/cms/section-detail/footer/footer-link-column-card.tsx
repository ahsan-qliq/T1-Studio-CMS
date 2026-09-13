"use client"

import { useFieldArray } from "react-hook-form"
import { ExternalLink, GripVertical, Plus, Trash2 } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { Control, UseFormRegister } from "react-hook-form"
import type { FooterFormValues } from "./footer-content-tab"
import type { Language } from "@/types/cms"

interface FooterLinkColumnCardProps {
  colIndex: number
  language: Language
  control: Control<FooterFormValues>
  register: UseFormRegister<FooterFormValues>
  onRemoveColumn: () => void
}

export function FooterLinkColumnCard({
  colIndex,
  language,
  control,
  register,
  onRemoveColumn,
}: FooterLinkColumnCardProps) {
  const isEn = language === "en"
  const l = isEn ? "En" : "Ar"
  const dir = isEn ? "ltr" : "rtl"
  const lang = isEn ? "en" : "ar"

  const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({
    control,
    name: `linkColumns.${colIndex}.links`,
  })

  const colNumber = String(colIndex + 1).padStart(2, "0")

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      <div className="flex items-center gap-3 px-4 pb-3 pt-4">
        <DragHandle />
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-600">
          {colNumber}
        </span>
        <div className="min-w-0 flex-1">
          <label className="mb-1 block text-xs font-medium text-zinc-500">Column Heading</label>
          <Input
            {...register(`linkColumns.${colIndex}.title${l}` as `linkColumns.${number}.titleEn`)}
            dir={dir}
            lang={lang}
            placeholder={isEn ? "Spaces" : "المساحات"}
            aria-label={`Column ${colIndex + 1} heading`}
            className={isEn ? undefined : "text-right"}
          />
        </div>
        <DeleteButton onClick={onRemoveColumn} ariaLabel={`Delete column ${colIndex + 1}`} />
      </div>

      <div className="border-t border-zinc-100 px-4 pb-4 pt-3">
        <p className="mb-2 text-xs font-medium text-zinc-600">Links</p>

        <div className="grid grid-cols-3 gap-2">
          {linkFields.map((link, linkIndex) => (
            <div
              key={link.id}
              className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1.5"
            >
              <span aria-hidden className="shrink-0 cursor-grab text-zinc-300 active:cursor-grabbing">
                <GripVertical className="size-3" />
              </span>
              <Input
                {...register(`linkColumns.${colIndex}.links.${linkIndex}.label`)}
                placeholder="Link label"
                aria-label={`Column ${colIndex + 1} link ${linkIndex + 1} label`}
                className="h-7 flex-1 border-0 bg-transparent px-1 text-xs shadow-none focus-visible:ring-0"
              />
              <a
                href={link.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open link"
                className="shrink-0 rounded p-0.5 text-zinc-400 transition-colors hover:text-zinc-600"
              >
                <ExternalLink className="size-3" aria-hidden />
              </a>
              <button
                type="button"
                aria-label={`Delete link ${linkIndex + 1}`}
                onClick={() => removeLink(linkIndex)}
                className="shrink-0 rounded p-0.5 text-red-400 transition-colors hover:text-red-600 focus:outline-none"
              >
                <Trash2 className="size-3" aria-hidden />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => appendLink({ id: `fl-${Date.now()}`, label: "", href: "" })}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-800 focus:outline-none focus-visible:underline"
        >
          <Plus className="size-3.5" aria-hidden />
          Add Link
        </button>
      </div>
    </div>
  )
}
