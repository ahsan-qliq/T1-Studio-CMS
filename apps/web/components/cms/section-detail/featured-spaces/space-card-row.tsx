"use client"

import { useRef } from "react"
import { GripVertical, ImageIcon, Trash2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Input } from "@workspace/ui/components/input"
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
      {/* Drag handle */}
      <span
        aria-hidden
        className="shrink-0 cursor-grab text-zinc-300 active:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </span>

      {/* Image thumbnail */}
      <button
        type="button"
        aria-label={`Upload image for card ${index + 1}`}
        onClick={() => fileInputRef.current?.click()}
        className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="h-full w-full object-cover"
          />
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

      {/* Title input */}
      <Input
        {...register(isEn ? `cards.${index}.titleEn` : `cards.${index}.titleAr`)}
        dir={isEn ? "ltr" : "rtl"}
        lang={isEn ? "en" : "ar"}
        placeholder={isEn ? "Space title" : "عنوان المساحة"}
        aria-label={`Card ${index + 1} ${isEn ? "English" : "Arabic"} title`}
        className="flex-1"
      />

      {/* Visibility toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={card.visible}
        aria-label={`Toggle visibility for card ${index + 1}`}
        onClick={() => onToggleVisible(!card.visible)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1",
          card.visible ? "bg-zinc-900" : "bg-zinc-300"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "inline-block size-4 rounded-full bg-white shadow transition-transform",
            card.visible ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>

      {/* Delete */}
      <button
        type="button"
        aria-label={`Delete card ${index + 1}`}
        onClick={onRemove}
        className="shrink-0 rounded p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <Trash2 className="size-4" aria-hidden />
      </button>
    </div>
  )
}
