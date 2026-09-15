"use client"

import { useForm, useFieldArray, Controller, type Control } from "react-hook-form"
import { useState } from "react"
import Link from "next/link"
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
import type { SpacesPageApiData } from "@/types/api-spaces-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`
const emptyLoc = () => ({ en: "", ar: "" })
const emptyImg = () => ({ url: "", key: "", alt: emptyLoc() })

const PROJECT_POSITIONS = [
  "top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right",
]

type F = Control<SpacesPageApiData>

interface SpacesPageFormProps {
  initialData: SpacesPageApiData
  onSave: (data: SpacesPageApiData) => void | Promise<void>
}

export function SpacesPageForm({ initialData, onSave }: SpacesPageFormProps) {
  const form = useForm<SpacesPageApiData>({ defaultValues: initialData })
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
      {/* Page-level meta */}
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <div className="grid min-w-0 flex-1 grid-cols-3 gap-3">
        <PlainField control={control} name="pageName" label="Page Name" placeholder="Spaces" />
        <PlainField control={control} name="slug" label="Slug" placeholder="spaces" />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Status</label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm">
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
            )}
          />
        </div>
        </div>
        <Link
          href="/pages/space-detail/new"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Add new space
        </Link>
      </div>

      <HeroSection control={control} />
      <IntroSection control={control} />
      <FeaturedSpacesSection control={control} />
      <ShowcaseSection control={control} />
      <WhyChooseSection control={control} />
      <SignatureProjectsSection control={control} />
      <JourneySection control={control} />
      <PartnershipSection control={control} />
      <FaqSection control={control} />

      <SeoFields control={control} namePrefix="seo" />

      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : formState.isDirty ? "Save All Changes" : "Saved"}
        </button>
      </div>
    </form>
  )
}

// ─── 1. Hero ────────────────────────────────────────────────────────────

function HeroSection({ control }: { control: F }) {
  return (
    <SectionAccordion title="Hero Banner" order={1} control={control} visibleName="sections.hero.isVisible" defaultOpen>
      <LocalizedField control={control} name="sections.hero.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.hero.heading" label="Heading" multiline />
      <LocalizedField control={control} name="sections.hero.description" label="Description" multiline />
      <ImageField control={control} name="sections.hero.backgroundImage" label="Background Image (Desktop)" />
      <ImageField control={control} name="sections.hero.mobileImage" label="Background Image (Mobile)" />
      <ButtonField control={control} name="sections.hero.primaryButton" label="Primary Button" />
      <ButtonField control={control} name="sections.hero.secondaryButton" label="Secondary Button" />
      <PlainField control={control} name="sections.hero.overlayOpacity" label="Overlay Opacity (%)" type="number" />
    </SectionAccordion>
  )
}

// ─── 2. Intro ───────────────────────────────────────────────────────────

function IntroSection({ control }: { control: F }) {
  return (
    <SectionAccordion title="Intro" order={2} control={control} visibleName="sections.intro.isVisible">
      <LocalizedField control={control} name="sections.intro.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.intro.heading" label="Heading" />
      <LocalizedField control={control} name="sections.intro.description" label="Description" multiline />
      <ButtonField control={control} name="sections.intro.button" label="Button" />
    </SectionAccordion>
  )
}

// ─── 3. Featured Spaces ─────────────────────────────────────────────────

function FeaturedSpacesSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.featuredSpaces.spaces" })
  return (
    <SectionAccordion title="Featured Spaces" order={3} control={control} visibleName="sections.featuredSpaces.isVisible">
      <LocalizedField control={control} name="sections.featuredSpaces.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.featuredSpaces.heading" label="Heading" />
      <LocalizedField control={control} name="sections.featuredSpaces.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`sections.featuredSpaces.spaces.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.featuredSpaces.spaces.${i}.subtitle`} label="Subtitle" />
              <ImageField control={control} name={`sections.featuredSpaces.spaces.${i}.image`} label="Image" />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`sections.featuredSpaces.spaces.${i}.href`} label="Link URL" placeholder="/spaces/kitchens" />
                <BoolField control={control} name={`sections.featuredSpaces.spaces.${i}.isVisible`} label="Visible" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Space"
        onClick={() => append({ _id: tempId(), title: emptyLoc(), subtitle: emptyLoc(), image: emptyImg(), href: "", isVisible: true })}
      />
      <ButtonField control={control} name="sections.featuredSpaces.button" label="Section Button" />
      <BoolField control={control} name="sections.featuredSpaces.autoplay" label="Autoplay carousel" />
    </SectionAccordion>
  )
}

