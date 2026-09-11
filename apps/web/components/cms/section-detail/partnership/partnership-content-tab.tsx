"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { PartnershipStepRow } from "./partnership-step-row"
import type { PartnershipContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const PARTNERSHIP_ICON_KEYS = [
  "Headset", "CheckCircle", "Lightbulb", "Monitor", "UserCheck", "Users",
  "Handshake", "Star", "Globe", "Award", "Cog", "Package",
] as const

const stepSchema = z.object({
  id: z.string(),
  number: z.string(),
  icon: z.enum(PARTNERSHIP_ICON_KEYS),
  titleEn: z.string().min(1, "Title is required"),
  titleAr: z.string(),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
})

const partnershipSchema = z.object({
  sectionTitleEn: z.string().min(1, "Section title is required"),
  sectionTitleAr: z.string(),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  steps: z.array(stepSchema),
})

export type PartnershipFormValues = z.infer<typeof partnershipSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface PartnershipContentTabProps {
  content: PartnershipContent
  language: Language
  onChange: (content: PartnershipContent) => void
}

export function PartnershipContentTab({ content, language, onChange }: PartnershipContentTabProps) {
  const isEn = language === "en"

  const form = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
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
      id: `ps-${Date.now()}`,
      number: nextNum,
      icon: "Star",
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6 px-5 py-5" noValidate>
        <SectionField
          control={form.control}
          name={isEn ? "sectionTitleEn" : "sectionTitleAr"}
          label="Section Title"
          isRtl={!isEn}
          placeholder={
            isEn
              ? "Grow Together Through Trusted Partnerships"
              : "النمو معاً من خلال شراكات موثوقة"
          }
        />
        <SectionField
          control={form.control}
          name={isEn ? "descriptionEn" : "descriptionAr"}
          label="Description"
          isRtl={!isEn}
          multiline
          placeholder={
            isEn
              ? "T1 works with a select group of trusted partners…"
              : "تعمل T1 مع مجموعة مختارة من الشركاء الموثوقين…"
          }
        />

        <div>
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Process Steps</h3>
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

          <div role="list" aria-label="Partnership steps" className="space-y-2">
            {fields.map((field, index) => (
              <PartnershipStepRow
                key={field.id}
                step={form.watch(`steps.${index}`)}
                index={index}
                language={language}
                register={form.register}
                setValue={form.setValue}
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
