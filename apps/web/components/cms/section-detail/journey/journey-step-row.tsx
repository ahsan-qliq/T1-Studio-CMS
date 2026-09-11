"use client"

import {
  Globe, Lightbulb, Building2, Pencil, Cog, CheckCircle, Star, Hammer, Package,
} from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { JourneyIconKey, Language } from "@/types/cms"
import type { UseFormRegister } from "react-hook-form"
import type { JourneyFormValues } from "./journey-content-tab"

const ICON_MAP: Record<JourneyIconKey, React.ElementType> = {
  Globe, Lightbulb, Building2, Pencil, Cog, CheckCircle, Star, Hammer, Package,
}

interface JourneyStepRowProps {
  step: JourneyFormValues["steps"][number]
  index: number
  language: Language
  register: UseFormRegister<JourneyFormValues>
  onRemove: () => void
}

export function JourneyStepRow({ step, index, language, register, onRemove }: JourneyStepRowProps) {
  const IconComponent = ICON_MAP[step.icon as JourneyIconKey] ?? Globe
  const isEn = language === "en"
  const l = isEn ? "En" : "Ar"
  const dir = isEn ? "ltr" : "rtl"
  const lang = isEn ? "en" : "ar"

  return (
    <div className="rounded-lg border border-zinc-200 bg-white" role="listitem">
      <div className="flex items-start gap-3 p-3">
        <DragHandle className="mt-1" />

        <span
          className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white"
          aria-label={`Step ${step.number}`}
        >
          {step.number}
        </span>

        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <div className="flex size-16 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm">
            <IconComponent className="size-7 text-zinc-700" aria-hidden />
          </div>
          <button
            type="button"
            className="text-[10px] font-medium text-zinc-500 hover:text-zinc-800 focus:outline-none focus-visible:underline"
          >
            Change Icon
          </button>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="grid grid-cols-[1fr_1.5fr_1fr_2fr] gap-3">
            <div>
              <label
                htmlFor={`step-${index}-title`}
                className="mb-1 block text-xs font-medium text-zinc-600"
              >
                Title
              </label>
              <Input
                id={`step-${index}-title`}
                {...register(`steps.${index}.title${l}` as `steps.${number}.titleEn`)}
                dir={dir}
                lang={lang}
                placeholder={isEn ? "Step title" : "عنوان الخطوة"}
                aria-label={`Step ${index + 1} title`}
              />
            </div>
            <div>
              <label
                htmlFor={`step-${index}-subtitle`}
                className="mb-1 block text-xs font-medium text-zinc-600"
              >
                Subtitle
              </label>
              <Input
                id={`step-${index}-subtitle`}
                {...register(`steps.${index}.subtitle${l}` as `steps.${number}.subtitleEn`)}
                dir={dir}
                lang={lang}
                placeholder={isEn ? "Short subtitle" : "عنوان فرعي قصير"}
                aria-label={`Step ${index + 1} subtitle`}
              />
            </div>
            <div>
              <label
                htmlFor={`step-${index}-adv-title`}
                className="mb-1 block text-xs font-medium text-zinc-600"
              >
                Advantage Title{" "}
                <span className="font-normal text-zinc-400">(Optional)</span>
              </label>
              <Input
                id={`step-${index}-adv-title`}
                {...register(`steps.${index}.advantageTitle${l}` as `steps.${number}.advantageTitleEn`)}
                dir={dir}
                lang={lang}
                placeholder="T1 ADVANTAGE"
                aria-label={`Step ${index + 1} advantage title`}
              />
            </div>
            <div>
              <label
                htmlFor={`step-${index}-adv-text`}
                className="mb-1 block text-xs font-medium text-zinc-600"
              >
                Advantage Text{" "}
                <span className="font-normal text-zinc-400">(Optional)</span>
              </label>
              <Input
                id={`step-${index}-adv-text`}
                {...register(`steps.${index}.advantageText${l}` as `steps.${number}.advantageTextEn`)}
                dir={dir}
                lang={lang}
                placeholder={isEn ? "Describe the T1 advantage..." : "صف ميزة T1..."}
                aria-label={`Step ${index + 1} advantage text`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor={`step-${index}-description`}
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Description
            </label>
            <textarea
              id={`step-${index}-description`}
              {...register(`steps.${index}.description${l}` as `steps.${number}.descriptionEn`)}
              rows={3}
              dir={dir}
              lang={lang}
              placeholder={isEn ? "Describe this step..." : "اشرح هذه الخطوة..."}
              aria-label={`Step ${index + 1} description`}
              className="w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          <div>
            <label
              htmlFor={`step-${index}-note`}
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Note / Highlight{" "}
              <span className="font-normal text-zinc-400">(Optional)</span>
            </label>
            <textarea
              id={`step-${index}-note`}
              {...register(`steps.${index}.note${l}` as `steps.${number}.noteEn`)}
              rows={2}
              dir={dir}
              lang={lang}
              placeholder={
                isEn
                  ? "A key highlight or note for this step..."
                  : "ملاحظة أو نقطة بارزة لهذه الخطوة..."
              }
              aria-label={`Step ${index + 1} note`}
              className="w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>

        <DeleteButton onClick={onRemove} ariaLabel={`Delete step ${index + 1}`} className="mt-1" />
      </div>
    </div>
  )
}
