"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Info } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { AwardsLogoRow } from "./awards-logo-row"
import type { AwardsContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const logoSchema = z.object({
  id: z.string(),
  number: z.string(),
  imageUrl: z.string().optional(),
  altText: z.string(),
  linkUrl: z.string().optional(),
})

const awardsSchema = z.object({
  sectionTitleEn: z.string().min(1, "Section title is required"),
  sectionTitleAr: z.string(),
  subtitleEn: z.string().optional(),
  subtitleAr: z.string().optional(),
  logos: z.array(logoSchema),
})

export type AwardsFormValues = z.infer<typeof awardsSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface AwardsContentTabProps {
  content: AwardsContent
  language: Language
  onChange: (content: AwardsContent) => void
}

export function AwardsContentTab({ content, language, onChange }: AwardsContentTabProps) {
  const isEn = language === "en"

  const form = useForm<AwardsFormValues>({
    resolver: zodResolver(awardsSchema),
    defaultValues: content,
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "logos",
  })

  useFormSync(form, onChange)

  const subtitleLength = (form.watch(isEn ? "subtitleEn" : "subtitleAr") ?? "").length

  const addLogo = () => {
    const nextNum = String(fields.length + 1).padStart(2, "0")
    append({
      id: `logo-${Date.now()}`,
      number: nextNum,
      imageUrl: undefined,
      altText: "",
      linkUrl: "",
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6 px-5 py-5" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <SectionField
            control={form.control}
            name={isEn ? "sectionTitleEn" : "sectionTitleAr"}
            label="Section Title"
            isRtl={!isEn}
            placeholder={isEn ? "Awards & Recognition" : "الجوائز والتقدير"}
          />

          {/* Custom subtitle with char counter — not using SectionField due to maxLength overlay */}
          <FormField
            control={form.control}
            name={isEn ? "subtitleEn" : "subtitleAr"}
            render={({ field }) => (
              <FormItem>
                <FormLabel dir={isEn ? undefined : "rtl"} lang={isEn ? undefined : "ar"}>
                  Section Subtitle{" "}
                  <span className="font-normal text-zinc-400">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <textarea
                      {...field}
                      rows={4}
                      maxLength={200}
                      dir={isEn ? "ltr" : "rtl"}
                      lang={isEn ? "en" : "ar"}
                      placeholder="Add a short description (optional)"
                      className={`w-full resize-none rounded-md border border-zinc-200 px-3 py-2 pb-5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900${isEn ? "" : " text-right"}`}
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] text-zinc-400">
                      {subtitleLength}/200
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Partner Logos</h3>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {fields.length} items
            </span>
            <button
              type="button"
              onClick={addLogo}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <Plus className="size-3.5" aria-hidden />
              Add Logo
            </button>
          </div>

          <div role="list" aria-label="Partner logos" className="divide-y divide-zinc-100">
            {fields.map((field, index) => (
              <AwardsLogoRow
                key={field.id}
                logo={form.watch(`logos.${index}`)}
                index={index}
                register={form.register}
                setValue={form.setValue}
                onRemove={() => {
                  const current = form.getValues("logos")
                  form.setValue(
                    "logos",
                    current.filter((_, i) => i !== index)
                  )
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 rounded-lg bg-blue-50 px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-blue-500" aria-hidden />
          <div>
            <p className="text-xs font-semibold text-zinc-800">Recommended Image</p>
            <p className="mt-0.5 text-xs text-zinc-500">
              Use transparent PNG or SVG logos. Recommended height: 40–60px. All logos will be
              displayed in a single row.
            </p>
          </div>
        </div>
      </form>
    </Form>
  )
}
