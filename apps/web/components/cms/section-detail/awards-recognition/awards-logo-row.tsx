"use client"

import { useRef } from "react"
import { Upload, ExternalLink } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"
import type { AwardsFormValues } from "./awards-content-tab"

interface AwardsLogoRowProps {
  logo: AwardsFormValues["logos"][number]
  index: number
  register: UseFormRegister<AwardsFormValues>
  setValue: UseFormSetValue<AwardsFormValues>
  onRemove: () => void
}

export function AwardsLogoRow({ logo, index, register, setValue, onRemove }: AwardsLogoRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue(`logos.${index}.imageUrl`, URL.createObjectURL(file))
    }
  }

  return (
    <div className="flex items-center gap-3 py-4" role="listitem">
      <DragHandle />

      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-600">
        {logo.number}
      </span>

      <div className="relative shrink-0">
        <div className="flex h-14 w-28 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
          {logo.imageUrl ? (
            <img
              src={logo.imageUrl}
              alt={logo.altText || "Logo"}
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <span className="text-xs text-zinc-400">No image</span>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.svg"
          className="sr-only"
          aria-label={`Upload logo ${index + 1}`}
          onChange={handleFileChange}
        />
        <button
          type="button"
          aria-label={`Upload logo ${index + 1}`}
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-2 -right-2 flex size-6 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          <Upload className="size-3" aria-hidden />
        </button>
      </div>

      <div className="min-w-0 flex-1">
        <label className="mb-1 block text-xs font-medium text-zinc-500">Alt Text</label>
        <Input
          {...register(`logos.${index}.altText`)}
          placeholder="Logo alt text"
          aria-label={`Logo ${index + 1} alt text`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <label className="mb-1 block text-xs font-medium text-zinc-500">
          Link URL <span className="font-normal text-zinc-400">(Optional)</span>
        </label>
        <div className="relative">
          <Input
            {...register(`logos.${index}.linkUrl`)}
            placeholder="https://example.com"
            aria-label={`Logo ${index + 1} link URL`}
            className="pr-8"
          />
          <ExternalLink
            className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400"
            aria-hidden
          />
        </div>
      </div>

      <DeleteButton onClick={onRemove} ariaLabel={`Delete logo ${index + 1}`} />
    </div>
  )
}
