"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { AddItemButton } from "../shared/add-item-button"
import { SpaceCardRow } from "./space-card-row"
import type { FeaturedSpacesContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const cardSchema = z.object({
  id: z.string(),
  imageUrl: z.string().optional(),
  titleEn: z.string().min(1, "Title is required"),
  titleAr: z.string(),
  visible: z.boolean(),
})

const featuredSpacesSchema = z.object({
  sectionTitleEn: z.string().min(1, "Section title is required"),
  sectionTitleAr: z.string(),
  buttonLabelEn: z.string(),
  buttonLabelAr: z.string(),
  buttonLink: z.string(),
  cards: z.array(cardSchema),
})

export type FeaturedSpacesFormValues = z.infer<typeof featuredSpacesSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface FeaturedSpacesContentTabProps {
  content: FeaturedSpacesContent
  language: Language
  onChange: (content: FeaturedSpacesContent) => void
}

export function FeaturedSpacesContentTab({
  content,
  language,
  onChange,
}: FeaturedSpacesContentTabProps) {
  const isEn = language === "en"

  const form = useForm<FeaturedSpacesFormValues>({
    resolver: zodResolver(featuredSpacesSchema),
    defaultValues: content,
  })

  const { fields, append, update } = useFieldArray({
    control: form.control,
    name: "cards",
  })

  useFormSync(form, onChange)

  const addCard = () => {
    append({
      id: `sp-${Date.now()}`,
      titleEn: "",
      titleAr: "",
      visible: true,
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5 px-5 py-5" noValidate>
        <SectionField
          control={form.control}
          label={isEn ? "Section Title" : "عنوان القسم"}
          name={isEn ? "sectionTitleEn" : "sectionTitleAr"}
          isRtl={!isEn}
          placeholder={isEn ? "Featured Spaces" : "المساحات المميزة"}
        />

        <div className="grid grid-cols-2 gap-4">
          <SectionField
            control={form.control}
            label={isEn ? "Button Label" : "نص الزر"}
            name={isEn ? "buttonLabelEn" : "buttonLabelAr"}
            isRtl={!isEn}
            optional
            placeholder={isEn ? "View All Spaces" : "عرض جميع المساحات"}
          />
          <SectionField
            control={form.control}
            label="Button Link"
            name="buttonLink"
            optional
            placeholder="/spaces"
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-zinc-900">Space Cards</legend>

          <div role="list" aria-label="Space cards" className="space-y-2">
            {fields.map((field, index) => (
              <SpaceCardRow
                key={field.id}
                card={form.watch(`cards.${index}`)}
                index={index}
                language={language}
                register={form.register}
                onToggleVisible={(visible) =>
                  update(index, { ...form.getValues(`cards.${index}`), visible })
                }
                onImageChange={(file) => {
                  const current = form.getValues(`cards.${index}`)
                  if (file) {
                    const url = URL.createObjectURL(file)
                    form.setValue(`cards.${index}`, { ...current, imageUrl: url })
                  } else {
                    form.setValue(`cards.${index}`, { ...current, imageUrl: undefined })
                  }
                }}
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

          <AddItemButton label="Add Space" onClick={addCard} />
        </fieldset>
      </form>
    </Form>
  )
}
