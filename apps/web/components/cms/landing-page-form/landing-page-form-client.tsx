"use client"

import { useForm, Controller } from "react-hook-form"
import { Button } from "@workspace/ui/components/button"
import { LocalizedField, PlainField, ImageField, ButtonField, BoolField, SectionAccordion } from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"
import type { LandingPageApiData } from "@/types/api-landing-page"

const sections = [
  ["stats", "Stats", ["heading"]],
  ["intro", "Vision / Intro", ["eyebrow", "heading", "description", "secondaryDescription"]],
  ["projects", "Signature Projects", ["eyebrow", "heading", "description"]],
  ["process", "How It Works", ["eyebrow", "heading", "description"]],
  ["benefits", "Benefits / Why T1", ["eyebrow", "heading", "description"]],
  ["testimonials", "Testimonials", ["eyebrow", "heading", "description"]],
  ["faq", "FAQ", ["eyebrow", "heading", "description"]],
  ["consultation", "Dream Space / Consultation", ["eyebrow", "heading", "description"]],
] as const

export function LandingPageFormClient({ initialData }: { initialData: LandingPageApiData }) {
  const form = useForm<LandingPageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState } = form
  const submit = handleSubmit(async (data) => {
    const response = await fetch("/api/save-landing-page", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    if (!response.ok) alert("Failed to save Landing page")
  })
  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      <div className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-3">
        <PlainField control={control} name="pageName" label="Page Name" placeholder="Landing Page" />
        <PlainField control={control} name="slug" label="Slug" placeholder="landing-page" />
        <div className="space-y-1.5"><label htmlFor="landing-status" className="text-sm font-medium text-zinc-900">Status</label><Controller control={control} name="status" render={({ field }) => <select id="landing-status" {...field} className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"><option value="draft">draft</option><option value="published">published</option></select>} /></div>
      </div>
      <SectionAccordion title="Hero + Lead Form" order={1} control={control} visibleName="sections.hero.isVisible" defaultOpen>
        <LocalizedField control={control} name="sections.hero.eyebrow" label="Eyebrow" />
        <LocalizedField control={control} name="sections.hero.heading" label="Heading" multiline />
        <LocalizedField control={control} name="sections.hero.description" label="Description" multiline />
        <ImageField control={control} name="sections.hero.backgroundImage" label="Background Image" />
        <ImageField control={control} name="sections.hero.mobileImage" label="Mobile Image" />
        <ButtonField control={control} name="sections.hero.primaryButton" label="Primary Button" />
        <PlainField control={control} name="sections.hero.overlayOpacity" label="Overlay Opacity (%)" type="number" />
        <LocalizedField control={control} name="sections.hero.form.heading" label="Lead Form Heading" />
        <LocalizedField control={control} name="sections.hero.form.description" label="Lead Form Description" multiline />
        <LocalizedField control={control} name="sections.hero.form.submitButtonLabel" label="Submit Button Label" />
        <LocalizedField control={control} name="sections.hero.form.successMessage" label="Success Message" multiline />
      </SectionAccordion>
      {sections.map(([name, title, fields], index) => (
        <SectionAccordion key={name} title={title} order={index + 2} control={control} visibleName={`sections.${name}.isVisible`}>
          <div className="space-y-3">
            {fields.map((field) => <LocalizedField key={field} control={control} name={`sections.${name}.${field}`} label={field} multiline={field.includes("description")} />)}
          </div>
          {name === "intro" && <><ImageField control={control} name="sections.intro.image" label="Intro Image" /><ButtonField control={control} name="sections.intro.button" label="Button" /></>}
          {name === "projects" && <ButtonField control={control} name="sections.projects.button" label="Button" />}
          {name === "benefits" && <ButtonField control={control} name="sections.benefits.button" label="Button" />}
          {name === "consultation" && <ImageField control={control} name="sections.consultation.image" label="Consultation Image" />}
          {name === "testimonials" && <div className="grid gap-3 sm:grid-cols-2"><BoolField control={control} name="sections.testimonials.autoplay" label="Autoplay" /><BoolField control={control} name="sections.testimonials.showNavigation" label="Show navigation" /></div>}
          <p className="text-xs text-zinc-500">Repeatable items are preserved from the API and can be added through the backend data until their item editor is added.</p>
        </SectionAccordion>
      ))}
      <SeoFields control={control} namePrefix="seo" />
      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3"><Button type="submit" disabled={formState.isSubmitting}>{formState.isDirty ? "Save All Changes" : "Saved"}</Button></div>
    </form>
  )
}
