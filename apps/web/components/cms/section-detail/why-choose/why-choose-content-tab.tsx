"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { WhyChooseColumnCard } from "./why-choose-column-card"
import type { Language, WhyChooseContent } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const bulletSchema = z.object({
  id: z.string(),
  textEn: z.string(),
  textAr: z.string(),
})

const columnSchema = z.object({
  id: z.string(),
  number: z.string(),
  titleEn: z.string(),
  titleAr: z.string(),
  highlighted: z.boolean(),
  bullets: z.array(bulletSchema),
})

const whyChooseSchema = z.object({
  eyebrowEn: z.string(),
  eyebrowAr: z.string(),
  mainHeadingEn: z.string().min(1, "Main heading is required"),
  mainHeadingAr: z.string(),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  columns: z.array(columnSchema),
})

export type WhyChooseFormValues = z.infer<typeof whyChooseSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface WhyChooseContentTabProps {
  content: WhyChooseContent
  language: Language
  onChange: (content: WhyChooseContent) => void
}

export function WhyChooseContentTab({ content, language, onChange }: WhyChooseContentTabProps) {
  const isEn = language === "en"

  const form = useForm<WhyChooseFormValues>({
    resolver: zodResolver(whyChooseSchema),
    defaultValues: content,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  })

  useFormSync(form, onChange)

  const addColumn = () => {
    const nextNum = String(fields.length + 1).padStart(2, "0")
    append({
      id: `col-${Date.now()}`,
      number: nextNum,
      titleEn: "",
      titleAr: "",
      highlighted: false,
      bullets: [],
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6 px-5 py-5" noValidate>
        <div className="grid grid-cols-3 gap-4">
          <SectionField
            control={form.control}
            name={isEn ? "eyebrowEn" : "eyebrowAr"}
            label="Section Eyebrow"
            isRtl={!isEn}
            placeholder={isEn ? "Why Clients Choose T1" : "لماذا يختار العملاء T1"}
          />
          <SectionField
            control={form.control}
            name={isEn ? "mainHeadingEn" : "mainHeadingAr"}
            label="Main Heading"
            isRtl={!isEn}
            placeholder={isEn ? "Why Clients Choose T1" : "لماذا يختار العملاء T1"}
          />
          <SectionField
            control={form.control}
            name={isEn ? "descriptionEn" : "descriptionAr"}
            label="Description"
            isRtl={!isEn}
            optional
            multiline
            placeholder={
              isEn
                ? "Add a short description for this section..."
                : "أضف وصفاً قصيراً لهذا القسم..."
            }
          />
        </div>

        <div>
          <div className="mb-1">
            <h3 className="text-sm font-semibold text-zinc-900">Comparison Columns</h3>
            <p className="text-xs text-zinc-500">
              Add and manage the comparison columns. You can reorder, edit content, and highlight a
              column.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {fields.map((field, colIndex) => (
              <WhyChooseColumnCard
                key={field.id}
                colIndex={colIndex}
                language={language}
                control={form.control}
                register={form.register}
                getValues={form.getValues}
                setValue={form.setValue}
                highlighted={form.watch(`columns.${colIndex}.highlighted`)}
                onToggleHighlight={(value) => {
                  form.setValue(`columns.${colIndex}.highlighted`, value)
                }}
                onRemoveColumn={() => remove(colIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={addColumn}
            className="mt-3 flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            <Plus className="size-3.5" aria-hidden />
            Add Column
          </button>
        </div>
      </form>
    </Form>
  )
}
