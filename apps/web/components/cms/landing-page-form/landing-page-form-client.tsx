"use client"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"

import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
  type FieldPath,
} from "react-hook-form"

import { useState } from "react"

import {
  LocalizedField,
  PlainField,
  BoolField,
  ButtonField,
  ImageField,
  SectionAccordion,
  DeleteItemButton,
  AddItemButton,
} from "../home-page-form/shared-fields"

import { SeoFields } from "../form-shared/seo-field"

import type { LandingPageApiData } from "@/types/api-landing-page"

/* =========================================================
   MAIN FORM
========================================================= */

export function LandingPageFormClient({
  initialData,
}: {
  initialData: LandingPageApiData
}) {
  const form = useForm<LandingPageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, formState } = form

  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)

    try {
      const response = await fetch("/api/save-landing-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }
    } catch (error) {
      console.error("Failed to save landing page:", error)
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="w-full space-y-4 pb-24">
      {/* =====================================================
          PAGE SETTINGS
      ===================================================== */}

      <div className="grid w-full grid-cols-1 gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-3">
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
                className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"
              >
                <option value="draft">draft</option>

                <option value="published">published</option>
              </select>
            </div>
          )}
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <HeroSection control={control} />

      {/* =====================================================
          STATS
      ===================================================== */}

      <StatsSection control={control} />

      {/* =====================================================
          INTRO
      ===================================================== */}

      <IntroSection control={control} />

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <ProjectsSection control={control} />

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <ProcessSection control={control} />

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <BenefitsSection control={control} />

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <TestimonialsSection control={control} />

      {/* =====================================================
          FAQ
      ===================================================== */}

      <FaqSection control={control} />

      {/* =====================================================
          CONSULTATION
      ===================================================== */}

      <ConsultationSection control={control} />

      {/* =====================================================
          SEO
      ===================================================== */}

      <SeoFields control={control} namePrefix="seo" />

      {/* =====================================================
          SAVE
      ===================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-30 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
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

/* =========================================================
   HERO
========================================================= */

function HeroSection({ control }: { control: Control<LandingPageApiData> }) {
  const fields = useFieldArray({
    control,
    name: "sections.hero.form.fields",
  })

  return (
    <SectionAccordion
      title="Hero"
      order={1}
      control={control}
      visibleName="__landingHeroVisible"
      defaultOpen
    >
      <div className="w-full space-y-5">
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

        {/* HERO FORM */}

        <div className="w-full border-t border-zinc-200 pt-5">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-zinc-900">
              Hero Lead Form
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Configure the consultation form displayed inside the hero.
            </p>
          </div>

          <div className="space-y-4">
            <LocalizedField
              control={control}
              name="sections.hero.form.heading"
              label="Form Heading"
            />

            <LocalizedField
              control={control}
              name="sections.hero.form.description"
              label="Form Description"
              multiline
            />

            {/* FORM FIELDS */}

            <RepeaterBox
              title="Hero Form Fields"
              description="Add the fields visitors complete before submitting."
              onAdd={() =>
                fields.append({
                  name: "",
                  type: "text",
                  label: {
                    en: "",
                    ar: "",
                  },
                  required: false,
                })
              }
            >
              {fields.fields.map((field, index) => (
                <FormFieldItem
                  key={field.id}
                  control={control}
                  name={`sections.hero.form.fields.${index}`}
                  index={index}
                  onDelete={() => fields.remove(index)}
                />
              ))}
            </RepeaterBox>

            <LocalizedField
              control={control}
              name="sections.hero.form.submitButtonLabel"
              label="Submit Button Label"
            />

            <LocalizedField
              control={control}
              name="sections.hero.form.successMessage"
              label="Success Message"
              multiline
            />
          </div>
        </div>
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   STATS
========================================================= */

function StatsSection({ control }: { control: Control<LandingPageApiData> }) {
  const items = useFieldArray({
    control,
    name: "sections.stats.items",
  })

  return (
    <SectionAccordion
      title="Stats"
      order={2}
      control={control}
      visibleName="__landingStatsVisible"
    >
      <RepeaterBox
        title="Statistics"
        description="Add project and performance statistics."
        onAdd={() =>
          items.append({
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
      >
        {items.fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
          >
            <ItemHeader
              title={`Statistic ${index + 1}`}
              onDelete={() => items.remove(index)}
            />

            <div className="mt-5 space-y-4">
              <PlainField
                control={control}
                name={`sections.stats.items.${index}.value`}
                label="Value"
                placeholder="500+"
              />

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

              <BoolField
                control={control}
                name={`sections.stats.items.${index}.isVisible`}
                label="Visible"
              />
            </div>
          </div>
        ))}
      </RepeaterBox>
    </SectionAccordion>
  )
}

/* =========================================================
   INTRO
========================================================= */

function IntroSection({ control }: { control: Control<LandingPageApiData> }) {
  return (
    <SectionAccordion
      title="Introduction"
      order={3}
      control={control}
      visibleName="__landingIntroVisible"
    >
      <div className="w-full space-y-5">
        <LocalizedField
          control={control}
          name="sections.intro.eyebrow"
          label="Eyebrow"
        />

        <LocalizedField
          control={control}
          name="sections.intro.heading"
          label="Heading"
          multiline
        />

        <LocalizedField
          control={control}
          name="sections.intro.description"
          label="Description"
          multiline
        />

        <LocalizedField
          control={control}
          name="sections.intro.secondaryDescription"
          label="Secondary Description"
          multiline
        />

        <ImageField
          control={control}
          name="sections.intro.image"
          label="Image"
        />

        <PlainField
          control={control}
          name="sections.intro.imagePosition"
          label="Image Position"
          placeholder="right"
        />

        <ButtonField
          control={control}
          name="sections.intro.button"
          label="Button"
        />
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   PROJECTS
========================================================= */

function ProjectsSection({
  control,
}: {
  control: Control<LandingPageApiData>
}) {
  const items = useFieldArray({
    control,
    name: "sections.projects.items",
  })

  return (
    <SectionAccordion
      title="Projects"
      order={4}
      control={control}
      visibleName="__landingProjectsVisible"
    >
      <RepeaterBox
        title="Projects"
        description="Add projects to showcase on the landing page."
        onAdd={() =>
          items.append({
            projectSlug: "",
            title: {
              en: "",
              ar: "",
            },
            location: {
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
            position: "left",
          })
        }
      >
        {items.fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
          >
            <ItemHeader
              title={`Project ${index + 1}`}
              onDelete={() => items.remove(index)}
            />

            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <PlainField
                  control={control}
                  name={`sections.projects.items.${index}.projectSlug`}
                  label="Project Slug"
                />

                <PlainField
                  control={control}
                  name={`sections.projects.items.${index}.href`}
                  label="Project URL"
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

              <PlainField
                control={control}
                name={`sections.projects.items.${index}.position`}
                label="Position"
                placeholder="left"
              />
            </div>
          </div>
        ))}
      </RepeaterBox>
    </SectionAccordion>
  )
}

/* =========================================================
   PROCESS
========================================================= */

function ProcessSection({ control }: { control: Control<LandingPageApiData> }) {
  const items = useFieldArray({
    control,
    name: "sections.process.items",
  })

  return (
    <SectionAccordion
      title="Process"
      order={5}
      control={control}
      visibleName="__landingProcessVisible"
    >
      <RepeaterBox
        title="Process Steps"
        description="Add the steps visitors go through from consultation to completion."
        onAdd={() =>
          items.append({
            number: "",
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
      >
        {items.fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
          >
            <ItemHeader
              title={`Process Step ${index + 1}`}
              onDelete={() => items.remove(index)}
            />

            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <PlainField
                  control={control}
                  name={`sections.process.items.${index}.number`}
                  label="Number"
                  placeholder="01"
                />

                <PlainField
                  control={control}
                  name={`sections.process.items.${index}.icon`}
                  label="Icon"
                  placeholder="chat"
                />
              </div>

              <LocalizedField
                control={control}
                name={`sections.process.items.${index}.title`}
                label="Title"
              />

              <LocalizedField
                control={control}
                name={`sections.process.items.${index}.description`}
                label="Description"
                multiline
              />
            </div>
          </div>
        ))}
      </RepeaterBox>
    </SectionAccordion>
  )
}

/* =========================================================
   BENEFITS
========================================================= */

function BenefitsSection({
  control,
}: {
  control: Control<LandingPageApiData>
}) {
  const items = useFieldArray({
    control,
    name: "sections.benefits.items",
  })

  return (
    <SectionAccordion
      title="Benefits"
      order={6}
      control={control}
      visibleName="__landingBenefitsVisible"
    >
      <RepeaterBox
        title="Benefits"
        description="Add the key reasons customers should choose T1 Studio."
        onAdd={() =>
          items.append({
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
      >
        {items.fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
          >
            <ItemHeader
              title={`Benefit ${index + 1}`}
              onDelete={() => items.remove(index)}
            />

            <div className="mt-5 space-y-4">
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
            </div>
          </div>
        ))}
      </RepeaterBox>
    </SectionAccordion>
  )
}

/* =========================================================
   TESTIMONIALS
========================================================= */

function TestimonialsSection({
  control,
}: {
  control: Control<LandingPageApiData>
}) {
  const items = useFieldArray({
    control,
    name: "sections.testimonials.items",
  })

  return (
    <SectionAccordion
      title="Testimonials"
      order={7}
      control={control}
      visibleName="__landingTestimonialsVisible"
    >
      <div className="w-full space-y-5">
        <RepeaterBox
          title="Testimonials"
          description="Add customer testimonials."
          onAdd={() =>
            items.append({
              clientName: {
                en: "",
                ar: "",
              },
              designation: {
                en: "",
                ar: "",
              },
              testimonial: {
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
            })
          }
        >
          {items.fields.map((field, index) => (
            <div
              key={field.id}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
            >
              <ItemHeader
                title={`Testimonial ${index + 1}`}
                onDelete={() => items.remove(index)}
              />

              <div className="mt-5 space-y-4">
                <LocalizedField
                  control={control}
                  name={`sections.testimonials.items.${index}.clientName`}
                  label="Client Name"
                />

                <LocalizedField
                  control={control}
                  name={`sections.testimonials.items.${index}.designation`}
                  label="Designation"
                />

                <LocalizedField
                  control={control}
                  name={`sections.testimonials.items.${index}.testimonial`}
                  label="Testimonial"
                  multiline
                />

                <ImageField
                  control={control}
                  name={`sections.testimonials.items.${index}.image`}
                  label="Client Image"
                />
              </div>
            </div>
          ))}
        </RepeaterBox>

        <div className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="space-y-4">
            <BoolField
              control={control}
              name="sections.testimonials.autoplay"
              label="Autoplay"
            />

            <BoolField
              control={control}
              name="sections.testimonials.showNavigation"
              label="Show Navigation"
            />
          </div>
        </div>
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   FAQ
========================================================= */

function FaqSection({ control }: { control: Control<LandingPageApiData> }) {
  const items = useFieldArray({
    control,
    name: "sections.faq.items",
  })

  return (
    <SectionAccordion
      title="FAQ"
      order={8}
      control={control}
      visibleName="__landingFaqVisible"
    >
      <RepeaterBox
        title="Frequently Asked Questions"
        description="Add questions and answers for the landing page."
        onAdd={() =>
          items.append({
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
      >
        {items.fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
          >
            <ItemHeader
              title={`FAQ ${index + 1}`}
              onDelete={() => items.remove(index)}
            />

            <div className="mt-5 space-y-4">
              <LocalizedField
                control={control}
                name={`sections.faq.items.${index}.question`}
                label="Question"
                multiline
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
          </div>
        ))}
      </RepeaterBox>
    </SectionAccordion>
  )
}

/* =========================================================
   CONSULTATION
========================================================= */

function ConsultationSection({
  control,
}: {
  control: Control<LandingPageApiData>
}) {
  const fields = useFieldArray({
    control,
    name: "sections.consultation.formFields",
  })

  return (
    <SectionAccordion
      title="Consultation"
      order={9}
      control={control}
      visibleName="__landingConsultationVisible"
    >
      <div className="w-full space-y-5">
        <LocalizedField
          control={control}
          name="sections.consultation.eyebrow"
          label="Eyebrow"
        />

        <LocalizedField
          control={control}
          name="sections.consultation.heading"
          label="Heading"
          multiline
        />

        <LocalizedField
          control={control}
          name="sections.consultation.description"
          label="Description"
          multiline
        />

        <RepeaterBox
          title="Consultation Form Fields"
          description="Add fields for the bottom consultation form."
          onAdd={() =>
            fields.append({
              name: "",
              type: "text",
              label: {
                en: "",
                ar: "",
              },
              required: false,
            })
          }
        >
          {fields.fields.map((field, index) => (
            <FormFieldItem
              key={field.id}
              control={control}
              name={`sections.consultation.formFields.${index}`}
              index={index}
              onDelete={() => fields.remove(index)}
            />
          ))}
        </RepeaterBox>

        <LocalizedField
          control={control}
          name="sections.consultation.submitButtonLabel"
          label="Submit Button Label"
        />

        <LocalizedField
          control={control}
          name="sections.consultation.successMessage"
          label="Success Message"
          multiline
        />
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   FORM FIELD ITEM
========================================================= */

function FormFieldItem({
  control,
  name,
  index,
  onDelete,
}: {
  control: Control<LandingPageApiData>
  name: string
  index: number
  onDelete: () => void
}) {
  return (
    <div className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5">
      <ItemHeader title={`Form Field ${index + 1}`} onDelete={onDelete} />

      <div className="mt-5 space-y-4">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <PlainField
            control={control}
            name={`${name}.name`}
            label="Name"
            placeholder="name"
          />

          <Controller
            control={control}
            name={`${name}.type` as FieldPath<LandingPageApiData>}
            render={({ field }) => (
              <div className="space-y-1.5">
                <Label>Type</Label>

                <select
                  {...field}
                  value={field.value as string}
                  className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"
                >
                  <option value="text">Text</option>

                  <option value="email">Email</option>

                  <option value="tel">Telephone</option>

                  <option value="textarea">Textarea</option>

                  <option value="number">Number</option>

                  <option value="select">Select</option>
                </select>
              </div>
            )}
          />
        </div>

        <LocalizedField
          control={control}
          name={`${name}.label`}
          label="Label"
        />

        <LocalizedField
          control={control}
          name={`${name}.placeholder`}
          label="Placeholder"
        />

        <BoolField
          control={control}
          name={`${name}.required`}
          label="Required"
        />
      </div>
    </div>
  )
}

/* =========================================================
   REPEATER BOX
========================================================= */

function RepeaterBox({
  title,
  description,
  onAdd,
  children,
}: {
  title: string
  description?: string
  onAdd: () => void
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* HEADER */}

      <div className="flex w-full min-w-0 items-start justify-between gap-6 border-b border-zinc-200 pb-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base leading-6 font-semibold text-zinc-900">
            {title}
          </h3>

          {description && (
            <p className="mt-1 text-sm leading-5 text-zinc-500">
              {description}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <AddItemButton label="Add" onClick={onAdd} />
        </div>
      </div>

      {/* ITEMS */}

      <div className="w-full space-y-4">{children}</div>
    </div>
  )
}

/* =========================================================
   ITEM HEADER
========================================================= */

function ItemHeader({
  title,
  onDelete,
}: {
  title: string
  onDelete: () => void
}) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>

      <div className="shrink-0">
        <DeleteItemButton onClick={onDelete} />
      </div>
    </div>
  )
}
