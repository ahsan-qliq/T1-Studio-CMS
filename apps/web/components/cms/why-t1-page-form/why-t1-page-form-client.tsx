"use client"
import { useForm, Controller, type Control } from "react-hook-form"
import { useState } from "react"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { LocalizedField, PlainField, BoolField, ImageField, ButtonField, SectionAccordion } from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"
import type { WhyT1PageApiData } from "@/types/api-why-t1-page"

const controlPath = (control: Control<WhyT1PageApiData>, name: string, label: string) => <PlainField control={control} name={name} label={label} />
export function WhyT1PageFormClient({ initialData }: { initialData: WhyT1PageApiData }) {
  const form = useForm<WhyT1PageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState } = form
  const [saving, setSaving] = useState(false)
  const submit = handleSubmit(async (data) => {
    setSaving(true)
    try {
      const response = await fetch("/api/save-why-t1-page", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!response.ok) throw new Error(await response.text())
    } finally { setSaving(false) }
  })
  return <form onSubmit={submit} className="space-y-4 pb-24">
    <div className="grid grid-cols-3 gap-3 rounded-lg border border-zinc-200 bg-white p-4">
      {controlPath(control, "pageName", "Page Name")}
      {controlPath(control, "slug", "Slug")}
      <Controller control={control} name="status" render={({ field }) => <div className="space-y-1.5"><Label>Status</Label><select {...field} className="h-9 w-full rounded-md border border-zinc-200 px-2 text-sm"><option value="draft">draft</option><option value="published">published</option></select></div>} />
    </div>
    <SectionAccordion title="Hero" order={1} control={control} visibleName="sections.hero.isVisible" defaultOpen><LocalizedField control={control} name="sections.hero.eyebrow" label="Eyebrow" /><LocalizedField control={control} name="sections.hero.heading" label="Heading" multiline /><LocalizedField control={control} name="sections.hero.description" label="Description" multiline /><ImageField control={control} name="sections.hero.backgroundImage" label="Background Image" /><ImageField control={control} name="sections.hero.mobileImage" label="Mobile Image" /><ButtonField control={control} name="sections.hero.primaryButton" label="Primary Button" /><PlainField control={control} name="sections.hero.overlayOpacity" label="Overlay Opacity" type="number" /></SectionAccordion>
    <WhySection control={control} name="comparison" title="Comparison" fields={["eyebrow", "heading", "description"]} />
    <WhySection control={control} name="journey" title="Project Journey" fields={["eyebrow", "heading", "description"]} />
    <WhySection control={control} name="stats" title="Stats" fields={["eyebrow", "heading"]} />
    <WhySection control={control} name="benefits" title="Benefits" fields={["eyebrow", "heading", "description"]} />
    <WhySection control={control} name="designerPicks" title="Designer Picks" fields={["eyebrow", "heading", "description"]} />
    <WhySection control={control} name="brands" title="Trusted Brands" fields={["eyebrow", "heading", "description"]} />
    <WhySection control={control} name="partnership" title="Referral Partnership" fields={["eyebrow", "heading", "description"]} />
    <WhySection control={control} name="designTips" title="Design Tips" fields={["eyebrow", "heading", "description"]} />
    <WhySection control={control} name="faq" title="FAQ" fields={["eyebrow", "heading", "description"]} />
    <SeoFields control={control} namePrefix="seo" />
    <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3"><button type="submit" disabled={saving} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{saving ? "Saving..." : formState.isDirty ? "Save All Changes" : "Saved"}</button></div>
  </form>
}
function WhySection({ control, name, title, fields }: { control: Control<WhyT1PageApiData>; name: string; title: string; fields: string[] }) {
  return <SectionAccordion title={title} order={1} control={control} visibleName={`sections.${name}.isVisible`}><div className="space-y-3">{fields.map((field) => <LocalizedField key={field} control={control} name={`sections.${name}.${field}`} label={field} multiline={field === "description"} />)}</div><p className="text-xs text-zinc-500">Use the page model fields above; list items can be added after the API data is loaded.</p></SectionAccordion>
}
