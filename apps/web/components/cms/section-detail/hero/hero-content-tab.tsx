"use client"

import { useEffect, useRef, useState } from "react"
import { Link2, Camera, Upload, X } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { Language } from "@/types/cms"

type HeroContent = {
  eyebrowEn: string
  eyebrowAr: string
  mainHeadingEn: string
  mainHeadingAr: string
  descriptionEn: string
  descriptionAr: string
  primaryButton: { label: string; link: string }
  secondaryButton: { label: string; link: string }
  backgroundType: "image" | "video"
  useSameMediaForBothLanguages: boolean
  desktopImageUrl?: string
  mobileImageUrl?: string
  imageAltText: string
  visible: boolean
}

interface Props {
  content: HeroContent
  onChange: (content: HeroContent) => void
}

function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-zinc-700">{label}</label>
      {children}
    </div>
  )
}

function LinkInput({
  value,
  onChange,
  id,
}: {
  value: string
  onChange: (v: string) => void
  id: string
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-zinc-200 py-2 pl-3 pr-8 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
      />
      <Link2
        className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400"
        aria-hidden
      />
    </div>
  )
}

function ImageUploadSlot({
  label,
  optional,
  imageUrl,
  onChange,
}: {
  label: string
  optional?: boolean
  imageUrl?: string
  onChange: (file: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl)

  // Update preview when existing imageUrl changes
  useEffect(() => {
    setPreviewUrl(imageUrl)
  }, [imageUrl])

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG or WEBP image.")
      event.target.value = ""
      return
    }

    const maxSize = 5 * 1024 * 1024

    if (file.size > maxSize) {
      alert("Image must be smaller than 5MB.")
      event.target.value = ""
      return
    }

    // Create local preview
    const objectUrl = URL.createObjectURL(file)

    setPreviewUrl(objectUrl)

    // Send actual file to parent
    onChange(file)
  }

  const handleRemove = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl)
    }

    setPreviewUrl(undefined)
    onChange(null)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  // Clean temporary blob URL
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-zinc-700">
          {label}

          {optional && (
            <span className="ml-1 text-zinc-400">
              (Optional)
            </span>
          )}
        </p>

        {previewUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
          >
            <X className="size-3" />
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative block w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-left transition hover:border-zinc-300"
      >
        {previewUrl ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={previewUrl}
              alt={label}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-semibold text-zinc-800 shadow">
                <Camera className="size-3.5" />
                Change Image
              </span>
            </div>
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100">
              <Upload className="size-4 text-zinc-500" />
            </div>

            <div className="text-center">
              <p className="text-xs font-medium text-zinc-700">
                Click to upload
              </p>

              <p className="mt-0.5 text-[11px] text-zinc-400">
                JPG, PNG or WEBP · Max 5MB
              </p>
            </div>
          </div>
        )}
      </button>
    </div>
  )
}

export function HeroContentTab({ content, onChange }: Props) {
  const [lang, setLang] = useState<Language>("en")
  const isEn = lang === "en"

  const set = <K extends keyof HeroContent>(key: K, value: HeroContent[K]) =>
    onChange({ ...content, [key]: value })

  return (
    <div>
      <div className="space-y-4 px-4 py-4">
        {/* Language switcher */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-zinc-900">Language Content</span>
          <div className="flex overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
            {(["en", "ar"] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold uppercase transition-colors",
                  lang === l
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Text fields */}
        <FormField label="Eyebrow">
          <input
            type="text"
            value={isEn ? content.eyebrowEn : content.eyebrowAr}
            onChange={(e) => set(isEn ? "eyebrowEn" : "eyebrowAr", e.target.value)}
            dir={isEn ? "ltr" : "rtl"}
            lang={isEn ? "en" : "ar"}
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </FormField>

        <FormField label="Main Heading">
          <textarea
            rows={3}
            value={isEn ? content.mainHeadingEn : content.mainHeadingAr}
            onChange={(e) => set(isEn ? "mainHeadingEn" : "mainHeadingAr", e.target.value)}
            dir={isEn ? "ltr" : "rtl"}
            lang={isEn ? "en" : "ar"}
            className="w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </FormField>

        <FormField label="Description">
          <textarea
            rows={3}
            value={isEn ? content.descriptionEn : content.descriptionAr}
            onChange={(e) => set(isEn ? "descriptionEn" : "descriptionAr", e.target.value)}
            dir={isEn ? "ltr" : "rtl"}
            lang={isEn ? "en" : "ar"}
            className="w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </FormField>

        {/* Button fields — 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          {(
            [
              { key: "primaryButton" as const, title: "Primary Button" },
              { key: "secondaryButton" as const, title: "Secondary Button" },
            ] as const
          ).map(({ key, title }) => (
            <div key={key} className="space-y-3">
              <p className="text-sm font-semibold text-zinc-800">{title}</p>
              <FormField label="Label">
                <input
                  type="text"
                  value={content[key].label}
                  onChange={(e) => set(key, { ...content[key], label: e.target.value })}
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </FormField>
              <FormField label="Link">
                <LinkInput
                  id={`${key}-link`}
                  value={content[key].link}
                  onChange={(v) => set(key, { ...content[key], link: v })}
                />
              </FormField>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Media — separated by border */}
      <div className="border-t border-zinc-100 px-4 py-4 space-y-4">
        <p className="text-sm font-semibold text-zinc-900">Hero Media</p>

        {/* Background type + same media checkbox */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-zinc-700">Background Type</span>
            {(["image", "video"] as const).map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name="backgroundType"
                  value={type}
                  checked={content.backgroundType === type}
                  onChange={() => set("backgroundType", type)}
                  className="accent-zinc-900"
                />
                <span className="text-xs capitalize text-zinc-700">{type}</span>
              </label>
            ))}
          </div>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="checkbox"
              checked={content.useSameMediaForBothLanguages}
              onChange={(e) => set("useSameMediaForBothLanguages", e.target.checked)}
              className="size-3.5 accent-zinc-900"
            />
            <span className="text-xs text-zinc-600">Use same media for both languages</span>
          </label>
        </div>

        {/* Image upload slots */}
        <div className="grid grid-cols-2 gap-4">
          <ImageUploadSlot
            label="Desktop Image"
            imageUrl={content.desktopImageUrl}
            onChange={(_file) => {}}
          />
          <ImageUploadSlot
            label="Mobile Image"
            optional
            imageUrl={content.mobileImageUrl}
            onChange={(_file) => {}}
          />
        </div>

        {/* Alt text */}
        <FormField label="Image Alt Text">
          <input
            type="text"
            value={content.imageAltText}
            onChange={(e) => set("imageAltText", e.target.value)}
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </FormField>
      </div>
    </div>
  )
}