// ─── 4. Showcase ────────────────────────────────────────────────────────

function ShowcaseSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.showcase.gallery" })
  return (
    <SectionAccordion title="Showcase Gallery" order={4} control={control} visibleName="sections.showcase.isVisible">
      <LocalizedField control={control} name="sections.showcase.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.showcase.heading" label="Heading" />
      <LocalizedField control={control} name="sections.showcase.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <ImageField control={control} name={`sections.showcase.gallery.${i}.image`} label="Image" />
              <LocalizedField control={control} name={`sections.showcase.gallery.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.showcase.gallery.${i}.caption`} label="Caption" />
              <PlainField control={control} name={`sections.showcase.gallery.${i}.href`} label="Link URL" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Gallery Item"
        onClick={() => append({ _id: tempId(), image: emptyImg(), title: emptyLoc(), caption: emptyLoc(), href: "" })}
      />
      <div className="grid grid-cols-2 gap-4">
        <BoolField control={control} name="sections.showcase.autoplay" label="Autoplay" />
        <BoolField control={control} name="sections.showcase.showNavigation" label="Show navigation arrows" />
      </div>
    </SectionAccordion>
  )
}

// ─── 5. Why Choose T1 ───────────────────────────────────────────────────

function WhyChooseSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.whyChooseT1.columns" })
  return (
    <SectionAccordion title="Why Choose T1" order={5} control={control} visibleName="sections.whyChooseT1.isVisible">
      <LocalizedField control={control} name="sections.whyChooseT1.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.whyChooseT1.heading" label="Heading" />
      <LocalizedField control={control} name="sections.whyChooseT1.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <WhyChooseColumnCard key={f.id} control={control} colIndex={i} onRemove={() => remove(i)} />
        ))}
      </div>
      <AddItemButton
        label="Add Column"
        onClick={() => append({ _id: tempId(), title: emptyLoc(), highlighted: false, items: [] })}
      />
    </SectionAccordion>
  )
}

