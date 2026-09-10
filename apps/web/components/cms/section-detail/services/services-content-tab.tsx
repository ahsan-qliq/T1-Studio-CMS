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

// ─── Single-language field helper ────────────────────────────────────────────

function SectionField({
  label,
  name,
  isRtl,
  placeholder,
  optional,
  multiline,
  form,
}: {
  label: string
  name: keyof Omit<ServicesFormValues, "cards">
  isRtl?: boolean
  placeholder?: string
  optional?: boolean
  multiline?: boolean
  form: ReturnType<typeof useForm<ServicesFormValues>>
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
            {multiline ? (
              <textarea
                {...field}
                rows={4}
                dir={isRtl ? "rtl" : "ltr"}
                lang={isRtl ? "ar" : "en"}
                placeholder={placeholder}
                aria-label={label}
                className="w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            ) : (
              <Input
                {...field}
                dir={isRtl ? "rtl" : "ltr"}
                lang={isRtl ? "ar" : "en"}
                placeholder={placeholder}
                aria-label={label}
                className={isRtl ? "text-right" : undefined}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

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

  useEffect(() => {
    const sub = form.watch((values) => {
      if (values.headingEn !== undefined) {
        onChange(values as ServicesContent)
      }
    })
    return () => sub.unsubscribe()
  }, [form, onChange])

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
        {/* Section text fields — single column, language-driven */}
        <SectionField
          label={isEn ? "Section Eyebrow" : "العنوان الفرعي"}
          name={isEn ? "eyebrowEn" : "eyebrowAr"}
          isRtl={!isEn}
          form={form}
        />
        <SectionField
          label={isEn ? "Section Heading" : "العنوان الرئيسي"}
          name={isEn ? "headingEn" : "headingAr"}
          isRtl={!isEn}
          form={form}
        />
        <SectionField
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
          form={form}
        />

        {/* Service Cards */}
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

          {/* Full-width add button */}
          <button
            type="button"
            onClick={addCard}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-3 text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            <Plus className="size-4" aria-hidden />
            Add Service
          </button>
        </fieldset>
      </form>
    </Form>
  )
}
