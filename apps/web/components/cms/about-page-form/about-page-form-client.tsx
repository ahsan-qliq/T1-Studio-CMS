"use client"

import { Button } from "@workspace/ui/components/button"

import {
  Controller,
  useForm,
  useFieldArray,
  type Control,
} from "react-hook-form"
import { useState } from "react"
import { Label } from "@workspace/ui/components/label"
import {
  LocalizedField,
  PlainField,
  ImageField,
  ButtonField,
  SectionAccordion,
  BoolField,
  AddItemButton,
  DeleteItemButton,
} from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"
import type { AboutPageApiData } from "@/types/api-about-page"

// [section key, title, hasEyebrow]
const sections: [string, string, boolean][] = [
  ["story", "Our Story", true],
  ["journey", "Our Journey", true],
  ["philosophy", "Our Philosophy", true],
  ["values", "Our Values", true],
  ["stats", "Stats", false],
  ["team", "Our Team", true],
  ["showcase", "Showcase / Gallery", true],
  ["brands", "Trusted Brands", true],
  ["partnership", "Partnership", true],
  ["faq", "FAQ", true],
]

export function AboutPageFormClient({
  initialData,
}: {
  initialData: AboutPageApiData
}) {
  const form = useForm<AboutPageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState, reset } = form
  const [saving, setSaving] = useState(false)
  const submit = handleSubmit(async (data) => {
    setSaving(true)
    try {
      const response = await fetch("/api/save-about-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(await response.text())
      // Re-fetch the freshly saved page so the form reflects exactly what
      // the backend now has (e.g. CDN URLs the backend fills in from the
      // uploaded image's S3 key).
      try {
        const fresh = await fetch("/api/save-about-page")
        if (fresh.ok) {
          reset((await fresh.json()) as AboutPageApiData)
        }
      } catch (error) {
        console.error("Failed to refresh about page after save:", error)
      }
    } finally {
      setSaving(false)
    }
  })
  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
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
      <SectionAccordion
        title="Hero"
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
        <ImageField
          control={control}
          name="sections.hero.mobileImage"
          label="Mobile Image"
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
        />
      </SectionAccordion>
      {sections.map(([name, title, hasEyebrow], index) => (
        <AboutSectionForm
          key={name}
          control={control}
          name={name}
          title={title}
          order={index + 2}
          hasEyebrow={hasEyebrow}
        />
      ))}
      <SeoFields control={control} namePrefix="seo" />
      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button
          type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
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

function CheckField({
  control,
  name,
  label,
}: {
  control: Control<AboutPageApiData>
  name: string
  label: string
}) {
  return (
    <Controller
      control={control}
      name={name as never}
      render={({ field }) => (
        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!field.value}
            onChange={field.onChange}
          />{" "}
          {label}
        </label>
      )}
    />
  )
}

