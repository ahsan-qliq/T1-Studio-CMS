"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { TestimonialCardRow } from "./testimonial-card-row"
import type { Language, TestimonialsContent } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const testimonialSchema = z.object({
  id: z.string(),
  number: z.string(),
  clientName: z.string().min(1, "Client name is required"),
  clientRole: z.string(),
  quoteEn: z.string(),
  quoteAr: z.string(),
  imageUrl: z.string().optional(),
})

const testimonialsSchema = z.object({
  sectionTitleEn: z.string().min(1, "Section title is required"),
  sectionTitleAr: z.string(),
  testimonials: z.array(testimonialSchema),
})

export type TestimonialsFormValues = z.infer<typeof testimonialsSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface TestimonialsContentTabProps {
  content: TestimonialsContent
  language: Language
  onChange: (content: TestimonialsContent) => void
}

export function TestimonialsContentTab({
  content,
  language,
  onChange,
}: TestimonialsContentTabProps) {
  const isEn = language === "en"

  const form = useForm<TestimonialsFormValues>({
    resolver: zodResolver(testimonialsSchema),
    defaultValues: content,
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "testimonials",
  })

  useFormSync(form, onChange)

  const addTestimonial = () => {
    const nextNum = String(fields.length + 1).padStart(2, "0")
    append({
      id: `t-${Date.now()}`,
      number: nextNum,
      clientName: "",
      clientRole: "",
      quoteEn: "",
      quoteAr: "",
      imageUrl: undefined,
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
          placeholder={isEn ? "Client Testimonials" : "شهادات العملاء"}
        />

        <div>
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Testimonials</h3>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {fields.length} items
            </span>
            <button
              type="button"
              onClick={addTestimonial}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <Plus className="size-3.5" aria-hidden />
              Add Testimonial
            </button>
          </div>

          <div
            role="list"
            aria-label="Testimonials"
            className="rounded-lg border border-zinc-200 bg-white px-3"
          >
            {fields.map((field, index) => (
              <TestimonialCardRow
                key={field.id}
                testimonial={form.watch(`testimonials.${index}`)}
                index={index}
                language={language}
                register={form.register}
                onImageChange={(file) => {
                  const current = form.getValues(`testimonials.${index}`)
                  form.setValue(`testimonials.${index}`, {
                    ...current,
                    imageUrl: file ? URL.createObjectURL(file) : undefined,
                  })
                }}
                onRemove={() => {
                  const current = form.getValues("testimonials")
                  form.setValue(
                    "testimonials",
                    current.filter((_, i) => i !== index)
                  )
                }}
              />
            ))}

            {fields.length === 0 && (
              <button
                type="button"
                onClick={addTestimonial}
                className="flex w-full items-center justify-center gap-2 py-8 text-sm text-zinc-400 hover:text-zinc-600 focus:outline-none focus-visible:underline"
              >
                <Plus className="size-4" aria-hidden />
                Add your first testimonial
              </button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}
