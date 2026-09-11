"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { Input } from "@workspace/ui/components/input"
import { SectionField } from "../shared/section-field"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { FaqContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const faqItemSchema = z.object({
  id: z.string(),
  number: z.string(),
  questionEn: z.string(),
  questionAr: z.string(),
  answerEn: z.string(),
  answerAr: z.string(),
})

const faqSchema = z.object({
  eyebrowEn: z.string(),
  eyebrowAr: z.string(),
  sectionTitleEn: z.string().min(1, "Section title is required"),
  sectionTitleAr: z.string(),
  faqs: z.array(faqItemSchema),
})

export type FaqFormValues = z.infer<typeof faqSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface FaqContentTabProps {
  content: FaqContent
  language: Language
  onChange: (content: FaqContent) => void
}

export function FaqContentTab({ content, language, onChange }: FaqContentTabProps) {
  const isEn = language === "en"
  const l = isEn ? "En" : "Ar"
  const dir = isEn ? "ltr" : "rtl"
  const lang = isEn ? "en" : "ar"

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: content,
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "faqs",
  })

  useFormSync(form, onChange)

  const addFaq = () => {
    const nextNum = String(fields.length + 1).padStart(2, "0")
    append({
      id: `faq-${Date.now()}`,
      number: nextNum,
      questionEn: "",
      questionAr: "",
      answerEn: "",
      answerAr: "",
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5 px-5 py-5" noValidate>
        <SectionField
          control={form.control}
          name={isEn ? "eyebrowEn" : "eyebrowAr"}
          label="Section Eyebrow"
          isRtl={!isEn}
          optional
          placeholder={isEn ? "Our FAQs" : "أسئلتنا الشائعة"}
        />
        <SectionField
          control={form.control}
          name={isEn ? "sectionTitleEn" : "sectionTitleAr"}
          label="Section Title"
          isRtl={!isEn}
          placeholder={isEn ? "Frequently Asked Questions" : "الأسئلة المتكررة"}
        />

        <div>
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">FAQs</h3>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {fields.length} items
            </span>
            <button
              type="button"
              onClick={addFaq}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <Plus className="size-3.5" aria-hidden />
              Add FAQ
            </button>
          </div>

          <div role="list" aria-label="FAQ items" className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-3" role="listitem">
                <DragHandle className="mt-8" />

                <span className="mt-8 flex size-9 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-600">
                  {form.watch(`faqs.${index}.number`)}
                </span>

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={`faq-${index}-question`}
                    className="mb-1 block text-xs font-medium text-zinc-600"
                  >
                    Question
                  </label>
                  <Input
                    id={`faq-${index}-question`}
                    {...form.register(`faqs.${index}.question${l}` as `faqs.${number}.questionEn`)}
                    dir={dir}
                    lang={lang}
                    placeholder={isEn ? "Enter question" : "أدخل السؤال"}
                    aria-label={`FAQ ${index + 1} question`}
                    className={isEn ? undefined : "text-right"}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={`faq-${index}-answer`}
                    className="mb-1 block text-xs font-medium text-zinc-600"
                  >
                    Answer
                  </label>
                  <textarea
                    id={`faq-${index}-answer`}
                    {...form.register(`faqs.${index}.answer${l}` as `faqs.${number}.answerEn`)}
                    rows={4}
                    dir={dir}
                    lang={lang}
                    placeholder="Add answer"
                    aria-label={`FAQ ${index + 1} answer`}
                    className={`w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900${isEn ? "" : " text-right"}`}
                  />
                </div>

                <DeleteButton
                  onClick={() => {
                    const current = form.getValues("faqs")
                    form.setValue(
                      "faqs",
                      current.filter((_, i) => i !== index)
                    )
                  }}
                  ariaLabel={`Delete FAQ ${index + 1}`}
                  className="mt-8"
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </Form>
  )
}
