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
  const { control, handleSubmit, formState } = form
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
        {name !== "journey" &&
          name !== "philosophy" &&
          name !== "values" &&
          name !== "stats" &&
          name !== "team" &&
          name !== "showcase" &&
          name !== "brands" &&
          name !== "partnership" &&
          name !== "faq" && (
            <LocalizedField
              control={control}
              name={`sections.${name}.heading`}
              label="Heading"
            />
          )}
        {name !== "journey" &&
          name !== "philosophy" &&
          name !== "values" &&
          name !== "stats" &&
          name !== "team" &&
          name !== "showcase" &&
          name !== "brands" &&
          name !== "partnership" &&
          name !== "faq" && (
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
          />
        )}
        {name === "philosophy" && (
          <AboutArray
            control={control}
            path="sections.philosophy.items"
            kind="philosophy"
            label="Philosophy Items"
          />
        )}
        {name === "values" && (
          <AboutArray
            control={control}
            path="sections.values.items"
            kind="values"
            label="Values Items"
          />
        )}
        {name === "stats" && (
          <AboutArray
            control={control}
            path="sections.stats.items"
            kind="stats"
            label="Stats Items"
          />
        )}
        {name === "team" && (
          <>
            <AboutArray
              control={control}
              path="sections.team.items"
              kind="team"
              label="Team Items"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Controller
                control={control}
                name="sections.team.autoplay"
                render={({ field }) => (
                  <label className="flex gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!field.value}
                      onChange={field.onChange}
                    />{" "}
                    Autoplay
                  </label>
                )}
              />
              <Controller
                control={control}
                name="sections.team.showNavigation"
                render={({ field }) => (
                  <label className="flex gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!field.value}
                      onChange={field.onChange}
                    />{" "}
                    Show navigation
                  </label>
                )}
              />
            </div>
          </>
        )}
        {name === "showcase" && (
          <AboutArray
            control={control}
            path="sections.showcase.items"
            kind="showcase"
            label="Showcase Items"
          />
        )}
        {name === "brands" && (
          <AboutArray
            control={control}
            path="sections.brands.items"
            kind="brands"
            label="Brand Items"
          />
        )}
        {name === "partnership" && (
          <AboutArray
            control={control}
            path="sections.partnership.items"
            kind="partnership"
            label="Partnership Items"
          />
        )}
        {name === "faq" && (
          <AboutArray
            control={control}
            path="sections.faq.items"
            kind="faq"
            label="FAQ Items"
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
}: {
  control: Control<AboutPageApiData>
  path: string
  kind: AboutArrayKind
  label: string
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
    philosophy: { icon: "", title: localized, description: localized },
    values: { title: localized, description: localized, image },
    stats: { value: "", label: localized, description: localized },
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
      <AddItemButton
        label={`Add ${label.replace(/ Items$/, "").replace(/s$/, "")}`}
        onClick={() => append(empty as never)}
      />
    </div>
  )
}
