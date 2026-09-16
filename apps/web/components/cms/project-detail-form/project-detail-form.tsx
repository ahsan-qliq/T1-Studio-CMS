"use client"

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
} from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"
import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`
const emptyLoc = () => ({ en: "", ar: "" })
const emptyImg = () => ({ url: "", key: "", alt: emptyLoc() })

const PROJECT_POSITIONS = [
  "top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right",
]

const FIELD_TYPES = ["text", "email", "phone", "select"]

type F = Control<ProjectDetailPageApiData>

interface ProjectDetailFormProps {
  initialData: ProjectDetailPageApiData
  onSave: (data: ProjectDetailPageApiData) => void | Promise<void>
}

export function ProjectDetailForm({ initialData, onSave }: ProjectDetailFormProps) {
  const form = useForm<ProjectDetailPageApiData>({ defaultValues: initialData })
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
      <div className="grid grid-cols-4 gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <PlainField control={control} name="pageName" label="Page Name" placeholder="Emirates Hills Project" />
        <LocalizedField control={control} name="projectName" label="Project Name" />
        <PlainField control={control} name="slug" label="Slug" placeholder="emirates-hills" />
        <PlainField control={control} name="projectCategory" label="Category" placeholder="residential" />
      </div>
      <div className="grid grid-cols-4 gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Status</label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900">
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
            )}
          />
        </div>
      </div>

      <HeroSection control={control} />
      <OverviewSection control={control} />
      <BeforeAfterSection control={control} />
      <GallerySection control={control} />
      <MaterialsSection control={control} />
      <ProjectInfoSection control={control} />
      <TestimonialSection control={control} />
      <RelatedProjectsSection control={control} />
      <ConsultationSection control={control} />

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
  const { fields, append, remove } = useFieldArray({ control, name: "sections.hero.stats" })
  return (
    <SectionAccordion title="Hero Banner" order={1} control={control} visibleName="sections.hero.isVisible" defaultOpen>
      <LocalizedField control={control} name="sections.hero.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.hero.heading" label="Heading" multiline />
      <LocalizedField control={control} name="sections.hero.description" label="Description" multiline />
      <LocalizedField control={control} name="sections.hero.location" label="Location" />
      <ImageField control={control} name="sections.hero.backgroundImage" label="Background Image (Desktop)" />
      <ImageField control={control} name="sections.hero.mobileImage" label="Background Image (Mobile)" />
      <p className="text-xs font-medium text-zinc-600">Stats</p>
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`sections.hero.stats.${i}.value`} label="Value" placeholder="430+" />
                <PlainField control={control} name={`sections.hero.stats.${i}.icon`} label="Icon" placeholder="area" />
              </div>
              <LocalizedField control={control} name={`sections.hero.stats.${i}.label`} label="Label" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Stat"
        onClick={() => append({ _id: tempId(), value: "", label: emptyLoc(), icon: "" })}
      />
      <PlainField control={control} name="sections.hero.overlayOpacity" label="Overlay Opacity (%)" type="number" />
    </SectionAccordion>
  )
}

// ─── 2. Overview ────────────────────────────────────────────────────────

function OverviewSection({ control }: { control: F }) {
  return (
    <SectionAccordion title="Overview" order={2} control={control} visibleName="sections.overview.isVisible">
      <LocalizedField control={control} name="sections.overview.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.overview.heading" label="Heading" />
      <LocalizedField control={control} name="sections.overview.description" label="Description" multiline />
      <ImageField control={control} name="sections.overview.image" label="Image" />
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Image Position</label>
        <Controller
          control={control}
          name="sections.overview.imagePosition"
          render={({ field }) => (
            <select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900">
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          )}
        />
      </div>
    </SectionAccordion>
  )
}

// ─── 3. Before & After ──────────────────────────────────────────────────

function BeforeAfterSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.beforeAfter.items" })
  return (
    <SectionAccordion title="Before & After" order={3} control={control} visibleName="sections.beforeAfter.isVisible">
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
              <BoolField control={control} name={`sections.beforeAfter.items.${i}.isVisible`} label="Visible" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Before/After"
        onClick={() =>
          append({ _id: tempId(), title: emptyLoc(), description: emptyLoc(), beforeImage: emptyImg(), afterImage: emptyImg(), isVisible: true })
        }
      />
      <div className="grid grid-cols-2 gap-4">
        <BoolField control={control} name="sections.beforeAfter.autoplay" label="Autoplay" />
        <BoolField control={control} name="sections.beforeAfter.showNavigation" label="Show navigation arrows" />
      </div>
    </SectionAccordion>
  )
}

// ─── 4. Gallery ─────────────────────────────────────────────────────────

function GallerySection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.gallery.images" })
  return (
    <SectionAccordion title="Project Gallery" order={4} control={control} visibleName="sections.gallery.isVisible">
      <LocalizedField control={control} name="sections.gallery.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.gallery.heading" label="Heading" />
      <LocalizedField control={control} name="sections.gallery.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <ImageField control={control} name={`sections.gallery.images.${i}.image`} label="Image" />
              <LocalizedField control={control} name={`sections.gallery.images.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.gallery.images.${i}.caption`} label="Caption" />
              <BoolField control={control} name={`sections.gallery.images.${i}.isVisible`} label="Visible" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Image"
        onClick={() => append({ _id: tempId(), image: emptyImg(), title: emptyLoc(), caption: emptyLoc(), isVisible: true })}
      />
      <div className="grid grid-cols-2 gap-4">
        <BoolField control={control} name="sections.gallery.autoplay" label="Autoplay" />
        <BoolField control={control} name="sections.gallery.showNavigation" label="Show navigation arrows" />
      </div>
    </SectionAccordion>
  )
}

// ─── 5. Materials ───────────────────────────────────────────────────────

function MaterialsSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.materials.materials" })
  return (
    <SectionAccordion title="Material Inspiration" order={5} control={control} visibleName="sections.materials.isVisible">
      <LocalizedField control={control} name="sections.materials.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.materials.heading" label="Heading" />
      <LocalizedField control={control} name="sections.materials.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`sections.materials.materials.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.materials.materials.${i}.subtitle`} label="Subtitle" />
              <LocalizedField control={control} name={`sections.materials.materials.${i}.description`} label="Description" multiline />
              <ImageField control={control} name={`sections.materials.materials.${i}.image`} label="Image" />
              <BoolField control={control} name={`sections.materials.materials.${i}.isVisible`} label="Visible" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Material"
        onClick={() => append({ _id: tempId(), title: emptyLoc(), subtitle: emptyLoc(), description: emptyLoc(), image: emptyImg(), isVisible: true })}
      />
    </SectionAccordion>
  )
}

// ─── 6. Project Info ────────────────────────────────────────────────────

function ProjectInfoSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.projectInfo.details" })
  return (
    <SectionAccordion title="Project Details" order={6} control={control} visibleName="sections.projectInfo.isVisible">
      <LocalizedField control={control} name="sections.projectInfo.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.projectInfo.heading" label="Heading" />
      <LocalizedField control={control} name="sections.projectInfo.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <PlainField control={control} name={`sections.projectInfo.details.${i}.icon`} label="Icon" placeholder="home" />
              <LocalizedField control={control} name={`sections.projectInfo.details.${i}.label`} label="Label" />
              <LocalizedField control={control} name={`sections.projectInfo.details.${i}.value`} label="Value" />
              <BoolField control={control} name={`sections.projectInfo.details.${i}.isVisible`} label="Visible" />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Detail"
        onClick={() => append({ _id: tempId(), icon: "", label: emptyLoc(), value: emptyLoc(), isVisible: true })}
      />
      <ButtonField control={control} name="sections.projectInfo.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 7. Testimonial ─────────────────────────────────────────────────────

function TestimonialSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.testimonial.testimonials" })
  return (
    <SectionAccordion title="Client Testimonial" order={7} control={control} visibleName="sections.testimonial.isVisible">
      <LocalizedField control={control} name="sections.testimonial.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.testimonial.heading" label="Heading" />
      <LocalizedField control={control} name="sections.testimonial.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <LocalizedField control={control} name={`sections.testimonial.testimonials.${i}.clientName`} label="Client Name" />
              <LocalizedField control={control} name={`sections.testimonial.testimonials.${i}.designation`} label="Designation" />
              <LocalizedField control={control} name={`sections.testimonial.testimonials.${i}.quote`} label="Quote" multiline />
              <ImageField control={control} name={`sections.testimonial.testimonials.${i}.image`} label="Client Photo" />
              <div className="grid grid-cols-2 gap-3">
                <PlainField control={control} name={`sections.testimonial.testimonials.${i}.videoUrl`} label="Video URL" />
                <BoolField control={control} name={`sections.testimonial.testimonials.${i}.isVisible`} label="Visible" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Testimonial"
        onClick={() =>
          append({ _id: tempId(), clientName: emptyLoc(), designation: emptyLoc(), quote: emptyLoc(), image: emptyImg(), videoUrl: "", isVisible: true })
        }
      />
      <BoolField control={control} name="sections.testimonial.autoplay" label="Autoplay" />
    </SectionAccordion>
  )
}

// ─── 8. Related Projects ────────────────────────────────────────────────

function RelatedProjectsSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.relatedProjects.projects" })
  return (
    <SectionAccordion title="Related Projects" order={8} control={control} visibleName="sections.relatedProjects.isVisible">
      <LocalizedField control={control} name="sections.relatedProjects.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.relatedProjects.heading" label="Heading" />
      <LocalizedField control={control} name="sections.relatedProjects.description" label="Description" multiline />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
            <div className="flex-1 space-y-2">
              <PlainField control={control} name={`sections.relatedProjects.projects.${i}.projectSlug`} label="Project Slug" placeholder="jumeirah-gate-dubai" />
              <LocalizedField control={control} name={`sections.relatedProjects.projects.${i}.title`} label="Title" />
              <LocalizedField control={control} name={`sections.relatedProjects.projects.${i}.location`} label="Location" />
              <LocalizedField control={control} name={`sections.relatedProjects.projects.${i}.category`} label="Category" />
              <ImageField control={control} name={`sections.relatedProjects.projects.${i}.image`} label="Image" />
              <div className="grid grid-cols-3 gap-3">
                <PlainField control={control} name={`sections.relatedProjects.projects.${i}.href`} label="Link URL" />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Grid Position</label>
                  <Controller
                    control={control}
                    name={`sections.relatedProjects.projects.${i}.position`}
                    render={({ field }) => (
                      <select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900">
                        {PROJECT_POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    )}
                  />
                </div>
                <BoolField control={control} name={`sections.relatedProjects.projects.${i}.isVisible`} label="Visible" />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Project"
        onClick={() =>
          append({ _id: tempId(), projectSlug: "", title: emptyLoc(), location: emptyLoc(), category: emptyLoc(), image: emptyImg(), href: "", position: "top-left", isVisible: true })
        }
      />
      <ButtonField control={control} name="sections.relatedProjects.button" label="Section Button" />
    </SectionAccordion>
  )
}

// ─── 9. Consultation ────────────────────────────────────────────────────

function ConsultationSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections.consultation.fields" })
  return (
    <SectionAccordion title="Consultation Form" order={9} control={control} visibleName="sections.consultation.isVisible">
      <LocalizedField control={control} name="sections.consultation.eyebrow" label="Eyebrow" />
      <LocalizedField control={control} name="sections.consultation.heading" label="Heading" />
      <LocalizedField control={control} name="sections.consultation.description" label="Description" multiline />
      <ImageField control={control} name="sections.consultation.image" label="Image" />

      <p className="pt-2 text-xs font-medium text-zinc-600">Form Fields</p>
      <div className="space-y-3">
        {fields.map((f, i) => (
          <ConsultationFieldCard key={f.id} control={control} index={i} onRemove={() => remove(i)} />
        ))}
      </div>
      <AddItemButton
        label="Add Field"
        onClick={() =>
          append({
            _id: tempId(),
            name: "",
            label: emptyLoc(),
            placeholder: emptyLoc(),
            type: "text",
            required: false,
            options: [],
          })
        }
      />

      <LocalizedField control={control} name="sections.consultation.submitButtonLabel" label="Submit Button Label" />
    </SectionAccordion>
  )
}

function ConsultationFieldCard({ control, index, onRemove }: { control: F; index: number; onRemove: () => void }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.consultation.fields.${index}.options`,
  })

  return (
    <div className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3">
      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <PlainField control={control} name={`sections.consultation.fields.${index}.name`} label="Field Name (key)" placeholder="propertyType" />
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Field Type</label>
            <Controller
              control={control}
              name={`sections.consultation.fields.${index}.type`}
              render={({ field }) => (
                <select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900">
                  {FIELD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              )}
            />
          </div>
        </div>
        <LocalizedField control={control} name={`sections.consultation.fields.${index}.label`} label="Label" />
        <LocalizedField control={control} name={`sections.consultation.fields.${index}.placeholder`} label="Placeholder" />
        <BoolField control={control} name={`sections.consultation.fields.${index}.required`} label="Required" />

        <div className="space-y-2 border-t border-zinc-100 pt-2">
          <p className="text-xs font-medium text-zinc-600">Options (for select fields)</p>
          <div className="space-y-2">
            {fields.map((of, oi) => (
              <div key={of.id} className="flex items-center gap-2">
                <div className="w-32">
                  <PlainField control={control} name={`sections.consultation.fields.${index}.options.${oi}.value`} label="Value" placeholder="villa" />
                </div>
                <div className="flex-1">
                  <LocalizedField control={control} name={`sections.consultation.fields.${index}.options.${oi}.label`} label="Label" />
                </div>
                <div className="pt-6">
                  <DeleteItemButton onClick={() => remove(oi)} />
                </div>
              </div>
            ))}
          </div>
          <AddItemButton label="Add Option" onClick={() => append({ value: "", label: emptyLoc() })} />
        </div>
      </div>
      <DeleteItemButton onClick={onRemove} />
    </div>
  )
}
