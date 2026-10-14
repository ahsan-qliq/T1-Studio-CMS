"use client"

import { Button } from "@workspace/ui/components/button"
import {
  useFieldArray,
  useForm,
  Controller,
  type Control,
} from "react-hook-form"
import { useState } from "react"
import { Label } from "@workspace/ui/components/label"

import {
  LocalizedField,
  PlainField,
  BoolField,
  ImageField,
  SectionAccordion,
  DeleteItemButton,
  AddItemButton,
  BreadcrumbsField,
} from "../home-page-form/shared-fields"

import { PageMetadataSection } from "../form-shared/page-metadata-section"
import type { TermsConditionsPageApiData } from "@/types/api-terms-conditions-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`

export function TermsConditionsPageFormClient({
  initialData,
}: {
  initialData: TermsConditionsPageApiData
}) {
  const form = useForm<TermsConditionsPageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, reset } = form
  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)
    try {
      const response = await fetch("/api/save-terms-conditions-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      try {
        const fresh = await fetch("/api/save-terms-conditions-page")
        if (fresh.ok) {
          reset((await fresh.json()) as TermsConditionsPageApiData)
        }
      } catch (error) {
        console.error(
          "Failed to refresh Terms & Conditions page after save:",
          error
        )
      }
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      {/* PAGE INFORMATION */}
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

      {/* 01 HERO */}
      <SectionAccordion
        title="Hero"
        order={1}
        control={control}
        visibleName="sections.hero.isVisible"
        defaultOpen
      >
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
          name="sections.hero.bgImage"
          label="Background Image"
        />

        <BreadcrumbsField control={control} name="sections.hero.breadcrumbs" />
      </SectionAccordion>

      {/* 02 CONTENT */}
      <ContentSection control={control} />

      {/* SEO / METADATA */}
      <PageMetadataSection control={control} order={3} />

      <div className="fixed bottom-0 left-0 right-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------ */
/* CONTENT SECTION                                                      */
/* ------------------------------------------------------------------ */

function ContentSection({
  control,
}: {
  control: Control<TermsConditionsPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.content.items",
  })

  return (
    <SectionAccordion
      title="Content"
      order={2}
      control={control}
      visibleName="sections.content.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.content.tocLabel"
        label="Table of Contents Label"
      />

      <LocalizedField
        control={control}
        name="sections.content.lastUpdated"
        label="Last Updated Text"
      />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-zinc-300 bg-zinc-50 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Section {index + 1}
              </span>
              <DeleteItemButton onClick={() => remove(index)} />
            </div>

            <div className="space-y-3">
              <LocalizedField
                control={control}
                name={`sections.content.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.content.items.${index}.intro`}
                label="Intro"
                multiline
              />

              <BoolField
                control={control}
                name={`sections.content.items.${index}.isVisible`}
                label="Visible"
              />

              <SubsectionsField control={control} itemIndex={index} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Section"
        onClick={() =>
          append({
            _id: tempId(),
            title: { en: "", ar: "" },
            intro: { en: "", ar: "" },
            subsections: [],
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ------------------------------------------------------------------ */
/* SUBSECTIONS FIELD                                                    */
/* ------------------------------------------------------------------ */

function SubsectionsField({
  control,
  itemIndex,
}: {
  control: Control<TermsConditionsPageApiData>
  itemIndex: number
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.content.items.${itemIndex}.subsections`,
  })

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-zinc-600">Subsections</p>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-md border border-zinc-200 bg-white p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-zinc-400">
              Subsection {index + 1}
            </span>
            <DeleteItemButton onClick={() => remove(index)} />
          </div>

          <div className="space-y-3">
            <LocalizedField
              control={control}
              name={`sections.content.items.${itemIndex}.subsections.${index}.title`}
              label="Title"
            />

            <LocalizedField
              control={control}
              name={`sections.content.items.${itemIndex}.subsections.${index}.body`}
              label="Body"
              multiline
            />

            <BulletsField
              control={control}
              itemIndex={itemIndex}
              subsectionIndex={index}
            />

            <BoolField
              control={control}
              name={`sections.content.items.${itemIndex}.subsections.${index}.isVisible`}
              label="Visible"
            />
          </div>
        </div>
      ))}

      <AddItemButton
        label="Add Subsection"
        onClick={() =>
          append({
            _id: tempId(),
            title: { en: "", ar: "" },
            body: { en: "", ar: "" },
            bullets: [],
            isVisible: true,
          })
        }
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* BULLETS FIELD                                                        */
/* ------------------------------------------------------------------ */

function BulletsField({
  control,
  itemIndex,
  subsectionIndex,
}: {
  control: Control<TermsConditionsPageApiData>
  itemIndex: number
  subsectionIndex: number
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.content.items.${itemIndex}.subsections.${subsectionIndex}.bullets`,
  })

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-zinc-500">Bullets</p>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <div className="flex-1">
            <LocalizedField
              control={control}
              name={`sections.content.items.${itemIndex}.subsections.${subsectionIndex}.bullets.${index}`}
              label={`Bullet ${index + 1}`}
              multiline
            />
          </div>
          <DeleteItemButton onClick={() => remove(index)} />
        </div>
      ))}

      <AddItemButton
        label="Add Bullet"
        onClick={() => append({ en: "", ar: "" })}
      />
    </div>
  )
}
