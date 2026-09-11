"use client"

import type { Control, FieldValues, Path } from "react-hook-form"
import { Input } from "@workspace/ui/components/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface SectionFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  isRtl?: boolean
  placeholder?: string
  optional?: boolean
  multiline?: boolean
}

export function SectionField<T extends FieldValues>({
  control,
  name,
  label,
  isRtl,
  placeholder,
  optional,
  multiline,
}: SectionFieldProps<T>) {
  return (
    <FormField
      control={control}
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
