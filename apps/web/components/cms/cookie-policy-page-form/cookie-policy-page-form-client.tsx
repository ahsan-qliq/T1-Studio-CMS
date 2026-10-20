"use client"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { useFieldArray, useForm, Controller } from "react-hook-form"
import type { Control } from "react-hook-form"
import { useState } from "react"

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
import type { CookiePolicyPageApiData } from "@/types/api-cookie-policy-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`
const emptyL = () => ({ en: "", ar: "" })

/* ------------------------------------------------------------------ */
/* LOCALIZED LIST FIELD (array of { en, ar } items)                   */
/* ------------------------------------------------------------------ */

function LocalizedListField({
  control,
  name,
  label,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  name: string
  label: string
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as never,
  })

  return (
    <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
      <p className="text-xs font-medium text-zinc-600">{label}</p>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white p-3"
        >
          <div className="flex-1">
            <LocalizedField
              control={control}
              name={`${name}.${index}`}
              label={`${label} ${index + 1}`}
            />
          </div>
          <DeleteItemButton onClick={() => remove(index)} />
        </div>
      ))}
      <AddItemButton
        label={`Add ${label} item`}
        onClick={() => append(emptyL() as never)}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MAIN FORM                                                            */
/* ------------------------------------------------------------------ */

export function CookiePolicyPageFormClient({
  initialData,
}: {
  initialData: CookiePolicyPageApiData
}) {
  const form = useForm<CookiePolicyPageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, reset } = form
  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)
    try {
      const response = await fetch("/api/save-cookie-policy-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      try {
        const fresh = await fetch("/api/save-cookie-policy-page")
        if (fresh.ok) {
          reset((await fresh.json()) as CookiePolicyPageApiData)
        }
      } catch (error) {
        console.error("Failed to refresh Cookie Policy page after save:", error)
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

      {/* TOC META */}
      <div className="grid grid-cols-2 gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <LocalizedField control={control} name="tocMeta.tocLabel" label="TOC Label" />
        <LocalizedField control={control} name="tocMeta.lastUpdated" label="Last Updated" />
      </div>

      {/* 01 HERO */}
      <SectionAccordion
        title="Hero"
        order={1}
        control={control}
        visibleName="sections.hero.isVisible"
        defaultOpen
      >
        <LocalizedField control={control} name="sections.hero.heading" label="Heading" />
        <LocalizedField
          control={control}
          name="sections.hero.description"
          label="Description"
          multiline
        />
        <ImageField control={control} name="sections.hero.bgImage" label="Background Image" />
        <BreadcrumbsField control={control} name="sections.hero.breadcrumbs" />
      </SectionAccordion>

      {/* 02 ABOUT POLICY */}
      <SectionAccordion
        title="About This Policy"
        order={2}
        control={control}
        visibleName="sections.aboutPolicy.isVisible"
      >
        <LocalizedField control={control} name="sections.aboutPolicy.title" label="Title" />
        <LocalizedField
          control={control}
          name="sections.aboutPolicy.body"
          label="Body"
          multiline
        />
      </SectionAccordion>

      {/* 03 WHAT ARE COOKIES */}
      <SectionAccordion
        title="What Cookies Are"
        order={3}
        control={control}
        visibleName="sections.whatAreCookies.isVisible"
      >
        <LocalizedField
          control={control}
          name="sections.whatAreCookies.title"
          label="Title"
        />
        <LocalizedField
          control={control}
          name="sections.whatAreCookies.body"
          label="Body"
          multiline
        />
      </SectionAccordion>

      {/* 04 COOKIE TYPES */}
      <CookieTypesSection control={control} />

      {/* 05 YOUR CHOICES */}
      <SectionAccordion
        title="Your Choices"
        order={5}
        control={control}
        visibleName="sections.yourChoices.isVisible"
      >
        <LocalizedField control={control} name="sections.yourChoices.title" label="Title" />
        <LocalizedField
          control={control}
          name="sections.yourChoices.body"
          label="Body"
          multiline
        />
        <LocalizedListField
          control={control}
          name="sections.yourChoices.choices"
          label="Choices"
        />
        <LocalizedField
          control={control}
          name="sections.yourChoices.note"
          label="Note"

          
          multiline
        />
      </SectionAccordion>

      {/* 06 YOUR RIGHTS */}
      <SectionAccordion
        title="Your Rights"
        order={6}
        control={control}
        visibleName="sections.yourRights.isVisible"
      >
        <LocalizedField control={control} name="sections.yourRights.title" label="Title" />
        <LocalizedField
          control={control}
          name="sections.yourRights.body"
          label="Body"
          multiline
        />
      </SectionAccordion>

      {/* 07 CHANGES */}
      <SectionAccordion
        title="Changes to This Policy"
        order={7}
        control={control}
        visibleName="sections.changes.isVisible"
      >
        <LocalizedField control={control} name="sections.changes.title" label="Title" />
        <LocalizedField
          control={control}
          name="sections.changes.body"
          label="Body"
          multiline
        />
      </SectionAccordion>

      {/* 08 CONTACT */}
      <ContactSection control={control} />

      {/* 09 FAQ */}
      <FaqSection control={control} />

      {/* 10 SEO / METADATA */}
      <PageMetadataSection control={control} order={10} />

      <div className="fixed bottom-0 left-0 right-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------ */
/* COOKIE TYPES SECTION                                                 */
/* ------------------------------------------------------------------ */

function CookieTypesSection({
  control,
}: {
  control: Control<CookiePolicyPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.cookieTypes.categories",
  })

  return (
    <SectionAccordion
      title="The Cookies We Use"
      order={4}
      control={control}
      visibleName="sections.cookieTypes.isVisible"
    >
      <LocalizedField control={control} name="sections.cookieTypes.title" label="Title" />
      <LocalizedField
        control={control}
        name="sections.cookieTypes.body"
        label="Body"
        multiline
      />

      <div className="space-y-3">
        <p className="text-xs font-semibold text-zinc-600">Categories</p>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-3">
              <LocalizedField
                control={control}
                name={`sections.cookieTypes.categories.${index}.title`}
                label="Title"
              />
              <LocalizedField
                control={control}
                name={`sections.cookieTypes.categories.${index}.body`}
                label="Body"
                multiline
              />
              <BoolField
                control={control}
                name={`sections.cookieTypes.categories.${index}.isVisible`}
                label="Visible"
              />
            </div>
            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Category"
        onClick={() =>
          append({ _id: tempId(), title: emptyL(), body: emptyL(), isVisible: true })
        }
      />

      <LocalizedField
        control={control}
        name="sections.cookieTypes.note"
        label="Note"
        multiline
      />
    </SectionAccordion>
  )
}

/* ------------------------------------------------------------------ */
/* CONTACT SECTION                                                      */
/* ------------------------------------------------------------------ */

function ContactSection({
  control,
}: {
  control: Control<CookiePolicyPageApiData>
}) {
  return (
    <SectionAccordion
      title="Contact Us"
      order={8}
      control={control}
      visibleName="sections.contact.isVisible"
    >
      <LocalizedField control={control} name="sections.contact.title" label="Title" />
      <LocalizedField
        control={control}
        name="sections.contact.body"
        label="Body"
        multiline
      />
      <LocalizedField
        control={control}
        name="sections.contact.contactSubTitle"
        label="Contact Sub-Title"
      />
      <LocalizedListField
        control={control}
        name="sections.contact.contactItems"
        label="Contact Items"
      />
    </SectionAccordion>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ SECTION                                                          */
/* ------------------------------------------------------------------ */

function FaqSection({
  control,
}: {
  control: Control<CookiePolicyPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.faq.faqs",
  })

  return (
    <SectionAccordion
      title="FAQ"
      order={9}
      control={control}
      visibleName="sections.faq.isVisible"
    >
      <LocalizedField control={control} name="sections.faq.title" label="Section Title" />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-4"
          >
            <div className="flex-1 space-y-3">
              <LocalizedField
                control={control}
                name={`sections.faq.faqs.${index}.question`}
                label="Question"
                multiline
              />
              <LocalizedField
                control={control}
                name={`sections.faq.faqs.${index}.answer`}
                label="Answer"
                multiline
              />
              <BoolField
                control={control}
                name={`sections.faq.faqs.${index}.isVisible`}
                label="Visible"
              />
            </div>
            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add FAQ"
        onClick={() =>
          append({ _id: tempId(), question: emptyL(), answer: emptyL(), isVisible: true })
        }
      />
    </SectionAccordion>
  )
}
