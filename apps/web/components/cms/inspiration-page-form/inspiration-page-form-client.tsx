"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
} from "react-hook-form"
import { useState } from "react"
import { Label } from "@workspace/ui/components/label"

import {
  LocalizedField,
  PlainField,
  BoolField,
  ImageField,
  ButtonField,
  SectionAccordion,
  DeleteItemButton,
  AddItemButton,
} from "../home-page-form/shared-fields"

import { SeoFields } from "../form-shared/seo-field"
import type { InspirationPageApiData } from "@/types/api-inspiration-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`

export function InspirationPageFormClient({
  initialData,
}: {
  initialData: InspirationPageApiData
}) {
  const form = useForm<InspirationPageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, formState } = form
  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)

    try {
      const response = await fetch("/api/save-inspiration-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      {/* Page Information */}
      <div className="grid grid-cols-3 gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <PlainField control={control} name="pageName" label="Page Name" />

        <PlainField control={control} name="slug" label="Slug" />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <div className="space-y-1.5">
              <Label>Status</Label>

              <select
                {...field}
                className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900"
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
            </div>
          )}
        />
      </div>

      {/* 01. Hero */}
      <HeroSection control={control} />

      {/* 02. Rooms */}
      <RoomsSection control={control} />

      {/* 03. Showcase */}
      <ShowcaseSection control={control} />

      {/* 04. Materials */}
      <MaterialsSection control={control} />

      {/* 05. Inspiration CTA */}
      <InspirationCTASection control={control} />

      {/* 06. Design Tips */}
      <DesignTipsSection control={control} />

      {/* 07. Follow Our Journey */}
      <FollowJourneySection control={control} />

      {/* SEO */}
      <SeoFields control={control} namePrefix="seo" />

      {/* Save */}
      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button
          type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : formState.isDirty
              ? "Save All Changes"
              : "Saved"}
        </Button>
      </div>
    </form>
  )
}

/* ============================================================
   01. HERO
============================================================ */

