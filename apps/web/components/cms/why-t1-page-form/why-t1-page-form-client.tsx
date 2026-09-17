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
  ButtonField,
  SectionAccordion,
  DeleteItemButton,
  AddItemButton,
} from "../home-page-form/shared-fields"

import { SeoFields } from "../form-shared/seo-field"
import type { WhyT1PageApiData } from "@/types/api-why-t1-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`

export function WhyT1PageFormClient({
  initialData,
}: {
  initialData: WhyT1PageApiData
}) {
  const form = useForm<WhyT1PageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, formState } = form
  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)

    try {
      const response = await fetch("/api/save-why-t1-page", {
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
      {/* ======================================================
          PAGE INFORMATION
      ====================================================== */}

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

      {/* ======================================================
          01 HERO
      ====================================================== */}

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

        <PlainField
          control={control}
          name="sections.hero.overlayOpacity"
          label="Overlay Opacity"
          type="number"
          placeholder="0.5"
        />

        <ButtonField
          control={control}
          name="sections.hero.primaryButton"
          label="Primary Button"
        />
      </SectionAccordion>

      {/* ======================================================
          02 COMPARISON
      ====================================================== */}

      <ComparisonSection control={control} />

      {/* ======================================================
          03 JOURNEY
      ====================================================== */}

      <JourneySection control={control} />

      {/* ======================================================
          04 STATS
      ====================================================== */}

      <StatsSection control={control} />

      {/* ======================================================
          05 BENEFITS
      ====================================================== */}

      <BenefitsSection control={control} />

      {/* ======================================================
          06 DESIGNER PICKS
      ====================================================== */}

      <DesignerPicksSection control={control} />

      {/* ======================================================
          07 BRANDS
      ====================================================== */}

      <BrandsSection control={control} />

      {/* ======================================================
          08 PARTNERSHIP
      ====================================================== */}

      <PartnershipSection control={control} />

      {/* ======================================================
          09 DESIGN TIPS
      ====================================================== */}

      <DesignTipsSection control={control} />

      {/* ======================================================
          10 FAQ
      ====================================================== */}

      <FaqSection control={control} />

      {/* ======================================================
          SEO
      ====================================================== */}

      <SeoFields control={control} namePrefix="seo" />

      {/* ======================================================
          SAVE
      ====================================================== */}

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

/* ==============================================================
   COMPARISON
============================================================== */

function ComparisonSection({
  control,
}: {
  control: Control<WhyT1PageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.comparison.columns",
  })

  return (
    <SectionAccordion
      title="Comparison"
      order={2}
      control={control}
      visibleName="sections.comparison.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.comparison.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.comparison.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.comparison.description"
        label="Description"
        multiline
      />

      <div className="space-y-4">
        {fields.map((field, columnIndex) => (
          <ComparisonColumn
            key={field.id}
            control={control}
            columnIndex={columnIndex}
            onRemove={() => remove(columnIndex)}
          />
        ))}
      </div>

      <AddItemButton
        label="Add Comparison Column"
        onClick={() =>
          append({
            _id: tempId(),
            title: {
              en: "",
              ar: "",
            },
            highlighted: false,
            items: [],
          })
        }
      />
    </SectionAccordion>
  )
}

/* ==============================================================
   COMPARISON COLUMN
============================================================== */

function ComparisonColumn({
  control,
  columnIndex,
  onRemove,
}: {
  control: Control<WhyT1PageApiData>
  columnIndex: number
  onRemove: () => void
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.comparison.columns.${columnIndex}.items`,
  })

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50/40 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-zinc-900">
          Comparison Column {columnIndex + 1}
        </h4>

        <DeleteItemButton onClick={onRemove} />
      </div>

      <div className="space-y-3">
        <LocalizedField
          control={control}
          name={`sections.comparison.columns.${columnIndex}.title`}
          label="Column Title"
        />

        <BoolField
          control={control}
          name={`sections.comparison.columns.${columnIndex}.highlighted`}
          label="Highlighted"
        />
      </div>

      <div className="mt-4 space-y-3">
        <Label className="text-xs font-semibold text-zinc-600">
          Comparison Items
        </Label>

        {fields.map((field, itemIndex) => (
          <div
            key={field.id}
            className="rounded-md border border-zinc-200 bg-white p-3"
          >
            <div className="flex items-start gap-2">
              <div className="flex-1 space-y-3">
                <LocalizedField
                  control={control}
                  name={`sections.comparison.columns.${columnIndex}.items.${itemIndex}.label`}
                  label="Label"
                />

                <LocalizedField
                  control={control}
                  name={`sections.comparison.columns.${columnIndex}.items.${itemIndex}.description`}
                  label="Description"
                  multiline
                />

                <BoolField
                  control={control}
                  name={`sections.comparison.columns.${columnIndex}.items.${itemIndex}.available`}
                  label="Available"
                />
              </div>

              <DeleteItemButton onClick={() => remove(itemIndex)} />
            </div>
          </div>
        ))}

        <AddItemButton
          label="Add Comparison Item"
          onClick={() =>
            append({
              _id: tempId(),
              label: {
                en: "",
                ar: "",
              },
              description: {
                en: "",
                ar: "",
              },
              available: true,
            })
          }
        />
      </div>
    </div>
  )
}

/* ==============================================================
   JOURNEY
============================================================== */

function JourneySection({ control }: { control: Control<WhyT1PageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.journey.steps",
  })

  return (
    <SectionAccordion
      title="Project Journey"
      order={3}
      control={control}
      visibleName="sections.journey.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.journey.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.journey.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.journey.description"
        label="Description"
        multiline
      />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold">
                Journey Step {index + 1}
              </h4>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>

            <div className="space-y-3">
              <PlainField
                control={control}
                name={`sections.journey.steps.${index}.icon`}
                label="Icon"
                placeholder="chat"
              />

              <LocalizedField
                control={control}
                name={`sections.journey.steps.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.journey.steps.${index}.subtitle`}
                label="Subtitle"
              />

              <LocalizedField
                control={control}
                name={`sections.journey.steps.${index}.description`}
                label="Description"
                multiline
              />

              <LocalizedField
                control={control}
                name={`sections.journey.steps.${index}.advantageTitle`}
                label="Advantage Title"
              />

              <LocalizedField
                control={control}
                name={`sections.journey.steps.${index}.advantageDescription`}
                label="Advantage Description"
                multiline
              />

              <LocalizedField
                control={control}
                name={`sections.journey.steps.${index}.highlight`}
                label="Highlight"
              />

              <BoolField
                control={control}
                name={`sections.journey.steps.${index}.isVisible`}
                label="Visible"
              />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Journey Step"
        onClick={() =>
          append({
            _id: tempId(),
            icon: "",
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
            advantageTitle: {
              en: "",
              ar: "",
            },
            advantageDescription: {
              en: "",
              ar: "",
            },
            highlight: {
              en: "",
              ar: "",
            },
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ==============================================================
   STATS
============================================================== */

function StatsSection({ control }: { control: Control<WhyT1PageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.stats.stats",
  })

  return (
    <SectionAccordion
      title="Stats"
      order={4}
      control={control}
      visibleName="sections.stats.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.stats.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.stats.heading"
        label="Heading"
      />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-4"
          >
            <div className="flex-1 space-y-3">
              <PlainField
                control={control}
                name={`sections.stats.stats.${index}.value`}
                label="Value"
                placeholder="500+"
              />

              <LocalizedField
                control={control}
                name={`sections.stats.stats.${index}.label`}
                label="Label"
              />

              <LocalizedField
                control={control}
                name={`sections.stats.stats.${index}.description`}
                label="Description"
                multiline
              />

              <BoolField
                control={control}
                name={`sections.stats.stats.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Stat"
        onClick={() =>
          append({
            _id: tempId(),
            value: "",
            label: {
              en: "",
              ar: "",
            },
            description: {
              en: "",
              ar: "",
            },
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ==============================================================
   BENEFITS
============================================================== */

function BenefitsSection({ control }: { control: Control<WhyT1PageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.benefits.items",
  })

  return (
    <SectionAccordion
      title="Benefits"
      order={5}
      control={control}
      visibleName="sections.benefits.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.benefits.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.benefits.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.benefits.description"
        label="Description"
        multiline
      />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-4"
          >
            <div className="flex-1 space-y-3">
              <PlainField
                control={control}
                name={`sections.benefits.items.${index}.icon`}
                label="Icon"
                placeholder="shield"
              />

              <LocalizedField
                control={control}
                name={`sections.benefits.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.benefits.items.${index}.description`}
                label="Description"
                multiline
              />

              <PlainField
                control={control}
                name={`sections.benefits.items.${index}.href`}
                label="Link URL"
              />

              <BoolField
                control={control}
                name={`sections.benefits.items.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Benefit"
        onClick={() =>
          append({
            _id: tempId(),
            icon: "",
            title: {
              en: "",
              ar: "",
            },
            description: {
              en: "",
              ar: "",
            },
            href: "",
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ==============================================================
   DESIGNER PICKS
============================================================== */

function DesignerPicksSection({
  control,
}: {
  control: Control<WhyT1PageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.designerPicks.items",
  })

  return (
    <SectionAccordion
      title="Designer Picks"
      order={6}
      control={control}
      visibleName="sections.designerPicks.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.designerPicks.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.designerPicks.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.designerPicks.description"
        label="Description"
        multiline
      />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="mb-3 flex justify-end">
              <DeleteItemButton onClick={() => remove(index)} />
            </div>

            <div className="space-y-3">
              <LocalizedField
                control={control}
                name={`sections.designerPicks.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.designerPicks.items.${index}.subtitle`}
                label="Subtitle"
              />

              <LocalizedField
                control={control}
                name={`sections.designerPicks.items.${index}.description`}
                label="Description"
                multiline
              />

              <LocalizedField
                control={control}
                name={`sections.designerPicks.items.${index}.category`}
                label="Category"
              />

              <ImageField
                control={control}
                name={`sections.designerPicks.items.${index}.image`}
                label="Image"
              />

              <PlainField
                control={control}
                name={`sections.designerPicks.items.${index}.href`}
                label="Link URL"
              />

              <BoolField
                control={control}
                name={`sections.designerPicks.items.${index}.isVisible`}
                label="Visible"
              />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Designer Pick"
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
            category: {
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
          })
        }
      />

      <div className="grid grid-cols-2 gap-3">
        <BoolField
          control={control}
          name="sections.designerPicks.autoplay"
          label="Autoplay"
        />

        <BoolField
          control={control}
          name="sections.designerPicks.showNavigation"
          label="Show Navigation"
        />
      </div>

      <ButtonField
        control={control}
        name="sections.designerPicks.button"
        label="Section Button"
      />
    </SectionAccordion>
  )
}

/* ==============================================================
   BRANDS
============================================================== */

function BrandsSection({ control }: { control: Control<WhyT1PageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.brands.brands",
  })

  return (
    <SectionAccordion
      title="Trusted Brands"
      order={7}
      control={control}
      visibleName="sections.brands.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.brands.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.brands.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.brands.description"
        label="Description"
        multiline
      />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-4"
          >
            <div className="flex-1 space-y-3">
              <PlainField
                control={control}
                name={`sections.brands.brands.${index}.name`}
                label="Brand Name"
              />

              <ImageField
                control={control}
                name={`sections.brands.brands.${index}.logo`}
                label="Brand Logo"
              />

              <PlainField
                control={control}
                name={`sections.brands.brands.${index}.href`}
                label="Brand URL"
                placeholder="https://..."
              />

              <BoolField
                control={control}
                name={`sections.brands.brands.${index}.openInNewTab`}
                label="Open in New Tab"
              />

              <BoolField
                control={control}
                name={`sections.brands.brands.${index}.isVisible`}
                label="Visible"
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Brand"
        onClick={() =>
          append({
            _id: tempId(),
            name: "",
            logo: {
              url: "",
              key: "",
              alt: {
                en: "",
                ar: "",
              },
            },
            href: "",
            openInNewTab: true,
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ==============================================================
   PARTNERSHIP
============================================================== */

function PartnershipSection({
  control,
}: {
  control: Control<WhyT1PageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.partnership.steps",
  })

  return (
    <SectionAccordion
      title="Referral Partnership"
      order={8}
      control={control}
      visibleName="sections.partnership.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.partnership.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.partnership.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.partnership.description"
        label="Description"
        multiline
      />

      <ImageField
        control={control}
        name="sections.partnership.image"
        label="Partnership Image"
      />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-4"
          >
            <div className="flex-1 space-y-3">
              <PlainField
                control={control}
                name={`sections.partnership.steps.${index}.icon`}
                label="Icon"
                placeholder="handshake"
              />

              <LocalizedField
                control={control}
                name={`sections.partnership.steps.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.partnership.steps.${index}.description`}
                label="Description"
                multiline
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Partnership Item"
        onClick={() =>
          append({
            _id: tempId(),
            icon: "",
            title: {
              en: "",
              ar: "",
            },
            description: {
              en: "",
              ar: "",
            },
          })
        }
      />

      <ButtonField
        control={control}
        name="sections.partnership.button"
        label="Partnership Button"
      />
    </SectionAccordion>
  )
}

/* ==============================================================
   DESIGN TIPS
============================================================== */

function DesignTipsSection({
  control,
}: {
  control: Control<WhyT1PageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.designTips.articles",
  })

  return (
    <SectionAccordion
      title="Design Tips"
      order={9}
      control={control}
      visibleName="sections.designTips.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.designTips.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.designTips.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.designTips.description"
        label="Description"
        multiline
      />

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-4"
          >
            <div className="flex-1 space-y-3">
              <PlainField
                control={control}
                name={`sections.designTips.articles.${index}.slug`}
                label="Slug"
              />

              <LocalizedField
                control={control}
                name={`sections.designTips.articles.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.designTips.articles.${index}.category`}
                label="Category"
              />

              <LocalizedField
                control={control}
                name={`sections.designTips.articles.${index}.description`}
                label="Description"
                multiline
              />

              <LocalizedField
                control={control}
                name={`sections.designTips.articles.${index}.readTime`}
                label="Read Time"
              />

              <ImageField
                control={control}
                name={`sections.designTips.articles.${index}.image`}
                label="Image"
              />

              <PlainField
                control={control}
                name={`sections.designTips.articles.${index}.href`}
                label="Article URL"
              />

              <BoolField
                control={control}
                name={`sections.designTips.articles.${index}.isVisible`}
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
            readTime: {
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
          })
        }
      />

      <ButtonField
        control={control}
        name="sections.designTips.button"
        label="Design Tips Button"
      />
    </SectionAccordion>
  )
}

/* ==============================================================
   FAQ
============================================================== */

function FaqSection({ control }: { control: Control<WhyT1PageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.faq.faqs",
  })

  return (
    <SectionAccordion
      title="FAQ"
      order={10}
      control={control}
      visibleName="sections.faq.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.faq.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.faq.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.faq.description"
        label="Description"
        multiline
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
                name={`sections.faq.faqs.${index}.question`}
                label="Question"
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
          append({
            _id: tempId(),
            question: {
              en: "",
              ar: "",
            },
            answer: {
              en: "",
              ar: "",
            },
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}
