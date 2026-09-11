"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { AddItemButton } from "../shared/add-item-button"
import { ServiceCardRow } from "./service-card-row"
import type { Language, ServicesContent } from "@/types/cms"

// ─── Schema ─────────────────────────────────────────────────────────────────

const SERVICE_ICON_KEYS = ["Pencil", "Hammer", "Gem", "Cog", "Star", "Home", "Sparkles"] as const

const cardSchema = z.object({
  id: z.string(),
  icon: z.enum(SERVICE_ICON_KEYS),
  titleEn: z.string().min(1, "Title is required"),
  titleAr: z.string(),
  subtitleEn: z.string(),
  subtitleAr: z.string(),
  visible: z.boolean(),
})

const servicesSchema = z.object({
  eyebrowEn: z.string(),
  eyebrowAr: z.string(),
  headingEn: z.string().min(1, "Heading is required"),
  headingAr: z.string(),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  cards: z.array(cardSchema),
})

export type ServicesFormValues = z.infer<typeof servicesSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface ServicesContentTabProps {
  content: ServicesContent
  language: Language
  onChange: (content: ServicesContent) => void
}

export function ServicesContentTab({ content, language, onChange }: ServicesContentTabProps) {
  const isEn = language === "en"

  const form = useForm<ServicesFormValues>({
    resolver: zodResolver(servicesSchema),
    defaultValues: content,
  })

  const { fields, append, update } = useFieldArray({
    control: form.control,
    name: "cards",
  })

  useFormSync(form, onChange)

  const addCard = () => {
    append({
      id: `svc-${Date.now()}`,
      icon: "Star",
      titleEn: "",
      titleAr: "",
      subtitleEn: "",
      subtitleAr: "",
      visible: true,
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5 px-5 py-5" noValidate>
        <SectionField
          control={form.control}
          label={isEn ? "Section Eyebrow" : "العنوان الفرعي"}
          name={isEn ? "eyebrowEn" : "eyebrowAr"}
          isRtl={!isEn}
        />
        <SectionField
          control={form.control}
          label={isEn ? "Section Heading" : "العنوان الرئيسي"}
          name={isEn ? "headingEn" : "headingAr"}
          isRtl={!isEn}
        />
        <SectionField
          control={form.control}
          label={isEn ? "Section Description" : "وصف القسم"}
          name={isEn ? "descriptionEn" : "descriptionAr"}
          isRtl={!isEn}
          optional
          multiline
          placeholder={
            isEn
              ? "Add a short description about your services section..."
              : "أضف وصفاً قصيراً عن قسم الخدمات..."
          }
        />

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-zinc-900">Service Cards</legend>

          <div role="list" aria-label="Service cards" className="space-y-2">
            {fields.map((field, index) => (
              <ServiceCardRow
                key={field.id}
                card={form.watch(`cards.${index}`)}
                index={index}
                language={language}
                register={form.register}
                onToggleVisible={(visible) =>
                  update(index, { ...form.getValues(`cards.${index}`), visible })
                }
                onRemove={() => {
                  const current = form.getValues("cards")
                  form.setValue(
                    "cards",
                    current.filter((_, i) => i !== index)
                  )
                }}
              />
            ))}
          </div>

          <AddItemButton label="Add Service" onClick={addCard} />
        </fieldset>
      </form>
    </Form>
  )
}