function HeroSection({
  control,
}: {
  control: Control<InspirationPageApiData>
}) {
  return (
    <SectionAccordion
      title="Hero Banner"
      order={1}
      control={control}
      visibleName="sections.hero.isVisible"
      defaultOpen
    >
      <LocalizedField
        control={control}
        name="sections.hero.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.hero.heading"
        label="Heading"
        multiline
      />

      <LocalizedField
        control={control}
        name="sections.hero.description"
        label="Description"
        multiline
      />

      <ImageField
        control={control}
        name="sections.hero.backgroundImage"
        label="Background Image"
      />

      <ButtonField
        control={control}
        name="sections.hero.primaryButton"
        label="Primary Button"
      />

      <PlainField
        control={control}
        name="sections.hero.overlayOpacity"
        label="Overlay Opacity"
        type="number"
        placeholder="0.45"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   02. ROOMS
============================================================ */

function RoomsSection({
  control,
}: {
  control: Control<InspirationPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.rooms.items" as never,
  })

  return (
    <SectionAccordion
      title="Rooms"
      order={2}
      control={control}
      visibleName="sections.rooms.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <PlainField
                  control={control}
                  name={`sections.rooms.items.${index}.key`}
                  label="Key"
                  placeholder="living-room"
                />

                <PlainField
                  control={control}
                  name={`sections.rooms.items.${index}.href`}
                  label="Link URL"
                  placeholder="/spaces/living-room"
                />
              </div>

              <LocalizedField
                control={control}
                name={`sections.rooms.items.${index}.title`}
                label="Title"
              />

              <ImageField
                control={control}
                name={`sections.rooms.items.${index}.image`}
                label="Image"
              />

              <BoolField
                control={control}
                name={`sections.rooms.items.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Room"
        onClick={() =>
          append({
            _id: tempId(),
            key: "",
            title: {
              en: "",
              ar: "",
            },
            image: {
              url: "",
              key: "",
              alt: {
                en: "",
                ar: "",
              },
            },
            href: "",
            isVisible: true,
          } as never)
        }
      />

      <div className="grid grid-cols-2 gap-3">
        <BoolField
          control={control}
          name="sections.rooms.autoplay"
          label="Autoplay"
        />

        <BoolField
          control={control}
          name="sections.rooms.showNavigation"
          label="Show Navigation"
        />
      </div>
    </SectionAccordion>
  )
}

/* ============================================================
   03. SHOWCASE
============================================================ */

function ShowcaseSection({
  control,
}: {
  control: Control<InspirationPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.showcase.items" as never,
  })

  return (
    <SectionAccordion
      title="Featured Inspiration / Showcase"
      order={3}
      control={control}
      visibleName="sections.showcase.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-3">
              <LocalizedField
                control={control}
                name={`sections.showcase.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.showcase.items.${index}.subtitle`}
                label="Subtitle"
              />

              <LocalizedField
                control={control}
                name={`sections.showcase.items.${index}.description`}
                label="Description"
                multiline
              />

              <ImageField
                control={control}
                name={`sections.showcase.items.${index}.image`}
                label="Image"
              />

              <PlainField
                control={control}
                name={`sections.showcase.items.${index}.href`}
                label="Link URL"
              />

              <BoolField
                control={control}
                name={`sections.showcase.items.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Showcase Item"
        onClick={() =>
          append({
            _id: tempId(),
            title: {
              en: "",
              ar: "",
            },
            subtitle: {
              en: "",
              ar: "",
            },
            description: {
              en: "",
              ar: "",
            },
            image: {
              url: "",
              key: "",
              alt: {
                en: "",
                ar: "",
              },
            },
            href: "",
            isVisible: true,
          } as never)
        }
      />

      <div className="grid grid-cols-2 gap-3">
        <BoolField
          control={control}
          name="sections.showcase.autoplay"
          label="Autoplay"
        />

        <BoolField
          control={control}
          name="sections.showcase.showNavigation"
          label="Show Navigation"
        />
      </div>
    </SectionAccordion>
  )
}

/* ============================================================
   04. MATERIALS
============================================================ */

function MaterialsSection({
  control,
}: {
  control: Control<InspirationPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.materials.items" as never,
  })

  return (
    <SectionAccordion
      title="Material Inspiration"
      order={4}
      control={control}
      visibleName="sections.materials.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-3">
              <LocalizedField
                control={control}
                name={`sections.materials.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.materials.items.${index}.subtitle`}
                label="Subtitle"
              />

              <LocalizedField
                control={control}
                name={`sections.materials.items.${index}.description`}
                label="Description"
                multiline
              />

              <ImageField
                control={control}
                name={`sections.materials.items.${index}.image`}
                label="Image"
              />

              <PlainField
                control={control}
                name={`sections.materials.items.${index}.href`}
                label="Link URL"
              />

              <BoolField
                control={control}
                name={`sections.materials.items.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Material"
        onClick={() =>
          append({
            _id: tempId(),
            title: {
              en: "",
              ar: "",
            },
            subtitle: {
              en: "",
              ar: "",
            },
            description: {
              en: "",
              ar: "",
            },
            image: {
              url: "",
              key: "",
              alt: {
                en: "",
                ar: "",
              },
            },
            href: "",
            isVisible: true,
          } as never)
        }
      />

      <div className="grid grid-cols-2 gap-3">
        <BoolField
          control={control}
          name="sections.materials.autoplay"
          label="Autoplay"
        />

        <BoolField
          control={control}
          name="sections.materials.showNavigation"
          label="Show Navigation"
        />
      </div>
    </SectionAccordion>
  )
}

/* ============================================================
   05. INSPIRATION CTA
============================================================ */

function InspirationCTASection({
  control,
}: {
  control: Control<InspirationPageApiData>
}) {
  return (
    <SectionAccordion
      title="Inspiration CTA"
      order={5}
      control={control}
      visibleName="sections.inspirationCTA.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.inspirationCTA.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.inspirationCTA.heading"
        label="Heading"
        multiline
      />

      <LocalizedField
        control={control}
        name="sections.inspirationCTA.description"
        label="Description"
        multiline
      />

      <ImageField
        control={control}
        name="sections.inspirationCTA.backgroundImage"
        label="Background Image"
      />

      <PlainField
        control={control}
        name="sections.inspirationCTA.overlayOpacity"
        label="Overlay Opacity"
        type="number"
        placeholder="0.6"
      />

      <ButtonField
        control={control}
        name="sections.inspirationCTA.button"
        label="CTA Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   06. DESIGN TIPS
============================================================ */

function DesignTipsSection({
  control,
}: {
  control: Control<InspirationPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.designTips.items" as never,
  })

  return (
    <SectionAccordion
      title="Design Tips & Insights"
      order={6}
      control={control}
      visibleName="sections.designTips.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-3">
              <PlainField
                control={control}
                name={`sections.designTips.items.${index}.slug`}
                label="Slug"
                placeholder="top-kitchen-trends-2026"
              />

              <LocalizedField
                control={control}
                name={`sections.designTips.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.designTips.items.${index}.category`}
                label="Category"
              />

              <LocalizedField
                control={control}
                name={`sections.designTips.items.${index}.description`}
                label="Description"
                multiline
              />

              <LocalizedField
                control={control}
                name={`sections.designTips.items.${index}.readTime`}
                label="Read Time"
              />

              <ImageField
                control={control}
                name={`sections.designTips.items.${index}.image`}
                label="Image"
              />

              <BoolField
                control={control}
                name={`sections.designTips.items.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Design Tip"
        onClick={() =>
          append({
            _id: tempId(),
            slug: "",
            title: {
              en: "",
              ar: "",
            },
            category: {
              en: "",
              ar: "",
            },
            description: {
              en: "",
              ar: "",
            },
            readTime: {
              en: "",
              ar: "",
            },
            image: {
              url: "",
              key: "",
              alt: {
                en: "",
                ar: "",
              },
            },
            isVisible: true,
          } as never)
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   07. FOLLOW OUR JOURNEY
============================================================ */

function FollowJourneySection({
  control,
}: {
  control: Control<InspirationPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.followJourney.items" as never,
  })

  return (
    <SectionAccordion
      title="Follow Our Journey"
      order={7}
      control={control}
      visibleName="sections.followJourney.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-3">
              <LocalizedField
                control={control}
                name={`sections.followJourney.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.followJourney.items.${index}.location`}
                label="Location"
              />

              <ImageField
                control={control}
                name={`sections.followJourney.items.${index}.image`}
                label="Image"
              />

              <PlainField
                control={control}
                name={`sections.followJourney.items.${index}.href`}
                label="Instagram / Social URL"
                placeholder="https://instagram.com/..."
              />

              <BoolField
                control={control}
                name={`sections.followJourney.items.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Journey Item"
        onClick={() =>
          append({
            _id: tempId(),
            title: {
              en: "",
              ar: "",
            },
            location: {
              en: "",
              ar: "",
            },
            image: {
              url: "",
              key: "",
              alt: {
                en: "",
                ar: "",
              },
            },
            href: "",
            isVisible: true,
          } as never)
        }
      />

      <div className="grid grid-cols-2 gap-3">
        <BoolField
          control={control}
          name="sections.followJourney.autoplay"
          label="Autoplay"
        />

        <BoolField
          control={control}
          name="sections.followJourney.showNavigation"
          label="Show Navigation"
        />
      </div>
    </SectionAccordion>
  )
}
