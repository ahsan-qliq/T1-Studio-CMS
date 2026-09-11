"use client"

import { useRef } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Image, Plus, Trash2 } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { ConsultationCtaContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const FIELD_TYPES = ["Dropdown", "Text", "Textarea", "Email", "Phone"] as const

const tabSchema = z.object({
  id: z.string(),
  labelEn: z.string(),
  labelAr: z.string(),
})

const fieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(FIELD_TYPES),
  placeholder: z.string(),
})

const consultationSchema = z.object({
  mainHeadingEn: z.string().min(1, "Main heading is required"),
  mainHeadingAr: z.string(),
  tabs: z.array(tabSchema),
  formFields: z.array(fieldSchema),
  imageUrl: z.string().optional(),
})

export type ConsultationFormValues = z.infer<typeof consultationSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface ConsultationContentTabProps {
  content: ConsultationCtaContent
  language: Language
  onChange: (content: ConsultationCtaContent) => void
}

export function ConsultationContentTab({
  content,
  language,
  onChange,
}: ConsultationContentTabProps) {
  const isEn = language === "en"
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: content,
  })

  const {
    fields: tabFields,
    append: appendTab,
    remove: removeTab,
  } = useFieldArray({ control: form.control, name: "tabs" })

  const {
    fields: fieldRows,
    append: appendField,
    remove: removeField,
  } = useFieldArray({ control: form.control, name: "formFields" })

  useFormSync(form, onChange)

  const imageUrl = form.watch("imageUrl")

  return (
    <Form {...form}>
      <form noValidate>
        <div className="grid grid-cols-[1fr,360px] divide-x divide-zinc-100">
          {/* ── Left column ── */}
          <div className="space-y-6 px-5 py-5">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-zinc-900">Section Content</h3>
              <SectionField
                control={form.control}
                name={isEn ? "mainHeadingEn" : "mainHeadingAr"}
                label="Main Heading"
                isRtl={!isEn}
                placeholder={
                  isEn ? "Let's Create Your Dream Space" : "لنبتكر معاً مساحة أحلامك"
                }
              />
            </div>

            {/* Tabs */}
            <div>
              <p className="mb-2 text-sm font-medium text-zinc-700">Tabs</p>
              <div className="space-y-2">
                {tabFields.map((tab, idx) => (
                  <div key={tab.id} className="flex items-center gap-2" role="listitem">
                    <DragHandle />
                    <Input
                      {...form.register(
                        isEn ? `tabs.${idx}.labelEn` : `tabs.${idx}.labelAr`
                      )}
                      dir={isEn ? "ltr" : "rtl"}
                      lang={isEn ? "en" : "ar"}
                      placeholder={isEn ? "Tab label" : "اسم التبويب"}
                      aria-label={`Tab ${idx + 1} label`}
                      className="flex-1"
                    />
                    <DeleteButton onClick={() => removeTab(idx)} ariaLabel={`Remove tab ${idx + 1}`} />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  appendTab({ id: `ctab-${Date.now()}`, labelEn: "", labelAr: "" })
                }
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-2.5 text-xs text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                <Plus className="size-3.5" aria-hidden />
                Add Tab
              </button>
            </div>

            {/* Form Fields */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <p className="text-sm font-semibold text-zinc-900">Form Fields</p>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                  {fieldRows.length} fields
                </span>
                <button
                  type="button"
                  onClick={() =>
                    appendField({
                      id: `ff-${Date.now()}`,
                      label: "",
                      type: "Text",
                      placeholder: "",
                    })
                  }
                  className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                >
                  <Plus className="size-3.5" aria-hidden />
                  Add Field
                </button>
              </div>

              <div className="space-y-2" role="list" aria-label="Form fields">
                {fieldRows.map((row, idx) => (
                  <div key={row.id} className="flex items-center gap-2" role="listitem">
                    <DragHandle />
                    <Input
                      {...form.register(`formFields.${idx}.label`)}
                      placeholder="Field label"
                      aria-label={`Field ${idx + 1} label`}
                      className="w-[200px] shrink-0"
                    />
                    <select
                      {...form.register(`formFields.${idx}.type`)}
                      aria-label={`Field ${idx + 1} type`}
                      className="w-[140px] shrink-0 rounded-md border border-zinc-200 bg-white px-2.5 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <Input
                      {...form.register(`formFields.${idx}.placeholder`)}
                      placeholder="Placeholder text"
                      aria-label={`Field ${idx + 1} placeholder`}
                      className="flex-1"
                    />
                    <DeleteButton onClick={() => removeField(idx)} ariaLabel={`Remove field ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column — Section Image ── */}
          <div className="px-5 py-5">
            <p className="mb-3 text-sm font-semibold text-zinc-900">Section Image</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              aria-label="Upload section image"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  form.setValue("imageUrl", URL.createObjectURL(file))
                }
                e.target.value = ""
              }}
            />

            {imageUrl ? (
              <div className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Section image preview"
                  className="w-full rounded-lg border border-zinc-200 object-cover"
                  style={{ aspectRatio: "3/2" }}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                  >
                    <Image className="size-3.5" aria-hidden />
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => form.setValue("imageUrl", undefined)}
                    className="flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-10 text-zinc-400 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                style={{ aspectRatio: "3/2" }}
              >
                <Image className="size-8" aria-hidden />
                <span className="text-xs font-medium">Click to upload image</span>
              </button>
            )}

            <p className="mt-2 text-[10px] text-zinc-400">
              Recommended size: 1200 × 800px (JPG, PNG, WebP). Max size: 5MB.
            </p>
          </div>
        </div>
      </form>
    </Form>
  )
}
