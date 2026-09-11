"use client"

import { useRef } from "react"
import { ImageIcon } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { Language } from "@/types/cms"
import type { UseFormRegister } from "react-hook-form"
import type { TestimonialsFormValues } from "./testimonials-content-tab"

interface TestimonialCardRowProps {
  testimonial: TestimonialsFormValues["testimonials"][number]
  index: number
  language: Language
  register: UseFormRegister<TestimonialsFormValues>
  onImageChange: (file: File | null) => void
  onRemove: () => void
}

export function TestimonialCardRow({
  testimonial,
  index,
  language,
  register,
  onImageChange,
  onRemove,
}: TestimonialCardRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEn = language === "en"

  return (
    <div
      className="flex items-start gap-3 border-b border-zinc-100 py-4 last:border-b-0"
      role="listitem"
    >
      <DragHandle className="mt-1" />

      <span
        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600"
        aria-label={`Testimonial ${testimonial.number}`}
      >
        {testimonial.number}
      </span>

      <div className="flex shrink-0 flex-col items-center gap-1.5">
        <button
          type="button"
          aria-label={`Upload image for testimonial ${index + 1}`}
          onClick={() => fileInputRef.current?.click()}
          className="flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          {testimonial.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={testimonial.imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="size-6 text-zinc-400" aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-[10px] font-medium text-zinc-500 hover:text-zinc-800 focus:outline-none focus-visible:underline"
        >
          Change Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-label={`Image file for testimonial ${index + 1}`}
          onChange={(e) => {
            onImageChange(e.target.files?.[0] ?? null)
            e.target.value = ""
          }}
        />
      </div>

      <div className="grid min-w-0 flex-1 grid-cols-[1fr_1fr_1.3fr] gap-4">
        <div>
          <label
            htmlFor={`t-${index}-name`}
            className="mb-1.5 block text-xs font-medium text-zinc-600"
          >
            Client Name
          </label>
          <Input
            id={`t-${index}-name`}
            {...register(`testimonials.${index}.clientName`)}
            placeholder="Full name"
            aria-label={`Testimonial ${index + 1} client name`}
          />
        </div>

        <div>
          <label
            htmlFor={`t-${index}-role`}
            className="mb-1.5 block text-xs font-medium text-zinc-600"
          >
            Client Role / Company{" "}
            <span className="font-normal text-zinc-400">(Optional)</span>
          </label>
          <Input
            id={`t-${index}-role`}
            {...register(`testimonials.${index}.clientRole`)}
            placeholder="e.g. Home Owner"
            aria-label={`Testimonial ${index + 1} client role`}
          />
        </div>

        <div>
          <label
            htmlFor={`t-${index}-quote`}
            className="mb-1.5 block text-xs font-medium text-zinc-600"
            dir={isEn ? undefined : "rtl"}
            lang={isEn ? undefined : "ar"}
          >
            Quote
          </label>
          <textarea
            id={`t-${index}-quote`}
            {...register(isEn ? `testimonials.${index}.quoteEn` : `testimonials.${index}.quoteAr`)}
            rows={3}
            dir={isEn ? "ltr" : "rtl"}
            lang={isEn ? "en" : "ar"}
            placeholder={isEn ? "Client's testimonial quote..." : "اقتباس شهادة العميل..."}
            aria-label={`Testimonial ${index + 1} quote`}
            className="w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
      </div>

      <DeleteButton
        onClick={onRemove}
        ariaLabel={`Delete testimonial ${index + 1}`}
        className="mt-1"
      />
    </div>
  )
}
