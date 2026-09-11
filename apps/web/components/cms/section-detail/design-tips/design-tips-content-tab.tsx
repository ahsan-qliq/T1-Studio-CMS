"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { DesignTipsArticleRow } from "./design-tips-article-row"
import type { DesignTipsContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const articleSchema = z.object({
  id: z.string(),
  number: z.string(),
  imageUrl: z.string().optional(),
  titleEn: z.string().min(1, "Title is required"),
  titleAr: z.string(),
  category: z.string(),
  readTime: z.string(),
  link: z.string().optional(),
})

const designTipsSchema = z.object({
  sectionTitleEn: z.string().min(1, "Section title is required"),
  sectionTitleAr: z.string(),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  articles: z.array(articleSchema),
})

export type DesignTipsFormValues = z.infer<typeof designTipsSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface DesignTipsContentTabProps {
  content: DesignTipsContent
  language: Language
  onChange: (content: DesignTipsContent) => void
}

export function DesignTipsContentTab({ content, language, onChange }: DesignTipsContentTabProps) {
  const isEn = language === "en"

  const form = useForm<DesignTipsFormValues>({
    resolver: zodResolver(designTipsSchema),
    defaultValues: content,
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "articles",
  })

  useFormSync(form, onChange)

  const addArticle = () => {
    const nextNum = String(fields.length + 1).padStart(2, "0")
    append({
      id: `art-${Date.now()}`,
      number: nextNum,
      imageUrl: undefined,
      titleEn: "",
      titleAr: "",
      category: "",
      readTime: "",
      link: "",
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
          placeholder={isEn ? "Design Tips & Insights" : "نصائح وأفكار التصميم"}
        />
        <SectionField
          control={form.control}
          name={isEn ? "descriptionEn" : "descriptionAr"}
          label="Section Description"
          isRtl={!isEn}
          optional
          multiline
          placeholder="Add a short description (optional)"
        />

        <div>
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Articles</h3>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {fields.length} items
            </span>
            <button
              type="button"
              onClick={addArticle}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <Plus className="size-3.5" aria-hidden />
              Add Article
            </button>
          </div>

          <div role="list" aria-label="Design tips articles">
            {fields.map((field, index) => (
              <DesignTipsArticleRow
                key={field.id}
                article={form.watch(`articles.${index}`)}
                index={index}
                language={language}
                register={form.register}
                setValue={form.setValue}
                onRemove={() => {
                  const current = form.getValues("articles")
                  form.setValue(
                    "articles",
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