function AboutSectionForm({
  control,
  name,
  title,
  order,
  hasEyebrow,
}: {
  control: Control<AboutPageApiData>
  name: string
  title: string
  order: number
  hasEyebrow: boolean
}) {
  return (
    <SectionAccordion
      title={title}
      order={order}
      control={control}
      visibleName={`sections.${name}.isVisible`}
    >
      <div className="space-y-3">
        {hasEyebrow && (
          <LocalizedField
            control={control}
            name={`sections.${name}.eyebrow`}
            label="Eyebrow"
          />
        )}
        <LocalizedField
          control={control}
          name={`sections.${name}.heading`}
          label="Heading"
        />
        {name !== "stats" && (
          <LocalizedField
            control={control}
            name={`sections.${name}.description`}
            label="Description"
            multiline
          />
        )}

        {name === "story" && (
          <>
            <LocalizedField
              control={control}
              name="sections.story.secondaryDescription"
              label="Secondary Description"
              multiline
            />
            <ImageField
              control={control}
              name="sections.story.image"
              label="Story Image"
            />
            <PlainField
              control={control}
              name="sections.story.imagePosition"
              label="Image Position"
              placeholder="left or right"
            />
            <ButtonField
              control={control}
              name="sections.story.button"
              label="Button"
            />
          </>
        )}

        {name === "journey" && (
          <AboutArray
            control={control}
            path="sections.journey.items"
            kind="journey"
            label="Journey Items"
            addLabel="Add Journey Item"
          />
        )}

        {name === "philosophy" && (
          <AboutArray
            control={control}
            path="sections.philosophy.items"
            kind="philosophy"
            label="Philosophy Items"
            addLabel="Add Philosophy Item"
          />
        )}

        {name === "values" && (
          <AboutArray
            control={control}
            path="sections.values.values"
            kind="values"
            label="Values"
            addLabel="Add Value"
          />
        )}

        {name === "stats" && (
          <AboutArray
            control={control}
            path="sections.stats.stats"
            kind="stats"
            label="Stats"
            addLabel="Add Stat"
          />
        )}

        {name === "team" && (
          <>
            <AboutArray
              control={control}
              path="sections.team.members"
              kind="team"
              label="Team Members"
              addLabel="Add Member"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <CheckField
                control={control}
                name="sections.team.autoplay"
                label="Autoplay"
              />
              <CheckField
                control={control}
                name="sections.team.showNavigation"
                label="Show navigation"
              />
            </div>
          </>
        )}

        {name === "showcase" && (
          <>
            <AboutArray
              control={control}
              path="sections.showcase.images"
              kind="showcase"
              label="Showcase Images"
              addLabel="Add Image"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <CheckField
                control={control}
                name="sections.showcase.autoplay"
                label="Autoplay"
              />
              <CheckField
                control={control}
                name="sections.showcase.showNavigation"
                label="Show navigation"
              />
            </div>
          </>
        )}

        {name === "brands" && (
          <AboutArray
            control={control}
            path="sections.brands.brands"
            kind="brands"
            label="Brands"
            addLabel="Add Brand"
          />
        )}

        {name === "partnership" && (
          <>
            <ImageField
              control={control}
              name="sections.partnership.image"
              label="Partnership Image"
            />
            <AboutArray
              control={control}
              path="sections.partnership.steps"
              kind="partnership"
              label="Partnership Steps"
              addLabel="Add Step"
            />
            <ButtonField
              control={control}
              name="sections.partnership.button"
              label="Button"
            />
          </>
        )}

        {name === "faq" && (
          <AboutArray
            control={control}
            path="sections.faq.faqs"
            kind="faq"
            label="FAQs"
            addLabel="Add FAQ"
          />
        )}
      </div>
    </SectionAccordion>
  )
}

type AboutArrayKind =
  | "journey"
  | "philosophy"
  | "values"
  | "stats"
  | "team"
  | "showcase"
  | "brands"
  | "partnership"
  | "faq"

