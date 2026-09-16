"use client"

import { Controller, useForm, type Control } from "react-hook-form"
import { useState } from "react"
import { Label } from "@workspace/ui/components/label"
import { LocalizedField, PlainField, ImageField, ButtonField, SectionAccordion } from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"
import type { ContactPageApiData } from "@/types/api-contact-page"

const sections: [string, string, boolean][] = [
  ["contactInfo", "Contact Information", true],
  ["contactForm", "Consultation / Contact Form", true],
  ["location", "Location / Map", true],
  ["faq", "FAQ", true],
]

export function ContactPageFormClient({ initialData }: { initialData: ContactPageApiData }) {
  const form = useForm<ContactPageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState } = form
  const [saving, setSaving] = useState(false)
  const submit = handleSubmit(async (data) => {
    setSaving(true)
    try {
      const response = await fetch("/api/save-contact-page", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!response.ok) throw new Error(await response.text())
    } finally {
      setSaving(false)
    }
  })
  return <form onSubmit={submit} className="space-y-4 pb-24">
    <div className="grid grid-cols-3 gap-3 rounded-lg border border-zinc-200 bg-white p-4">
      <PlainField control={control} name="pageName" label="Page Name" />
      <PlainField control={control} name="slug" label="Slug" />
      <Controller control={control} name="status" render={({ field }) => <div className="space-y-1.5"><Label>Status</Label><select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm text-zinc-900"><option value="draft">draft</option><option value="published">published</option></select></div>} />
    </div>
    <SectionAccordion title="Hero" order={1} control={control} visibleName="sections.hero.isVisible" defaultOpen>
      <LocalizedField control={control} name="sections.hero.eyebrow" label="Eyebrow" /><LocalizedField control={control} name="sections.hero.heading" label="Heading" multiline /><LocalizedField control={control} name="sections.hero.description" label="Description" multiline /><ImageField control={control} name="sections.hero.backgroundImage" label="Background Image" /><ImageField control={control} name="sections.hero.mobileImage" label="Mobile Image" /><ButtonField control={control} name="sections.hero.primaryButton" label="Primary Button" /><PlainField control={control} name="sections.hero.overlayOpacity" label="Overlay Opacity" type="number" />
    </SectionAccordion>
    {sections.map(([name, title, hasEyebrow], index) => <ContactSectionForm key={name} control={control} name={name} title={title} order={index + 2} hasEyebrow={hasEyebrow} />)}
    <SeoFields control={control} namePrefix="seo" />
    <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3"><button type="submit" disabled={saving} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{saving ? "Saving..." : formState.isDirty ? "Save All Changes" : "Saved"}</button></div>
  </form>
}

function ContactSectionForm({ control, name, title, order, hasEyebrow }: { control: Control<ContactPageApiData>; name: string; title: string; order: number; hasEyebrow: boolean }) {
  return <SectionAccordion title={title} order={order} control={control} visibleName={`sections.${name}.isVisible`}><div className="space-y-3">{hasEyebrow && <LocalizedField control={control} name={`sections.${name}.eyebrow`} label="Eyebrow" />}<LocalizedField control={control} name={`sections.${name}.heading`} label="Heading" /><LocalizedField control={control} name={`sections.${name}.description`} label="Description" multiline /></div></SectionAccordion>
}
