"use client"

import { useState, useRef, useEffect } from "react"
import {
  ChevronDown,
  Headset, CheckCircle, Lightbulb, Monitor, UserCheck, Users, Handshake, Star, Globe, Award, Cog, Package,
} from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { PartnershipIconKey, Language } from "@/types/cms"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"
import type { PartnershipFormValues } from "./partnership-content-tab"

const ICON_MAP: Record<PartnershipIconKey, React.ElementType> = {
  Headset, CheckCircle, Lightbulb, Monitor, UserCheck, Users, Handshake, Star, Globe, Award, Cog, Package,
}

const ICON_KEYS = Object.keys(ICON_MAP) as PartnershipIconKey[]

interface PartnershipStepRowProps {
  step: PartnershipFormValues["steps"][number]
  index: number
  language: Language
  register: UseFormRegister<PartnershipFormValues>
  setValue: UseFormSetValue<PartnershipFormValues>
  onRemove: () => void
}

export function PartnershipStepRow({ step, index, language, register, setValue, onRemove }: PartnershipStepRowProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const isEn = language === "en"
  const l = isEn ? "En" : "Ar"
  const dir = isEn ? "ltr" : "rtl"
  const lang = isEn ? "en" : "ar"
  const IconComponent = ICON_MAP[step.icon as PartnershipIconKey] ?? Handshake

  useEffect(() => {
    if (!pickerOpen) return
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [pickerOpen])

  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-3" role="listitem">
      <DragHandle />

      <span
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white"
        aria-label={`Step ${step.number}`}
      >
        {step.number}
      </span>

      <div className="relative shrink-0" ref={pickerRef}>
        <button
          type="button"
          aria-label="Pick icon"
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          onClick={() => setPickerOpen((v) => !v)}
          className="flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          <IconComponent className="size-4" aria-hidden />
          <ChevronDown className="size-3 text-zinc-400" aria-hidden />
        </button>

        {pickerOpen && (
          <div
            role="dialog"
            aria-label="Choose icon"
            className="absolute left-0 top-full z-50 mt-1 grid grid-cols-4 gap-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg"
          >
            {ICON_KEYS.map((key) => {
              const Ic = ICON_MAP[key]
              return (
                <button
                  key={key}
                  type="button"
                  aria-label={key}
                  aria-pressed={step.icon === key}
                  onClick={() => {
                    setValue(`steps.${index}.icon`, key)
                    setPickerOpen(false)
                  }}
                  className={`flex size-8 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                    step.icon === key
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  <Ic className="size-4" aria-hidden />
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <Input
          {...register(`steps.${index}.title${l}` as `steps.${number}.titleEn`)}
          dir={dir}
          lang={lang}
          placeholder={isEn ? "Step title" : "عنوان الخطوة"}
          aria-label={`Step ${index + 1} title`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <Input
          {...register(`steps.${index}.description${l}` as `steps.${number}.descriptionEn`)}
          dir={dir}
          lang={lang}
          placeholder={isEn ? "Short description" : "وصف قصير"}
          aria-label={`Step ${index + 1} description`}
        />
      </div>

      <DeleteButton onClick={onRemove} ariaLabel={`Delete step ${index + 1}`} />
    </div>
  )
}