function AboutArray({
  control,
  path,
  kind,
  label,
  addLabel,
}: {
  control: Control<AboutPageApiData>
  path: string
  kind: AboutArrayKind
  label: string
  addLabel: string
}) {
  const { fields, append, remove } = useFieldArray({
    control: control as Control<any>,
    name: path as never,
  })
  const localized = { en: "", ar: "" }
  const image = { url: "", key: "", alt: { en: "", ar: "" } }
  const empty = {
    journey: {
      icon: "",
      year: "",
      title: localized,
      description: localized,
      isVisible: true,
    },
    philosophy: {
      icon: "",
      title: localized,
      description: localized,
      isVisible: true,
    },
    values: {
      title: localized,
      description: localized,
      image,
      href: "",
      isVisible: true,
    },
    stats: {
      value: "",
      label: localized,
      description: localized,
      isVisible: true,
    },
    team: {
      name: localized,
      designation: localized,
      description: localized,
      image,
      linkedinUrl: "",
    },
    showcase: { title: localized, caption: localized, image, href: "" },
    brands: {
      name: "",
      logo: image,
      href: "",
      openInNewTab: false,
      isVisible: true,
    },
    partnership: { icon: "", title: localized, description: localized },
    faq: { question: localized, answer: localized, isVisible: true },
  }[kind]
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-900">{label}</p>
      {fields.map((field, index) => {
        const item = `${path}.${index}`
        return (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-3">
              {kind === "journey" && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <PlainField
                      control={control}
                      name={`${item}.icon`}
                      label="Icon"
                    />
                    <PlainField
                      control={control}
                      name={`${item}.year`}
                      label="Year"
                    />
                  </div>
                  <LocalizedField
                    control={control}
                    name={`${item}.title`}
                    label="Title"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.description`}
                    label="Description"
                    multiline
                  />
                  <BoolField
                    control={control}
                    name={`${item}.isVisible`}
                    label="Visible"
                  />
                </>
              )}
              {kind === "philosophy" && (
                <>
                  <PlainField
                    control={control}
                    name={`${item}.icon`}
                    label="Icon"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.title`}
                    label="Title"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.description`}
                    label="Description"
                    multiline
                  />
                  <BoolField
                    control={control}
                    name={`${item}.isVisible`}
                    label="Visible"
                  />
                </>
              )}
              {kind === "values" && (
                <>
                  <LocalizedField
                    control={control}
                    name={`${item}.title`}
                    label="Title"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.description`}
                    label="Description"
                    multiline
                  />
                  <ImageField
                    control={control}
                    name={`${item}.image`}
                    label="Image"
                  />
                  <PlainField
                    control={control}
                    name={`${item}.href`}
                    label="Link URL"
                  />
                  <BoolField
                    control={control}
                    name={`${item}.isVisible`}
                    label="Visible"
                  />
                </>
              )}
              {kind === "stats" && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <PlainField
                      control={control}
                      name={`${item}.value`}
                      label="Value"
                    />
                    <LocalizedField
                      control={control}
                      name={`${item}.label`}
                      label="Label"
                    />
                  </div>
                  <LocalizedField
                    control={control}
                    name={`${item}.description`}
                    label="Description"
                    multiline
                  />
                  <BoolField
                    control={control}
                    name={`${item}.isVisible`}
                    label="Visible"
                  />
                </>
              )}
              {kind === "team" && (
                <>
                  <LocalizedField
                    control={control}
                    name={`${item}.name`}
                    label="Name"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.designation`}
                    label="Designation"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.description`}
                    label="Description"
                    multiline
                  />
                  <ImageField
                    control={control}
                    name={`${item}.image`}
                    label="Image"
                  />
                  <PlainField
                    control={control}
                    name={`${item}.linkedinUrl`}
                    label="LinkedIn URL"
                  />
                </>
              )}
              {kind === "showcase" && (
                <>
                  <LocalizedField
                    control={control}
                    name={`${item}.title`}
                    label="Title"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.caption`}
                    label="Caption"
                  />
                  <ImageField
                    control={control}
                    name={`${item}.image`}
                    label="Image"
                  />
                  <PlainField
                    control={control}
                    name={`${item}.href`}
                    label="Link URL"
                  />
                </>
              )}
              {kind === "brands" && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <PlainField
                      control={control}
                      name={`${item}.name`}
                      label="Name"
                    />
                    <PlainField
                      control={control}
                      name={`${item}.href`}
                      label="Link URL"
                    />
                  </div>
                  <ImageField
                    control={control}
                    name={`${item}.logo`}
                    label="Logo"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <BoolField
                      control={control}
                      name={`${item}.openInNewTab`}
                      label="Open in new tab"
                    />
                    <BoolField
                      control={control}
                      name={`${item}.isVisible`}
                      label="Visible"
                    />
                  </div>
                </>
              )}
              {kind === "partnership" && (
                <>
                  <PlainField
                    control={control}
                    name={`${item}.icon`}
                    label="Icon"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.title`}
                    label="Title"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.description`}
                    label="Description"
                    multiline
                  />
                </>
              )}
              {kind === "faq" && (
                <>
                  <LocalizedField
                    control={control}
                    name={`${item}.question`}
                    label="Question"
                  />
                  <LocalizedField
                    control={control}
                    name={`${item}.answer`}
                    label="Answer"
                    multiline
                  />
                  <BoolField
                    control={control}
                    name={`${item}.isVisible`}
                    label="Visible"
                  />
                </>
              )}
            </div>
            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        )
      })}
      <AddItemButton label={addLabel} onClick={() => append(empty as never)} />
    </div>
  )
}
