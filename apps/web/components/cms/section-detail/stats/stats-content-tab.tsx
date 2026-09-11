"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import { AddItemButton } from "../shared/add-item-button"
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

// ─── Component ───────────────────────────────────────────────────────────────

interface StatsContentTabProps {
  content: StatsContent
  language: Language
  onChange: (content: StatsContent) => void
}

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

  useFormSync(form, onChange)

  const addStatistic = () => {
    append({ id: `stat-${Date.now()}`, value: "", labelEn: "", labelAr: "" })
  }

  const titleField = isEn ? "sectionTitleEn" : "sectionTitleAr"

  return (
    <Form {...form}>
      <form className="space-y-5 px-4 py-4" noValidate>
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
                <DragHandle />

                <div className="w-20 shrink-0">
                  <Input
                    {...form.register(`statistics.${index}.value`)}
                    placeholder="500+"
                    aria-label={`Statistic ${index + 1} value`}
                    className={cn(
                      "h-8 text-center text-sm font-semibold",
                      form.formState.errors.statistics?.[index]?.value && "border-red-400"
                    )}
                  />
                </div>

                <Input
                  {...form.register(
                    isEn ? `statistics.${index}.labelEn` : `statistics.${index}.labelAr`
                  )}
                  placeholder={isEn ? "Happy Clients" : "عملاء سعداء"}
                  dir={isEn ? "ltr" : "rtl"}
                  lang={isEn ? "en" : "ar"}
                  aria-label={`Statistic ${index + 1} label`}
                  className={cn(
                    "h-8 flex-1",
                    form.formState.errors.statistics?.[index]?.labelEn && "border-red-400"
                  )}
                />

                <DeleteButton
                  onClick={() => remove(index)}
                  ariaLabel={`Remove statistic ${index + 1}`}
                />
              </div>
            ))}

            {fields.length === 0 && (
              <p className="py-3 text-center text-xs text-zinc-400">
                No statistics yet. Add one below.
              </p>
            )}
          </div>

          <AddItemButton label="Add Statistic" onClick={addStatistic} />
        </fieldset>
      </form>
    </Form>
  )
}
