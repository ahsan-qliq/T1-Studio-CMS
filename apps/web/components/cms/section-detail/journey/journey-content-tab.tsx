"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { JourneyStepRow } from "./journey-step-row"
import type { JourneyContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const JOURNEY_ICON_KEYS = [
  "Globe", "Lightbulb", "Building2", "Pencil", "Cog", "CheckCircle", "Star", "Hammer", "Package",
] as const

const stepSchema = z.object({
  id: z.string(),
  number: z.string(),
  icon: z.enum(JOURNEY_ICON_KEYS),
  titleEn: z.string().min(1, "Title is required"),
  titleAr: z.string(),
  subtitleEn: z.string(),
  subtitleAr: z.string(),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  noteEn: z.string().optional(),
  noteAr: z.string().optional(),
  advantageTitleEn: z.string().optional(),
  advantageTitleAr: z.string().optional(),
  advantageTextEn: z.string().optional(),
  advantageTextAr: z.string().optional(),
})

const journeySchema = z.object({
  eyebrowEn: z.string(),
  eyebrowAr: z.string(),
  mainHeadingEn: z.string().min(1, "Main heading is required"),
  mainHeadingAr: z.string(),
  steps: z.array(stepSchema),
})

export type JourneyFormValues = z.infer<typeof journeySchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface JourneyContentTabProps {
  content: JourneyContent
  language: Language
  onChange: (content: JourneyContent) => void
}

export function JourneyContentTab({ content, language, onChange }: JourneyContentTabProps) {
  const isEn = language === "en"

  const form = useForm<JourneyFormValues>({
    resolver: zodResolver(journeySchema),
    defaultValues: content,
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "steps",
  })

  useFormSync(form, onChange)

  const addStep = () => {
    const nextNum = String(fields.length + 1).padStart(2, "0")
    append({
      id: `step-${Date.now()}`,
      number: nextNum,
      icon: "Star",
      titleEn: "",
      titleAr: "",
      subtitleEn: "",
      subtitleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      noteEn: "",
      noteAr: "",
      advantageTitleEn: "",
      advantageTitleAr: "",
      advantageTextEn: "",
      advantageTextAr: "",
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6 px-5 py-5" noValidate>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900">Section Content</h3>
          <div className="grid grid-cols-2 gap-4">
            <SectionField
              control={form.control}
              name={isEn ? "eyebrowEn" : "eyebrowAr"}
              label="Eyebrow"
              isRtl={!isEn}
              placeholder={isEn ? "The T1 Project Journey" : "رحلة مشروع T1"}
            />
            <SectionField
              control={form.control}
              name={isEn ? "mainHeadingEn" : "mainHeadingAr"}
              label="Main Heading"
              isRtl={!isEn}
              placeholder={
                isEn
                  ? "From Vision to a Smarter, Beautifully Delivered Space"
                  : "من الرؤية إلى مساحة أكثر ذكاءً وجمالاً"
              }
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Steps</h3>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {fields.length} items
            </span>
            <button
              type="button"
              onClick={addStep}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <Plus className="size-3.5" aria-hidden />
              Add Step
            </button>
          </div>

          <div role="list" aria-label="Journey steps" className="space-y-3">
            {fields.map((field, index) => (
              <JourneyStepRow
                key={field.id}
                step={form.watch(`steps.${index}`)}
                index={index}
                language={language}
                register={form.register}
                onRemove={() => {
                  const current = form.getValues("steps")
                  form.setValue(
                    "steps",
                    current.filter((_, i) => i !== index)
                  )
                }}
              />
            ))}
          </div>
        </div>
      </form>
    </Form>
  )
}
