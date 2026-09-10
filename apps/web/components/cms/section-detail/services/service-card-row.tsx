"use client"

import {
  GripVertical, Trash2,
  Pencil, Hammer, Gem, Cog, Star, Home, Sparkles,
} from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Input } from "@workspace/ui/components/input"
import type { ServiceCard, ServiceIconKey, Language } from "@/types/cms"
import type { UseFormRegister } from "react-hook-form"
import type { ServicesFormValues } from "./services-content-tab"

const ICON_MAP: Record<ServiceIconKey, React.ElementType> = {
  Pencil, Hammer, Gem, Cog, Star, Home, Sparkles,
}

interface ServiceCardRowProps {
  card: ServiceCard
  index: number
  language: Language
  register: UseFormRegister<ServicesFormValues>
  onToggleVisible: (visible: boolean) => void
  onRemove: () => void
}

export function ServiceCardRow({
  card,
  index,
  language,
  register,
  onToggleVisible,
  onRemove,
}: ServiceCardRowProps) {
  const IconComponent = ICON_MAP[card.icon] ?? Pencil
  const isEn = language === "en"

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

      {/* Icon box */}
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white"
        aria-hidden
      >
        <IconComponent className="size-5 text-zinc-700" />
      </div>

      {/* Title + Subtitle inputs — flex-1 side by side */}
      <Input
        {...register(isEn ? `cards.${index}.titleEn` : `cards.${index}.titleAr`)}
        dir={isEn ? "ltr" : "rtl"}
        lang={isEn ? "en" : "ar"}
        placeholder={isEn ? "Title" : "العنوان"}
        aria-label={`Card ${index + 1} ${isEn ? "English" : "Arabic"} title`}
        className="flex-1"
      />

      <Input
        {...register(isEn ? `cards.${index}.subtitleEn` : `cards.${index}.subtitleAr`)}
        dir={isEn ? "ltr" : "rtl"}
        lang={isEn ? "en" : "ar"}
        placeholder={isEn ? "Subtitle" : "العنوان الفرعي"}
        aria-label={`Card ${index + 1} ${isEn ? "English" : "Arabic"} subtitle`}
        className="flex-1"
      />

      {/* Visibility toggle — dark style */}
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
