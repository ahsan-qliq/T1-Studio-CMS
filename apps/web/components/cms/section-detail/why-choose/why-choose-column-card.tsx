"use client"

import { Check, Plus, Trash2 } from "lucide-react"
import { useFieldArray } from "react-hook-form"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { VisibilityToggle } from "../shared/visibility-toggle"
import { DeleteButton } from "../shared/delete-button"
import type { Language } from "@/types/cms"
import type { Control, UseFormRegister, UseFormGetValues, UseFormSetValue } from "react-hook-form"
import type { WhyChooseFormValues } from "./why-choose-content-tab"

interface WhyChooseColumnCardProps {
  colIndex: number
  language: Language
  control: Control<WhyChooseFormValues>
  register: UseFormRegister<WhyChooseFormValues>
  getValues: UseFormGetValues<WhyChooseFormValues>
  setValue: UseFormSetValue<WhyChooseFormValues>
  highlighted: boolean
  onToggleHighlight: (value: boolean) => void
  onRemoveColumn: () => void
}

export function WhyChooseColumnCard({
  colIndex,
  language,
  control,
  register,
  highlighted,
  onToggleHighlight,
  onRemoveColumn,
}: WhyChooseColumnCardProps) {
  const isEn = language === "en"
  const l = isEn ? "En" : "Ar"

  const { fields, append, remove } = useFieldArray({
    control,
    name: `columns.${colIndex}.bullets`,
  })

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="flex">
        {/* Left panel */}
        <div className="flex w-[38%] shrink-0 gap-3 border-r border-zinc-100 p-4">
          <DragHandle className="mt-1" />

          <input type="hidden" {...register(`columns.${colIndex}.number`)} />
          <span
            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600"
            aria-hidden
          >
            {String(colIndex + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 space-y-4">
            <div>
              <label
                htmlFor={`col-${colIndex}-title`}
                className="mb-1 block text-xs font-medium text-zinc-600"
              >
                Column Title
              </label>
              <Input
                id={`col-${colIndex}-title`}
                {...register(`columns.${colIndex}.title${l}` as `columns.${number}.titleEn`)}
                dir={isEn ? "ltr" : "rtl"}
                lang={isEn ? "en" : "ar"}
                placeholder={isEn ? "Column name" : "اسم العمود"}
                aria-label={`Column ${colIndex + 1} title`}
              />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-zinc-800">Highlight Column</p>
                <p className="mt-0.5 text-[10px] leading-snug text-zinc-500">
                  Make this column visually highlighted (e.g. different background).
                </p>
              </div>
              <VisibilityToggle
                checked={highlighted}
                onChange={onToggleHighlight}
                ariaLabel={`Toggle highlight for column ${colIndex + 1}`}
              />
            </div>
          </div>
        </div>

        {/* Right panel — Bullet Points */}
        <div className="flex-1 p-4">
          <p className="mb-2 text-xs font-semibold text-zinc-700">Bullet Points</p>

          <div role="list" aria-label={`Column ${colIndex + 1} bullet points`} className="space-y-1">
            {fields.map((field, bulletIdx) => (
              <div
                key={field.id}
                role="listitem"
                className="flex items-center gap-2 border-b border-zinc-100 py-1.5 last:border-b-0"
              >
                <Check className="size-3.5 shrink-0 text-zinc-500" aria-hidden />
                <Input
                  {...register(
                    `columns.${colIndex}.bullets.${bulletIdx}.text${l}` as `columns.${number}.bullets.${number}.textEn`
                  )}
                  dir={isEn ? "ltr" : "rtl"}
                  lang={isEn ? "en" : "ar"}
                  placeholder={isEn ? "Bullet point text" : "نص النقطة"}
                  aria-label={`Column ${colIndex + 1}, bullet ${bulletIdx + 1}`}
                  className="h-7 flex-1 border-0 px-1 text-sm shadow-none focus-visible:ring-0"
                />
                <button
                  type="button"
                  aria-label={`Remove bullet ${bulletIdx + 1} from column ${colIndex + 1}`}
                  onClick={() => remove(bulletIdx)}
                  className="shrink-0 rounded p-0.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Trash2 className="size-3.5" aria-hidden />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              append({ id: `b-${colIndex}-${Date.now()}`, textEn: "", textAr: "" })
            }
            className="mt-2 flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-800 focus:outline-none focus-visible:underline"
          >
            <Plus className="size-3.5" aria-hidden />
            Add Bullet
          </button>
        </div>

        <div className="flex shrink-0 items-start p-3">
          <DeleteButton onClick={onRemoveColumn} ariaLabel={`Delete column ${colIndex + 1}`} />
        </div>
      </div>
    </div>
  )
}
