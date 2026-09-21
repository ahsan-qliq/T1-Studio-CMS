"use client"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"

import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
} from "react-hook-form"

import { useState } from "react"

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

import type { TradePageApiData } from "@/types/api-trade-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`

export function TradePageFormClient({
  initialData,
}: {
  initialData: TradePageApiData
}) {
  const form = useForm<TradePageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, formState, reset } = form

  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)

    try {
      const response = await fetch("/api/save-trade-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }
      // Re-fetch the freshly saved page so the form reflects exactly what
      // the backend now has (e.g. CDN URLs the backend fills in from the
      // uploaded image's S3 key).
      try {
        const fresh = await fetch("/api/save-trade-page")
        if (fresh.ok) {
          reset((await fresh.json()) as TradePageApiData)
        }
      } catch (error) {
        console.error("Failed to refresh Trade page after save:", error)
      }
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      {/* PAGE SETTINGS */}

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

      {/* HERO */}

      <HeroSection control={control} />

      {/* ARRAY SECTIONS */}

      <LogosSection control={control} />

      <WhoWeWorkWithSection control={control} />

      <JourneySection control={control} />

      <StatsSection control={control} />

      <ProjectsSection control={control} />

      <BenefitsSection control={control} />

      <PartnershipServicesSection control={control} />

      <IndustryServicesSection control={control} />

      <ResourcesSection control={control} />

      {/* SUPPLIER CTA */}

      <SupplierCTASection control={control} />

      {/* DESIGN TIPS */}

      <DesignTipsSection control={control} />

      {/* REFERRAL */}

      <ReferralSection control={control} />

      {/* CONSULTATION */}

      <ConsultationSection control={control} />

      {/* FAQ */}

      <FaqSection control={control} />

      {/* SEO */}

      <SeoFields control={control} namePrefix="seo" />

      {/* SAVE */}

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

/* ============================================================
   HERO
============================================================ */

function HeroSection({ control }: { control: Control<TradePageApiData> }) {
  return (
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

      <PlainField
        control={control}
        name="sections.hero.overlayOpacity"
        label="Overlay Opacity"
        type="number"
      />

      <ButtonField
        control={control}
        name="sections.hero.primaryButton"
        label="Primary Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   LOGOS
============================================================ */

function LogosSection({ control }: { control: Control<TradePageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.logos.items",
  })

  return (
    <SectionAccordion
      title="Partner / Brand Logos"
      order={2}
      control={control}
      visibleName="sections.logos.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.logos.items.${index}.name`}
                    label="Partner Name"
                  />

                  <PlainField
                    control={control}
                    name={`sections.logos.items.${index}.href`}
                    label="Website URL"
                  />
                </div>

                <ImageField
                  control={control}
                  name={`sections.logos.items.${index}.logo`}
                  label="Logo"
                />

                <BoolField
                  control={control}
                  name={`sections.logos.items.${index}.openInNewTab`}
                  label="Open in New Tab"
                />

                <BoolField
                  control={control}
                  name={`sections.logos.items.${index}.isVisible`}
                  label="Visible"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Partner Logo"
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

/* ============================================================
   WHO WE WORK WITH
============================================================ */

function WhoWeWorkWithSection({
  control,
}: {
  control: Control<TradePageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.whoWeWorkWith.items",
  })

  return (
    <SectionAccordion
      title="Who We Work With"
      order={3}
      control={control}
      visibleName="sections.whoWeWorkWith.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.whoWeWorkWith.items.${index}.key`}
                    label="Key"
                    placeholder="developer"
                  />

                  <PlainField
                    control={control}
                    name={`sections.whoWeWorkWith.items.${index}.href`}
                    label="Link URL"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.whoWeWorkWith.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.whoWeWorkWith.items.${index}.description`}
                  label="Description"
                  multiline
                />

                <ImageField
                  control={control}
                  name={`sections.whoWeWorkWith.items.${index}.image`}
                  label="Image"
                />

                <BoolField
                  control={control}
                  name={`sections.whoWeWorkWith.items.${index}.isVisible`}
                  label="Visible"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Audience"
        onClick={() =>
          append({
            _id: tempId(),
            key: "",
            title: {
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
    </SectionAccordion>
  )
}

/* ============================================================
   JOURNEY
============================================================ */

function JourneySection({ control }: { control: Control<TradePageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.journey.items",
  })

  return (
    <SectionAccordion
      title="Trade Journey / Process"
      order={4}
      control={control}
      visibleName="sections.journey.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.journey.items.${index}.icon`}
                    label="Icon"
                    placeholder="handshake"
                  />

                  <PlainField
                    control={control}
                    name={`sections.journey.items.${index}.number`}
                    label="Number"
                    placeholder="01"
                  />

                  <BoolField
                    control={control}
                    name={`sections.journey.items.${index}.isVisible`}
                    label="Visible"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.journey.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.journey.items.${index}.subtitle`}
                  label="Subtitle"
                />

                <LocalizedField
                  control={control}
                  name={`sections.journey.items.${index}.description`}
                  label="Description"
                  multiline
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
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
            number: "",
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
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   STATS
============================================================ */

function StatsSection({ control }: { control: Control<TradePageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.stats.items",
  })

  return (
    <SectionAccordion
      title="Stats"
      order={5}
      control={control}
      visibleName="sections.stats.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.stats.items.${index}.value`}
                    label="Value"
                    placeholder="200+"
                  />

                  <BoolField
                    control={control}
                    name={`sections.stats.items.${index}.isVisible`}
                    label="Visible"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.stats.items.${index}.label`}
                  label="Label"
                />

                <LocalizedField
                  control={control}
                  name={`sections.stats.items.${index}.description`}
                  label="Description"
                  multiline
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Statistic"
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

/* ============================================================
   PROJECTS
============================================================ */

function ProjectsSection({ control }: { control: Control<TradePageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.projects.items",
  })

  return (
    <SectionAccordion
      title="Featured / Commercial Projects"
      order={6}
      control={control}
      visibleName="sections.projects.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.projects.items.${index}.projectSlug`}
                    label="Project Slug"
                  />

                  <PlainField
                    control={control}
                    name={`sections.projects.items.${index}.category`}
                    label="Category"
                  />

                  <BoolField
                    control={control}
                    name={`sections.projects.items.${index}.isVisible`}
                    label="Visible"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.projects.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.projects.items.${index}.location`}
                  label="Location"
                />

                <LocalizedField
                  control={control}
                  name={`sections.projects.items.${index}.description`}
                  label="Description"
                  multiline
                />

                <ImageField
                  control={control}
                  name={`sections.projects.items.${index}.image`}
                  label="Project Image"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Project"
        onClick={() =>
          append({
            _id: tempId(),
            projectSlug: "",
            title: {
              en: "",
              ar: "",
            },
            location: {
              en: "",
              ar: "",
            },
            category: "",
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
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   BENEFITS
============================================================ */

function BenefitsSection({ control }: { control: Control<TradePageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.benefits.items",
  })

  return (
    <SectionAccordion
      title="Why Partner With T1"
      order={7}
      control={control}
      visibleName="sections.benefits.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.benefits.items.${index}.icon`}
                    label="Icon"
                    placeholder="percent"
                  />

                  <BoolField
                    control={control}
                    name={`sections.benefits.items.${index}.isVisible`}
                    label="Visible"
                  />
                </div>

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
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
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
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   PARTNERSHIP SERVICES
============================================================ */

function PartnershipServicesSection({
  control,
}: {
  control: Control<TradePageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.partnershipServices.items",
  })

  return (
    <SectionAccordion
      title="Partnership Services"
      order={8}
      control={control}
      visibleName="sections.partnershipServices.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.partnershipServices.items.${index}.icon`}
                    label="Icon"
                  />

                  <PlainField
                    control={control}
                    name={`sections.partnershipServices.items.${index}.href`}
                    label="Link URL"
                  />

                  <BoolField
                    control={control}
                    name={`sections.partnershipServices.items.${index}.isVisible`}
                    label="Visible"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.partnershipServices.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.partnershipServices.items.${index}.description`}
                  label="Description"
                  multiline
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Partnership Service"
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

/* ============================================================
   INDUSTRY SERVICES
============================================================ */

function IndustryServicesSection({
  control,
}: {
  control: Control<TradePageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.industryServices.items",
  })

  return (
    <SectionAccordion
      title="Industry / Trade Services"
      order={9}
      control={control}
      visibleName="sections.industryServices.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.industryServices.items.${index}.icon`}
                    label="Icon"
                  />

                  <PlainField
                    control={control}
                    name={`sections.industryServices.items.${index}.href`}
                    label="Link URL"
                  />

                  <BoolField
                    control={control}
                    name={`sections.industryServices.items.${index}.isVisible`}
                    label="Visible"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.industryServices.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.industryServices.items.${index}.description`}
                  label="Description"
                  multiline
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Industry Service"
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

/* ============================================================
   RESOURCES
============================================================ */

function ResourcesSection({ control }: { control: Control<TradePageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.resources.items",
  })

  return (
    <SectionAccordion
      title="Resource Center"
      order={10}
      control={control}
      visibleName="sections.resources.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.resources.items.${index}.type`}
                    label="Type"
                    placeholder="brochure"
                  />

                  <PlainField
                    control={control}
                    name={`sections.resources.items.${index}.icon`}
                    label="Icon"
                    placeholder="file"
                  />

                  <BoolField
                    control={control}
                    name={`sections.resources.items.${index}.isVisible`}
                    label="Visible"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.resources.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.resources.items.${index}.description`}
                  label="Description"
                  multiline
                />

                <PlainField
                  control={control}
                  name={`sections.resources.items.${index}.fileUrl`}
                  label="File URL"
                />

                <LocalizedField
                  control={control}
                  name={`sections.resources.items.${index}.buttonLabel`}
                  label="Button Label"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Resource"
        onClick={() =>
          append({
            _id: tempId(),
            type: "brochure",
            icon: "file",
            title: {
              en: "",
              ar: "",
            },
            description: {
              en: "",
              ar: "",
            },
            fileUrl: "",
            buttonLabel: {
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

/* ============================================================
   SUPPLIER CTA
============================================================ */

function SupplierCTASection({
  control,
}: {
  control: Control<TradePageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.supplierCTA.benefits",
  })

  return (
    <SectionAccordion
      title="Preferred Supplier CTA"
      order={11}
      control={control}
      visibleName="sections.supplierCTA.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.supplierCTA.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.supplierCTA.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.supplierCTA.description"
        label="Description"
        multiline
      />

      <ImageField
        control={control}
        name="sections.supplierCTA.image"
        label="Image"
      />

      <ButtonField
        control={control}
        name="sections.supplierCTA.button"
        label="Button"
      />

      <div className="space-y-3">
        <Label>Benefits</Label>

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <div className="flex-1">
              <LocalizedField
                control={control}
                name={`sections.supplierCTA.benefits.${index}`}
                label={`Benefit ${index + 1}`}
              />
            </div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Supplier Benefit"
        onClick={() =>
          append({
            en: "",
            ar: "",
          })
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   DESIGN TIPS
============================================================ */

function DesignTipsSection({
  control,
}: {
  control: Control<TradePageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.designTips.items",
  })

  return (
    <SectionAccordion
      title="Design Tips & Insights"
      order={12}
      control={control}
      visibleName="sections.designTips.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
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
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Design Tip"
        onClick={() =>
          append({
            _id: tempId(),
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
          })
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   REFERRAL
============================================================ */

function ReferralSection({ control }: { control: Control<TradePageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.referral.items",
  })

  return (
    <SectionAccordion
      title="Referral Partnership"
      order={13}
      control={control}
      visibleName="sections.referral.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.referral.items.${index}.icon`}
                    label="Icon"
                    placeholder="gift"
                  />

                  <BoolField
                    control={control}
                    name={`sections.referral.items.${index}.isVisible`}
                    label="Visible"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.referral.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.referral.items.${index}.description`}
                  label="Description"
                  multiline
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Referral Item"
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
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   CONSULTATION
============================================================ */

function ConsultationSection({
  control,
}: {
  control: Control<TradePageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.consultation.formFields",
  })

  return (
    <SectionAccordion
      title="Consultation / Lead Form"
      order={14}
      control={control}
      visibleName="sections.consultation.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.consultation.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.consultation.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.consultation.description"
        label="Description"
        multiline
      />

      <div className="space-y-3">
        <Label>Form Fields</Label>

        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.consultation.formFields.${index}.name`}
                    label="Field Name"
                    placeholder="name"
                  />

                  <PlainField
                    control={control}
                    name={`sections.consultation.formFields.${index}.type`}
                    label="Type"
                    placeholder="text"
                  />

                  <BoolField
                    control={control}
                    name={`sections.consultation.formFields.${index}.required`}
                    label="Required"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.consultation.formFields.${index}.label`}
                  label="Label"
                />

                <BoolField
                  control={control}
                  name={`sections.consultation.formFields.${index}.isVisible`}
                  label="Visible"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Form Field"
        onClick={() =>
          append({
            _id: tempId(),
            name: "",
            type: "text",
            label: {
              en: "",
              ar: "",
            },
            required: false,
            isVisible: true,
          })
        }
      />

      <LocalizedField
        control={control}
        name="sections.consultation.submitButtonLabel"
        label="Submit Button Label"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   FAQ
============================================================ */

function FaqSection({ control }: { control: Control<TradePageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.faq.items",
  })

  return (
    <SectionAccordion
      title="FAQ"
      order={15}
      control={control}
      visibleName="sections.faq.isVisible"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <LocalizedField
                  control={control}
                  name={`sections.faq.items.${index}.question`}
                  label="Question"
                />

                <LocalizedField
                  control={control}
                  name={`sections.faq.items.${index}.answer`}
                  label="Answer"
                  multiline
                />

                <BoolField
                  control={control}
                  name={`sections.faq.items.${index}.isVisible`}
                  label="Visible"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
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
