"use client"

import { useRef } from "react"
import { ImageIcon } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { VisibilityToggle } from "../shared/visibility-toggle"
import { DeleteButton } from "../shared/delete-button"
import type { SpaceCard, Language } from "@/types/cms"
import type { UseFormRegister } from "react-hook-form"
import type { FeaturedSpacesFormValues } from "./featured-spaces-content-tab"

interface SpaceCardRowProps {
  card: SpaceCard
  index: number
  language: Language
  register: UseFormRegister<FeaturedSpacesFormValues>
  onToggleVisible: (visible: boolean) => void
  onImageChange: (file: File | null) => void
  onRemove: () => void
}

export function SpaceCardRow({
  card,
  index,
  language,
  register,
  onToggleVisible,
  onImageChange,
  onRemove,
}: SpaceCardRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEn = language === "en"
  const previewUrl = card.imageUrl ?? null

  return (
    <div
      className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5"
      role="listitem"
    >
      <DragHandle />

      <button
        type="button"
        aria-label={`Upload image for card ${index + 1}`}
        onClick={() => fileInputRef.current?.click()}
        className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImageIcon className="size-5 text-zinc-400" aria-hidden />
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label={`Image file for card ${index + 1}`}
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null
          onImageChange(file)
          e.target.value = ""
        }}
      />

      <Input
        {...register(isEn ? `cards.${index}.titleEn` : `cards.${index}.titleAr`)}
        dir={isEn ? "ltr" : "rtl"}
        lang={isEn ? "en" : "ar"}
        placeholder={isEn ? "Space title" : "عنوان المساحة"}
        aria-label={`Card ${index + 1} ${isEn ? "English" : "Arabic"} title`}
        className="flex-1"
      />

      <VisibilityToggle
        checked={card.visible}
        onChange={onToggleVisible}
        ariaLabel={`Toggle visibility for card ${index + 1}`}
      />

      <DeleteButton onClick={onRemove} ariaLabel={`Delete card ${index + 1}`} />
    </div>
  )
}
