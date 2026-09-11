"use client"

import {
  Pencil, Hammer, Gem, Cog, Star, Home, Sparkles,
} from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { VisibilityToggle } from "../shared/visibility-toggle"
import { DeleteButton } from "../shared/delete-button"
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
      <DragHandle />

      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white"
        aria-hidden
      >
        <IconComponent className="size-5 text-zinc-700" />
      </div>

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

      <VisibilityToggle
        checked={card.visible}
        onChange={onToggleVisible}
        ariaLabel={`Toggle visibility for card ${index + 1}`}
      />

      <DeleteButton onClick={onRemove} ariaLabel={`Delete card ${index + 1}`} />
    </div>
  )
}
