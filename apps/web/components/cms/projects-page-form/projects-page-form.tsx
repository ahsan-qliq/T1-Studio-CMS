"use client"

import { useForm, useFieldArray, Controller, type Control } from "react-hook-form"
import { useState } from "react"
import Link from "next/link"
import { Input } from "@workspace/ui/components/input"
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
import type { ProjectsPageApiData } from "@/types/api-projects-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`
const emptyLoc = () => ({ en: "", ar: "" })
const emptyImg = () => ({ url: "", key: "", alt: emptyLoc() })

const PROJECT_POSITIONS = [
  "top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right",
]

type F = Control<ProjectsPageApiData>

interface ProjectsPageFormProps {
  initialData: ProjectsPageApiData
  onSave: (data: ProjectsPageApiData) => void | Promise<void>
}

export function ProjectsPageForm({ initialData, onSave }: ProjectsPageFormProps) {
  const form = useForm<ProjectsPageApiData>({ defaultValues: initialData })
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
        <PlainField control={control} name="pageName" label="Page Name" placeholder="Projects" />
        <PlainField control={control} name="slug" label="Slug" placeholder="projects" />
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
          <Link href="/pages/project-detail/new" className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
            Add new project
          </Link>
        </div>
      </div>

      <HeroSection control={control} />
      <ProjectsListSection control={control} />
      <TestimonialsSection control={control} />
      <BeforeAfterSection control={control} />
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
      <PlainField control={control} name="sections.hero.overlayOpacity" label="Overlay Opacity (%)" type="number" />
    </SectionAccordion>
  )
}

// ─── 2. Projects List ───────────────────────────────────────────────────

function FiltersInput({ control }: { control: F }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">Category Filters (comma-separated)</Label>
      <Controller
        control={control}
        name="sections.projects.filters"
        render={({ field }) => (
          <Input
            value={(field.value ?? []).join(", ")}
            onChange={(e) =>
              field.onChange(
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            placeholder="residential, commercial, hospitality"
          />
        )}
      />
    </div>
  )
}

function ProjectsListSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.projects.projects" })
  return (
    <SectionAccordion title="All Projects" order={2} control={control} visibleName="sections.projects.isVisible">
      <LocalizedField control={control} name="sections.projects.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.projects.heading" label="Heading" />
      <LocalizedField control={control} name="sections.projects.description" label="Description" multiline />
      <FiltersInput control={control} />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`sections.projects.projects.${i}.slug`} label="Project Slug" placeholder="emirates-hills" />
                <PlainField control={control} name={`sections.projects.projects.${i}.category`} label="Category" placeholder="residential" />
              </div>
              <LocalizedField control={control} name={`sections.projects.projects.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.projects.projects.${i}.location`} label="Location" />
              <LocalizedField control={control} name={`sections.projects.projects.${i}.shortDescription`} label="Short Description" multiline />
              <ImageField control={control} name={`sections.projects.projects.${i}.image`} label="Image" />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`sections.projects.projects.${i}.href`} label="Link URL" placeholder="/projects/emirates-hills" />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Grid Position</label>
                  <Controller
                    control={control}
                    name={`sections.projects.projects.${i}.position`}
                    render={({ field }) => (
                      <select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm">
                        {PROJECT_POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <BoolField control={control} name={`sections.projects.projects.${i}.featured`} label="Featured" />
                <BoolField control={control} name={`sections.projects.projects.${i}.isVisible`} label="Visible" />
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
            slug: "",
            title: emptyLoc(),
            location: emptyLoc(),
            category: "residential",
            shortDescription: emptyLoc(),
            image: emptyImg(),
            href: "",
            featured: false,
            position: "top-left",
            isVisible: true,
          })
        }
      />
      <ButtonField control={control} name="sections.projects.loadMoreButton" label="Load More Button" />
      <div className="grid grid-cols-2 gap-4">
        <BoolField control={control} name="sections.projects.enableFilters" label="Enable Filters" />
        <BoolField control={control} name="sections.projects.enableLoadMore" label="Enable Load More" />
      </div>
    </SectionAccordion>
  )
}

// ─── 3. Testimonials ────────────────────────────────────────────────────

function TestimonialsSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.testimonials.testimonials" })
  return (
    <SectionAccordion title="Client Testimonials" order={3} control={control} visibleName="sections.testimonials.isVisible">
      <LocalizedField control={control} name="sections.testimonials.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.testimonials.heading" label="Heading" />
      <LocalizedField control={control} name="sections.testimonials.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`sections.testimonials.testimonials.${i}.clientName`} label="Client Name" />
              <LocalizedField control={control} name={`sections.testimonials.testimonials.${i}.designation`} label="Designation" />
              <LocalizedField control={control} name={`sections.testimonials.testimonials.${i}.testimonial`} label="Testimonial" multiline />
              <ImageField control={control} name={`sections.testimonials.testimonials.${i}.image`} label="Client Photo" />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`sections.testimonials.testimonials.${i}.videoUrl`} label="Video URL" />
                <BoolField control={control} name={`sections.testimonials.testimonials.${i}.isVisible`} label="Visible" />
              </div>
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
            clientName: emptyLoc(),
            designation: emptyLoc(),
            testimonial: emptyLoc(),
            image: emptyImg(),
            videoUrl: "",
            isVisible: true,
          })
        }
      />
      <BoolField control={control} name="sections.testimonials.autoplay" label="Autoplay carousel" />
    </SectionAccordion>
  )
}

// ─── 4. Before & After ──────────────────────────────────────────────────

function BeforeAfterSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.beforeAfter.items" })
  return (
    <SectionAccordion title="Before & After" order={4} control={control} visibleName="sections.beforeAfter.isVisible">
      <LocalizedField control={control} name="sections.beforeAfter.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.beforeAfter.heading" label="Heading" />
      <LocalizedField control={control} name="sections.beforeAfter.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`sections.beforeAfter.items.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.beforeAfter.items.${i}.description`} label="Description" multiline />
              <ImageField control={control} name={`sections.beforeAfter.items.${i}.beforeImage`} label="Before Image" />
              <ImageField control={control} name={`sections.beforeAfter.items.${i}.afterImage`} label="After Image" />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`sections.beforeAfter.items.${i}.projectHref`} label="Project Link URL" />
                <BoolField control={control} name={`sections.beforeAfter.items.${i}.isVisible`} label="Visible" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Before/After"
        onClick={() =>
          append({
            _id: tempId(),
            title: emptyLoc(),
            description: emptyLoc(),
            beforeImage: emptyImg(),
            afterImage: emptyImg(),
            projectHref: "",
            isVisible: true,
          })
        }
      />
      <div className="grid grid-cols-2 gap-4">
        <BoolField control={control} name="sections.beforeAfter.autoplay" label="Autoplay" />
        <BoolField control={control} name="sections.beforeAfter.showNavigation" label="Show navigation arrows" />
      </div>
    </SectionAccordion>
  )
}

// ─── 5. Partnership ─────────────────────────────────────────────────────

function PartnershipSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.partnership.steps" })
  return (
    <SectionAccordion title="Referral Partnership" order={5} control={control} visibleName="sections.partnership.isVisible">
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

// ─── 6. FAQ ─────────────────────────────────────────────────────────────

function FaqSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.faq.faqs" })
  return (
    <SectionAccordion title="Frequently Asked Questions" order={6} control={control} visibleName="sections.faq.isVisible">
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
