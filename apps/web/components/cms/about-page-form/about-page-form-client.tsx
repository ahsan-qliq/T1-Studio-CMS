"use client"

import { Button } from "@workspace/ui/components/button"

import { Controller, useForm, type Control } from "react-hook-form"
import { useState } from "react"
import { Label } from "@workspace/ui/components/label"
import { LocalizedField, PlainField, ImageField, ButtonField, SectionAccordion } from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"
import type { AboutPageApiData } from "@/types/api-about-page"

const sections: [string, string, boolean][] = [
  ["story", "Our Story", true],
  ["journey", "Our Journey", true],
  ["philosophy", "Our Philosophy", true],
  ["values", "Our Values", true],
  ["stats", "Stats", false],
  ["team", "Our Team", true],
  ["showcase", "Showcase / Gallery", true],
  ["brands", "Trusted Brands", true],
  ["partnership", "Partnership", true],
  ["faq", "FAQ", true],
]

export function AboutPageFormClient({ initialData }: { initialData: AboutPageApiData }) {
  const form = useForm<AboutPageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState } = form
  const [saving, setSaving] = useState(false)
  const submit = handleSubmit(async (data) => {
    setSaving(true)
    try {
      const response = await fetch("/api/save-about-page", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
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
    {sections.map(([name, title, hasEyebrow], index) => <AboutSectionForm key={name} control={control} name={name} title={title} order={index + 2} hasEyebrow={hasEyebrow} />)}
    <SeoFields control={control} namePrefix="seo" />
    <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3"><Button type="submit" disabled={saving} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{saving ? "Saving..." : formState.isDirty ? "Save All Changes" : "Saved"}</Button></div>
  </form>
}

function AboutSectionForm({ control, name, title, order, hasEyebrow }: { control: Control<AboutPageApiData>; name: string; title: string; order: number; hasEyebrow: boolean }) {
  return <SectionAccordion title={title} order={order} control={control} visibleName={`sections.${name}.isVisible`}>
    <div className="space-y-3">
      {hasEyebrow && <LocalizedField control={control} name={`sections.${name}.eyebrow`} label="Eyebrow" />}
      {name !== "journey" && name !== "philosophy" && name !== "values" && name !== "stats" && name !== "team" && name !== "showcase" && name !== "brands" && name !== "partnership" && name !== "faq" && <LocalizedField control={control} name={`sections.${name}.heading`} label="Heading" />}
      {name !== "journey" && name !== "philosophy" && name !== "values" && name !== "stats" && name !== "team" && name !== "showcase" && name !== "brands" && name !== "partnership" && name !== "faq" && <LocalizedField control={control} name={`sections.${name}.description`} label="Description" multiline />}
      {name === "story" && <><LocalizedField control={control} name="sections.story.secondaryDescription" label="Secondary Description" multiline /><ImageField control={control} name="sections.story.image" label="Story Image" /><PlainField control={control} name="sections.story.imagePosition" label="Image Position" placeholder="left or right" /><ButtonField control={control} name="sections.story.button" label="Button" /></>}
      {name === "journey" && <JsonField control={control} name="sections.journey.items" label="Journey Items" />}
      {name === "philosophy" && <JsonField control={control} name="sections.philosophy.items" label="Philosophy Items" />}
      {name === "values" && <JsonField control={control} name="sections.values.items" label="Values Items" />}
      {name === "stats" && <JsonField control={control} name="sections.stats.items" label="Stats Items" />}
      {name === "team" && (
        <>
          <JsonField control={control} name="sections.team.items" label="Team Items" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Controller control={control} name="sections.team.autoplay" render={({ field }) => <label className="flex gap-2 text-sm"><input type="checkbox" checked={!!field.value} onChange={field.onChange} /> Autoplay</label>} />
            <Controller control={control} name="sections.team.showNavigation" render={({ field }) => <label className="flex gap-2 text-sm"><input type="checkbox" checked={!!field.value} onChange={field.onChange} /> Show navigation</label>} />
          </div>
        </>
      )}
      {name === "showcase" && <JsonField control={control} name="sections.showcase.items" label="Showcase Items" />}
      {name === "brands" && <JsonField control={control} name="sections.brands.items" label="Brand Items" />}
      {name === "partnership" && <JsonField control={control} name="sections.partnership.items" label="Partnership Items" />}
      {name === "faq" && <JsonField control={control} name="sections.faq.items" label="FAQ Items" />}
    </div>
  </SectionAccordion>
}

function JsonField({ control, name, label }: { control: Control<AboutPageApiData>; name: string; label: string }) {
  return <Controller control={control} name={name as never} render={({ field }) => (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-zinc-900">{label}</Label>
      <textarea
        className="min-h-40 w-full rounded-md border border-zinc-200 bg-white p-3 font-mono text-xs text-zinc-900"
        value={JSON.stringify(field.value ?? [], null, 2)}
        onChange={(event) => {
          try { field.onChange(JSON.parse(event.target.value)) } catch { /* preserve the text until valid JSON is entered */ }
        }}
        aria-label={label}
      />
      <p className="text-xs text-zinc-500">Enter an array using the API request-body shape.</p>
    </div>
  )} />
}
