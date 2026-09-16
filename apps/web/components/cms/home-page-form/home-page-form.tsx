"use client"

import { Button } from "@workspace/ui/components/button"

import { useForm, useFieldArray, Controller, type Control } from "react-hook-form"
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
} from "./shared-fields"
import type { HomePageApiData, HomePageSections } from "@/types/api-home-page"

// ─── Small id helper for newly-added array items (the API assigns real
// Mongo _ids on save; these are just stable React keys until then) ────────
const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`

interface HomePageFormProps {
  initialData: HomePageApiData
  onSave: (sections: HomePageSections) => void | Promise<void>
}

export function HomePageForm({ initialData, onSave }: HomePageFormProps) {
  const form = useForm<HomePageSections>({ defaultValues: initialData.sections })
  const { control, handleSubmit, formState } = form
  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (values) => {
    setSaving(true)
    try {
      await onSave(values)
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      <HeroSection control={control} />
      <StatsSection control={control} />
      <ServicesSection control={control} />
      <FeaturedSpacesSection control={control} />
      <SignatureProjectsSection control={control} />
      <JourneySection control={control} />
      <WhyChooseSection control={control} />
      <TestimonialsSection control={control} />
      <ConsultationCtaSection control={control} />
      <PartnershipSection control={control} />
      <AwardsSection control={control} />
      <DesignTipsSection control={control} />
      <FaqSection control={control} />
      <LocationLinksSection control={control} />

      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : formState.isDirty ? "Save All Changes" : "Saved"}
        </Button>
      </div>
    </form>
  )
}

// ─── 1. Hero ────────────────────────────────────────────────────────────

function HeroSection({ control }: { control: Control<HomePageSections> }) {
  return (
    <SectionAccordion title="Hero Banner" order={1} control={control} visibleName="hero.isVisible" defaultOpen>
      <LocalizedField control={control} name="hero.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="hero.heading" label="Heading" multiline />
      <LocalizedField control={control} name="hero.description" label="Description" multiline />
      <ImageField control={control} name="hero.backgroundImage" label="Background Image (Desktop)" />
      <ImageField control={control} name="hero.mobileImage" label="Background Image (Mobile)" />
      <ButtonField control={control} name="hero.primaryButton" label="Primary Button" />
      <ButtonField control={control} name="hero.secondaryButton" label="Secondary Button" />
      <PlainField control={control} name="hero.overlayOpacity" label="Overlay Opacity (%)" type="number" />
    </SectionAccordion>
  )
}

// ─── 2. Stats ───────────────────────────────────────────────────────────

function StatsSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "stats.statistics" })
  return (
    <SectionAccordion title="Stats" order={2} control={control} visibleName="stats.isVisible">
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`stats.statistics.${i}.value`} label="Value" placeholder="500+" />
                <BoolField control={control} name={`stats.statistics.${i}.isVisible`} label="Visible" />
              </div>
              <LocalizedField control={control} name={`stats.statistics.${i}.label`} label="Label" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Statistic"
        onClick={() =>
          append({ _id: tempId(), value: "", label: { en: "", ar: "" }, isVisible: true })
        }
      />
    </SectionAccordion>
  )
}

// ─── 3. Services ────────────────────────────────────────────────────────

function ServicesSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "services.services" })
  return (
    <SectionAccordion title="Services" order={3} control={control} visibleName="services.isVisible">
      <LocalizedField control={control} name="services.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="services.heading" label="Heading" />
      <LocalizedField control={control} name="services.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`services.services.${i}.icon`} label="Icon" placeholder="Pencil" />
                <PlainField control={control} name={`services.services.${i}.href`} label="Link URL" />
              </div>
              <LocalizedField control={control} name={`services.services.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`services.services.${i}.description`} label="Description" multiline />
              <BoolField control={control} name={`services.services.${i}.isVisible`} label="Visible" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Service"
        onClick={() =>
          append({
            _id: tempId(),
            icon: "",
            title: { en: "", ar: "" },
            description: { en: "", ar: "" },
            href: "",
            isVisible: true,
          })
        }
      />
      <ButtonField control={control} name="services.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 4. Featured Spaces ─────────────────────────────────────────────────

function FeaturedSpacesSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "featuredSpaces.spaces" })
  return (
    <SectionAccordion title="Featured Spaces" order={4} control={control} visibleName="featuredSpaces.isVisible">
      <LocalizedField control={control} name="featuredSpaces.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="featuredSpaces.heading" label="Heading" />
      <LocalizedField control={control} name="featuredSpaces.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`featuredSpaces.spaces.${i}.title`} label="Title" />
              <ImageField control={control} name={`featuredSpaces.spaces.${i}.image`} label="Image" />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`featuredSpaces.spaces.${i}.href`} label="Link URL" />
                <BoolField control={control} name={`featuredSpaces.spaces.${i}.isVisible`} label="Visible" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Space"
        onClick={() =>
          append({
            _id: tempId(),
            title: { en: "", ar: "" },
            image: { url: "", key: "", alt: { en: "", ar: "" } },
            href: "",
            isVisible: true,
          })
        }
      />
      <ButtonField control={control} name="featuredSpaces.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 5. Signature Projects ──────────────────────────────────────────────

const PROJECT_POSITIONS = ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"]

function SignatureProjectsSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "signatureProjects.projects" })
  return (
    <SectionAccordion title="Signature Projects" order={5} control={control} visibleName="signatureProjects.isVisible">
      <LocalizedField control={control} name="signatureProjects.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="signatureProjects.heading" label="Heading" />
      <LocalizedField control={control} name="signatureProjects.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`signatureProjects.projects.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`signatureProjects.projects.${i}.description`} label="Description" multiline />
              <LocalizedField control={control} name={`signatureProjects.projects.${i}.location`} label="Location" />
              <ImageField control={control} name={`signatureProjects.projects.${i}.image`} label="Image" />
              <div className="grid grid-cols-3 gap-3">
                <PlainField control={control} name={`signatureProjects.projects.${i}.href`} label="Link URL" />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Grid Position</label>
                  <Controller
                    control={control}
                    name={`signatureProjects.projects.${i}.position`}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900"
                      >
                        {PROJECT_POSITIONS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <BoolField control={control} name={`signatureProjects.projects.${i}.isVisible`} label="Visible" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Project"
        onClick={() =>
          append({
            _id: tempId(),
            title: { en: "", ar: "" },
            description: { en: "", ar: "" },
            location: { en: "", ar: "" },
            image: { url: "", key: "", alt: { en: "", ar: "" } },
            href: "",
            position: "top-left",
            isVisible: true,
          })
        }
      />
      <ButtonField control={control} name="signatureProjects.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 6. Journey ─────────────────────────────────────────────────────────

function JourneySection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "journey.steps" })
  return (
    <SectionAccordion title="Process / Journey" order={6} control={control} visibleName="journey.isVisible">
      <LocalizedField control={control} name="journey.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="journey.heading" label="Heading" />
      <LocalizedField control={control} name="journey.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="space-y-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex items-start justify-between gap-2">
              <PlainField control={control} name={`journey.steps.${i}.icon`} label="Icon" placeholder="Globe" />
              <div className="pt-6"><DeleteItemButton onClick={() => remove(i)} /></div>
            </div>
            <LocalizedField control={control} name={`journey.steps.${i}.title`} label="Title" />
            <LocalizedField control={control} name={`journey.steps.${i}.subtitle`} label="Subtitle" />
            <LocalizedField control={control} name={`journey.steps.${i}.description`} label="Description" multiline />
            <LocalizedField control={control} name={`journey.steps.${i}.advantageTitle`} label="Advantage Title" />
            <LocalizedField control={control} name={`journey.steps.${i}.advantageDescription`} label="Advantage Description" multiline />
            <LocalizedField control={control} name={`journey.steps.${i}.highlight`} label="Highlight" multiline />
            <BoolField control={control} name={`journey.steps.${i}.isVisible`} label="Visible" />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Step"
        onClick={() =>
          append({
            _id: tempId(),
            icon: "",
            title: { en: "", ar: "" },
            subtitle: { en: "", ar: "" },
            description: { en: "", ar: "" },
            advantageTitle: { en: "", ar: "" },
            advantageDescription: { en: "", ar: "" },
            highlight: { en: "", ar: "" },
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

// ─── 7. Why Choose T1 ───────────────────────────────────────────────────

function WhyChooseSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "whyChooseT1.columns" })
  return (
    <SectionAccordion title="Why Choose T1" order={7} control={control} visibleName="whyChooseT1.isVisible">
      <LocalizedField control={control} name="whyChooseT1.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="whyChooseT1.heading" label="Heading" />
      <LocalizedField control={control} name="whyChooseT1.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <WhyChooseColumnCard key={f.id} control={control} colIndex={i} onRemove={() => remove(i)} />
        ))}
      </div>
      <AddItemButton
        label="Add Column"
        onClick={() =>
          append({ _id: tempId(), title: { en: "", ar: "" }, highlighted: false, items: [] })
        }
      />
    </SectionAccordion>
  )
}

