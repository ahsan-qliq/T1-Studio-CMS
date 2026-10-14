"use client"

import { Button } from "@workspace/ui/components/button"
import { useFieldArray, useForm, Controller, type Control } from "react-hook-form"
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
import type { PrivacyPolicyPageApiData } from "@/types/api-privacy-policy-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`

export function PrivacyPolicyPageFormClient({
  initialData,
}: {
  initialData: PrivacyPolicyPageApiData
}) {
  const form = useForm<PrivacyPolicyPageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, reset } = form
  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)
    try {
      const response = await fetch("/api/save-privacy-policy-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      try {
        const fresh = await fetch("/api/save-privacy-policy-page")
        if (fresh.ok) {
          reset((await fresh.json()) as PrivacyPolicyPageApiData)
        }
      } catch (error) {
        console.error("Failed to refresh Privacy Policy page after save:", error)
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

function ContentSection({
  control,
}: {
  control: Control<PrivacyPolicyPageApiData>
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

      <PlainField
        control={control}
        name="sections.content.contactEmail"
        label="Contact Email"
        placeholder="info@example.com"
      />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-4"
          >
            <div className="flex-1 space-y-3">
              <LocalizedField
                control={control}
                name={`sections.content.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.content.items.${index}.body`}
                label="Body"
                multiline
              />

              <BoolField
                control={control}
                name={`sections.content.items.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Item"
        onClick={() =>
          append({
            _id: tempId(),
            title: { en: "", ar: "" },
            body: { en: "", ar: "" },
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}
