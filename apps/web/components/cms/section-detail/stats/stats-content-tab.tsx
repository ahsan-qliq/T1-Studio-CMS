"use client"

import { useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { GripVertical, Trash2, Plus } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { Language, StatsContent } from "@/types/cms"

// ─── Schema ─────────────────────────────────────────────────────────────────

const statisticSchema = z.object({
  id: z.string(),
  value: z.string().min(1, "Value is required"),
  labelEn: z.string().min(1, "Label is required"),
  labelAr: z.string(),
})

const statsSchema = z.object({
  sectionTitleEn: z.string().min(1, "Section title is required"),
  sectionTitleAr: z.string(),
  statistics: z.array(statisticSchema),
})

type StatsFormValues = z.infer<typeof statsSchema>

// ─── Props ───────────────────────────────────────────────────────────────────

interface StatsContentTabProps {
  content: StatsContent
  language: Language
  onChange: (content: StatsContent) => void
}

// ─── Component ───────────────────────────────────────────────────────────────

export function StatsContentTab({ content, language, onChange }: StatsContentTabProps) {
  const isEn = language === "en"

  const form = useForm<StatsFormValues>({
    resolver: zodResolver(statsSchema),
    defaultValues: {
      sectionTitleEn: content.sectionTitleEn,
      sectionTitleAr: content.sectionTitleAr,
      statistics: content.statistics,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "statistics",
  })

  // Propagate validated changes up to parent
  useEffect(() => {
    const sub = form.watch((values) => {
      if (values.sectionTitleEn !== undefined) {
        onChange(values as StatsContent)
      }
    })
    return () => sub.unsubscribe()
  }, [form, onChange])

  const addStatistic = () => {
    append({
      id: `stat-${Date.now()}`,
      value: "",
      labelEn: "",
      labelAr: "",
    })
  }

  const titleField = isEn ? "sectionTitleEn" : "sectionTitleAr"

  return (
    <Form {...form}>
      <form className="space-y-5 px-4 py-4" noValidate>
        {/* Section Title */}
        <FormField
          control={form.control}
          name={titleField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  dir={isEn ? "ltr" : "rtl"}
                  lang={isEn ? "en" : "ar"}
                  placeholder={isEn ? "Our Numbers" : "أرقامنا"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Statistics list */}
        <fieldset className="space-y-2">
          <legend className="text-xs font-medium text-zinc-700">Statistics</legend>

          <div
            className="space-y-2 rounded-md border border-zinc-100 p-1"
            role="list"
            aria-label="Statistics list"
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                role="listitem"
                className="flex items-center gap-2 rounded-md border border-zinc-100 bg-white px-2 py-1.5"
              >
                {/* Drag handle — visual only */}
                <span
                  aria-hidden
                  className="shrink-0 cursor-grab text-zinc-300 active:cursor-grabbing"
                >
                  <GripVertical className="size-4" />
                </span>

                {/* Value */}
                <div className="w-20 shrink-0">
                  <Input
                    {...form.register(`statistics.${index}.value`)}
                    placeholder="500+"
                    aria-label={`Statistic ${index + 1} value`}
                    className={cn(
                      "h-8 text-center text-sm font-semibold",
                      form.formState.errors.statistics?.[index]?.value &&
                        "border-red-400"
                    )}
                  />
                </div>

                {/* Label */}
                <Input
                  {...form.register(
                    isEn
                      ? `statistics.${index}.labelEn`
                      : `statistics.${index}.labelAr`
                  )}
                  placeholder={isEn ? "Happy Clients" : "عملاء سعداء"}
                  dir={isEn ? "ltr" : "rtl"}
                  lang={isEn ? "en" : "ar"}
                  aria-label={`Statistic ${index + 1} label`}
                  className={cn(
                    "h-8 flex-1",
                    form.formState.errors.statistics?.[index]?.labelEn &&
                      "border-red-400"
                  )}
                />

                {/* Remove */}
                <button
                  type="button"
                  aria-label={`Remove statistic ${index + 1}`}
                  onClick={() => remove(index)}
                  className="shrink-0 rounded p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>
            ))}

            {fields.length === 0 && (
              <p className="py-3 text-center text-xs text-zinc-400">
                No statistics yet. Add one below.
              </p>
            )}
          </div>

          {/* Add Statistic */}
          <button
            type="button"
            onClick={addStatistic}
            className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-zinc-200 py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            <Plus className="size-3.5" aria-hidden />
            Add Statistic
          </button>
        </fieldset>
      </form>
    </Form>
  )
}