function WhyChooseColumnCard({
  control,
  colIndex,
  onRemove,
}: {
  control: Control<HomePageSections>
  colIndex: number
  onRemove: () => void
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `whyChooseT1.columns.${colIndex}.items`,
  })
  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 p-3">
      <div className="flex items-start gap-2">
        <div className="flex-1 space-y-2">
          <LocalizedField control={control} name={`whyChooseT1.columns.${colIndex}.title`} label="Column Title" />
          <BoolField control={control} name={`whyChooseT1.columns.${colIndex}.highlighted`} label="Highlighted column" />
        </div>
        <DeleteItemButton onClick={onRemove} />
      </div>
      <div className="space-y-2 border-t border-zinc-100 pt-2">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2">
            <div className="flex-1 space-y-1">
              <LocalizedField control={control} name={`whyChooseT1.columns.${colIndex}.items.${i}.label`} label={`Item ${i + 1}`} />
              <BoolField control={control} name={`whyChooseT1.columns.${colIndex}.items.${i}.available`} label="Available" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
        <AddItemButton
          label="Add Item"
          onClick={() => append({ label: { en: "", ar: "" }, available: true })}
        />
      </div>
    </div>
  )
}

// ─── 8. Testimonials ────────────────────────────────────────────────────

function TestimonialsSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "testimonials.testimonials" })
  return (
    <SectionAccordion title="Client Testimonials" order={8} control={control} visibleName="testimonials.isVisible">
      <LocalizedField control={control} name="testimonials.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="testimonials.heading" label="Heading" />
      <LocalizedField control={control} name="testimonials.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`testimonials.testimonials.${i}.name`} label="Client Name" />
              <LocalizedField control={control} name={`testimonials.testimonials.${i}.role`} label="Client Role" />
              <LocalizedField control={control} name={`testimonials.testimonials.${i}.quote`} label="Quote" multiline />
              <ImageField control={control} name={`testimonials.testimonials.${i}.image`} label="Client Photo" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Testimonial"
        onClick={() =>
          append({
            _id: tempId(),
            name: { en: "", ar: "" },
            role: { en: "", ar: "" },
            quote: { en: "", ar: "" },
            image: { url: "", key: "", alt: { en: "", ar: "" } },
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

// ─── 9. Consultation CTA ────────────────────────────────────────────────

function ConsultationCtaSection({ control }: { control: Control<HomePageSections> }) {
  const tabs = useFieldArray({ control, name: "consultationCTA.tabs" })
  const fieldsArr = useFieldArray({ control, name: "consultationCTA.fields" })
  return (
    <SectionAccordion title="Consultation CTA" order={9} control={control} visibleName="consultationCTA.isVisible">
      <LocalizedField control={control} name="consultationCTA.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="consultationCTA.heading" label="Heading" />
      <LocalizedField control={control} name="consultationCTA.description" label="Description" multiline />
      <ImageField control={control} name="consultationCTA.image" label="Image" />

      <p className="text-xs font-medium text-zinc-600">Tabs</p>
      <div className="space-y-3">
        {tabs.fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`consultationCTA.tabs.${i}.label`} label="Label" />
              <LocalizedField control={control} name={`consultationCTA.tabs.${i}.description`} label="Description" />
              <PlainField control={control} name={`consultationCTA.tabs.${i}.value`} label="Value (slug)" placeholder="home-owners" />
            </div>
            <DeleteItemButton onClick={() => tabs.remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Tab"
        onClick={() =>
          tabs.append({ _id: tempId(), label: { en: "", ar: "" }, description: { en: "", ar: "" }, value: "" })
        }
      />

      <p className="pt-2 text-xs font-medium text-zinc-600">Form Fields</p>
      <div className="space-y-3">
        {fieldsArr.fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`consultationCTA.fields.${i}.label`} label="Label" />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`consultationCTA.fields.${i}.type`} label="Field Type" placeholder="Text" />
              </div>
              <LocalizedField control={control} name={`consultationCTA.fields.${i}.placeholder`} label="Placeholder" />
            </div>
            <DeleteItemButton onClick={() => fieldsArr.remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Field"
        onClick={() =>
          fieldsArr.append({
            _id: tempId(),
            label: { en: "", ar: "" },
            type: "Text",
            placeholder: { en: "", ar: "" },
          })
        }
      />

      <LocalizedField control={control} name="consultationCTA.submitButtonLabel" label="Submit Button Label" />
    </SectionAccordion>
  )
}

// ─── 10. Partnership ────────────────────────────────────────────────────

function PartnershipSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "partnership.steps" })
  return (
    <SectionAccordion title="Partnerships" order={10} control={control} visibleName="partnership.isVisible">
      <LocalizedField control={control} name="partnership.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="partnership.heading" label="Heading" />
      <LocalizedField control={control} name="partnership.description" label="Description" multiline />
      <ImageField control={control} name="partnership.image" label="Image" />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <PlainField control={control} name={`partnership.steps.${i}.icon`} label="Icon" placeholder="Headset" />
              <LocalizedField control={control} name={`partnership.steps.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`partnership.steps.${i}.description`} label="Description" multiline />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Step"
        onClick={() =>
          append({ _id: tempId(), icon: "", title: { en: "", ar: "" }, description: { en: "", ar: "" } })
        }
      />
      <ButtonField control={control} name="partnership.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 11. Awards & Recognition ───────────────────────────────────────────

function AwardsSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "awardsRecognition.awards" })
  return (
    <SectionAccordion title="Awards & Recognition" order={11} control={control} visibleName="awardsRecognition.isVisible">
      <LocalizedField control={control} name="awardsRecognition.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="awardsRecognition.heading" label="Heading" />
      <LocalizedField control={control} name="awardsRecognition.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`awardsRecognition.awards.${i}.name`} label="Award Name" />
              <LocalizedField control={control} name={`awardsRecognition.awards.${i}.caption`} label="Caption" />
              <ImageField control={control} name={`awardsRecognition.awards.${i}.logo`} label="Logo" />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`awardsRecognition.awards.${i}.href`} label="Link URL" />
                <BoolField control={control} name={`awardsRecognition.awards.${i}.openInNewTab`} label="New tab" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Award"
        onClick={() =>
          append({
            _id: tempId(),
            name: { en: "", ar: "" },
            caption: { en: "", ar: "" },
            logo: { url: "", key: "", alt: { en: "", ar: "" } },
            href: "",
            openInNewTab: true,
          })
        }
      />
    </SectionAccordion>
  )
}

// ─── 12. Design Tips & Insights ─────────────────────────────────────────

function DesignTipsSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "designTips.articles" })
  return (
    <SectionAccordion title="Design Tips & Insights" order={12} control={control} visibleName="designTips.isVisible">
      <LocalizedField control={control} name="designTips.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="designTips.heading" label="Heading" />
      <LocalizedField control={control} name="designTips.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`designTips.articles.${i}.title`} label="Title" />
              <ImageField control={control} name={`designTips.articles.${i}.image`} label="Image" />
              <div className="grid grid-cols-2 gap-3">
                <LocalizedField control={control} name={`designTips.articles.${i}.category`} label="Category" />
                <PlainField control={control} name={`designTips.articles.${i}.readTime`} label="Read Time" placeholder="2 min read" />
              </div>
              <PlainField control={control} name={`designTips.articles.${i}.href`} label="Link URL" />
              <BoolField control={control} name={`designTips.articles.${i}.isVisible`} label="Visible" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Article"
        onClick={() =>
          append({
            _id: tempId(),
            title: { en: "", ar: "" },
            image: { url: "", key: "", alt: { en: "", ar: "" } },
            category: { en: "", ar: "" },
            readTime: "",
            href: "",
            isVisible: true,
          })
        }
      />
      <ButtonField control={control} name="designTips.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 13. FAQ ────────────────────────────────────────────────────────────

function FaqSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "faq.faqs" })
  return (
    <SectionAccordion title="Frequently Asked Questions" order={13} control={control} visibleName="faq.isVisible">
      <LocalizedField control={control} name="faq.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="faq.heading" label="Heading" />
      <LocalizedField control={control} name="faq.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`faq.faqs.${i}.question`} label="Question" multiline />
              <LocalizedField control={control} name={`faq.faqs.${i}.answer`} label="Answer" multiline />
              <BoolField control={control} name={`faq.faqs.${i}.isVisible`} label="Visible" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add FAQ"
        onClick={() =>
          append({ _id: tempId(), question: { en: "", ar: "" }, answer: { en: "", ar: "" }, isVisible: true })
        }
      />
    </SectionAccordion>
  )
}

// ─── 14. Location Links ─────────────────────────────────────────────────

function LocationLinksSection({ control }: { control: Control<HomePageSections> }) {
  const { fields, append, remove } = useFieldArray({ control, name: "locationLinks.columns" })
  return (
    <SectionAccordion title="Location Links" order={14} control={control} visibleName="locationLinks.isVisible">
      <LocalizedField control={control} name="locationLinks.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="locationLinks.heading" label="Heading" />
      <LocalizedField control={control} name="locationLinks.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <LocationColumnCard key={f.id} control={control} colIndex={i} onRemove={() => remove(i)} />
        ))}
      </div>
      <AddItemButton
        label="Add Location Column"
        onClick={() =>
          append({ _id: tempId(), title: { en: "", ar: "" }, description: { en: "", ar: "" }, links: [] })
        }
      />
    </SectionAccordion>
  )
}

function LocationColumnCard({
  control,
  colIndex,
  onRemove,
}: {
  control: Control<HomePageSections>
  colIndex: number
  onRemove: () => void
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `locationLinks.columns.${colIndex}.links`,
  })
  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 p-3">
      <div className="flex items-start gap-2">
        <div className="flex-1 space-y-2">
          <LocalizedField control={control} name={`locationLinks.columns.${colIndex}.title`} label="Column Title" />
        </div>
        <DeleteItemButton onClick={onRemove} />
      </div>
      <div className="space-y-2 border-t border-zinc-100 pt-2">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2">
            <div className="flex-1 space-y-1">
              <LocalizedField control={control} name={`locationLinks.columns.${colIndex}.links.${i}.label`} label={`Link ${i + 1}`} />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`locationLinks.columns.${colIndex}.links.${i}.href`} label="URL" />
                <BoolField control={control} name={`locationLinks.columns.${colIndex}.links.${i}.openInNewTab`} label="New tab" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
        <AddItemButton
          label="Add Link"
          onClick={() => append({ _id: tempId(), label: { en: "", ar: "" }, href: "", openInNewTab: false })}
        />
      </div>
    </div>
  )
}
