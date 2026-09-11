"use client"

import { useRef } from "react"
import { ImageIcon } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"
import type { DesignTipsFormValues } from "./design-tips-content-tab"
import type { Language } from "@/types/cms"

interface DesignTipsArticleRowProps {
  article: DesignTipsFormValues["articles"][number]
  index: number
  language: Language
  register: UseFormRegister<DesignTipsFormValues>
  setValue: UseFormSetValue<DesignTipsFormValues>
  onRemove: () => void
}

export function DesignTipsArticleRow({
  article,
  index,
  language,
  register,
  setValue,
  onRemove,
}: DesignTipsArticleRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEn = language === "en"
  const l = isEn ? "En" : "Ar"
  const dir = isEn ? "ltr" : "rtl"
  const lang = isEn ? "en" : "ar"

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue(`articles.${index}.imageUrl`, URL.createObjectURL(file))
    }
  }

  return (
    <div className="flex gap-4 border-b border-zinc-100 py-5 last:border-b-0" role="listitem">
      <DragHandle className="mt-1" />

      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-600">
        {article.number}
      </span>

      <div className="relative shrink-0">
        <div
          className="flex h-36 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100"
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label={`Upload image for article ${index + 1}`}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.titleEn || `Article ${index + 1}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="size-8 text-zinc-300" aria-hidden />
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-label={`Upload image for article ${index + 1}`}
          onChange={handleFileChange}
        />
        <button
          type="button"
          aria-label={`Change image for article ${index + 1}`}
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 flex size-7 items-center justify-center rounded-md border border-zinc-200 bg-white/90 text-zinc-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          <ImageIcon className="size-3.5" aria-hidden />
        </button>
      </div>

      <div className="min-w-0 flex-1 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600">Title</label>
          <Input
            {...register(`articles.${index}.title${l}` as `articles.${number}.titleEn`)}
            dir={dir}
            lang={lang}
            placeholder={isEn ? "Article title" : "عنوان المقالة"}
            aria-label={`Article ${index + 1} title`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600">Category</label>
            <Input
              {...register(`articles.${index}.category`)}
              placeholder="Guide"
              aria-label={`Article ${index + 1} category`}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600">Read Time</label>
            <Input
              {...register(`articles.${index}.readTime`)}
              placeholder="5 min read"
              aria-label={`Article ${index + 1} read time`}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600">
            Link <span className="font-normal text-zinc-400">(Optional)</span>
          </label>
          <Input
            {...register(`articles.${index}.link`)}
            placeholder="https:// (optional)"
            aria-label={`Article ${index + 1} link`}
          />
        </div>
      </div>

      <DeleteButton onClick={onRemove} ariaLabel={`Delete article ${index + 1}`} className="mt-1" />
    </div>
  )
}
