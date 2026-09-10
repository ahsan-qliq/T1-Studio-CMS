"use client"

import { useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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

// ─── Field helper ─────────────────────────────────────────────────────────────

function SectionField({
  label,
  name,
  isRtl,
  placeholder,
  optional,
  form,
}: {
  label: string
  name: keyof Omit<FeaturedSpacesFormValues, "cards">
  isRtl?: boolean
  placeholder?: string
  optional?: boolean
  form: ReturnType<typeof useForm<FeaturedSpacesFormValues>>
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel dir={isRtl ? "rtl" : undefined} lang={isRtl ? "ar" : undefined}>
            {label}
            {optional && (
              <span className="ml-1 font-normal text-zinc-400">
                {isRtl ? "(اختياري)" : "(Optional)"}
              </span>
            )}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              dir={isRtl ? "rtl" : "ltr"}
              lang={isRtl ? "ar" : "en"}
              placeholder={placeholder}
              aria-label={label}
              className={isRtl ? "text-right" : undefined}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

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

  useEffect(() => {
    const sub = form.watch((values) => {
      if (values.sectionTitleEn !== undefined) {
        onChange(values as FeaturedSpacesContent)
      }
    })
    return () => sub.unsubscribe()
  }, [form, onChange])

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
        {/* Section Title */}
        <SectionField
          label={isEn ? "Section Title" : "عنوان القسم"}
          name={isEn ? "sectionTitleEn" : "sectionTitleAr"}
          isRtl={!isEn}
          placeholder={isEn ? "Featured Spaces" : "المساحات المميزة"}
          form={form}
        />

        {/* Button Label + Button Link — two columns */}
        <div className="grid grid-cols-2 gap-4">
          <SectionField
            label={isEn ? "Button Label" : "نص الزر"}
            name={isEn ? "buttonLabelEn" : "buttonLabelAr"}
            isRtl={!isEn}
            optional
            placeholder={isEn ? "View All Spaces" : "عرض جميع المساحات"}
            form={form}
          />
          <SectionField
            label="Button Link"
            name="buttonLink"
            optional
            placeholder="/spaces"
            form={form}
          />
        </div>

        {/* Space Cards */}
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

          <button
            type="button"
            onClick={addCard}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-3 text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            <Plus className="size-4" aria-hidden />
            Add Space
          </button>
        </fieldset>
      </form>
    </Form>
  )
}