function WhyChooseColumnCard({ control, colIndex, onRemove }: { control: F; colIndex: number; onRemove: () => void }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.whyChooseT1.columns.${colIndex}.items`,
  })
  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 p-3">
      <div className="flex items-start gap-2">
        <div className="flex-1 space-y-2">
          <LocalizedField control={control} name={`sections.whyChooseT1.columns.${colIndex}.title`} label="Column Title" />
          <BoolField control={control} name={`sections.whyChooseT1.columns.${colIndex}.highlighted`} label="Highlighted column" />
        </div>
        <DeleteItemButton onClick={onRemove} />
      </div>
      <div className="space-y-2 border-t border-zinc-100 pt-2">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2">
            <div className="flex-1 space-y-1">
              <LocalizedField control={control} name={`sections.whyChooseT1.columns.${colIndex}.items.${i}.label`} label={`Item ${i + 1}`} />
              <BoolField control={control} name={`sections.whyChooseT1.columns.${colIndex}.items.${i}.available`} label="Available" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
        <AddItemButton label="Add Item" onClick={() => append({ label: emptyLoc(), available: true })} />
      </div>
    </div>
  )
}

// ─── 6. Signature Projects ──────────────────────────────────────────────

function SignatureProjectsSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.signatureProjects.projects" })
  return (
    <SectionAccordion title="Signature Projects" order={6} control={control} visibleName="sections.signatureProjects.isVisible">
      <LocalizedField control={control} name="sections.signatureProjects.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.signatureProjects.heading" label="Heading" />
      <LocalizedField control={control} name="sections.signatureProjects.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`sections.signatureProjects.projects.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.signatureProjects.projects.${i}.location`} label="Location" />
              <LocalizedField control={control} name={`sections.signatureProjects.projects.${i}.description`} label="Description" multiline />
              <ImageField control={control} name={`sections.signatureProjects.projects.${i}.image`} label="Image" />
              <div className="grid grid-cols-3 gap-3">
                <PlainField control={control} name={`sections.signatureProjects.projects.${i}.href`} label="Link URL" />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Grid Position</label>
                  <Controller
                    control={control}
                    name={`sections.signatureProjects.projects.${i}.position`}
                    render={({ field }) => (
                      <select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm">
                        {PROJECT_POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    )}
                  />
                </div>
                <BoolField control={control} name={`sections.signatureProjects.projects.${i}.isVisible`} label="Visible" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Project"
        onClick={() => append({ _id: tempId(), title: emptyLoc(), location: emptyLoc(), description: emptyLoc(), image: emptyImg(), href: "", position: "top-left", isVisible: true })}
      />
      <ButtonField control={control} name="sections.signatureProjects.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 7. Journey ─────────────────────────────────────────────────────────

function JourneySection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.journey.steps" })
  return (
    <SectionAccordion title="Project Journey" order={7} control={control} visibleName="sections.journey.isVisible">
      <LocalizedField control={control} name="sections.journey.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.journey.heading" label="Heading" />
      <LocalizedField control={control} name="sections.journey.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="space-y-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex items-start justify-between gap-2">
              <PlainField control={control} name={`sections.journey.steps.${i}.icon`} label="Icon" placeholder="discover" />
              <div className="pt-6"><DeleteItemButton onClick={() => remove(i)} /></div>
            </div>
            <LocalizedField control={control} name={`sections.journey.steps.${i}.title`} label="Title" />
            <LocalizedField control={control} name={`sections.journey.steps.${i}.subtitle`} label="Subtitle" />
            <LocalizedField control={control} name={`sections.journey.steps.${i}.description`} label="Description" multiline />
            <LocalizedField control={control} name={`sections.journey.steps.${i}.advantageTitle`} label="Advantage Title" />
            <LocalizedField control={control} name={`sections.journey.steps.${i}.advantageDescription`} label="Advantage Description" multiline />
            <LocalizedField control={control} name={`sections.journey.steps.${i}.highlight`} label="Highlight" multiline />
            <BoolField control={control} name={`sections.journey.steps.${i}.isVisible`} label="Visible" />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Step"
        onClick={() => append({ _id: tempId(), icon: "", title: emptyLoc(), subtitle: emptyLoc(), description: emptyLoc(), advantageTitle: emptyLoc(), advantageDescription: emptyLoc(), highlight: emptyLoc(), isVisible: true })}
      />
    </SectionAccordion>
  )
}

// ─── 8. Partnership ─────────────────────────────────────────────────────

function PartnershipSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.partnership.steps" })
  return (
    <SectionAccordion title="Partnerships" order={8} control={control} visibleName="sections.partnership.isVisible">
      <LocalizedField control={control} name="sections.partnership.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.partnership.heading" label="Heading" />
      <LocalizedField control={control} name="sections.partnership.description" label="Description" multiline />
      <ImageField control={control} name="sections.partnership.image" label="Image" />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <PlainField control={control} name={`sections.partnership.steps.${i}.icon`} label="Icon" placeholder="register" />
              <LocalizedField control={control} name={`sections.partnership.steps.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.partnership.steps.${i}.description`} label="Description" multiline />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Step"
        onClick={() => append({ _id: tempId(), icon: "", title: emptyLoc(), description: emptyLoc() })}
      />
      <ButtonField control={control} name="sections.partnership.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 9. FAQ ─────────────────────────────────────────────────────────────

function FaqSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.faq.faqs" })
  return (
    <SectionAccordion title="Frequently Asked Questions" order={9} control={control} visibleName="sections.faq.isVisible">
      <LocalizedField control={control} name="sections.faq.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.faq.heading" label="Heading" />
      <LocalizedField control={control} name="sections.faq.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`sections.faq.faqs.${i}.question`} label="Question" multiline />
              <LocalizedField control={control} name={`sections.faq.faqs.${i}.answer`} label="Answer" multiline />
              <BoolField control={control} name={`sections.faq.faqs.${i}.isVisible`} label="Visible" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add FAQ"
        onClick={() => append({ _id: tempId(), question: emptyLoc(), answer: emptyLoc(), isVisible: true })}
      />
    </SectionAccordion>
  )
}
