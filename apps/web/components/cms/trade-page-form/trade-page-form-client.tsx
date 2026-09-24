"use client"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"

import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
} from "react-hook-form"

import { useState, type ReactNode } from "react"

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

type FormControl = Control<TradePageApiData>

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`
const l = () => ({ en: "", ar: "" })
const img = () => ({ url: "", key: "", alt: l() })

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

      <HeroSection control={control} />
      <LogosSection control={control} />
      <WhoWeWorkWithSection control={control} />
      <JourneySection control={control} />
      <StatsSection control={control} />
      <ProjectsSection control={control} />
      <BenefitsSection control={control} />
      <PartnershipServicesSection control={control} />
      <IndustryServicesSection control={control} />
      <ResourcesSection control={control} />
      <SupplierCTASection control={control} />
      <DesignTipsSection control={control} />
      <ReferralSection control={control} />
      <ConsultationSection control={control} />
      <FaqSection control={control} />

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

/* ============================================================
   SHARED HELPERS
============================================================ */

/** Eyebrow / heading / description block used at the top of most sections. */
function Head({
  control,
  section,
  eyebrow = true,
  description = true,
}: {
  control: FormControl
  section: string
  eyebrow?: boolean
  description?: boolean
}) {
  return (
    <>
      {eyebrow && (
        <LocalizedField
          control={control}
          name={`sections.${section}.eyebrow`}
          label="Eyebrow"
        />
      )}
      <LocalizedField
        control={control}
        name={`sections.${section}.heading`}
        label="Heading"
      />
      {description && (
        <LocalizedField
          control={control}
          name={`sections.${section}.description`}
          label="Description"
          multiline
        />
      )}
    </>
  )
}

/** Generic repeatable list bound to a field-array path. */
function ArrayEditor({
  control,
  path,
  title,
  addLabel,
  empty,
  render,
}: {
  control: FormControl
  path: string
  title: string
  addLabel: string
  empty: () => unknown
  render: (item: string) => ReactNode
}) {
  const { fields, append, remove } = useFieldArray({
    control: control as Control<any>,
    name: path as never,
  })

  return (
    <div className="space-y-3">
      <Label>{title}</Label>

      {fields.map((field, index) => (
        <div key={field.id} className="rounded-lg border border-zinc-200 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-4">{render(`${path}.${index}`)}</div>

            <DeleteItemButton onClick={() => remove(index)} />
          </div>
        </div>
      ))}

      <AddItemButton
        label={addLabel}
        onClick={() => append(empty() as never)}
      />
    </div>
  )
}

/* ============================================================
   1. HERO
============================================================ */

function HeroSection({ control }: { control: FormControl }) {
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
        placeholder="40"
      />
      <ButtonField
        control={control}
        name="sections.hero.primaryButton"
        label="Primary Button"
      />
      <ButtonField
        control={control}
        name="sections.hero.secondaryButton"
        label="Secondary Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   2. LOGOS  (sections.logos.logos)
============================================================ */

function LogosSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Partner / Brand Logos"
      order={2}
      control={control}
      visibleName="sections.logos.isVisible"
    >
      <Head control={control} section="logos" eyebrow={false} />

      <ArrayEditor
        control={control}
        path="sections.logos.logos"
        title="Logos"
        addLabel="Add Logo"
        empty={() => ({
          _id: tempId(),
          name: "",
          logo: img(),
          href: "",
          openInNewTab: true,
          isVisible: true,
        })}
        render={(item) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <PlainField
                control={control}
                name={`${item}.name`}
                label="Partner Name"
              />
              <PlainField
                control={control}
                name={`${item}.href`}
                label="Website URL"
              />
            </div>
            <ImageField control={control} name={`${item}.logo`} label="Logo" />
            <div className="grid grid-cols-2 gap-3">
              <BoolField
                control={control}
                name={`${item}.openInNewTab`}
                label="Open in New Tab"
              />
              <BoolField
                control={control}
                name={`${item}.isVisible`}
                label="Visible"
              />
            </div>
          </>
        )}
      />
    </SectionAccordion>
  )
}

/* ============================================================
   3. WHO WE WORK WITH  (sections.whoWeWorkWith.items)
============================================================ */

function WhoWeWorkWithSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Who We Work With"
      order={3}
      control={control}
      visibleName="sections.whoWeWorkWith.isVisible"
    >
      <Head control={control} section="whoWeWorkWith" />

      <ArrayEditor
        control={control}
        path="sections.whoWeWorkWith.items"
        title="Audience Cards"
        addLabel="Add Audience"
        empty={() => ({
          _id: tempId(),
          key: "",
          title: l(),
          description: l(),
          image: img(),
          href: "",
          isVisible: true,
        })}
        render={(item) => (
          <>
            <PlainField
              control={control}
              name={`${item}.key`}
              label="Key"
              placeholder="architects"
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
      />

      <ButtonField
        control={control}
        name="sections.whoWeWorkWith.button"
        label="Section Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   4. JOURNEY  (sections.journey.steps)
============================================================ */

function JourneySection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Project Journey"
      order={4}
      control={control}
      visibleName="sections.journey.isVisible"
    >
      <Head control={control} section="journey" />

      <ArrayEditor
        control={control}
        path="sections.journey.steps"
        title="Journey Steps"
        addLabel="Add Journey Step"
        empty={() => ({
          _id: tempId(),
          number: "",
          icon: "",
          title: l(),
          subtitle: l(),
          description: l(),
          highlight: l(),
          isVisible: true,
        })}
        render={(item) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <PlainField
                control={control}
                name={`${item}.number`}
                label="Number"
                placeholder="01"
              />
              <PlainField
                control={control}
                name={`${item}.icon`}
                label="Icon"
              />
            </div>
            <LocalizedField
              control={control}
              name={`${item}.title`}
              label="Title"
            />
            <LocalizedField
              control={control}
              name={`${item}.subtitle`}
              label="Subtitle"
            />
            <LocalizedField
              control={control}
              name={`${item}.description`}
              label="Description"
              multiline
            />
            <LocalizedField
              control={control}
              name={`${item}.highlight`}
              label="Highlight"
              multiline
            />
            <BoolField
              control={control}
              name={`${item}.isVisible`}
              label="Visible"
            />
          </>
        )}
      />
    </SectionAccordion>
  )
}

/* ============================================================
   5. STATS  (sections.stats.stats)
============================================================ */

function StatsSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Stats"
      order={5}
      control={control}
      visibleName="sections.stats.isVisible"
    >
      <Head
        control={control}
        section="stats"
        eyebrow={false}
        description={false}
      />

      <ArrayEditor
        control={control}
        path="sections.stats.stats"
        title="Stats"
        addLabel="Add Stat"
        empty={() => ({
          _id: tempId(),
          value: "",
          label: l(),
          description: l(),
          isVisible: true,
        })}
        render={(item) => (
          <>
            <PlainField
              control={control}
              name={`${item}.value`}
              label="Value"
              placeholder="88+ Years"
            />
            <LocalizedField
              control={control}
              name={`${item}.label`}
              label="Label"
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
      />
    </SectionAccordion>
  )
}

/* ============================================================
   6. PROJECTS  (sections.projects.projects)
============================================================ */

function ProjectsSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Featured & Commercial Projects"
      order={6}
      control={control}
      visibleName="sections.projects.isVisible"
    >
      <Head control={control} section="projects" />

      <ArrayEditor
        control={control}
        path="sections.projects.projects"
        title="Projects"
        addLabel="Add Project"
        empty={() => ({
          _id: tempId(),
          projectSlug: "",
          title: l(),
          location: l(),
          category: l(),
          description: l(),
          image: img(),
          href: "",
          position: "top-left",
          isVisible: true,
        })}
        render={(item) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <PlainField
                control={control}
                name={`${item}.projectSlug`}
                label="Project Slug"
                placeholder="jumeirah-gate-dubai"
              />
              <PlainField
                control={control}
                name={`${item}.position`}
                label="Position"
                placeholder="top-left"
              />
            </div>
            <LocalizedField
              control={control}
              name={`${item}.title`}
              label="Title"
            />
            <LocalizedField
              control={control}
              name={`${item}.location`}
              label="Location"
            />
            <LocalizedField
              control={control}
              name={`${item}.category`}
              label="Category"
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
      />

      <ButtonField
        control={control}
        name="sections.projects.button"
        label="Section Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   7. BENEFITS  (sections.benefits.items)
============================================================ */

function BenefitsSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Why Clients Choose T.ONE"
      order={7}
      control={control}
      visibleName="sections.benefits.isVisible"
    >
      <Head control={control} section="benefits" />

      <ArrayEditor
        control={control}
        path="sections.benefits.items"
        title="Benefits"
        addLabel="Add Benefit"
        empty={() => ({
          _id: tempId(),
          icon: "",
          title: l(),
          description: l(),
          isVisible: true,
        })}
        render={(item) => (
          <>
            <PlainField control={control} name={`${item}.icon`} label="Icon" />
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
      />
    </SectionAccordion>
  )
}

/* ============================================================
   8. PARTNERSHIP SERVICES  (sections.partnershipServices.services)
============================================================ */

function PartnershipServicesSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Partnership Services"
      order={8}
      control={control}
      visibleName="sections.partnershipServices.isVisible"
    >
      <Head control={control} section="partnershipServices" />

      <ArrayEditor
        control={control}
        path="sections.partnershipServices.services"
        title="Services"
        addLabel="Add Service"
        empty={() => ({
          _id: tempId(),
          icon: "",
          title: l(),
          description: l(),
          href: "",
          isVisible: true,
        })}
        render={(item) => (
          <>
            <PlainField control={control} name={`${item}.icon`} label="Icon" />
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
      />
    </SectionAccordion>
  )
}

/* ============================================================
   9. INDUSTRY SERVICES  (sections.industryServices.items)
============================================================ */

function IndustryServicesSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Industry Specific Journey"
      order={9}
      control={control}
      visibleName="sections.industryServices.isVisible"
    >
      <Head control={control} section="industryServices" />

      <ArrayEditor
        control={control}
        path="sections.industryServices.items"
        title="Items"
        addLabel="Add Item"
        empty={() => ({
          _id: tempId(),
          icon: "",
          title: l(),
          description: l(),
          href: "",
          isVisible: true,
        })}
        render={(item) => (
          <>
            <PlainField control={control} name={`${item}.icon`} label="Icon" />
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
      />
    </SectionAccordion>
  )
}

/* ============================================================
   10. RESOURCES  (sections.resources.resources)
============================================================ */

function ResourcesSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Resource Center"
      order={10}
      control={control}
      visibleName="sections.resources.isVisible"
    >
      <Head control={control} section="resources" />

      <ArrayEditor
        control={control}
        path="sections.resources.resources"
        title="Resources"
        addLabel="Add Resource"
        empty={() => ({
          _id: tempId(),
          type: "brochure",
          icon: "file",
          title: l(),
          description: l(),
          fileUrl: "",
          buttonLabel: l(),
          isVisible: true,
        })}
        render={(item) => (
          <>
            <div className="grid grid-cols-3 gap-3">
              <PlainField
                control={control}
                name={`${item}.type`}
                label="Type"
                placeholder="brochure"
              />
              <PlainField
                control={control}
                name={`${item}.icon`}
                label="Icon"
                placeholder="file"
              />
              <BoolField
                control={control}
                name={`${item}.isVisible`}
                label="Visible"
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
            <PlainField
              control={control}
              name={`${item}.fileUrl`}
              label="File URL"
            />
            <LocalizedField
              control={control}
              name={`${item}.buttonLabel`}
              label="Button Label"
            />
          </>
        )}
      />

      <ButtonField
        control={control}
        name="sections.resources.button"
        label="Section Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   11. SUPPLIER CTA  (sections.supplierCTA.benefits = Localized[])
============================================================ */

function SupplierCTASection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Preferred Supplier CTA"
      order={11}
      control={control}
      visibleName="sections.supplierCTA.isVisible"
    >
      <Head control={control} section="supplierCTA" />

      <ImageField
        control={control}
        name="sections.supplierCTA.image"
        label="Image"
      />

      <ArrayEditor
        control={control}
        path="sections.supplierCTA.benefits"
        title="Benefits / Steps"
        addLabel="Add Supplier Benefit"
        empty={() => l()}
        render={(item) => (
          <LocalizedField control={control} name={item} label="Text" />
        )}
      />

      <ButtonField
        control={control}
        name="sections.supplierCTA.button"
        label="Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   12. DESIGN TIPS  (sections.designTips.articles)
============================================================ */

function DesignTipsSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Design Tips"
      order={12}
      control={control}
      visibleName="sections.designTips.isVisible"
    >
      <Head control={control} section="designTips" />

      <ArrayEditor
        control={control}
        path="sections.designTips.articles"
        title="Articles"
        addLabel="Add Design Tip"
        empty={() => ({
          _id: tempId(),
          slug: "",
          title: l(),
          category: l(),
          readTime: l(),
          description: l(),
          image: img(),
          href: "",
          isVisible: true,
        })}
        render={(item) => (
          <>
            <PlainField control={control} name={`${item}.slug`} label="Slug" />
            <LocalizedField
              control={control}
              name={`${item}.title`}
              label="Title"
            />
            <LocalizedField
              control={control}
              name={`${item}.category`}
              label="Category"
            />
            <LocalizedField
              control={control}
              name={`${item}.readTime`}
              label="Read Time"
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
              label="Article URL"
            />
            <BoolField
              control={control}
              name={`${item}.isVisible`}
              label="Visible"
            />
          </>
        )}
      />

      <ButtonField
        control={control}
        name="sections.designTips.button"
        label="Section Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   13. REFERRAL  (sections.referral.steps)
============================================================ */

function ReferralSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Referral Program"
      order={13}
      control={control}
      visibleName="sections.referral.isVisible"
    >
      <Head control={control} section="referral" />

      <ImageField
        control={control}
        name="sections.referral.image"
        label="Image"
      />

      <ArrayEditor
        control={control}
        path="sections.referral.steps"
        title="Steps"
        addLabel="Add Step"
        empty={() => ({
          _id: tempId(),
          icon: "",
          title: l(),
          description: l(),
        })}
        render={(item) => (
          <>
            <PlainField control={control} name={`${item}.icon`} label="Icon" />
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
      />

      <ButtonField
        control={control}
        name="sections.referral.button"
        label="Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   14. CONSULTATION  (sections.consultation.fields)
============================================================ */

function ConsultationSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="Consultation / Lead Form"
      order={14}
      control={control}
      visibleName="sections.consultation.isVisible"
    >
      <Head control={control} section="consultation" />

      <ImageField
        control={control}
        name="sections.consultation.image"
        label="Image"
      />

      <ArrayEditor
        control={control}
        path="sections.consultation.fields"
        title="Form Fields"
        addLabel="Add Form Field"
        empty={() => ({
          _id: tempId(),
          name: "",
          type: "text",
          label: l(),
          required: false,
          isVisible: true,
        })}
        render={(item) => (
          <>
            <div className="grid grid-cols-3 gap-3">
              <PlainField
                control={control}
                name={`${item}.name`}
                label="Field Name"
                placeholder="name"
              />
              <PlainField
                control={control}
                name={`${item}.type`}
                label="Type"
                placeholder="text"
              />
              <BoolField
                control={control}
                name={`${item}.required`}
                label="Required"
              />
            </div>
            <LocalizedField
              control={control}
              name={`${item}.label`}
              label="Label"
            />
            <BoolField
              control={control}
              name={`${item}.isVisible`}
              label="Visible"
            />
          </>
        )}
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
   15. FAQ  (sections.faq.faqs)
============================================================ */

function FaqSection({ control }: { control: FormControl }) {
  return (
    <SectionAccordion
      title="FAQ"
      order={15}
      control={control}
      visibleName="sections.faq.isVisible"
    >
      <Head control={control} section="faq" />

      <ArrayEditor
        control={control}
        path="sections.faq.faqs"
        title="FAQs"
        addLabel="Add FAQ"
        empty={() => ({
          _id: tempId(),
          question: l(),
          answer: l(),
          isVisible: true,
        })}
        render={(item) => (
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
      />
    </SectionAccordion>
  )
}
