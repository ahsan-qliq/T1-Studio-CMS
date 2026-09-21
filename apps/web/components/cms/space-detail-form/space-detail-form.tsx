"use client"

import { Button } from "@workspace/ui/components/button"

import {
  useForm,
  useFieldArray,
  Controller,
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
import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`
const emptyLoc = () => ({ en: "", ar: "" })
const emptyImg = () => ({ url: "", key: "", alt: emptyLoc() })

const PROJECT_POSITIONS = [
  "top-left",
  "top-right",
  "middle-left",
  "middle-right",
  "bottom-left",
  "bottom-right",
]

type F = Control<SpaceDetailPageApiData>

interface SpaceDetailFormProps {
  initialData: SpaceDetailPageApiData
  onSave: (
    data: SpaceDetailPageApiData
  ) => void | SpaceDetailPageApiData | Promise<void | SpaceDetailPageApiData>
}

export function SpaceDetailForm({ initialData, onSave }: SpaceDetailFormProps) {
  const form = useForm<SpaceDetailPageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState, reset } = form
  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (values) => {
    setSaving(true)
    try {
      const fresh = await onSave(values)
      if (fresh) reset(fresh)
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      {/* Page-level meta */}
      <div className="grid grid-cols-4 gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <PlainField
          control={control}
          name="pageName"
          label="Page Name"
          placeholder="Kitchens"
        />
        <Controller
          control={control}
          name="spaceType"
          rules={{ required: true }}
          render={({ field }) => (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-900">
                Space Type
              </label>
              <select
                {...field}
                className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900"
                required
              >
                <option value="">Select a type</option>
                {[
                  "kitchen",
                  "wardrobe",
                  "living-room",
                  "bedroom",
                  "bathroom",
                  "home-office",
                  "outdoor-living",
                  "bespoke-joinery",
                ].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
        <PlainField
          control={control}
          name="slug"
          label="Slug"
          placeholder="kitchens"
          required
        />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Status</label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <select
                {...field}
                className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900"
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
            )}
          />
        </div>
      </div>

      <HeroSection control={control} />
      <IntroSection control={control} />
      <FeaturesSection control={control} />
      <StylesSection control={control} />
      <GallerySection control={control} />
      <MaterialsSection control={control} />
      <BrandsSection control={control} />
      <RelatedProjectsSection control={control} />
      <JourneySection control={control} />
      <FaqSection control={control} />
      <RelatedSpacesSection control={control} />
      <ConsultationSection control={control} />

      <SeoFields control={control} namePrefix="seo" />

      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button
          type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
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

// ─── 1. Hero ────────────────────────────────────────────────────────────

function HeroSection({ control }: { control: F }) {
  return (
    <SectionAccordion
      title="Hero Banner"
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
        label="Background Image (Desktop)"
      />
      <ImageField
        control={control}
        name="sections.hero.mobileImage"
        label="Background Image (Mobile)"
      />
      <ButtonField
        control={control}
        name="sections.hero.primaryButton"
        label="Primary Button"
      />
      <PlainField
        control={control}
        name="sections.hero.overlayOpacity"
        label="Overlay Opacity (%)"
        type="number"
      />
    </SectionAccordion>
  )
}

// ─── 2. Intro ───────────────────────────────────────────────────────────

function IntroSection({ control }: { control: F }) {
  return (
    <SectionAccordion
      title="Intro"
      order={2}
      control={control}
      visibleName="sections.intro.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.intro.eyebrow"
        label="Eyebrow"
      />
      <LocalizedField
        control={control}
        name="sections.intro.heading"
        label="Heading"
      />
      <LocalizedField
        control={control}
        name="sections.intro.description"
        label="Description"
        multiline
      />
      <ImageField control={control} name="sections.intro.image" label="Image" />
      <ButtonField
        control={control}
        name="sections.intro.button"
        label="Button"
      />
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Image Position</label>
        <Controller
          control={control}
          name="sections.intro.imagePosition"
          render={({ field }) => (
            <select
              {...field}
              className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900"
            >
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          )}
        />
      </div>
    </SectionAccordion>
  )
}

// ─── 3. Features ────────────────────────────────────────────────────────

function FeaturesSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.features.items",
  })
  return (
    <SectionAccordion
      title="Features"
      order={3}
      control={control}
      visibleName="sections.features.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.features.eyebrow"
        label="Eyebrow"
      />
      <LocalizedField
        control={control}
        name="sections.features.heading"
        label="Heading"
      />
      <LocalizedField
        control={control}
        name="sections.features.description"
        label="Description"
        multiline
      />
      <ImageField
        control={control}
        name="sections.features.image"
        label="Section Image"
      />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-2">
              <PlainField
                control={control}
                name={`sections.features.items.${i}.icon`}
                label="Icon"
                placeholder="layout"
              />
              <LocalizedField
                control={control}
                name={`sections.features.items.${i}.title`}
                label="Title"
              />
              <LocalizedField
                control={control}
                name={`sections.features.items.${i}.description`}
                label="Description"
                multiline
              />
              <BoolField
                control={control}
                name={`sections.features.items.${i}.isVisible`}
                label="Visible"
              />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Feature"
        onClick={() =>
          append({
            _id: tempId(),
            icon: "",
            title: emptyLoc(),
            description: emptyLoc(),
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

// ─── 4. Styles ──────────────────────────────────────────────────────────

function StylesSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.styles.items",
  })
  return (
    <SectionAccordion
      title="Style & Range"
      order={4}
      control={control}
      visibleName="sections.styles.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.styles.eyebrow"
        label="Eyebrow"
      />
      <LocalizedField
        control={control}
        name="sections.styles.heading"
        label="Heading"
      />
      <LocalizedField
        control={control}
        name="sections.styles.description"
        label="Description"
        multiline
      />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-2">
              <LocalizedField
                control={control}
                name={`sections.styles.items.${i}.title`}
                label="Title"
              />
              <LocalizedField
                control={control}
                name={`sections.styles.items.${i}.description`}
                label="Description"
                multiline
              />
              <ImageField
                control={control}
                name={`sections.styles.items.${i}.image`}
                label="Image"
              />
              <div className="grid grid-cols-2 gap-3">
                <PlainField
                  control={control}
                  name={`sections.styles.items.${i}.href`}
                  label="Link URL"
                />
                <BoolField
                  control={control}
                  name={`sections.styles.items.${i}.isVisible`}
                  label="Visible"
                />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Style"
        onClick={() =>
          append({
            _id: tempId(),
            title: emptyLoc(),
            description: emptyLoc(),
            image: emptyImg(),
            href: "",
            isVisible: true,
          })
        }
      />
      <ButtonField
        control={control}
        name="sections.styles.button"
        label="Section Button"
      />
      <BoolField
        control={control}
        name="sections.styles.autoplay"
        label="Autoplay carousel"
      />
    </SectionAccordion>
  )
}

// ─── 5. Gallery ─────────────────────────────────────────────────────────

function GallerySection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.gallery.images",
  })
  return (
    <SectionAccordion
      title="Gallery / Inspiration"
      order={5}
      control={control}
      visibleName="sections.gallery.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.gallery.eyebrow"
        label="Eyebrow"
      />
      <LocalizedField
        control={control}
        name="sections.gallery.heading"
        label="Heading"
      />
      <LocalizedField
        control={control}
        name="sections.gallery.description"
        label="Description"
        multiline
      />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-2">
              <ImageField
                control={control}
                name={`sections.gallery.images.${i}.image`}
                label="Image"
              />
              <LocalizedField
                control={control}
                name={`sections.gallery.images.${i}.title`}
                label="Title"
              />
              <LocalizedField
                control={control}
                name={`sections.gallery.images.${i}.caption`}
                label="Caption"
              />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Image"
        onClick={() =>
          append({
            _id: tempId(),
            image: emptyImg(),
            title: emptyLoc(),
            caption: emptyLoc(),
          })
        }
      />
      <div className="grid grid-cols-2 gap-4">
        <BoolField
          control={control}
          name="sections.gallery.autoplay"
          label="Autoplay"
        />
        <BoolField
          control={control}
          name="sections.gallery.showNavigation"
          label="Show navigation arrows"
        />
      </div>
    </SectionAccordion>
  )
}

// ─── 6. Materials ───────────────────────────────────────────────────────

function MaterialsSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.materials.materials",
  })
  return (
    <SectionAccordion
      title="Materials & Finishes"
      order={6}
      control={control}
      visibleName="sections.materials.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.materials.eyebrow"
        label="Eyebrow"
      />
      <LocalizedField
        control={control}
        name="sections.materials.heading"
        label="Heading"
      />
      <LocalizedField
        control={control}
        name="sections.materials.description"
        label="Description"
        multiline
      />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-2">
              <LocalizedField
                control={control}
                name={`sections.materials.materials.${i}.title`}
                label="Title"
              />
              <LocalizedField
                control={control}
                name={`sections.materials.materials.${i}.description`}
                label="Description"
                multiline
              />
              <ImageField
                control={control}
                name={`sections.materials.materials.${i}.image`}
                label="Image"
              />
              <BoolField
                control={control}
                name={`sections.materials.materials.${i}.isVisible`}
                label="Visible"
              />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Material"
        onClick={() =>
          append({
            _id: tempId(),
            title: emptyLoc(),
            description: emptyLoc(),
            image: emptyImg(),
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

// ─── 7. Brands ──────────────────────────────────────────────────────────

function BrandsSection({ control }: { control: F }) {
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
        name="sections.brands.heading"
        label="Heading"
      />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-2">
              <PlainField
                control={control}
                name={`sections.brands.brands.${i}.name`}
                label="Brand Name"
                placeholder="Keller"
              />
              <ImageField
                control={control}
                name={`sections.brands.brands.${i}.logo`}
                label="Logo"
              />
              <div className="grid grid-cols-2 gap-3">
                <PlainField
                  control={control}
                  name={`sections.brands.brands.${i}.href`}
                  label="Link URL"
                />
                <BoolField
                  control={control}
                  name={`sections.brands.brands.${i}.openInNewTab`}
                  label="New tab"
                />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Brand"
        onClick={() =>
          append({
            _id: tempId(),
            name: "",
            logo: emptyImg(),
            href: "",
            openInNewTab: true,
          })
        }
      />
    </SectionAccordion>
  )
}

// ─── 8. Related Projects ────────────────────────────────────────────────

function RelatedProjectsSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.relatedProjects.projects",
  })
  return (
    <SectionAccordion
      title="Related Projects"
      order={8}
      control={control}
      visibleName="sections.relatedProjects.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.relatedProjects.eyebrow"
        label="Eyebrow"
      />
      <LocalizedField
        control={control}
        name="sections.relatedProjects.heading"
        label="Heading"
      />
      <LocalizedField
        control={control}
        name="sections.relatedProjects.description"
        label="Description"
        multiline
      />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-2">
              <LocalizedField
                control={control}
                name={`sections.relatedProjects.projects.${i}.title`}
                label="Title"
              />
              <LocalizedField
                control={control}
                name={`sections.relatedProjects.projects.${i}.location`}
                label="Location"
              />
              <LocalizedField
                control={control}
                name={`sections.relatedProjects.projects.${i}.description`}
                label="Description"
                multiline
              />
              <ImageField
                control={control}
                name={`sections.relatedProjects.projects.${i}.image`}
                label="Image"
              />
              <div className="grid grid-cols-3 gap-3">
                <PlainField
                  control={control}
                  name={`sections.relatedProjects.projects.${i}.href`}
                  label="Link URL"
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Grid Position</label>
                  <Controller
                    control={control}
                    name={`sections.relatedProjects.projects.${i}.position`}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900"
                      >
                        {PROJECT_POSITIONS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <BoolField
                  control={control}
                  name={`sections.relatedProjects.projects.${i}.isVisible`}
                  label="Visible"
                />
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
            title: emptyLoc(),
            location: emptyLoc(),
            description: emptyLoc(),
            image: emptyImg(),
            href: "",
            position: "top-left",
            isVisible: true,
          })
        }
      />
      <ButtonField
        control={control}
        name="sections.relatedProjects.button"
        label="Section Button"
      />
    </SectionAccordion>
  )
}

// ─── 9. Journey ─────────────────────────────────────────────────────────

function JourneySection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.journey.steps",
  })
  return (
    <SectionAccordion
      title="Project Journey"
      order={9}
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
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="space-y-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <PlainField
                control={control}
                name={`sections.journey.steps.${i}.icon`}
                label="Icon"
                placeholder="discover"
              />
              <div className="pt-6">
                <DeleteItemButton onClick={() => remove(i)} />
              </div>
            </div>
            <LocalizedField
              control={control}
              name={`sections.journey.steps.${i}.title`}
              label="Title"
            />
            <LocalizedField
              control={control}
              name={`sections.journey.steps.${i}.subtitle`}
              label="Subtitle"
            />
            <LocalizedField
              control={control}
              name={`sections.journey.steps.${i}.description`}
              label="Description"
              multiline
            />
            <LocalizedField
              control={control}
              name={`sections.journey.steps.${i}.advantageTitle`}
              label="Advantage Title"
            />
            <LocalizedField
              control={control}
              name={`sections.journey.steps.${i}.advantageDescription`}
              label="Advantage Description"
              multiline
            />
            <LocalizedField
              control={control}
              name={`sections.journey.steps.${i}.highlight`}
              label="Highlight"
              multiline
            />
            <BoolField
              control={control}
              name={`sections.journey.steps.${i}.isVisible`}
              label="Visible"
            />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Step"
        onClick={() =>
          append({
            _id: tempId(),
            icon: "",
            title: emptyLoc(),
            subtitle: emptyLoc(),
            description: emptyLoc(),
            advantageTitle: emptyLoc(),
            advantageDescription: emptyLoc(),
            highlight: emptyLoc(),
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

// ─── 10. FAQ ────────────────────────────────────────────────────────────

function FaqSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.faq.faqs",
  })
  return (
    <SectionAccordion
      title="Frequently Asked Questions"
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
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-2">
              <LocalizedField
                control={control}
                name={`sections.faq.faqs.${i}.question`}
                label="Question"
                multiline
              />
              <LocalizedField
                control={control}
                name={`sections.faq.faqs.${i}.answer`}
                label="Answer"
                multiline
              />
              <BoolField
                control={control}
                name={`sections.faq.faqs.${i}.isVisible`}
                label="Visible"
              />
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add FAQ"
        onClick={() =>
          append({
            _id: tempId(),
            question: emptyLoc(),
            answer: emptyLoc(),
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

// ─── 11. Related Spaces ─────────────────────────────────────────────────

function RelatedSpacesSection({ control }: { control: F }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.relatedSpaces.spaces",
  })
  return (
    <SectionAccordion
      title="Related Spaces"
      order={11}
      control={control}
      visibleName="sections.relatedSpaces.isVisible"
    >
      <LocalizedField
        control={control}
        name="sections.relatedSpaces.heading"
        label="Heading"
      />
      <div className="space-y-3">
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex-1 space-y-2">
              <PlainField
                control={control}
                name={`sections.relatedSpaces.spaces.${i}.spaceType`}
                label="Space Type"
                placeholder="wardrobe"
              />
              <LocalizedField
                control={control}
                name={`sections.relatedSpaces.spaces.${i}.title`}
                label="Title"
              />
              <ImageField
                control={control}
                name={`sections.relatedSpaces.spaces.${i}.image`}
                label="Image"
              />
              <div className="grid grid-cols-2 gap-3">
                <PlainField
                  control={control}
                  name={`sections.relatedSpaces.spaces.${i}.href`}
                  label="Link URL"
                />
                <BoolField
                  control={control}
                  name={`sections.relatedSpaces.spaces.${i}.isVisible`}
                  label="Visible"
                />
              </div>
            </div>
            <DeleteItemButton onClick={() => remove(i)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Related Space"
        onClick={() =>
          append({
            _id: tempId(),
            spaceType: "",
            title: emptyLoc(),
            image: emptyImg(),
            href: "",
            isVisible: true,
          })
        }
      />
      <ButtonField
        control={control}
        name="sections.relatedSpaces.button"
        label="Section Button"
      />
    </SectionAccordion>
  )
}

// ─── 12. Consultation ───────────────────────────────────────────────────

function ConsultationSection({ control }: { control: F }) {
  return (
    <SectionAccordion
      title="Consultation CTA"
      order={12}
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
      <ImageField
        control={control}
        name="sections.consultation.image"
        label="Image"
      />
      <ButtonField
        control={control}
        name="sections.consultation.button"
        label="Button"
      />
    </SectionAccordion>
  )
}
